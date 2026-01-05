"use client";

import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type React from "react";
import {
  createContext,
  type MouseEvent,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
    fill="none"
    height="28"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="28"
  >
    <title>GitHub</title>
    <path
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37
             3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54
             6.44-7A5.44 5.44 0 0 0 20 4.77 5.07
             5.07 0 0 0 19.91 1S18.73.65 16
             2.48a13.38 13.38 0 0 0-7 0C6.27.65
             5.09 1 5.09 1A5.07 5.07 0 0 0 5
             4.77a5.44 5.44 0 0 0-1.5 3.78c0
             5.42 3.3 6.61 6.44 7A3.37 3.37
             0 0 0 9 18.13V22"
    />
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg
    fill="none"
    height="26"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="26"
  >
    <title>LinkedIn</title>
    <path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2
             2 0 0 0-2-2 2 2 0 0 0-2
             2v7h-4v-7a6 6 0 0 1 6-6z"
    />
    <rect height="12" width="4" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28">
    <title>Twitter</title>
    <path
      d="M18.244 2.25h3.308l-7.227
             8.26 8.502 11.24H16.17l-5.214-6.817L4.99
             21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713
             6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg
    fill="none"
    height="28"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="28"
  >
    <title>Email</title>
    <path
      d="M4 4h16c1.1 0 2 .9 2
             2v12c0 1.1-.9 2-2 2H4c-1.1
             0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// -------------------- Dock Icon --------------------
const DockIcon: React.FC<DockIconProps> = ({ icon }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mouse = useContext(MouseContext);
  const distance: MotionValue<number> = useMotionValue(
    Number.POSITIVE_INFINITY
  );

  useEffect(() => {
    if (!ref.current || mouse.x === 0) {
      distance.set(Number.POSITIVE_INFINITY);
      return;
    }
    const iconRect = ref.current.getBoundingClientRect();
    const parent = ref.current.parentElement;
    if (!parent) {
      return;
    }
    const containerRect = parent.getBoundingClientRect();
    const iconCenterX = iconRect.left + iconRect.width / 2;
    const mouseXAbsolute = containerRect.left + mouse.x;
    distance.set(Math.abs(mouseXAbsolute - iconCenterX));
  }, [mouse, distance]);

  const width = useTransform(distance, [0, 100], [60, 48]);
  const springW = useSpring(width, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      className="grid aspect-square cursor-pointer place-items-center rounded-full bg-neutral-700 text-2xl"
      ref={ref}
      style={{ width: springW }}
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
          aria-label="Magnetic dock navigation"
          className="flex h-24 items-end gap-4 rounded-2xl bg-neutral-800/50 px-4 pb-4"
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          role="toolbar"
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
