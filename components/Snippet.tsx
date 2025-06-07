"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Copy from "@/components/Copy";

interface SnippetProps {
  text: string;
  width?: string;
}

export function Snippet({ text, width }: SnippetProps) {
  return (
    <Card 
      className={`relative flex items-center justify-between p-4 w-full bg-muted/50 border-dashed hover:bg-muted/70 transition-all duration-200 group ${width ? "max-w-none" : "max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[740px]"}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-2 h-2 rounded-full bg-green-500 opacity-60 group-hover:opacity-100 transition-opacity"></div>
        <code className="text-sm font-mono text-foreground/90 truncate flex-1 select-all">
          {text}
        </code>
      </div>
      <div className="flex-shrink-0 ml-3">
        <Copy content={text} />
      </div>
    </Card>
  );
}
