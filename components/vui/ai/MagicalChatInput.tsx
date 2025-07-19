"use client";

import { Loader2Icon, SendIcon, SquareIcon, XIcon } from "lucide-react";
import type {
  ComponentProps,
  HTMLAttributes,
  KeyboardEventHandler,
} from "react";
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/buttonShadcn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type FormEventHandler } from "react";
import { GlobeIcon, MicIcon, PlusIcon, FlaskConicalIcon } from "lucide-react";

type UseAutoResizeTextareaProps = {
  minHeight: number;
  maxHeight?: number;
};
const useAutoResizeTextarea = ({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) {
        return;
      }
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      // Temporarily shrink to get the right scrollHeight
      textarea.style.height = `${minHeight}px`;
      // Calculate new height
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );
  useEffect(() => {
    // Set initial height
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);
  // Adjust height on window resize
  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);
  return { textareaRef, adjustHeight };
};

export type AIInputProps = HTMLAttributes<HTMLFormElement>;
export const AIInput = ({ className, ...props }: AIInputProps) => (
  <form
    className={cn(
      "w-full divide-y overflow-hidden rounded-2xl border border-border/50",
      "bg-background/80 backdrop-blur-xl backdrop-saturate-150",
      "shadow-2xl shadow-black/5 dark:shadow-black/20",
      "transition-all duration-500 ease-out",
      "hover:shadow-3xl hover:shadow-primary/10 hover:border-primary/30",
      "hover:bg-background/90 hover:backdrop-blur-2xl",
      "focus-within:shadow-3xl focus-within:shadow-primary/20 focus-within:border-primary/40",
      "focus-within:bg-background/95 focus-within:backdrop-blur-2xl",
      "focus-within:scale-[1.02] focus-within:translate-y-[-2px]",
      "group",
      // Hide all possible scrollbars
      "scrollbar-none overflow-x-hidden overflow-y-hidden",
      "[&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0",
      "[-ms-overflow-style:none] [scrollbar-width:none]",
      "[&_*]:scrollbar-none [&_*::-webkit-scrollbar]:hidden",
      "[&_*]:[-ms-overflow-style:none] [&_*]:[scrollbar-width:none]",
      className
    )}
    {...props}
  />
);

