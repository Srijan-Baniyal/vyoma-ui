"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { WheelPickerOption } from "@/components/WheelBase";
import { WheelPicker, WheelPickerWrapper } from "@/components/WheelBase";

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value.toString(),
    };
  });

type FocusedPicker = "hours" | "minutes" | null;

export function WheelPickerDemo() {
  const [focusedPicker, setFocusedPicker] = useState<FocusedPicker>(null);
  const [hourValue, setHourValue] = useState("0");
  const [minuteValue, setMinuteValue] = useState("0");
  const [inputBuffer, setInputBuffer] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);

  // Memoized options for performance
  const hourOptions_military = useMemo(() => createArray(24, 0), []);
  const minuteOptions = useMemo(() => createArray(60), []);

  // Formatted time display
  const formattedTime = useMemo(
    () => `${hourValue.padStart(2, "0")}:${minuteValue.padStart(2, "0")}`,
    [hourValue, minuteValue]
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      // Focus controls
      if (key === "h") {
        setFocusedPicker("hours");
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      if (key === "m") {
        setFocusedPicker("minutes");
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      // Escape to clear focus
      if (key === "escape") {
        setFocusedPicker(null);
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      // Clear everything with C
      if (key === "c") {
        setHourValue("0");
        setMinuteValue("0");
        setFocusedPicker(null);
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      // Number input
      if (/[0-9]/.test(key) && focusedPicker) {
        event.preventDefault();

        const newBuffer = (inputBuffer + key).slice(-2); // Keep only last 2 digits
        setInputBuffer(newBuffer);

        if (focusedPicker === "hours") {
          const numValue = parseInt(newBuffer);
          if (numValue >= 0 && numValue <= 23) {
            setHourValue(numValue.toString());
          }
        } else if (focusedPicker === "minutes") {
          const numValue = parseInt(newBuffer);
          if (numValue >= 0 && numValue <= 59) {
            setMinuteValue(numValue.toString());
          }
        }
      }

      // Enter to move to next picker (cycle between hours and minutes)
      if (key === "enter") {
        if (focusedPicker === "hours") {
          setFocusedPicker("minutes");
        } else if (focusedPicker === "minutes") {
          setFocusedPicker("hours");
        } else {
          setFocusedPicker("hours");
        }
        setInputBuffer("");
        event.preventDefault();
      }
    },
    [focusedPicker, inputBuffer]
  );

  // Add keyboard event listeners
  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      // Only handle if component is focused or no other input is focused
      if (
        componentRef.current &&
        (componentRef.current.contains(document.activeElement) ||
          document.activeElement === document.body)
      ) {
        handleKeyDown(event);
      }
    };

    document.addEventListener("keydown", handleKeyDownEvent);
    return () => document.removeEventListener("keydown", handleKeyDownEvent);
  }, [handleKeyDown]);

  // Auto-focus the component
  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={componentRef}
      className="w-64 focus:outline-none group"
      tabIndex={0}
      role="application"
      aria-label="Time picker with keyboard navigation"
    >
      {/* Instructions */}
      <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 space-y-3 opacity-90 group-focus:opacity-100 transition-opacity duration-300">
        <div className="font-semibold text-zinc-700 dark:text-zinc-300 mb-4 text-base">
          Keyboard Controls
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          <div className="flex items-center gap-3">
            <kbd className="px-2.5 py-1.5 text-xs font-mono bg-gradient-to-b from-zinc-700 to-zinc-800 text-zinc-100 rounded-md shadow-sm border border-zinc-600 min-w-[32px] text-center">
              H
            </kbd>
            <span className="text-zinc-600 dark:text-zinc-400">
              Select hours
            </span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-2.5 py-1.5 text-xs font-mono bg-gradient-to-b from-zinc-700 to-zinc-800 text-zinc-100 rounded-md shadow-sm border border-zinc-600 min-w-[32px] text-center">
              M
            </kbd>
            <span className="text-zinc-600 dark:text-zinc-400">
              Select minutes
            </span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-2.5 py-1.5 text-xs font-mono bg-gradient-to-b from-zinc-700 to-zinc-800 text-zinc-100 rounded-md shadow-sm border border-zinc-600 min-w-[32px] text-center">
              0-9
            </kbd>
            <span className="text-zinc-600 dark:text-zinc-400">
              Type numbers
            </span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-2.5 py-1.5 text-xs font-mono bg-gradient-to-b from-zinc-700 to-zinc-800 text-zinc-100 rounded-md shadow-sm border border-zinc-600 min-w-[32px] text-center">
              ↵
            </kbd>
            <span className="text-zinc-600 dark:text-zinc-400">Next field</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-2.5 py-1.5 text-xs font-mono bg-gradient-to-b from-zinc-700 to-zinc-800 text-zinc-100 rounded-md shadow-sm border border-zinc-600 min-w-[32px] text-center">
              Esc
            </kbd>
            <span className="text-zinc-600 dark:text-zinc-400">
              Clear selection
            </span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-2.5 py-1.5 text-xs font-mono bg-gradient-to-b from-zinc-700 to-zinc-800 text-zinc-100 rounded-md shadow-sm border border-zinc-600 min-w-[32px] text-center">
              C
            </kbd>
            <span className="text-zinc-600 dark:text-zinc-400">Clear all</span>
          </div>
        </div>
      </div>

      {/* Current Time Display */}
      <div className="mb-8 text-center">
        <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-wider font-mono transition-all duration-300 transform hover:scale-105">
          {formattedTime}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setFocusedPicker("hours")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              focusedPicker === "hours"
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                : "text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            Hours{" "}
            {focusedPicker === "hours" && inputBuffer && (
              <span className="ml-1 opacity-75 animate-pulse">
                ({inputBuffer})
              </span>
            )}
          </button>
          <button
            onClick={() => setFocusedPicker("minutes")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              focusedPicker === "minutes"
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                : "text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            Minutes{" "}
            {focusedPicker === "minutes" && inputBuffer && (
              <span className="ml-1 opacity-75 animate-pulse">
                ({inputBuffer})
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Wheel Picker */}
      <div className="transform transition-all duration-500 hover:scale-[1.02]">
        <WheelPickerWrapper>
          <WheelPicker
            options={hourOptions_military}
            infinite
            value={hourValue}
            onValueChange={setHourValue}
            classNames={{
              highlightWrapper:
                focusedPicker === "hours"
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 border-2 border-blue-400 dark:from-blue-950 dark:to-blue-900 dark:text-blue-100 dark:border-blue-600 shadow-xl shadow-blue-500/25 transform scale-105 transition-all duration-300"
                  : "border border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200",
            }}
          />
          <WheelPicker
            options={minuteOptions}
            infinite
            value={minuteValue}
            onValueChange={setMinuteValue}
            classNames={{
              highlightWrapper:
                focusedPicker === "minutes"
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 border-2 border-blue-400 dark:from-blue-950 dark:to-blue-900 dark:text-blue-100 dark:border-blue-600 shadow-xl shadow-blue-500/25 transform scale-105 transition-all duration-300"
                  : "border border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200",
            }}
          />
        </WheelPickerWrapper>
      </div>
    </div>
  );
}
