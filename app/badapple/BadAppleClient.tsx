"use client";

import { useEffect, useRef, useState } from "react";
import {
  COLS,
  ROWS,
  PIXELS,
  FPS,
  PACKED_BYTES,
  PIXEL_ON,
  PIXEL_OFF,
  END_CARD_CELLS,
  END_CARD_SET,
  BIN_URL,
} from "@/lib/badapple";

const FLIP_MS = 560;
const INTRO_BUFFER_MS = 180;
const INTRO_TOTAL_MS = FLIP_MS + INTRO_BUFFER_MS;

const FLIP_KEYFRAMES: Keyframe[] = [
  { transform: "perspective(600px) rotateY(0deg)", backgroundColor: PIXEL_ON, offset: 0 },
  { transform: "perspective(600px) rotateY(90deg)", backgroundColor: PIXEL_ON, offset: 0.499 },
  { transform: "perspective(600px) rotateY(90deg)", backgroundColor: PIXEL_OFF, offset: 0.5 },
  { transform: "perspective(600px) rotateY(180deg)", backgroundColor: PIXEL_OFF, offset: 1 },
];

type Phase = "intro" | "playing" | "ended";

export default function BadAppleClient() {
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clockRef = useRef({ start: 0 });
  const animsRef = useRef<(Animation | null)[]>([]);
  const introTimerRef = useRef<number | undefined>(undefined);
  const stateRef = useRef({
    phase: "intro" as Phase,
    soundOn: false,
    ready: false,
  });
  const [soundOn, setSoundOn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    let raf = 0;
    let disposed = false;
    let lastFrame = -1;

    const cells = cellRefs.current;
    let data: Uint8Array | null = null;
    let animFrames = 0;

    const markSoundOn = () => {
      stateRef.current.soundOn = true;
      setSoundOn(true);
    };

    const paintEndCard = () => {
      if (!data) return;
      const offset = animFrames * PACKED_BYTES;
      for (let i = 0; i < PIXELS; i++) {
        const cell = cells[i];
        if (!cell) continue;
        const lit = (data[offset + (i >> 3)] & (0x80 >> (i & 7))) !== 0;
        cell.style.backgroundColor = lit ? PIXEL_OFF : PIXEL_ON;
      }
    };

    const finish = () => {
      cancelAnimationFrame(raf);
      paintEndCard();
      stateRef.current.phase = "ended";
      setEnded(true);
    };

    const tick = (now: number) => {
      const audio = audioRef.current;
      const t =
        audio && !audio.paused && !audio.ended
          ? audio.currentTime
          : (now - clockRef.current.start) / 1000;
      const frame = Math.floor(t * FPS);
      if (frame >= animFrames) {
        finish();
        return;
      }
      if (frame !== lastFrame) {
        lastFrame = frame;
        const offset = frame * PACKED_BYTES;
        const bytes = data!;
        for (let i = 0; i < PIXELS; i++) {
          const cell = cells[i];
          if (!cell) continue;
          const on = (bytes[offset + (i >> 3)] & (0x80 >> (i & 7))) !== 0;
          cell.style.backgroundColor = on ? PIXEL_ON : PIXEL_OFF;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const startPlayback = () => {
      if (!data || disposed) return;
      lastFrame = -1;
      clockRef.current.start = performance.now();
      stateRef.current.phase = "playing";
      setEnded(false);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
      const audio = audioRef.current!;
      audio.currentTime = 0;
      audio.play().then(markSoundOn).catch(() => {});
    };

    const onInteract = () => {
      if (!stateRef.current.ready || disposed) return;
      if (stateRef.current.phase === "ended") {
        startPlayback();
        return;
      }
      if (stateRef.current.phase === "playing" && !stateRef.current.soundOn) {
        const audio = audioRef.current!;
        const elapsed = (performance.now() - clockRef.current.start) / 1000;
        audio.currentTime = elapsed;
        audio.play().then(markSoundOn).catch(() => {});
      }
    };

    fetch(BIN_URL, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.arrayBuffer();
      })
      .then((buf) => {
        if (disposed) return;
        const orig = new Uint8Array(buf);
        animFrames = Math.floor(orig.length / PACKED_BYTES);
        data = new Uint8Array(orig.length + PACKED_BYTES);
        data.set(orig);
        const endCardOffset = animFrames * PACKED_BYTES;
        for (const [row, col] of END_CARD_CELLS) {
          const i = row * COLS + col;
          data[endCardOffset + (i >> 3)] |= 0x80 >> (i & 7);
        }
        stateRef.current.ready = true;
        setLoaded(true);

        paintEndCard();

        for (let i = 0; i < PIXELS; i++) {
          if (END_CARD_SET.has(i)) continue;
          const cell = cells[i];
          if (!cell) continue;
          const anim = cell.animate(FLIP_KEYFRAMES, {
            duration: FLIP_MS,
            easing: "ease-in-out",
          });
          anim.onfinish = () => {
            cell.style.backgroundColor = PIXEL_OFF;
          };
          animsRef.current[i] = anim;
        }

        introTimerRef.current = window.setTimeout(
          startPlayback,
          INTRO_TOTAL_MS,
        );
      })
      .catch(() => {});

    const audio = new Audio("/badapple-intro.m4a");
    audio.preload = "auto";
    audio.addEventListener("ended", () => {
      if (stateRef.current.phase === "playing") finish();
    });
    audioRef.current = audio;

    window.addEventListener("pointerdown", onInteract);
    window.addEventListener("keydown", onInteract);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(introTimerRef.current);
      for (const a of animsRef.current) a?.cancel();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      audio.pause();
    };
  }, []);

  const hint = !loaded
    ? ""
    : ended
      ? "click to replay"
      : soundOn || !loaded
        ? ""
        : "click anywhere for sound";

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
          width: "min(88vw, 156vh)",
        }}
      >
        {Array.from({ length: PIXELS }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              cellRefs.current[i] = el;
            }}
            style={{
              backgroundColor: END_CARD_SET.has(i) ? PIXEL_OFF : PIXEL_ON,
            }}
          />
        ))}
      </div>
      <p
        className="select-none text-xs tracking-widest text-[#7a7a7e] transition-opacity duration-500"
        aria-hidden="true"
        style={{ opacity: hint ? 1 : 0 }}
      >
        {hint}
      </p>
    </div>
  );
}
