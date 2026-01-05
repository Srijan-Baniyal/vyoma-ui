"use client";

import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/buttonShadcn";

export default function Copy({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <Button
      aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
      className="group flex h-8 w-8 items-center justify-center p-0 transition-all duration-200 hover:bg-primary/10"
      onClick={handleCopy}
      size="sm"
      variant="ghost"
    >
      {isCopied ? (
        <Check className="zoom-in-50 h-3.5 w-3.5 animate-in text-green-600 duration-200" />
      ) : (
        <Clipboard className="h-3.5 w-3.5 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
      )}
    </Button>
  );
}
