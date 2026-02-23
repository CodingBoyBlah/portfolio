"use client";

import type { MotionValue, SpringOptions } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import styles from "./style.module.scss";

interface MouseMoveEvent {
  clientX: number;
  clientY: number;
}

export default function Cursor() {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const isHoveringRef = useRef<boolean>(false);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorSize = isPressed ? 21 : 15;
  const [isVisible, setIsVisible] = useState(false);

  const mouse: { x: MotionValue<number>; y: MotionValue<number> } = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions: SpringOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const manageResize = () => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) {
      setIsVisible(false);
      return;
    }
  };

  const checkHoverable = (target: EventTarget | null) => {
    let el = target as HTMLElement | null;
    while (el && el !== document.documentElement) {
      if (el.classList && el.classList.contains("hoverable")) return true;
      el = el.parentElement;
    }
    return false;
  };

  const manageMouseMove = (e: MouseMoveEvent) => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) {
      setIsVisible(false);
      return;
    }
    if (!isVisible) setIsVisible(true);

    // detect hovered ".hoverable" element by walking up the DOM from the event target
    const foundHoverable = checkHoverable((e as unknown as MouseEvent).target);
    if (foundHoverable !== isHoveringRef.current) {
      isHoveringRef.current = foundHoverable;
      setIsHovering(foundHoverable);
    }

    const { clientX, clientY } = e;
    // compute offset based on current visual size (expanded when hovering)
    const width = isHoveringRef.current ? 96 : cursorSize;
    const height = isHoveringRef.current ? 48 : cursorSize;

    mouse.x.set(clientX - width / 2);
    mouse.y.set(clientY - height / 2);
  };

  const manageMouseLeave = () => {
    setIsVisible(false);
    if (isHoveringRef.current) {
      isHoveringRef.current = false;
      setIsHovering(false);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    // prevent right click to trigger pressed
    if (e.button === 2) return;

    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  useEffect(() => {
    window.addEventListener("resize", manageResize);

    document.body.addEventListener("mouseleave", manageMouseLeave, {
      passive: true,
    });
    window.addEventListener("mousemove", manageMouseMove, {
      passive: true,
    });
    window.addEventListener("mousedown", handleMouseDown, {
      passive: true,
    });
    window.addEventListener("mouseup", handleMouseUp, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", manageResize);

      window.removeEventListener("mouseleave", manageMouseLeave);
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const template = ({
    rotate,
    scaleX,
    scaleY,
  }: {
    rotate: number;
    scaleX: number;
    scaleY: number;
  }) => {
    return `rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  const visualWidth = isHovering ? 96 : cursorSize;
  const visualHeight = isHovering ? 48 : cursorSize;

  return (
    <div className={styles.cursorContainer}>
      <motion.div
        transformTemplate={template}
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          // borderRadius is animated via inline style (number => px)
          borderRadius: isHovering ? 999 : "50%",
          pointerEvents: "none",
          // ensure blending is applied at the element level so the cursor inverts underlying colors

          mixBlendMode: "difference",
        }}
        animate={{
          width: visualWidth,
          height: visualHeight,
          // animate background color inline so the pill-to-dot transition blends correctly
          backgroundColor: isHovering ? "#ffffff" : "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
        className={`${styles.cursor} ${isVisible ? styles.visible : styles.hidden}`}
        ref={cursor}
      >
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: 14,
            fontWeight: 500,
            opacity: isHovering ? 1 : 0,
            transition:
              "opacity 0.18s ease-in-out, transform 0.18s ease-in-out",
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: 0.2,
            mixBlendMode: "difference",
          }}
        >
          View
        </span>
      </motion.div>
    </div>
  );
}
