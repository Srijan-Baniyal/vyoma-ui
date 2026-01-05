"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import VyomaUI from "@/public/VyomaUI.svg";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      className={cn("sticky inset-x-0 top-5 z-50 w-full", className)}
      ref={ref}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        boxShadow: visible
          ? "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)"
          : "blur(0px)",
        width: visible ? "45%" : "100%",
        height: visible ? "100%" : "100%",
        y: visible ? 12 : 0,
        scale: visible ? 0.98 : 1,
      }}
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-7xl items-center px-6 py-3 lg:grid lg:grid-cols-3",
        visible
          ? "rounded-2xl border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-black/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          : "border-0",
        className
      )}
      style={{
        minWidth: "800px",
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
        mass: 0.8,
      }}
    >
      <div className="flex justify-start">
        {React.Children.toArray(children)[0]}
      </div>
      <div className="flex justify-center">
        {React.Children.toArray(children)[1]}
      </div>
      <div className="flex justify-end">
        {React.Children.toArray(children)[2]}
      </div>
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      className={cn(
        "hidden flex-row items-center justify-center space-x-1 font-medium text-sm lg:flex",
        className
      )}
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item, idx) => (
        <motion.a
          className="relative px-4 py-2.5 text-neutral-700 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          href={item.link}
          key={item.name}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
          target={item.link.startsWith("http") ? "_blank" : undefined}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          {hovered === idx && (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 h-full w-full rounded-xl bg-white/20 backdrop-blur-sm dark:bg-white/10"
              exit={{ opacity: 0, scale: 0.8 }}
              initial={{ opacity: 0, scale: 0.8 }}
              layoutId="hovered"
              transition={{ duration: 0.15 }}
            />
          )}
          <span className="relative z-20 font-medium">{item.name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        boxShadow: visible
          ? "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)"
          : "none",
        width: visible ? "95%" : "100%",
        height: visible ? "100%" : "100%",
        paddingRight: visible ? "16px" : "12px",
        paddingLeft: visible ? "16px" : "12px",
        borderRadius: visible ? "16px" : "0px",
        y: visible ? 16 : 0,
        scale: visible ? 0.98 : 0.98,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between py-3 lg:hidden",
        visible
          ? "border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-black/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          : "border-0",
        className
      )}
      style={{
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
        mass: 0.8,
      }}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <motion.div
          animate={{
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.02)",
            width: "95%",
            height: "100%",
            paddingRight: "16px",
            paddingLeft: "12px",
            borderRadius: "16px",
            scale: 0.98,
          }}
          className={cn(
            "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between py-3 lg:hidden",
            "border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-black/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
            className
          )}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 40,
            mass: 0.8,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 backdrop-blur-sm transition-colors hover:bg-white/10 dark:border-white/10 dark:hover:bg-white/5"
      onClick={onClick}
      transition={{ duration: 0.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            initial={{ rotate: -90, opacity: 0 }}
            key="close"
            transition={{ duration: 0.15 }}
          >
            <IconX className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            initial={{ rotate: 90, opacity: 0 }}
            key="menu"
            transition={{ duration: 0.15 }}
          >
            <IconMenu2 className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const NavbarLogo = () => {
  return (
    <motion.a
      className="relative z-20 flex items-center space-x-3 px-2 py-1 font-normal text-sm"
      href="/"
      transition={{ duration: 0.15 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="flex items-center justify-center"
        transition={{ duration: 0.2 }}
        whileHover={{ rotate: 5 }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg shadow-lg">
          <Image
            alt="Vyoma UI"
            height={40}
            priority
            quality={100}
            src={VyomaUI}
            width={40}
          />
        </div>
      </motion.div>
      <span className="font-semibold text-lg text-neutral-800 dark:text-white">
        Vyoma UI
      </span>
    </motion.a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient" | "glass";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-xl text-sm font-semibold relative cursor-pointer transition-all duration-200 inline-flex items-center justify-center backdrop-blur-sm";

  const variantStyles = {
    primary:
      "bg-white/90 text-neutral-900 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 border border-white/20 dark:bg-white/10 dark:text-white dark:border-white/10",
    secondary:
      "bg-white/10 text-neutral-700 hover:bg-white/20 dark:text-neutral-300 dark:hover:bg-white/10 border border-white/20 dark:border-white/10",
    dark: "bg-black/80 text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 border border-black/20 dark:border-white/10",
    gradient:
      "bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_24px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 border border-blue-400/20",
    glass:
      "bg-white/10 text-neutral-700 dark:text-neutral-300 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10",
  };

  return (
    <motion.div
      transition={{ duration: 0.15 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Tag
        className={cn(baseStyles, variantStyles[variant], className)}
        href={href || undefined}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  );
};
