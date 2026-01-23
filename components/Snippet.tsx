"use client";

import Copy from "@/components/Copy";
import { Card } from "@/components/ui/card";

interface SnippetProps {
  text: string;
  width?: string;
  variant?: "default" | "success" | "warning" | "info";
  showIndicator?: boolean;
}

export function Snippet({
  text,
  width,
  variant = "default",
  showIndicator = true,
}: SnippetProps) {
  const variantStyles = {
    default: "bg-muted/50 hover:bg-muted/70 border-dashed",
    success:
      "bg-green-50/50 hover:bg-green-50/70 border-green-200/50 dark:bg-green-950/20 dark:hover:bg-green-950/30 dark:border-green-800/50",
    warning:
      "bg-yellow-50/50 hover:bg-yellow-50/70 border-yellow-200/50 dark:bg-yellow-950/20 dark:hover:bg-yellow-950/30 dark:border-yellow-800/50",
    info: "bg-blue-50/50 hover:bg-blue-50/70 border-blue-200/50 dark:bg-blue-950/20 dark:hover:bg-blue-950/30 dark:border-blue-800/50",
  };

  const indicatorColors = {
    default: "bg-green-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <Card
      className={`group relative flex w-full flex-nowrap p-3 transition-all duration-200 ${
        variantStyles[variant]
      } ${
        width ? "max-w-none" : "max-w-75 sm:max-w-100 md:max-w-125 lg:max-w-185"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {showIndicator && (
          <div
            className={`h-2 w-2 rounded-full ${indicatorColors[variant]} shrink-0 opacity-60 transition-opacity group-hover:opacity-100`}
          />
        )}
        <div className="flex min-w-0 flex-1 items-center">
          <code className="flex-1 select-all overflow-hidden whitespace-nowrap font-mono text-foreground/90 text-sm">
            {text}
          </code>
          <div className="ml-3 shrink-0">
            <Copy content={text} />
          </div>
        </div>
      </div>
    </Card>
  );
}