export type AIInputTextareaProps = ComponentProps<typeof Textarea> & {
  minHeight?: number;
  maxHeight?: number;
};
export const AIInputTextarea = ({
  onChange,
  className,
  placeholder = "What would you like to cook?",
  minHeight = 88,
  maxHeight = 164,
  ...props
}: AIInputTextareaProps) => {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };
  return (
    <Textarea
      className={cn(
        "w-full resize-none rounded-none border-none p-4 shadow-none outline-none ring-0",
        "bg-transparent dark:bg-transparent",
        "focus-visible:ring-0 focus-visible:outline-none",
        "transition-all duration-300 ease-out",
        "placeholder:text-muted-foreground/50 placeholder:transition-all placeholder:duration-300",
        "focus:placeholder:text-muted-foreground/30 focus:placeholder:translate-x-1",
        "text-base leading-relaxed font-medium",
        // Complete scrollbar removal
        "scrollbar-none overflow-hidden overflow-x-hidden overflow-y-hidden",
        "[&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0",
        "[-ms-overflow-style:none] [scrollbar-width:none]",
        "[&::-webkit-scrollbar-track]:hidden [&::-webkit-scrollbar-thumb]:hidden",
        // Additional scrollbar hiding for all states
        "[&:focus::-webkit-scrollbar]:hidden [&:hover::-webkit-scrollbar]:hidden",
        "[&:active::-webkit-scrollbar]:hidden [&:disabled::-webkit-scrollbar]:hidden",
        className
      )}
      name="message"
      onChange={(e) => {
        adjustHeight();
        onChange?.(e);
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      ref={textareaRef}
      {...props}
    />
  );
};

export type AIInputToolbarProps = HTMLAttributes<HTMLDivElement>;
export const AIInputToolbar = ({
  className,
  ...props
}: AIInputToolbarProps) => (
  <div
    className={cn(
      "flex items-center justify-between p-2 px-3",
      "transition-all duration-300 ease-out",
      "bg-gradient-to-r from-background/50 via-background/80 to-background/50",
      "group-focus-within:bg-gradient-to-r group-focus-within:from-muted/20 group-focus-within:via-muted/40 group-focus-within:to-muted/20",
      "backdrop-blur-sm",
      // Hide scrollbars here too
      "scrollbar-none overflow-hidden",
      "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
      className
    )}
    {...props}
  />
);

export type AIInputToolsProps = HTMLAttributes<HTMLDivElement>;
export const AIInputTools = ({ className, ...props }: AIInputToolsProps) => (
  <div
    className={cn(
      "flex items-center gap-1.5",
      "[&_button:first-child]:rounded-bl-2xl",
      "scrollbar-none overflow-hidden overflow-x-auto",
      "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
      className
    )}
    {...props}
  />
);

export type AIInputButtonProps = ComponentProps<typeof Button> & {
  colorScheme?: "purple" | "orange" | "blue" | "green" | "red";
};
export const AIInputButton = ({
  variant = "ghost",
  className,
  size,
  colorScheme = "blue",
  ...props
}: AIInputButtonProps) => {
  const newSize =
    size ?? Children.count(props.children) > 1 ? "default" : "icon";

  // Color scheme mappings for hover states
  const colorClasses = {
    purple:
      "hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/50 dark:hover:text-purple-400 hover:shadow-purple-500/20 hover:border-purple-300/40",
    orange:
      "hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/50 dark:hover:text-orange-400 hover:shadow-orange-500/20 hover:border-orange-300/40",
    blue: "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 hover:shadow-blue-500/20 hover:border-blue-300/40",
    green:
      "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950/50 dark:hover:text-green-400 hover:shadow-green-500/20 hover:border-green-300/40",
    red: "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400 hover:shadow-red-500/20 hover:border-red-300/40",
  };

  return (
    <Button
      className={cn(
        "shrink-0 gap-2 rounded-xl border border-transparent",
        "transition-all duration-300 ease-out",
        "hover:scale-105 hover:rotate-1 active:scale-95 active:rotate-0",
        "hover:shadow-lg group-focus-within:hover:shadow-xl",
        variant === "ghost" && "text-muted-foreground hover:text-foreground",
        newSize === "default" && "px-4 py-2",
        newSize === "icon" && "h-10 w-10",
        "group/button backdrop-blur-sm",
        "relative overflow-hidden",
        // Add subtle gradient overlay
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        colorClasses[colorScheme],
        className
      )}
      size={newSize}
      type="button"
      variant={variant}
      {...props}
    />
  );
};

export type AIInputToggleButtonProps = ComponentProps<typeof Button> & {
  isActive?: boolean;
  colorScheme?: "purple" | "orange" | "blue" | "green" | "red";
};
export const AIInputToggleButton = ({
  variant = "ghost",
  className,
  size,
  isActive = false,
  colorScheme = "purple",
  ...props
}: AIInputToggleButtonProps) => {
  const newSize =
    size ?? Children.count(props.children) > 1 ? "default" : "icon";

  // Color scheme mappings
  const colorClasses = {
    purple: {
      active:
        "bg-gradient-to-r from-purple-100/80 via-purple-200/60 to-purple-100/80 dark:from-purple-950/60 dark:via-purple-900/80 dark:to-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300/60 dark:border-purple-700/60 shadow-lg shadow-purple-500/25",
      hover:
        "hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/50 dark:hover:text-purple-400 hover:shadow-purple-500/20 hover:border-purple-300/40",
    },
    orange: {
      active:
        "bg-gradient-to-r from-orange-100/80 via-orange-200/60 to-orange-100/80 dark:from-orange-950/60 dark:via-orange-900/80 dark:to-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-300/60 dark:border-orange-700/60 shadow-lg shadow-orange-500/25",
      hover:
        "hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/50 dark:hover:text-orange-400 hover:shadow-orange-500/20 hover:border-orange-300/40",
    },
    blue: {
      active:
        "bg-gradient-to-r from-blue-100/80 via-blue-200/60 to-blue-100/80 dark:from-blue-950/60 dark:via-blue-900/80 dark:to-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-300/60 dark:border-blue-700/60 shadow-lg shadow-blue-500/25",
      hover:
        "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 hover:shadow-blue-500/20 hover:border-blue-300/40",
    },
    green: {
      active:
        "bg-gradient-to-r from-green-100/80 via-green-200/60 to-green-100/80 dark:from-green-950/60 dark:via-green-900/80 dark:to-green-950/60 text-green-700 dark:text-green-300 border-green-300/60 dark:border-green-700/60 shadow-lg shadow-green-500/25",
      hover:
        "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950/50 dark:hover:text-green-400 hover:shadow-green-500/20 hover:border-green-300/40",
    },
    red: {
      active:
        "bg-gradient-to-r from-red-100/80 via-red-200/60 to-red-100/80 dark:from-red-950/60 dark:via-red-900/80 dark:to-red-950/60 text-red-700 dark:text-red-300 border-red-300/60 dark:border-red-700/60 shadow-lg shadow-red-500/25",
      hover:
        "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400 hover:shadow-red-500/20 hover:border-red-300/40",
    },
  };

  return (
    <Button
      className={cn(
        "shrink-0 gap-2 rounded-xl border transition-all duration-300 ease-out",
        "hover:scale-105 hover:rotate-1 active:scale-95 active:rotate-0",
        "hover:shadow-lg group-focus-within:hover:shadow-xl",
        "group/button backdrop-blur-sm relative overflow-hidden",
        newSize === "default" && "px-4 py-2",
        newSize === "icon" && "h-10 w-10",
        // Add shimmer effect
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        isActive
          ? colorClasses[colorScheme].active
          : cn(
              "text-muted-foreground hover:text-foreground border-transparent",
              colorClasses[colorScheme].hover
            ),
        className
      )}
      size={newSize}
      type="button"
      variant={isActive ? "outline" : variant}
      {...props}
    />
  );
};

export type AIInputSubmitProps = ComponentProps<typeof Button> & {
  status?: "submitted" | "streaming" | "ready" | "error";
};
export const AIInputSubmit = ({
  className,
  variant = "default",
  size = "icon",
  status,
  children,
  ...props
}: AIInputSubmitProps) => {
  let Icon = (
    <SendIcon className="transition-all duration-300 group-hover/submit:translate-x-1 group-hover/submit:scale-110" />
  );
  if (status === "submitted") {
    Icon = <Loader2Icon className="animate-spin" />;
  } else if (status === "streaming") {
    Icon = <SquareIcon className="animate-pulse" />;
  } else if (status === "error") {
    Icon = <XIcon className="animate-bounce" />;
  }

  const isDisabled = status === "submitted" || status === "streaming";

  return (
    <Button
      className={cn(
        "gap-2 rounded-xl rounded-br-2xl border border-transparent",
        "transition-all duration-300 ease-out",
        "hover:scale-105 active:scale-95",
        "hover:shadow-xl hover:shadow-current/30",
        "group/submit backdrop-blur-sm relative overflow-hidden",
        "disabled:hover:scale-100 disabled:opacity-70",
        size === "icon" && "h-11 w-11",
        // Add gradient background
        "bg-gradient-to-r from-primary via-primary to-primary/90",
        "hover:from-primary/90 hover:via-primary/95 hover:to-primary",
        // Add shimmer effect
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
        "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        status === "ready" && "animate-pulse",
        status === "error" &&
          "bg-gradient-to-r from-destructive via-destructive to-destructive/90 hover:from-destructive/90 hover:via-destructive/95 hover:to-destructive",
        className
      )}
      disabled={isDisabled}
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ?? Icon}
    </Button>
  );
};

