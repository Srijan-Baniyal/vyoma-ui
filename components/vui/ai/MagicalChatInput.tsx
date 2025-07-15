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
      "w-full divide-y overflow-hidden rounded-xl border bg-background shadow-sm",
      "transition-all duration-300 ease-in-out",
      "hover:shadow-md hover:shadow-primary/5",
      "focus-within:shadow-lg focus-within:shadow-primary/10 focus-within:border-primary/20",
      "group",
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
        "w-full resize-none rounded-none border-none p-3 shadow-none outline-none ring-0",
        "bg-transparent dark:bg-transparent",
        "focus-visible:ring-0",
        "transition-all duration-200 ease-in-out",
        "placeholder:text-muted-foreground/60 placeholder:transition-colors placeholder:duration-200",
        "focus:placeholder:text-muted-foreground/40",
        "text-sm leading-relaxed",
        "scrollbar-none overflow-hidden",
        "[&::-webkit-scrollbar]:hidden",
        "[-ms-overflow-style:none]",
        "[scrollbar-width:none]",
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
      "flex items-center justify-between p-1",
      "transition-all duration-200 ease-in-out",
      "group-focus-within:bg-muted/30",
      className
    )}
    {...props}
  />
);
export type AIInputToolsProps = HTMLAttributes<HTMLDivElement>;
export const AIInputTools = ({ className, ...props }: AIInputToolsProps) => (
  <div
    className={cn(
      "flex items-center gap-1",
      "[&_button:first-child]:rounded-bl-xl",
      className
    )}
    {...props}
  />
);
export type AIInputButtonProps = ComponentProps<typeof Button>;
export const AIInputButton = ({
  variant = "ghost",
  className,
  size,
  ...props
}: AIInputButtonProps) => {
  const newSize =
    size ?? Children.count(props.children) > 1 ? "default" : "icon";
  return (
    <Button
      className={cn(
        "shrink-0 gap-1.5 rounded-lg",
        "transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        "hover:shadow-sm",
        variant === "ghost" && "text-muted-foreground hover:text-foreground",
        newSize === "default" && "px-3",
        "group/button",
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
};
export const AIInputToggleButton = ({
  variant = "ghost",
  className,
  size,
  isActive = false,
  ...props
}: AIInputToggleButtonProps) => {
  const newSize =
    size ?? Children.count(props.children) > 1 ? "default" : "icon";
  return (
    <Button
      className={cn(
        "shrink-0 gap-1.5 rounded-lg",
        "transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        "hover:shadow-sm",
        "group/button",
        isActive 
          ? "bg-primary/10 text-primary border border-primary/20 shadow-sm hover:bg-primary/15 hover:text-primary" 
          : "text-muted-foreground hover:text-foreground",
        newSize === "default" && "px-3",
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
  let Icon = <SendIcon className="transition-transform duration-200 group-hover/submit:translate-x-0.5" />;
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
        "gap-1.5 rounded-lg rounded-br-xl",
        "transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        "hover:shadow-md",
        "group/submit",
        "disabled:hover:scale-100",
        status === "ready" && "animate-pulse",
        status === "error" && "bg-destructive hover:bg-destructive/90",
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
      "border-none bg-transparent font-medium text-muted-foreground shadow-none",
      "transition-all duration-200 ease-in-out",
      "hover:bg-accent hover:text-foreground hover:scale-105",
      "focus:bg-accent focus:text-foreground focus:scale-105",
      'data-[state=open]:bg-accent data-[state=open]:text-foreground data-[state=open]:scale-105',
      '[&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground [&[aria-expanded="true"]]:scale-105',
      "active:scale-95",
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
      "duration-200",
      "scrollbar-none overflow-hidden",
      "[&::-webkit-scrollbar]:hidden",
      "[-ms-overflow-style:none]",
      "[scrollbar-width:none]",
      "max-h-[200px] overflow-y-auto",
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
      "transition-all duration-150 ease-in-out",
      "hover:bg-accent/80 focus:bg-accent/80",
      "hover:scale-[1.02] focus:scale-[1.02]",
      "active:scale-[0.98]",
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
  <SelectValue className={cn(className)} {...props} />
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
      {/* Animated background gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <AIInput 
        onSubmit={handleSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative"
      >
        <AIInputTextarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className={cn(
            "transition-all duration-300",
            isFocused && "transform translate-y-[-1px]"
          )}
        />
        <AIInputToolbar className={cn(
          "transition-all duration-300",
          text.length > 0 && "bg-muted/20"
        )}>
          <AIInputTools className="space-x-1">
            <AIInputButton className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400">
              <PlusIcon size={16} className="transition-transform duration-200 group-hover/button:rotate-90" />
            </AIInputButton>
            <AIInputButton className="hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950 dark:hover:text-green-400">
              <MicIcon size={16} className="transition-transform duration-200 group-hover/button:scale-110" />
            </AIInputButton>
            <AIInputToggleButton 
              isActive={isWebSearchEnabled}
              onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
              className="hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950 dark:hover:text-purple-400"
            >
              <GlobeIcon size={16} className="transition-transform duration-200 group-hover/button:rotate-12" />
              <span className="transition-all duration-200 group-hover/button:tracking-wide">
                {isWebSearchEnabled ? "Web Search Enabled" : "Web Search"}
              </span>
            </AIInputToggleButton>
            <AIInputToggleButton 
              isActive={isDeepResearchEnabled}
              onClick={() => setIsDeepResearchEnabled(!isDeepResearchEnabled)}
              className="hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950 dark:hover:text-orange-400"
            >
              <FlaskConicalIcon size={16} className="transition-transform duration-200 group-hover/button:rotate-12" />
              <span className="transition-all duration-200 group-hover/button:tracking-wide">
                {isDeepResearchEnabled ? "Deep Research Enabled" : "Deep Research"}
              </span>
            </AIInputToggleButton>
            <AIInputModelSelect onValueChange={setModel} value={model}>
              <AIInputModelSelectTrigger className="min-w-[120px]">
                <AIInputModelSelectValue />
              </AIInputModelSelectTrigger>
              <AIInputModelSelectContent>
                {models.map((model) => (
                  <AIInputModelSelectItem key={model.id} value={model.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{model.name}</span>
                      {model.id === "gpt-4" && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-2">
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
              "relative overflow-hidden",
              text.length > 0 && "shadow-lg shadow-primary/25",
              status === "ready" && text.length > 0 && "animate-none bg-primary hover:bg-primary/90"
            )}
          />
        </AIInputToolbar>
      </AIInput>
      
      {/* Feature indicators */}
      {(isDeepResearchEnabled || isWebSearchEnabled) && text.length > 0 && (
        <div className="absolute -bottom-8 left-2 text-xs text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
              <span>Press Cmd+Enter to send</span>
            </div>
            {isWebSearchEnabled && (
              <div className="flex items-center space-x-1 text-purple-600 dark:text-purple-400">
                <GlobeIcon size={12} />
                <span>Web search enabled</span>
              </div>
            )}
            {isDeepResearchEnabled && (
              <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
                <FlaskConicalIcon size={12} />
                <span>Deep research mode</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Typing indicator (fallback when no features enabled) */}
      {!(isDeepResearchEnabled || isWebSearchEnabled) && text.length > 0 && (
        <div className="absolute -bottom-6 left-2 text-xs text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
            <span>Press Cmd+Enter to send</span>
          </div>
        </div>
      )}
      
      {/* Success ripple effect */}
      {status === "submitted" && (
        <div className="absolute inset-0 rounded-xl border-2 border-primary/50 animate-ping" />
      )}
    </div>
  );
}
