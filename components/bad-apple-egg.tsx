"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
const INTRO_BUFFER_MS = 200;
const HOLD_MS = 900;
const SEQUENCE = ["B", "A", "D"];

interface EggData {
  data: Uint8Array;
  animFrames: number;
}

function makeFlipKeyframes(from: string, to: string): Keyframe[] {
  return [
    { transform: "perspective(600px) rotateY(0deg)", backgroundColor: from, offset: 0 },
    { transform: "perspective(600px) rotateY(90deg)", backgroundColor: from, offset: 0.499 },
    { transform: "perspective(600px) rotateY(90deg)", backgroundColor: to, offset: 0.5 },
    { transform: "perspective(600px) rotateY(180deg)", backgroundColor: to, offset: 1 },
  ];
}

function buildPatternBits(): Uint8Array {
  const bits = new Uint8Array(PACKED_BYTES);
  for (const [row, col] of END_CARD_CELLS) {
    const i = row * COLS + col;
    bits[i >> 3] |= 0x80 >> (i & 7);
  }
  return bits;
}

export function BadAppleEgg({ children }: { children: React.ReactNode }) {
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dataPromiseRef = useRef<Promise<EggData> | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const animsRef = useRef<Animation[]>([]);
  const timersRef = useRef<number[]>([]);
  const rafRef = useRef(0);
  const seqRef = useRef(0);
  const activeRef = useRef(false);
  const unmountedRef = useRef(false);
  const [active, setActive] = useState(false);
  const [box, setBox] = useState({ w: 0, h: 0 });

  // object-contain sizing: largest 17:9 rect that fits the wrapper
  useLayoutEffect(() => {
    if (!active) return;
    const el = wrapRef.current;
    if (!el) return;
    const update = () =>
      setBox({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
      timersRef.current.forEach((t) => window.clearTimeout(t));
      animsRef.current.forEach((a) => a.cancel());
      audioRef.current?.pause();
    };
  }, []);

  const ensureData = useCallback((): Promise<EggData> => {
    if (!dataPromiseRef.current) {
      dataPromiseRef.current = fetch(BIN_URL, { cache: "no-store" })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.arrayBuffer();
        })
        .then((buf) => {
          const raw = new Uint8Array(buf);
          return {
            data: raw,
            animFrames: Math.floor(raw.length / PACKED_BYTES),
          };
        });
    }
    return dataPromiseRef.current;
  }, []);

  useEffect(() => {
    ensureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trigger = useCallback(() => {
    if (activeRef.current || unmountedRef.current) return;
    activeRef.current = true;
    setActive(true);

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio("/badapple-intro.m4a");
      audio.preload = "auto";
      audioRef.current = audio;
    }
    audio.pause();
    audio.currentTime = 0;

    const flipCell = (i: number, from: string, to: string) => {
      const cell = cellRefs.current[i];
      if (!cell) return;
      const anim = cell.animate(makeFlipKeyframes(from, to), {
        duration: FLIP_MS,
        easing: "ease-in-out",
      });
      anim.onfinish = () => {
        cell.style.backgroundColor = to;
      };
      animsRef.current.push(anim);
    };

    const later = (ms: number, fn: () => void) => {
      timersRef.current.push(window.setTimeout(fn, ms));
    };

    ensureData()
      .then((egg) => {
        if (unmountedRef.current || !activeRef.current) return;
        const { data, animFrames } = egg;

        // ---- INTRO: pattern -> flip every dark cell to light ----
        for (let i = 0; i < PIXELS; i++) {
          if (!END_CARD_SET.has(i)) flipCell(i, PIXEL_ON, PIXEL_OFF);
        }

        // ---- PLAYBACK ----
        later(FLIP_MS + INTRO_BUFFER_MS, () => {
          if (unmountedRef.current || !activeRef.current) return;
          const start = performance.now();
          let last = -1;
          let finished = false;
          const patternBits = buildPatternBits();

          const paint = (frame: number) => {
            const off = frame * PACKED_BYTES;
            for (let i = 0; i < PIXELS; i++) {
              const cell = cellRefs.current[i];
              if (!cell) continue;
              const on =
                (data[off + (i >> 3)] & (0x80 >> (i & 7))) !== 0;
              cell.style.backgroundColor = on ? PIXEL_ON : PIXEL_OFF;
            }
          };

          const finishToPattern = () => {
            if (finished) return;
            finished = true;
            cancelAnimationFrame(rafRef.current);

            // 1) make sure the LAST frame is actually on screen
            paint(animFrames - 1);

            // 2) compare each pixel of that frame vs the pattern;
            //    any difference -> flip to the opposite color.
            //    NOTE: anim frames use 1 = dark, patternBits use
            //    1 = lit, so convert the pattern to dark-space first.
            const lastOff = (animFrames - 1) * PACKED_BYTES;
            for (let i = 0; i < PIXELS; i++) {
              const animOn =
                (data[lastOff + (i >> 3)] & (0x80 >> (i & 7))) !== 0;
              const patLit =
                (patternBits[i >> 3] & (0x80 >> (i & 7))) !== 0;
              const targetOn = !patLit;
              if (animOn === targetOn) continue;
              flipCell(
                i,
                animOn ? PIXEL_ON : PIXEL_OFF,
                targetOn ? PIXEL_ON : PIXEL_OFF,
              );
            }

            // 3) hold the restored pattern, then restore the SVG
            later(HOLD_MS, () => {
              audio!.pause();
              audio!.currentTime = 0;
              animsRef.current = [];
              timersRef.current = [];
              activeRef.current = false;
              setActive(false);
            });
          };

          const tick = (now: number) => {
            if (unmountedRef.current || !activeRef.current || finished) return;
            const t = audio!.paused
              ? (now - start) / 1000
              : audio!.currentTime;
            const frame = Math.floor(t * FPS);
            if (frame >= animFrames) {
              finishToPattern();
              return;
            }
            if (frame !== last) {
              last = frame;
              paint(frame);
            }
            rafRef.current = requestAnimationFrame(tick);
          };

          audio!.play().catch(() => {});
          audio!.addEventListener("ended", finishToPattern);
          rafRef.current = requestAnimationFrame(tick);
        });
      })
      .catch(() => {
        activeRef.current = false;
        setActive(false);
      });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (activeRef.current) return;
      const key = e.key.toUpperCase();
      if (key === SEQUENCE[seqRef.current]) {
        seqRef.current += 1;
        if (seqRef.current === SEQUENCE.length) {
          seqRef.current = 0;
          trigger();
        }
      } else {
        seqRef.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trigger]);

  if (!active) {
    return <>{children}</>;
  }

  const measured = box.w > 0 && box.h > 0;
  const gridW = Math.min(box.w, (box.h * COLS) / ROWS);
  const gridH = (gridW * ROWS) / COLS;

  return (
    <div ref={wrapRef} className="w-full h-full flex items-center justify-center">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          width: measured ? gridW : "100%",
          height: measured ? gridH : "100%",
          visibility: measured ? "visible" : "hidden",
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
    </div>
  );
}
