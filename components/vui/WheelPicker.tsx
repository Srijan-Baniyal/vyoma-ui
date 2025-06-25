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

type FocusedPicker =
  | "hours"
  | "minutes"
  | "day"
  | "month"
  | "year"
  | "number"
  | null;

export function WheelPickerDemo() {
  const [focusedPicker, setFocusedPicker] = useState<FocusedPicker>(null);
  const [hourValue, setHourValue] = useState("0");
  const [minuteValue, setMinuteValue] = useState("0");
  const [inputBuffer, setInputBuffer] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);
  const inputTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Date picker states
  const [dayValue, setDayValue] = useState("1");
  const [monthValue, setMonthValue] = useState("1");
  const [yearValue, setYearValue] = useState("2024");

  // Number picker state
  const [numberValue, setNumberValue] = useState("0");

  // Function to get days in month
  const getDaysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  }, []);

  // Memoized options for performance
  const hourOptions_military = useMemo(() => createArray(24, 0), []);
  const minuteOptions = useMemo(() => createArray(60), []);
  const dayOptions = useMemo(() => {
    const month = parseInt(monthValue);
    const year = parseInt(yearValue);
    const daysInMonth = getDaysInMonth(month, year);
    return createArray(daysInMonth, 1);
  }, [monthValue, yearValue, getDaysInMonth]);
  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        label: new Date(2024, i, 1).toLocaleDateString("en", { month: "long" }),
        value: (i + 1).toString(),
      })),
    []
  );
  const yearOptions = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => {
        const year = 2000 + i;
        return { label: year.toString(), value: year.toString() };
      }),
    []
  );
  const numberOptions = useMemo(() => createArray(100, 0), []);

  // Adjust day value if it's invalid for the current month/year
  useEffect(() => {
    const month = parseInt(monthValue);
    const year = parseInt(yearValue);
    const daysInMonth = getDaysInMonth(month, year);
    const currentDay = parseInt(dayValue);
    
    if (currentDay > daysInMonth) {
      setDayValue(daysInMonth.toString());
    }
  }, [monthValue, yearValue, dayValue, getDaysInMonth]);

  // Formatted time display
  const formattedTime = useMemo(
    () => `${hourValue.padStart(2, "0")}:${minuteValue.padStart(2, "0")}`,
    [hourValue, minuteValue]
  );

  // Formatted date display
  const formattedDate = useMemo(() => {
    const monthName =
      monthOptions.find((m) => m.value === monthValue)?.label || "January";
    return `${dayValue.padStart(2, "0")} ${monthName} ${yearValue}`;
  }, [dayValue, monthValue, yearValue, monthOptions]);

  // Function to commit the buffered input
  const commitInput = useCallback(
    (buffer: string, pickerType: FocusedPicker) => {
      if (!buffer || !pickerType) return;

      const numValue = parseInt(buffer);

      switch (pickerType) {
        case "hours":
          if (numValue >= 0 && numValue <= 23) {
            setHourValue(numValue.toString());
          }
          break;
        case "minutes":
          if (numValue >= 0 && numValue <= 59) {
            setMinuteValue(numValue.toString());
          }
          break;
        case "day":
          if (numValue >= 1 && numValue <= 31) {
            setDayValue(numValue.toString());
          }
          break;
        case "month":
          if (numValue >= 1 && numValue <= 12) {
            setMonthValue(numValue.toString());
          }
          break;
        case "year":
          if (numValue >= 2000 && numValue <= 2049) {
            setYearValue(numValue.toString());
          }
          break;
        case "number":
          if (numValue >= 0 && numValue <= 99) {
            setNumberValue(numValue.toString());
          }
          break;
      }
      setInputBuffer("");
    },
    []
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      // Clear any existing timeout
      if (inputTimeoutRef.current) {
        clearTimeout(inputTimeoutRef.current);
        inputTimeoutRef.current = null;
      }

      // Focus controls for time picker
      if (key === "h") {
        commitInput(inputBuffer, focusedPicker);
        setFocusedPicker("hours");
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      if (key === "m") {
        commitInput(inputBuffer, focusedPicker);
        setFocusedPicker("minutes");
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      // Focus controls for date picker
      if (key === "d") {
        commitInput(inputBuffer, focusedPicker);
        setFocusedPicker("day");
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      if (key === "o") {
        // 'o' for month
        commitInput(inputBuffer, focusedPicker);
        setFocusedPicker("month");
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      if (key === "y") {
        commitInput(inputBuffer, focusedPicker);
        setFocusedPicker("year");
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      // Focus control for number picker
      if (key === "n") {
        commitInput(inputBuffer, focusedPicker);
        setFocusedPicker("number");
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
        setDayValue("1");
        setMonthValue("1");
        setYearValue("2024");
        setNumberValue("0");
        setFocusedPicker(null);
        setInputBuffer("");
        event.preventDefault();
        return;
      }

      // Number input
      if (/[0-9]/.test(key) && focusedPicker) {
        event.preventDefault();

        const newBuffer = (inputBuffer + key).slice(-4); // Keep only last 4 digits for year
        setInputBuffer(newBuffer);

        // Set a timeout to commit the input after 400ms of no typing (faster response)
        inputTimeoutRef.current = setTimeout(() => {
          commitInput(newBuffer, focusedPicker);
        }, 400);

        // Also check if we should commit immediately for certain cases
        const numValue = parseInt(newBuffer);

        // Immediate commit conditions
        let shouldCommitImmediately = false;

        if (focusedPicker === "hours" && newBuffer.length === 2) {
          // For hours, commit if we have 2 digits
          shouldCommitImmediately = true;
        } else if (focusedPicker === "minutes" && newBuffer.length === 2) {
          // For minutes, commit if we have 2 digits
          shouldCommitImmediately = true;
        } else if (focusedPicker === "day" && newBuffer.length === 2) {
          // For day, commit if we have 2 digits
          shouldCommitImmediately = true;
        } else if (focusedPicker === "month" && newBuffer.length === 2) {
          // For month, commit if we have 2 digits
          shouldCommitImmediately = true;
        } else if (focusedPicker === "year" && newBuffer.length === 4) {
          // For year, commit if we have 4 digits
          shouldCommitImmediately = true;
        } else if (focusedPicker === "number" && newBuffer.length === 2) {
          // For number, commit if we have 2 digits
          shouldCommitImmediately = true;
        }

        // Also commit immediately if the next digit would make it invalid
        if (focusedPicker === "hours" && numValue > 2) {
          // If first digit is >2, commit immediately (can't have >29)
          shouldCommitImmediately = true;
        } else if (focusedPicker === "minutes" && numValue > 5) {
          // If first digit is >5, commit immediately (can't have >59)
          shouldCommitImmediately = true;
        } else if (focusedPicker === "day" && numValue > 3) {
          // If first digit is >3, commit immediately (can't have >31)
          shouldCommitImmediately = true;
        } else if (focusedPicker === "month" && numValue > 1) {
          // If first digit is >1, commit immediately (can't have >12)
          shouldCommitImmediately = true;
        }

        if (shouldCommitImmediately) {
          if (inputTimeoutRef.current) {
            clearTimeout(inputTimeoutRef.current);
            inputTimeoutRef.current = null;
          }
          commitInput(newBuffer, focusedPicker);
        }
      }

      // Enter to cycle through pickers
      if (key === "enter") {
        commitInput(inputBuffer, focusedPicker);
        const pickerCycle = [
          "hours",
          "minutes",
          "day",
          "month",
          "year",
          "number",
        ];
        const currentIndex = pickerCycle.indexOf(focusedPicker as string);
        const nextIndex = (currentIndex + 1) % pickerCycle.length;
        setFocusedPicker(pickerCycle[nextIndex] as FocusedPicker);
        setInputBuffer("");
        event.preventDefault();
      }
    },
    [focusedPicker, inputBuffer, commitInput]
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
    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
      // Clean up timeout on unmount
      if (inputTimeoutRef.current) {
        clearTimeout(inputTimeoutRef.current);
      }
    };
  }, [handleKeyDown]);

  // Auto-focus the component
  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              WheelPicker Component
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Smooth, intuitive wheel pickers with comprehensive keyboard
              navigation
            </p>
          </div>

          {/* Main Time Picker Demo */}
          <div className="bg-card border rounded-lg p-8 shadow-sm">
            <div className="flex justify-center">
              <div
                ref={componentRef}
                className="w-full max-w-md focus:outline-none"
                tabIndex={0}
                role="application"
                aria-label="Time picker with keyboard navigation"
              >
                {/* Current Time Display */}
                <div className="mb-8 text-center space-y-4">
                  <div className="text-3xl font-mono font-bold text-foreground transition-all duration-200 ease-out transform hover:scale-105">
                    {formattedTime}
                  </div>

                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setFocusedPicker("hours")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        focusedPicker === "hours"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      Hours (H)
                    </button>
                    <button
                      onClick={() => setFocusedPicker("minutes")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        focusedPicker === "minutes"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      Minutes (M)
                    </button>
                  </div>
                </div>

                {/* Time Wheel Picker */}
                <div className="flex justify-center">
                  <WheelPickerWrapper className="w-auto">
                    <WheelPicker
                      options={hourOptions_military}
                      infinite
                      value={hourValue}
                      onValueChange={setHourValue}
                      classNames={{
                        highlightWrapper:
                          focusedPicker === "hours"
                            ? "bg-primary text-primary-foreground border-primary transition-all duration-150 ease-out animate-pulse"
                            : "bg-muted text-foreground border-border transition-all duration-150 ease-out",
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
                            ? "bg-primary text-primary-foreground border-primary transition-all duration-150 ease-out animate-pulse"
                            : "bg-muted text-foreground border-border transition-all duration-150 ease-out",
                      }}
                    />
                  </WheelPickerWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Picker Variations */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Picker Variations</h2>
            <p className="text-muted-foreground">
              Different types of wheel pickers with keyboard shortcuts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Picker */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Date Picker</h3>
                <p className="text-sm text-muted-foreground">
                  Select day, month, and year
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Press D, O, Y for day/month/year
                </p>
              </div>

              <div className="text-center mb-4">
                <div className="text-lg font-semibold text-foreground mb-2 transition-all duration-200 ease-out transform hover:scale-105">
                  {formattedDate}
                </div>
              </div>  
              <div className="flex justify-center">
                <WheelPickerWrapper className="w-auto">
                  <WheelPicker
                    options={dayOptions}
                    infinite
                    value={dayValue}
                    onValueChange={setDayValue}
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "day"
                          ? "bg-blue-500 text-white border-blue-500 transition-all duration-150 ease-out animate-pulse"
                          : "bg-muted text-foreground border-border transition-all duration-150 ease-out",
                    }}
                  />
                  <WheelPicker
                    options={monthOptions}
                    infinite
                    value={monthValue}
                    onValueChange={setMonthValue}
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "month"
                          ? "bg-blue-500 text-white border-blue-500 transition-all duration-150 ease-out animate-pulse"
                          : "bg-muted text-foreground border-border transition-all duration-150 ease-out",
                    }}
                  />
                  <WheelPicker
                    options={yearOptions}
                    infinite
                    value={yearValue}
                    onValueChange={setYearValue}
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "year"
                          ? "bg-blue-500 text-white border-blue-500 transition-all duration-150 ease-out animate-pulse"
                          : "bg-muted text-foreground border-border transition-all duration-150 ease-out",
                    }}
                  />
                </WheelPickerWrapper>
              </div>
            </div>

            {/* Number Picker */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Number Picker</h3>
                <p className="text-sm text-muted-foreground">
                  Simple number selection
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Press N for number selection
                </p>
              </div>

              <div className="text-center mb-4">
                <div className="text-lg font-semibold text-foreground transition-all duration-200 ease-out transform hover:scale-105">
                  Selected: {numberValue}
                </div>
              </div>

              <div className="flex justify-center">
                <WheelPickerWrapper className="w-auto">
                  <WheelPicker
                    options={numberOptions}
                    infinite
                    value={numberValue}
                    onValueChange={setNumberValue}
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "number"
                          ? "bg-green-500 text-white border-green-500 transition-all duration-150 ease-out animate-pulse"
                          : "bg-muted text-foreground border-border transition-all duration-150 ease-out",
                    }}
                  />
                </WheelPickerWrapper>
              </div>
            </div>

            {/* Hour Picker (Styled) */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Hour Picker</h3>
                <p className="text-sm text-muted-foreground">
                  24-hour format selection
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  Uses same hour picker (H)
                </p>
              </div>

              <div className="text-center mb-4">
                <div className="text-lg font-semibold text-foreground transition-all duration-200 ease-out transform hover:scale-105">
                  Hour: {hourValue.padStart(2, "0")}
                </div>
              </div>

              <div className="flex justify-center">
                <WheelPickerWrapper className="w-auto">
                  <WheelPicker
                    options={hourOptions_military}
                    infinite
                    value={hourValue}
                    onValueChange={setHourValue}
                    classNames={{
                      highlightWrapper:
                        "bg-purple-500 text-white border-purple-500 transition-all duration-150 ease-out animate-pulse",
                    }}
                  />
                </WheelPickerWrapper>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Controls */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Keyboard Navigation</h2>
            <p className="text-muted-foreground">
              Enhanced accessibility with shortcuts for all picker types
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  H
                </kbd>
                <span className="text-sm text-muted-foreground">Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  M
                </kbd>
                <span className="text-sm text-muted-foreground">Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  D
                </kbd>
                <span className="text-sm text-muted-foreground">Day</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  O
                </kbd>
                <span className="text-sm text-muted-foreground">Month</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  Y
                </kbd>
                <span className="text-sm text-muted-foreground">Year</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  N
                </kbd>
                <span className="text-sm text-muted-foreground">Number</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  0-9
                </kbd>
                <span className="text-sm text-muted-foreground">Type</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  ↵
                </kbd>
                <span className="text-sm text-muted-foreground">Cycle</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  Esc
                </kbd>
                <span className="text-sm text-muted-foreground">Clear</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted border rounded">
                  C
                </kbd>
                <span className="text-sm text-muted-foreground">Reset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