export type AIInputModelSelectProps = ComponentProps<typeof Select>;
export const AIInputModelSelect = (props: AIInputModelSelectProps) => (
  <Select {...props} />
);

export type AIInputModelSelectTriggerProps = ComponentProps<
  typeof SelectTrigger
>;
export const AIInputModelSelectTrigger = ({
  className,
  ...props
}: AIInputModelSelectTriggerProps) => (
  <SelectTrigger
    className={cn(
      "border border-transparent bg-transparent font-semibold text-muted-foreground shadow-none",
      "transition-all duration-300 ease-out rounded-xl",
      "hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/80 hover:text-foreground hover:scale-105 hover:rotate-1",
      "focus:bg-gradient-to-r focus:from-accent/50 focus:to-accent/80 focus:text-foreground focus:scale-105",
      "data-[state=open]:bg-gradient-to-r data-[state=open]:from-accent/50 data-[state=open]:to-accent/80 data-[state=open]:text-foreground data-[state=open]:scale-105",
      '[&[aria-expanded="true"]]:bg-gradient-to-r [&[aria-expanded="true"]]:from-accent/50 [&[aria-expanded="true"]]:to-accent/80 [&[aria-expanded="true"]]:text-foreground [&[aria-expanded="true"]]:scale-105',
      "active:scale-95 hover:shadow-lg hover:border-current/20",
      "backdrop-blur-sm relative overflow-hidden",
      // Add shimmer
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
      className
    )}
    {...props}
  />
);

