"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { WheelPickerOption } from "@/components/WheelBase";
import { WheelPicker, WheelPickerWrapper } from "@/components/WheelBase";

const DIGIT_REGEX = /[0-9]/;

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

  // Date picker states
  const [dayValue, setDayValue] = useState("1");
  const [monthValue, setMonthValue] = useState("1");
  const [yearValue, setYearValue] = useState("2024");

  // Number picker state
  const [numberValue, setNumberValue] = useState("0");

  // Memoized options for performance
  const hourOptions_military = useMemo(() => createArray(24, 0), []);
  const minuteOptions = useMemo(() => createArray(60), []);
  const dayOptions = useMemo(() => createArray(31, 1), []);
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

  // Helper functions for keyboard handling
  const handleFocusKey = useCallback(
    (picker: FocusedPicker, event: KeyboardEvent) => {
      setFocusedPicker(picker);
      setInputBuffer("");
      event.preventDefault();
    },
    []
  );

  const handleClearAll = useCallback((event: KeyboardEvent) => {
    setHourValue("0");
    setMinuteValue("0");
    setDayValue("1");
    setMonthValue("1");
    setYearValue("2024");
    setNumberValue("0");
    setFocusedPicker(null);
    setInputBuffer("");
    event.preventDefault();
  }, []);

  const updateHours = useCallback((numValue: number, bufferLength: number) => {
    if (numValue >= 0 && numValue <= 23) {
      setHourValue(numValue.toString());
      if (bufferLength === 2 || numValue > 2) {
        setInputBuffer("");
      }
    }
  }, []);

  const updateMinutes = useCallback(
    (numValue: number, bufferLength: number) => {
      if (numValue >= 0 && numValue <= 59) {
        setMinuteValue(numValue.toString());
        if (bufferLength === 2 || numValue > 5) {
          setInputBuffer("");
        }
      }
    },
    []
  );

  const updateDay = useCallback((numValue: number) => {
    if (numValue >= 1 && numValue <= 31) {
      setDayValue(numValue.toString());
      setInputBuffer("");
    }
  }, []);

  const updateMonth = useCallback((numValue: number) => {
    if (numValue >= 1 && numValue <= 12) {
      setMonthValue(numValue.toString());
      setInputBuffer("");
    }
  }, []);

  const updateYear = useCallback((numValue: number) => {
    if (numValue >= 2000 && numValue <= 2049) {
      setYearValue(numValue.toString());
      setInputBuffer("");
    }
  }, []);

  const updateNumber = useCallback((numValue: number) => {
    if (numValue >= 0 && numValue <= 99) {
      setNumberValue(numValue.toString());
      setInputBuffer("");
    }
  }, []);

  const handleDigitInput = useCallback(
    (newBuffer: string, picker: FocusedPicker) => {
      const numValue = Number.parseInt(newBuffer, 10);

      switch (picker) {
        case "hours":
          updateHours(numValue, newBuffer.length);
          break;
        case "minutes":
          updateMinutes(numValue, newBuffer.length);
          break;
        case "day":
          updateDay(numValue);
          break;
        case "month":
          updateMonth(numValue);
          break;
        case "year":
          updateYear(numValue);
          break;
        case "number":
          updateNumber(numValue);
          break;
        default:
          break;
      }
    },
    [
      updateHours,
      updateMinutes,
      updateDay,
      updateMonth,
      updateYear,
      updateNumber,
    ]
  );

  const handleCyclePickers = useCallback(
    (event: KeyboardEvent) => {
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
    },
    [focusedPicker]
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const focusKeyMap: Record<string, FocusedPicker> = {
        h: "hours",
        m: "minutes",
        d: "day",
        o: "month",
        y: "year",
        n: "number",
      };

      // Focus controls
      if (focusKeyMap[key]) {
        handleFocusKey(focusKeyMap[key], event);
        return;
      }

      // Clear and escape controls
      if (key === "escape") {
        handleFocusKey(null, event);
        return;
      }
      if (key === "c") {
        handleClearAll(event);
        return;
      }

      // Number input
      if (DIGIT_REGEX.test(key) && focusedPicker) {
        event.preventDefault();
        const maxLen = 2;
        const newBuffer = (inputBuffer + key).slice(-maxLen);
        setInputBuffer(newBuffer);
        handleDigitInput(newBuffer, focusedPicker);
        return;
      }

      // Enter to cycle through pickers
      if (key === "enter") {
        handleCyclePickers(event);
      }
    },
    [
      focusedPicker,
      inputBuffer,
      handleFocusKey,
      handleClearAll,
      handleDigitInput,
      handleCyclePickers,
    ]
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
    <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background p-8">
      <div className="mx-auto max-w-7xl space-y-16">
        <div className="space-y-6 text-center">
          <div className="relative rounded-3xl border border-border/50 bg-card/30 p-8 shadow-2xl backdrop-blur-sm">
            <div className="flex justify-center">
              <div
                aria-label="Time picker with keyboard navigation"
                className="group w-72 focus:outline-none"
                ref={componentRef}
                role="application"
              >
                {/* Current Time Display */}
                <div className="mb-8 text-center">
                  <div className="mb-4 transform font-bold font-mono text-4xl text-foreground tracking-wider transition-all duration-300 hover:scale-105">
                    {formattedTime}
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      className={`transform rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        focusedPicker === "hours"
                          ? "scale-105 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "border border-border text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                      }`}
                      onClick={() => setFocusedPicker("hours")}
                      type="button"
                    >
                      Hours (H)
                    </button>
                    <button
                      className={`transform rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        focusedPicker === "minutes"
                          ? "scale-105 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "border border-border text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                      }`}
                      onClick={() => setFocusedPicker("minutes")}
                      type="button"
                    >
                      Minutes (M)
                    </button>
                  </div>
                </div>

                {/* Wheel Picker */}
                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <WheelPickerWrapper>
                    <WheelPicker
                      classNames={{
                        highlightWrapper:
                          focusedPicker === "hours"
                            ? "bg-linear-to-br from-primary/20 to-primary/30 text-primary border-2 border-primary shadow-xl shadow-primary/25 transform scale-105 transition-all duration-300"
                            : "border border-border text-foreground hover:border-primary/50 transition-all duration-200",
                      }}
                      infinite
                      onValueChange={(value) => setHourValue(value.toString())}
                      options={hourOptions_military}
                      value={hourValue}
                    />
                    <WheelPicker
                      classNames={{
                        highlightWrapper:
                          focusedPicker === "minutes"
                            ? "bg-gradient-to-br from-primary/20 to-primary/30 text-primary border-2 border-primary shadow-xl shadow-primary/25 transform scale-105 transition-all duration-300"
                            : "border border-border text-foreground hover:border-primary/50 transition-all duration-200",
                      }}
                      infinite
                      onValueChange={(value) =>
                        setMinuteValue(value.toString())
                      }
                      options={minuteOptions}
                      value={minuteValue}
                    />
                  </WheelPickerWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Picker Variations */}
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <h2 className="font-bold text-3xl">Picker Variations</h2>
            <p className="text-muted-foreground">
              Different types of wheel pickers with keyboard shortcuts
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Date Picker */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-blue-700 text-xl dark:text-blue-300">
                  Date Picker
                </h3>
                <p className="text-muted-foreground text-sm">
                  Select day, month, and year
                </p>
                <p className="text-blue-600 text-xs dark:text-blue-400">
                  Press D, O, Y for day/month/year
                </p>
                <p className="mt-1 text-blue-500 text-xs dark:text-blue-500">
                  Type 1=Jan, 2=Feb, 3=Mar, etc.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-200/30 bg-linear-to-br from-blue-50/30 to-blue-100/20 p-6 dark:border-blue-800/20 dark:from-blue-950/20 dark:to-blue-900/10">
                <div className="mb-4 text-center">
                  <div className="mb-2 font-semibold text-blue-700 text-lg dark:text-blue-300">
                    {formattedDate}
                  </div>
                  <div className="text-blue-600 text-xs opacity-75 dark:text-blue-400">
                    Month {monthValue} ={" "}
                    {monthOptions.find((m) => m.value === monthValue)?.label}
                  </div>
                </div>
                <WheelPickerWrapper>
                  <WheelPicker
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "day"
                          ? "bg-gradient-to-br from-blue-200/50 to-blue-300/30 dark:from-blue-800/50 dark:to-blue-700/30 border-2 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-200 shadow-lg shadow-blue-500/25 transform scale-105 transition-all duration-300"
                          : "border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200",
                    }}
                    infinite
                    onValueChange={(value) => setDayValue(value.toString())}
                    options={dayOptions}
                    value={dayValue}
                  />
                  <WheelPicker
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "month"
                          ? "bg-gradient-to-br from-blue-200/50 to-blue-300/30 dark:from-blue-800/50 dark:to-blue-700/30 border-2 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-200 shadow-lg shadow-blue-500/25 transform scale-105 transition-all duration-300"
                          : "border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200",
                    }}
                    infinite
                    onValueChange={(value) => setMonthValue(value.toString())}
                    options={monthOptions}
                    value={monthValue}
                  />
                  <WheelPicker
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "year"
                          ? "bg-gradient-to-br from-blue-200/50 to-blue-300/30 dark:from-blue-800/50 dark:to-blue-700/30 border-2 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-200 shadow-lg shadow-blue-500/25 transform scale-105 transition-all duration-300"
                          : "border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200",
                    }}
                    infinite
                    onValueChange={(value) => setYearValue(value.toString())}
                    options={yearOptions}
                    value={yearValue}
                  />
                </WheelPickerWrapper>
              </div>
            </div>

            {/* Number Picker */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-green-700 text-xl dark:text-green-300">
                  Number Picker
                </h3>
                <p className="text-muted-foreground text-sm">
                  Simple number selection
                </p>
                <p className="text-green-600 text-xs dark:text-green-400">
                  Press N for number selection
                </p>
              </div>
              <div className="rounded-2xl border border-green-200/30 bg-linear-to-br from-green-50/30 to-emerald-100/20 p-6 dark:border-green-800/20 dark:from-green-950/20 dark:to-emerald-900/10">
                <div className="mb-4 text-center">
                  <div className="mb-2 font-semibold text-green-700 text-lg dark:text-green-300">
                    Selected: {numberValue}
                  </div>
                </div>
                <WheelPickerWrapper>
                  <WheelPicker
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "number"
                          ? "bg-gradient-to-br from-green-200/50 to-emerald-300/30 dark:from-green-800/50 dark:to-emerald-700/30 border-2 border-green-400 dark:border-green-600 text-green-800 dark:text-green-200 shadow-lg shadow-green-500/25 transform scale-105 transition-all duration-300"
                          : "border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:border-green-400 dark:hover:border-green-500 transition-all duration-200",
                    }}
                    infinite
                    onValueChange={(value) => setNumberValue(value.toString())}
                    options={numberOptions}
                    value={numberValue}
                  />
                </WheelPickerWrapper>
              </div>
            </div>

            {/* Custom Styled */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-purple-700 text-xl dark:text-purple-300">
                  Custom Styled
                </h3>
                <p className="text-muted-foreground text-sm">
                  Enhanced visual design
                </p>
                <p className="text-purple-600 text-xs dark:text-purple-400">
                  Uses same hour picker (H)
                </p>
              </div>
              <div className="rounded-2xl border border-purple-200/30 bg-linear-to-br from-purple-50/30 to-violet-100/20 p-6 dark:border-purple-800/20 dark:from-purple-950/20 dark:to-violet-900/10">
                <div className="mb-4 text-center">
                  <div className="mb-2 font-semibold text-lg text-purple-700 dark:text-purple-300">
                    Hour: {hourValue.padStart(2, "0")}
                  </div>
                </div>
                <WheelPickerWrapper>
                  <WheelPicker
                    classNames={{
                      highlightWrapper:
                        "bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900 dark:to-violet-900 border-2 border-purple-400 dark:border-purple-600 text-purple-800 dark:text-purple-200 shadow-lg shadow-purple-500/25 transition-all duration-300",
                    }}
                    infinite
                    onValueChange={(value) => setHourValue(value.toString())}
                    options={hourOptions_military}
                    value={hourValue}
                  />
                </WheelPickerWrapper>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Controls */}
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="font-bold text-3xl">
              Comprehensive Keyboard Navigation
            </h2>
            <p className="text-muted-foreground">
              Enhanced accessibility with shortcuts for all picker types
            </p>
          </div>

          <div className="rounded-3xl border border-border/50 bg-linear-to-br from-muted/50 to-muted/30 p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-3">
                <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                  H
                </kbd>
                <span className="text-muted-foreground">Select hours</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                  M
                </kbd>
                <span className="text-muted-foreground">Select minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                  D
                </kbd>
                <span className="text-muted-foreground">Select day</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                  O
                </kbd>
                <span className="text-muted-foreground">Select month</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                  Y
                </kbd>
                <span className="text-muted-foreground">Select year</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                  N
                </kbd>
                <span className="text-muted-foreground">Select number</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                  ↵
                </kbd>
                <span className="text-muted-foreground">Cycle pickers</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                  Esc
                </kbd>
                <span className="text-muted-foreground">Clear selection</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                  C
                </kbd>
                <span className="text-muted-foreground">Clear all values</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WheelPickerTheme() {
  const [focusedPicker, setFocusedPicker] = useState<
    "hours" | "minutes" | null
  >(null);
  const [hourValue, setHourValue] = useState("0");
  const [minuteValue, setMinuteValue] = useState("0");
  const [inputBuffer, setInputBuffer] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);

  const hourOptions_military = useMemo(() => createArray(24, 0), []);
  const minuteOptions = useMemo(() => createArray(60), []);

  const formattedTime = useMemo(
    () => `${hourValue.padStart(2, "0")}:${minuteValue.padStart(2, "0")}`,
    [hourValue, minuteValue]
  );

  // Helper functions for time picker keyboard handling
  const handleTimePickerFocus = useCallback(
    (picker: "hours" | "minutes" | null, event: KeyboardEvent) => {
      setFocusedPicker(picker);
      setInputBuffer("");
      event.preventDefault();
    },
    []
  );

  const handleTimePickerClear = useCallback((event: KeyboardEvent) => {
    setHourValue("0");
    setMinuteValue("0");
    setFocusedPicker(null);
    setInputBuffer("");
    event.preventDefault();
  }, []);

  const handleTimePickerDigit = useCallback(
    (newBuffer: string, picker: "hours" | "minutes") => {
      const numValue = Number.parseInt(newBuffer, 10);
      const maxLen = 2;

      if (picker === "hours") {
        if (numValue >= 0 && numValue <= 23) {
          setHourValue(numValue.toString());
          if (newBuffer.length === maxLen || numValue > 2) {
            setInputBuffer("");
          }
        }
      } else if (picker === "minutes" && numValue >= 0 && numValue <= 59) {
        setMinuteValue(numValue.toString());
        if (newBuffer.length === maxLen || numValue > 5) {
          setInputBuffer("");
        }
      }
    },
    []
  );

  // Keyboard navigation for hours and minutes only
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === "h") {
        handleTimePickerFocus("hours", event);
        return;
      }
      if (key === "m") {
        handleTimePickerFocus("minutes", event);
        return;
      }
      if (key === "escape") {
        handleTimePickerFocus(null, event);
        return;
      }
      if (key === "c") {
        handleTimePickerClear(event);
        return;
      }
      if (DIGIT_REGEX.test(key) && focusedPicker) {
        event.preventDefault();
        const maxLen = 2;
        const newBuffer = (inputBuffer + key).slice(-maxLen);
        setInputBuffer(newBuffer);
        handleTimePickerDigit(newBuffer, focusedPicker);
        return;
      }
      if (key === "enter") {
        setFocusedPicker((prev) => (prev === "hours" ? "minutes" : "hours"));
        setInputBuffer("");
        event.preventDefault();
      }
    },
    [
      focusedPicker,
      inputBuffer,
      handleTimePickerFocus,
      handleTimePickerClear,
      handleTimePickerDigit,
    ]
  );

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
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

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.focus();
    }
  }, []);

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-border/50 bg-linear-to-br from-background via-muted/20 to-background p-8 shadow-2xl">
      <div className="space-y-6 text-center">
        <div className="relative rounded-3xl border border-border/50 bg-card/30 p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex justify-center">
            <div
              aria-label="Time picker with keyboard navigation"
              className="group w-72 focus:outline-none"
              ref={componentRef}
              role="application"
            >
              {/* Current Time Display */}
              <div className="mb-8 text-center">
                <div className="mb-4 transform font-bold font-mono text-4xl text-foreground tracking-wider transition-all duration-300 hover:scale-105">
                  {formattedTime}
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    className={`transform rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      focusedPicker === "hours"
                        ? "scale-105 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "border border-border text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                    }`}
                    onClick={() => setFocusedPicker("hours")}
                    type="button"
                  >
                    Hours (H)
                  </button>
                  <button
                    className={`transform rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      focusedPicker === "minutes"
                        ? "scale-105 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "border border-border text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                    }`}
                    onClick={() => setFocusedPicker("minutes")}
                    type="button"
                  >
                    Minutes (M)
                  </button>
                </div>
              </div>
              {/* Wheel Picker */}
              <div className="transform transition-all duration-500 hover:scale-[1.02]">
                <WheelPickerWrapper>
                  <WheelPicker
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "hours"
                          ? "bg-linear-to-br from-primary/20 to-primary/30 text-primary border-2 border-primary shadow-xl shadow-primary/25 transform scale-105 transition-all duration-300"
                          : "border border-border text-foreground hover:border-primary/50 transition-all duration-200",
                    }}
                    infinite
                    onValueChange={(value) => setHourValue(value.toString())}
                    options={hourOptions_military}
                    value={hourValue}
                  />
                  <WheelPicker
                    classNames={{
                      highlightWrapper:
                        focusedPicker === "minutes"
                          ? "bg-linear-to-br from-primary/20 to-primary/30 text-primary border-2 border-primary shadow-xl shadow-primary/25 transform scale-105 transition-all duration-300"
                          : "border border-border text-foreground hover:border-primary/50 transition-all duration-200",
                    }}
                    infinite
                    onValueChange={(value) => setMinuteValue(value.toString())}
                    options={minuteOptions}
                    value={minuteValue}
                  />
                </WheelPickerWrapper>
              </div>
            </div>
          </div>
        </div>
        {/* Keyboard Controls */}
        <div className="mt-8">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                H
              </kbd>
              <span className="text-muted-foreground">Select hours</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                M
              </kbd>
              <span className="text-muted-foreground">Select minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                0-9
              </kbd>
              <span className="text-muted-foreground">Type numbers</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                ↵
              </kbd>
              <span className="text-muted-foreground">Cycle pickers</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                Esc
              </kbd>
              <span className="text-muted-foreground">Clear selection</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="min-w-10 rounded-lg border border-zinc-600 bg-linear-to-b from-zinc-700 to-zinc-800 px-3 py-2 text-center font-mono text-sm text-zinc-100 shadow-sm">
                C
              </kbd>
              <span className="text-muted-foreground">Clear all values</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
