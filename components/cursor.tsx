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
  const [hoverVariant, setHoverVariant] = useState<"dark" | "light" | null>(null);
  const isHoveringRef = useRef<boolean>(false);
  const pointerRef = useRef({ x: 0, y: 0 });
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
      if (el.classList && el.classList.contains("hoverable-dark")) return "dark";
      if (el.classList && el.classList.contains("hoverable-light")) return "light";
      el = el.parentElement;
    }
    return null;
  };

  const manageMouseMove = (e: MouseMoveEvent) => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) {
      setIsVisible(false);
      return;
    }
    if (!isVisible) setIsVisible(true);

    const foundHoverable = checkHoverable((e as unknown as MouseEvent).target);
    const hovering = Boolean(foundHoverable);
    if (hovering !== isHoveringRef.current) {
      isHoveringRef.current = hovering;
      setIsHovering(hovering);
    }
    if (foundHoverable !== hoverVariant) {
      setHoverVariant(foundHoverable);
    }

    const { clientX, clientY } = e;
    pointerRef.current = { x: clientX, y: clientY };

    const width = isHoveringRef.current ? 96 : cursorSize;
    const height = isHoveringRef.current ? 48 : cursorSize;

    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  const resetHoverState = () => {
    if (isHoveringRef.current) {
      isHoveringRef.current = false;
      setIsHovering(false);
    }
    if (hoverVariant !== null) setHoverVariant(null);
  };

  const syncHoverStateWithPointer = () => {
    const elementAtPointer = document.elementFromPoint(
      pointerRef.current.x,
      pointerRef.current.y,
    );
    const foundHoverable = checkHoverable(elementAtPointer);
    const hovering = Boolean(foundHoverable);

    if (hovering !== isHoveringRef.current) {
      isHoveringRef.current = hovering;
      setIsHovering(hovering);
    }
    if (foundHoverable !== hoverVariant) {
      setHoverVariant(foundHoverable);
    }
  };

  const manageMouseLeave = () => {
    setIsVisible(false);
    resetHoverState();
  };

  const handleMouseDown = (e: MouseEvent) => {
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
    window.addEventListener("scroll", syncHoverStateWithPointer, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", manageResize);

      window.removeEventListener("mouseleave", manageMouseLeave);
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", syncHoverStateWithPointer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visualWidth = isHovering ? 96 : cursorSize;
  const visualHeight = isHovering ? 48 : cursorSize;

  return (
    <div
      className={styles.cursorContainer}
      style={{ mixBlendMode: isHovering ? "normal" : "difference" }}
    >
      <motion.div
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          transform: "translate(-50%, -50%)",

          borderRadius: isHovering ? 999 : "50%",
          backgroundColor: isHovering
            ? hoverVariant === "light"
              ? "#d9d9d6"
              : "#262629"
            : "#ffffff",
          pointerEvents: "none",

        }}
        animate={{
          width: visualWidth,
          height: visualHeight,
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
            color:
              hoverVariant === "dark"
                ? "#d9d9d6"
                : hoverVariant === "light"
                  ? "#262629"
                  : "#ffffff",
            fontSize: 14,
            fontWeight: 500,
            opacity: isHovering ? 1 : 0,
            transition:
              "opacity 0.18s ease-in-out, transform 0.18s ease-in-out",
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: 0.2,
          }}
        >
          View
        </span>
      </motion.div>
    </div>
  );
}