export type AIInputModelSelectContentProps = ComponentProps<
  typeof SelectContent
>;
export const AIInputModelSelectContent = ({
  className,
  ...props
}: AIInputModelSelectContentProps) => (
  <SelectContent
    className={cn(
      "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
      "duration-300 ease-out rounded-xl border border-border/50",
      "bg-background/90 backdrop-blur-xl backdrop-saturate-150",
      "shadow-2xl shadow-black/10 dark:shadow-black/30",
      // Complete scrollbar removal
      "scrollbar-none overflow-hidden overflow-y-auto",
      "[&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0",
      "[-ms-overflow-style:none] [scrollbar-width:none]",
      "[&::-webkit-scrollbar-track]:hidden [&::-webkit-scrollbar-thumb]:hidden",
      "max-h-[250px]",
      className
    )}
    {...props}
  />
);

export type AIInputModelSelectItemProps = ComponentProps<typeof SelectItem>;
export const AIInputModelSelectItem = ({
  className,
  ...props
}: AIInputModelSelectItemProps) => (
  <SelectItem
    className={cn(
      "transition-all duration-200 ease-out rounded-lg mx-1 my-0.5",
      "hover:bg-gradient-to-r hover:from-accent/60 hover:to-accent/80 focus:bg-gradient-to-r focus:from-accent/60 focus:to-accent/80",
      "hover:scale-[1.02] focus:scale-[1.02] hover:translate-x-1 focus:translate-x-1",
      "active:scale-[0.98] cursor-pointer",
      "backdrop-blur-sm",
      className
    )}
    {...props}
  />
);

export type AIInputModelSelectValueProps = ComponentProps<typeof SelectValue>;
export const AIInputModelSelectValue = ({
  className,
  ...props
}: AIInputModelSelectValueProps) => (
  <SelectValue className={cn("font-semibold", className)} {...props} />
);

const models = [
  { id: "gpt-4", name: "GPT-4" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "claude-2", name: "Claude 2" },
  { id: "claude-instant", name: "Claude Instant" },
  { id: "palm-2", name: "PaLM 2" },
  { id: "llama-2-70b", name: "Llama 2 70B" },
  { id: "llama-2-13b", name: "Llama 2 13B" },
  { id: "cohere-command", name: "Command" },
  { id: "mistral-7b", name: "Mistral 7B" },
];

