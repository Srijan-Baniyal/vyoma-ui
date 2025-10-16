"use client";

import React, {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect,
  ReactNode,
  MouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

// -------------------- Types --------------------
interface MousePosition {
  x: number;
  y: number;
}

interface DockIconProps {
  icon: ReactNode;
}

// -------------------- Context --------------------
const MouseContext = createContext<MousePosition>({ x: 0, y: 0 });

// -------------------- SVG Icons --------------------
const GithubIcon: React.FC = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 
             3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 
             6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 
             5.07 0 0 0 19.91 1S18.73.65 16 
             2.48a13.38 13.38 0 0 0-7 0C6.27.65 
             5.09 1 5.09 1A5.07 5.07 0 0 0 5 
             4.77a5.44 5.44 0 0 0-1.5 3.78c0 
             5.42 3.3 6.61 6.44 7A3.37 3.37 
             0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 
             2 0 0 0-2-2 2 2 0 0 0-2 
             2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 
             8.26 8.502 11.24H16.17l-5.214-6.817L4.99 
             21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 
             6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 
             2v12c0 1.1-.9 2-2 2H4c-1.1 
             0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// -------------------- Dock Icon --------------------
const DockIcon: React.FC<DockIconProps> = ({ icon }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mouse = useContext(MouseContext);
  const distance: MotionValue<number> = useMotionValue(Infinity);

  useEffect(() => {
    if (!ref.current || mouse.x === 0) {
      distance.set(Infinity);
      return;
    }
    const iconRect = ref.current.getBoundingClientRect();
    const parent = ref.current.parentElement;
    if (!parent) return;
    const containerRect = parent.getBoundingClientRect();
    const iconCenterX = iconRect.left + iconRect.width / 2;
    const mouseXAbsolute = containerRect.left + mouse.x;
    distance.set(Math.abs(mouseXAbsolute - iconCenterX));
  }, [mouse, distance]);

  const width = useTransform(distance, [0, 100], [60, 48]);
  const springW = useSpring(width, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width: springW }}
      className="aspect-square rounded-full bg-neutral-700 grid place-items-center text-2xl cursor-pointer"
    >
      {icon}
    </motion.div>
  );
};

// -------------------- Main Dock --------------------
const MagneticDock: React.FC = () => {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { left } = currentTarget.getBoundingClientRect();
    setPos({ x: clientX - left, y: 0 });
  };

  const onMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <MouseContext.Provider value={pos}>
      <div className="flex min-h-screen w-full items-center justify-center bg-neutral-900 text-neutral-200">
        <div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="flex h-24 items-end gap-4 rounded-2xl bg-neutral-800/50 px-4 pb-4"
        >
          <DockIcon icon={<GithubIcon />} />
          <DockIcon icon={<LinkedinIcon />} />
          <DockIcon icon={<TwitterIcon />} />
          <DockIcon icon={<MailIcon />} />
        </div>
      </div>
    </MouseContext.Provider>
  );
};

export default MagneticDock;
