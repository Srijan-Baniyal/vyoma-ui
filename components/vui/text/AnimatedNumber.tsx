"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

interface CountdownProps {
  className?: string;
  compactPreview?: boolean;
  endDate: Date;
  startDate?: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function AnimatedNumberCountdown({
  endDate,
  startDate,
  className,
  compactPreview = false,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = startDate ? new Date(startDate) : new Date();
      const end = new Date(endDate);
      const difference = end.getTime() - start.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, startDate]);

  if (compactPreview) {
    return (
      <div className="flex h-full min-h-14 w-full items-center justify-center gap-1 p-1">
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-bold text-4xl text-foreground leading-none"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.days}
          />
        </div>
        <span className="mx-0.5 font-bold text-4xl text-muted-foreground">
          :
        </span>
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-bold text-4xl text-foreground leading-none"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.hours}
          />
        </div>
        <span className="font-bold text-3xl text-muted-foreground">:</span>
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-bold text-4xl text-foreground leading-none"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.minutes}
          />
        </div>
        <span className="font-bold text-3xl text-muted-foreground">:</span>
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-bold text-4xl text-foreground leading-none"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.seconds}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-auto w-full max-w-4xl px-4 ${className}`}>
      {/* Mobile Layout (< 640px) */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-3 dark:bg-card">
            <NumberFlow
              className="font-semibold text-2xl text-foreground tracking-tighter"
              format={{ minimumIntegerDigits: 2 }}
              value={timeLeft.days}
            />
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-3 dark:bg-card">
            <NumberFlow
              className="font-semibold text-2xl text-foreground tracking-tighter"
              format={{ minimumIntegerDigits: 2 }}
              value={timeLeft.hours}
            />
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-3 dark:bg-card">
            <NumberFlow
              className="font-semibold text-2xl text-foreground tracking-tighter"
              format={{ minimumIntegerDigits: 2 }}
              value={timeLeft.minutes}
            />
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-3 dark:bg-card">
            <NumberFlow
              className="font-semibold text-2xl text-foreground tracking-tighter"
              format={{ minimumIntegerDigits: 2 }}
              value={timeLeft.seconds}
            />
          </div>
        </div>
      </div>

      {/* Tablet Layout (640px - 1024px) */}
      <div className="hidden items-center justify-center gap-2 sm:flex lg:hidden">
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-semibold text-3xl text-foreground tracking-tighter"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.days}
          />
        </div>
        <div className="mx-1 font-bold text-muted-foreground text-xl">:</div>
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-semibold text-3xl text-foreground tracking-tighter"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.hours}
          />
        </div>
        <div className="mx-1 font-bold text-muted-foreground text-xl">:</div>
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-semibold text-3xl text-foreground tracking-tighter"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.minutes}
          />
        </div>
        <div className="mx-1 font-bold text-muted-foreground text-xl">:</div>
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-semibold text-3xl text-foreground tracking-tighter"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.seconds}
          />
        </div>
      </div>

      {/* Desktop Layout (>= 1024px) */}
      <div className="hidden items-center justify-center gap-4 lg:flex">
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-semibold text-5xl text-foreground tracking-tighter"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.days}
          />
        </div>
        <div className="font-bold text-2xl text-muted-foreground">:</div>
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-semibold text-5xl text-foreground tracking-tighter"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.hours}
          />
        </div>
        <div className="font-bold text-2xl text-muted-foreground">:</div>
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-semibold text-5xl text-foreground tracking-tighter"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.minutes}
          />
        </div>
        <div className="font-bold text-2xl text-muted-foreground">:</div>
        <div className="flex flex-col items-center">
          <NumberFlow
            className="font-semibold text-5xl text-foreground tracking-tighter"
            format={{ minimumIntegerDigits: 2 }}
            value={timeLeft.seconds}
          />
        </div>
      </div>
    </div>
  );
}

export function AnimatedNumberCountdownShowcase() {
  return (
    <div className="flex flex-col bg-background p-4">
      <AnimatedNumberCountdown
        className="my-4"
        compactPreview={true}
        endDate={new Date("2025-10-09")}
      />
    </div>
  );
}

export function AnimatedNumberCountdownTheme() {
  return (
    <AnimatedNumberCountdown
      className="my-4"
      compactPreview={true}
      endDate={new Date("2025-10-09")}
    />
  );
}