export default function MagicalChatInput() {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<string>(models[0].id);
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const [isFocused, setIsFocused] = useState(false);
  const [isDeepResearchEnabled, setIsDeepResearchEnabled] = useState(false);
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }

    // Show alert with user input
    alert(`You entered: ${text}`);

    setStatus("submitted");
    setTimeout(() => {
      setStatus("streaming");
    }, 200);
    setTimeout(() => {
      setStatus("ready");
    }, 2000);
  };

  return (
    <div className="relative group min-h-[50vh] flex items-center justify-center">
      {/* Enhanced animated background with multiple layers */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-lg animate-pulse" />
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping animation-delay-300" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-500/40 rounded-full animate-ping animation-delay-700" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-500/30 rounded-full animate-ping animation-delay-1000" />
      </div>

      <AIInput
        onSubmit={handleSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "relative z-10 max-w-4xl w-full",
          "transform transition-all duration-700 ease-out",
          isFocused && "scale-102 translate-y-[-2px]"
        )}
      >
        <AIInputTextarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className={cn(
            "transition-all duration-500 ease-out",
            isFocused && "transform translate-y-[-1px]",
            text.length > 0 && "font-semibold"
          )}
          placeholder="Ask me anything... ✨"
        />
        <AIInputToolbar
          className={cn(
            "transition-all duration-500 ease-out",
            text.length > 0 &&
              "bg-gradient-to-r from-muted/10 via-muted/20 to-muted/10 backdrop-blur-lg"
          )}
        >
          <AIInputTools className="space-x-3">
            <AIInputButton colorScheme="blue">
              <PlusIcon
                size={18}
                className="transition-transform duration-300 group-hover/button:rotate-180"
              />
            </AIInputButton>
            <AIInputButton colorScheme="green">
              <MicIcon
                size={18}
                className="transition-transform duration-300 group-hover/button:scale-125"
              />
            </AIInputButton>
            <AIInputToggleButton
              isActive={isWebSearchEnabled}
              onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
              colorScheme="purple"
            >
              <GlobeIcon
                size={18}
                className="transition-transform duration-300 group-hover/button:rotate-12"
              />
              <span className="transition-all duration-300 group-hover/button:tracking-wider font-semibold">
                Web Search
              </span>
            </AIInputToggleButton>
            <AIInputToggleButton
              isActive={isDeepResearchEnabled}
              onClick={() => setIsDeepResearchEnabled(!isDeepResearchEnabled)}
              colorScheme="orange"
            >
              <FlaskConicalIcon
                size={18}
                className="transition-transform duration-300 group-hover/button:rotate-12"
              />
              <span className="transition-all duration-300 group-hover/button:tracking-wider font-semibold">
                Research
              </span>
            </AIInputToggleButton>
            <AIInputModelSelect onValueChange={setModel} value={model}>
              <AIInputModelSelectTrigger className="min-w-[140px]">
                <AIInputModelSelectValue />
              </AIInputModelSelectTrigger>
              <AIInputModelSelectContent>
                {models.map((model) => (
                  <AIInputModelSelectItem key={model.id} value={model.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{model.name}</span>
                      {model.id === "gpt-4" && (
                        <span className="text-xs bg-gradient-to-r from-primary/20 to-primary/30 text-primary px-2 py-1 rounded-full ml-3 font-semibold backdrop-blur-sm">
                          Popular
                        </span>
                      )}
                    </div>
                  </AIInputModelSelectItem>
                ))}
              </AIInputModelSelectContent>
            </AIInputModelSelect>
          </AIInputTools>
          <AIInputSubmit
            status={status}
            className={cn(
              "relative overflow-hidden z-10",
              text.length > 0 && "shadow-2xl shadow-primary/40 scale-105",
              status === "ready" && text.length > 0 && "animate-none"
            )}
          />
        </AIInputToolbar>
      </AIInput>

      {/* Enhanced feature indicators with glassmorphism */}
      {(isDeepResearchEnabled || isWebSearchEnabled) && text.length > 0 && (
        <div className="absolute -bottom-12 left-4 right-4 flex justify-center">
          <div className="bg-background/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-xl border border-border/50 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                <span className="font-medium">Press ⌘+Enter to send</span>
              </div>
              {isWebSearchEnabled && (
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                  <GlobeIcon
                    size={16}
                    className="animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                  <span className="font-semibold">Web search active</span>
                </div>
              )}
              {isDeepResearchEnabled && (
                <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                  <FlaskConicalIcon size={16} className="animate-bounce" />
                  <span className="font-semibold">Research mode</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced typing indicator */}
      {!(isDeepResearchEnabled || isWebSearchEnabled) && text.length > 0 && (
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-background/80 backdrop-blur-xl rounded-full px-4 py-2 shadow-lg border border-border/50 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
              <span className="font-medium">Press ⌘+Enter to send</span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced success effects */}
      {status === "submitted" && (
        <>
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/60 animate-ping" />
          <div className="absolute inset-0 rounded-2xl bg-primary/5 animate-pulse" />
        </>
      )}
    </div>
  );
}
