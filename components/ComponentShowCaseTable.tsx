"use client";

import parser from "html-react-parser";
import { Code2 } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ComponentPropsInfo } from "@/lib/TsASTAbstractionForDoc";
import { ComponentShowcaseCard } from "./ComponentShowcaseCard";

interface ComponentShowcaseProps {
  componentName: string;
  description?: string | React.JSX.Element | React.JSX.Element[];
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
  codeString: string;
  propsInfo?: ComponentPropsInfo | null;
}

interface ComponentShowCaseTableProps {
  components: ComponentShowcaseProps[];
}

export default function ComponentShowCaseTable({
  components,
}: ComponentShowCaseTableProps) {
  const [refreshKeys, setRefreshKeys] = useState<Record<number, number>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<number, boolean>
  >({});
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const truncateDescription = (
    description: string | React.JSX.Element | React.JSX.Element[] | undefined,
    wordLimit = 25
  ): {
    content: string | React.JSX.Element | React.JSX.Element[];
    isTruncated: boolean;
  } => {
    if (!description) {
      return { content: "No description available", isTruncated: false };
    }

    if (typeof description === "string") {
      const words = description.split(" ");
      if (words.length <= wordLimit) {
        return { content: description, isTruncated: false };
      }
      return {
        content: `${words.slice(0, wordLimit).join(" ")}...`,
        isTruncated: true,
      };
    }

    // For JSX elements, extract text content for length checking
    const extractText = (
      element: React.JSX.Element | React.JSX.Element[]
    ): string => {
      if (Array.isArray(element)) {
        return element.map(extractText).join(" ");
      }
      if (typeof element === "object" && element.props?.children) {
        if (typeof element.props.children === "string") {
          return element.props.children;
        }
        if (Array.isArray(element.props.children)) {
          return element.props.children
            .map((child: unknown) => (typeof child === "string" ? child : ""))
            .join(" ");
        }
      }
      return "";
    };

    const textContent = extractText(description);
    const words = textContent.split(" ").filter(Boolean);

    if (words.length <= wordLimit) {
      return { content: description, isTruncated: false };
    }
    return {
      content: `${words.slice(0, wordLimit).join(" ")}...`,
      isTruncated: true,
    };
  };

  const toggleDescription = useCallback((index: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  const handleRefresh = useCallback((componentIndex: number) => {
    setIsRefreshing(true);
    setRefreshKeys((prev) => ({
      ...prev,
      [componentIndex]: (prev[componentIndex] || 0) + 1,
    }));
    setTimeout(() => setIsRefreshing(false), 800);
  }, []);

  const handleCopyCode = useCallback((code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const toggleFullscreen = useCallback(
    (index: number) => {
      setFullscreenIndex(fullscreenIndex === index ? null : index);
    },
    [fullscreenIndex]
  );

  if (components.length === 0) {
    return (
      <Card className="fade-in-50 animate-in border-2 border-dashed bg-linear-to-br from-slate-50/50 to-blue-50/30 duration-500 dark:from-slate-900/50 dark:to-blue-950/30">
        <CardContent className="p-8 text-center sm:p-12">
          <div className="zoom-in-50 mx-auto mb-6 flex h-20 w-20 animate-in items-center justify-center rounded-2xl shadow-lg delay-200 duration-700 sm:h-24 sm:w-24 dark:from-blue-900/30 dark:to-purple-900/30">
            <Code2 className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h3 className="slide-in-from-bottom-4 mb-3 animate-in bg-linear-to-r from-slate-900 to-slate-600 bg-clip-text font-bold text-transparent text-xl delay-300 duration-500 sm:text-2xl dark:from-slate-100 dark:to-slate-400">
            No Components Found
          </h3>
          <p className="slide-in-from-bottom-4 mx-auto max-w-md animate-in text-muted-foreground text-sm delay-500 duration-500 sm:text-base">
            No components available to showcase at this time. Add some
            components to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`${isMobile ? "space-y-4" : "space-y-6 sm:space-y-8"}`}>
      {components.map((comp, index) => {
        const { content: descriptionContent, isTruncated } =
          truncateDescription(
            typeof comp.description === "string"
              ? parser(comp.description)
              : comp.description || "No description available",
            25
          );
        const isExpanded = expandedDescriptions[index];
        const displayDescription = (() => {
          if (!isExpanded) {
            return descriptionContent;
          }
          if (typeof comp.description === "string") {
            return parser(comp.description);
          }
          return comp.description;
        })();

        return (
          <ComponentShowcaseCard
            codeString={comp.codeString}
            component={comp.component}
            componentName={comp.componentName}
            copiedIndex={copiedIndex}
            defaultProps={comp.defaultProps}
            description={comp.description}
            descriptionContent={descriptionContent}
            displayDescription={displayDescription as string}
            fullscreenIndex={fullscreenIndex}
            index={index}
            isClient={isClient}
            isExpanded={isExpanded}
            isMobile={isMobile}
            isRefreshing={isRefreshing}
            isTruncated={isTruncated}
            key={`${comp.componentName}-${refreshKeys[index] || 0}-${index}`}
            onCopyCode={(code) => handleCopyCode(code, index)}
            onRefresh={() => handleRefresh(index)}
            onToggleDescription={() => toggleDescription(index)}
            onToggleFullscreen={() => toggleFullscreen(index)}
            propsInfo={comp.propsInfo}
            refreshKey={refreshKeys[index] || 0}
          />
        );
      })}
    </div>
  );
}
