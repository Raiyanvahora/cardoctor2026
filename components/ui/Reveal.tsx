"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger helper — seconds to wait before this element animates. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: "bottom" | "left" | "right";
  className?: string;
  as?: "div" | "li" | "article" | "section";
}

const offsets = {
  bottom: { x: 0, y: 24 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
};

/**
 * Subtle scroll-triggered fade and rise.
 *
 * When the reader has asked for reduced motion, the element renders in its
 * final state immediately with no transform and no transition.
 */
export function Reveal({
  children,
  delay = 0,
  from = "bottom",
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const offset = offsets[from];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
