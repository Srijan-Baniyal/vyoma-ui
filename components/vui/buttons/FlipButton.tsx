"use client";

import {
  type HTMLMotionProps,
  motion,
  type Transition,
  type Variant,
} from "motion/react";
import { cn } from "@/lib/utils";

type FlipDirection = "top" | "bottom" | "left" | "right";

type FlipButtonProps = HTMLMotionProps<"button"> & {
  frontText: string;
  backText: string;
  transition?: Transition;
  frontClassName?: string;
  backClassName?: string;
  from?: FlipDirection;
};

const DEFAULT_SPAN_CLASS_NAME =
  "absolute inset-0 flex items-center justify-center rounded-lg";

function FlipButton({
  frontText,
  backText,
  transition = { type: "spring", stiffness: 280, damping: 20 },
  className,
  frontClassName,
  backClassName,
  from = "top",
  ...props
}: FlipButtonProps) {
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";

  const frontOffset = from === "top" || from === "left" ? "50%" : "-50%";
  const backOffset = from === "top" || from === "left" ? "-50%" : "50%";

  const buildVariant = (
    opacity: number,
    rotation: number,
    offset: string | null = null
  ): Variant => ({
    opacity,
    [rotateAxis]: rotation,
    ...(isVertical && offset !== null ? { y: offset } : {}),
    ...(!isVertical && offset !== null ? { x: offset } : {}),
  });

  const frontVariants = {
    initial: buildVariant(1, 0, "0%"),
    hover: buildVariant(0, 90, frontOffset),
  };

  const backVariants = {
    initial: buildVariant(0, 90, backOffset),
    hover: buildVariant(1, 0, "0%"),
  };

  return (
    <motion.button
      className={cn(
        "perspective-[1000px] relative inline-block h-10 cursor-pointer px-4 py-2 font-medium text-sm focus:outline-none",
        className
      )}
      data-slot="flip-button"
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.span
        className={cn(
          DEFAULT_SPAN_CLASS_NAME,
          "bg-muted text-black dark:text-white",
          frontClassName
        )}
        data-slot="flip-button-front"
        transition={transition}
        variants={frontVariants}
      >
        {frontText}
      </motion.span>
      <motion.span
        className={cn(
          DEFAULT_SPAN_CLASS_NAME,
          "bg-primary text-primary-foreground",
          backClassName
        )}
        data-slot="flip-button-back"
        transition={transition}
        variants={backVariants}
      >
        {backText}
      </motion.span>
      <span className="invisible">{frontText}</span>
    </motion.button>
  );
}

export { FlipButton, type FlipButtonProps, type FlipDirection };
