"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  Eye,
  Info,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  Terminal,
} from "lucide-react";
import type React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttonShadcn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ComponentPropsInfo } from "@/lib/TsASTAbstractionForDoc";

interface ComponentShowcaseCardProps {
  componentName: string;
  description?: string | React.JSX.Element | React.JSX.Element[];
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
  codeString: string;
  propsInfo?: ComponentPropsInfo | null;
  index: number;
  refreshKey: number;
  isExpanded: boolean;
  isTruncated: boolean;
  descriptionContent: string | React.JSX.Element | React.JSX.Element[];
  displayDescription: string | React.JSX.Element | React.JSX.Element[];
  fullscreenIndex: number | null;
  copiedIndex: number | null;
  isRefreshing: boolean;
  isClient: boolean;
  isMobile: boolean;
  onToggleDescription: () => void;
  onToggleFullscreen: () => void;
  onRefresh: () => void;
  onCopyCode: (code: string) => void;
}

export function ComponentShowcaseCard({
  componentName,

  component: Component,
  defaultProps,
  codeString,
  propsInfo,
  index,
  refreshKey,
  isExpanded,
  isTruncated,
  displayDescription,
  fullscreenIndex,
  copiedIndex,
  isRefreshing,
  isClient,
  isMobile,
  onToggleDescription,
  onToggleFullscreen,
  onRefresh,
  onCopyCode,
}: ComponentShowcaseCardProps) {
  return (
    <Card
      className={`group slide-in-from-bottom-8 fade-in-0 animate-in overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50/50 shadow-lg backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl dark:from-slate-900 dark:to-slate-800/50 ${
        fullscreenIndex === index
          ? "fixed inset-2 z-50 scale-100 rounded-xl shadow-2xl sm:inset-4"
          : "hover:-translate-y-1 hover:scale-[1.01]"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "both",
      }}
    >
      <CardHeader
        className={`border-b bg-gradient-to-r from-slate-50/80 via-white to-blue-50/50 transition-all duration-300 dark:from-slate-800/80 dark:via-slate-900 dark:to-blue-950/50 ${
          isMobile ? "p-3" : "p-4 sm:p-6"
        }`}
      >
        <CardHeaderContent
          componentName={componentName}
          displayDescription={displayDescription}
          fullscreenIndex={fullscreenIndex}
          index={index}
          isExpanded={isExpanded}
          isMobile={isMobile}
          isRefreshing={isRefreshing}
          isTruncated={isTruncated}
          onRefresh={onRefresh}
          onToggleDescription={onToggleDescription}
          onToggleFullscreen={onToggleFullscreen}
        />
      </CardHeader>

      <CardContent className="p-0">
        <ComponentTabs
          Component={Component}
          codeString={codeString}
          copiedIndex={copiedIndex}
          defaultProps={defaultProps}
          index={index}
          isClient={isClient}
          isMobile={isMobile}
          onCopyCode={onCopyCode}
          propsInfo={propsInfo}
          refreshKey={refreshKey}
        />
      </CardContent>
    </Card>
  );
}

// Extracted card header content
function CardHeaderContent({
  componentName,
  displayDescription,
  isTruncated,
  isExpanded,
  onToggleDescription,
  fullscreenIndex,
  index,
  onToggleFullscreen,
  isRefreshing,
  onRefresh,
  isMobile,
}: {
  componentName: string;
  displayDescription: string | React.JSX.Element | React.JSX.Element[];
  isTruncated: boolean;
  isExpanded: boolean;
  onToggleDescription: () => void;
  fullscreenIndex: number | null;
  index: number;
  onToggleFullscreen: () => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  isMobile: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-700 bg-clip-text text-transparent text-xl transition-colors duration-200 sm:text-2xl dark:from-slate-100 dark:via-blue-200 dark:to-purple-300">
            <span className="break-words">{componentName}</span>
          </CardTitle>
        </div>
        <div className="space-y-2">
          <CardDescription className="fade-in-50 slide-in-from-left-4 animate-in text-muted-foreground text-sm leading-relaxed delay-300 duration-400">
            {displayDescription}
          </CardDescription>
          {isTruncated && (
            <Button
              className="h-auto p-1 text-blue-600 text-xs transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              onClick={onToggleDescription}
              size="sm"
              variant="ghost"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="mr-1 h-3 w-3" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1 h-3 w-3" />
                  Show more
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          className="shrink-0 rounded-xl p-2 transition-all duration-200 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-950/50"
          onClick={onToggleFullscreen}
          size="sm"
          variant="ghost"
        >
          <div
            className={`transition-transform duration-300 ${
              fullscreenIndex === index ? "rotate-180" : ""
            }`}
          >
            {fullscreenIndex === index ? (
              <Minimize2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <Maximize2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            )}
          </div>
        </Button>
        <Button
          className="shrink-0 rounded-xl border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-200 hover:scale-105 hover:from-blue-100 hover:to-purple-100 hover:shadow-md dark:border-blue-800 dark:from-blue-950/50 dark:to-purple-950/50 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50"
          disabled={isRefreshing}
          onClick={onRefresh}
          size={isMobile ? "sm" : "sm"}
          variant="outline"
        >
          <RefreshCw
            className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} ${
              isMobile ? "mr-1" : "mr-2"
            } text-blue-600 transition-transform duration-500 dark:text-blue-400 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
          <span className={isMobile ? "text-xs" : "text-sm"}>Refresh</span>
        </Button>
      </div>
    </div>
  );
}

// Extracted tabs component
function ComponentTabs({
  isMobile,
  Component,
  defaultProps,
  refreshKey,
  isClient,
  codeString,
  copiedIndex,
  index,
  onCopyCode,
  propsInfo,
}: {
  isMobile: boolean;
  Component: React.ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
  refreshKey: number;
  isClient: boolean;
  codeString: string;
  copiedIndex: number | null;
  index: number;
  onCopyCode: (code: string) => void;
  propsInfo?: ComponentPropsInfo | null;
}) {
  return (
    <Tabs className="w-full" defaultValue="preview">
      <div className="border-b bg-gradient-to-r from-slate-50/50 to-blue-50/30 dark:from-slate-800/50 dark:to-blue-950/30">
        <TabsList
          className={`${isMobile ? "h-10" : "h-12 sm:h-14"} w-full justify-start overflow-x-auto rounded-none bg-transparent p-0`}
        >
          <TabsTrigger
            className={`rounded-none border-transparent border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-900 ${isMobile ? "h-10 px-3" : "h-12 px-4 sm:h-14 sm:px-8"} ${isMobile ? "text-xs" : "text-xs sm:text-sm"} group relative overflow-hidden whitespace-nowrap font-medium transition-all duration-300 hover:-translate-y-0.5`}
            value="preview"
          >
            <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-transform duration-300 group-data-[state=active]:translate-y-0" />
            <Eye className="relative z-10 mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
            <span className="relative z-10">Preview</span>
          </TabsTrigger>
          <TabsTrigger
            className={`rounded-none border-transparent border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-900 ${isMobile ? "h-10 px-3" : "h-12 px-4 sm:h-14 sm:px-8"} ${isMobile ? "text-xs" : "text-xs sm:text-sm"} group relative overflow-hidden whitespace-nowrap font-medium transition-all duration-300 hover:-translate-y-0.5`}
            value="code"
          >
            <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-transform duration-300 group-data-[state=active]:translate-y-0" />
            <Terminal className="relative z-10 mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
            <span className="relative z-10">Code</span>
          </TabsTrigger>
          <TabsTrigger
            className={`rounded-none border-transparent border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-900 ${isMobile ? "h-10 px-3" : "h-12 px-4 sm:h-14 sm:px-8"} ${isMobile ? "text-xs" : "text-xs sm:text-sm"} group relative overflow-hidden whitespace-nowrap font-medium transition-all duration-300 hover:-translate-y-0.5`}
            value="props"
          >
            <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-transform duration-300 group-data-[state=active]:translate-y-0" />
            <Info className="relative z-10 mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
            <span className="relative z-10">Props</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <PreviewTab
        Component={Component}
        defaultProps={defaultProps}
        isClient={isClient}
        isMobile={isMobile}
        refreshKey={refreshKey}
      />

      <CodeTab
        codeString={codeString}
        copiedIndex={copiedIndex}
        index={index}
        isClient={isClient}
        isMobile={isMobile}
        onCopyCode={onCopyCode}
      />

      <PropsTab
        copiedIndex={copiedIndex}
        defaultProps={defaultProps}
        index={index}
        isMobile={isMobile}
        onCopyCode={onCopyCode}
        propsInfo={propsInfo}
      />
    </Tabs>
  );
}

// Preview tab component
function PreviewTab({
  isMobile,
  refreshKey,
  isClient,
  Component,
  defaultProps,
}: {
  isMobile: boolean;
  refreshKey: number;
  isClient: boolean;
  Component: React.ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
}) {
  return (
    <TabsContent
      className="fade-in-50 slide-in-from-bottom-4 m-0 animate-in border-0 duration-400"
      value="preview"
    >
      <div className={`${isMobile ? "p-3" : "p-4 sm:p-8"}`}>
        <div
          className={`flex flex-col justify-between sm:flex-row sm:items-center ${isMobile ? "mb-3 gap-2" : "mb-4 gap-3 sm:mb-6"}`}
        >
          <div className="flex items-center gap-3">
            <h4 className="font-semibold text-foreground text-sm">
              Live Component Preview
            </h4>
          </div>
          <Badge
            className="zoom-in-50 w-fit animate-in border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 text-xs duration-300 dark:border-blue-800 dark:from-blue-950/50 dark:to-purple-950/50"
            variant="outline"
          >
            Refreshed: {refreshKey} times
          </Badge>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 blur-xl transition-all duration-700 ease-out group-hover:opacity-100" />
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 border-dashed bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-300 group-hover:shadow-xl dark:border-slate-700 dark:from-slate-900 dark:via-slate-800/50 dark:to-blue-950/30 dark:group-hover:border-blue-600">
            <div
              className={`zoom-in-50 fade-in-0 w-full animate-in transition-all duration-500 ${isMobile ? "p-3" : "p-4 sm:p-8"}`}
              key={refreshKey}
            >
              {isClient && (
                <div className="w-full overflow-auto">
                  <Component {...(defaultProps || {})} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}

// Code tab component
function CodeTab({
  codeString,
  copiedIndex,
  index,
  onCopyCode,
  isMobile,
  isClient,
}: {
  codeString: string;
  copiedIndex: number | null;
  index: number;
  onCopyCode: (code: string) => void;
  isMobile: boolean;
  isClient: boolean;
}) {
  return (
    <TabsContent
      className="fade-in-50 slide-in-from-bottom-4 m-0 animate-in border-0 duration-400"
      value="code"
    >
      <div className="relative">
        <div className="flex flex-col justify-between gap-3 border-b bg-gradient-to-r from-slate-50 to-blue-50 p-4 transition-colors duration-200 sm:flex-row sm:items-center sm:p-6 dark:from-slate-900 dark:to-blue-950">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h4 className="flex items-center gap-2 font-semibold text-sm">
              <div className="rounded bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <Code2 className="h-3 w-3 text-white" />
              </div>
              Source Code
            </h4>
            <Badge
              className="zoom-in-50 animate-in bg-gradient-to-r from-blue-100 to-purple-100 text-xs delay-100 duration-300 dark:from-blue-900/50 dark:to-purple-900/50"
              variant="secondary"
            >
              TypeScript
            </Badge>
            <Badge
              className="zoom-in-50 animate-in text-xs delay-200 duration-300"
              variant="outline"
            >
              {codeString.split("\n").length} lines
            </Badge>
          </div>
          <Button
            className={`h-9 rounded-xl shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md ${
              copiedIndex === index
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            }`}
            onClick={() => onCopyCode(codeString)}
            size="sm"
            variant="default"
          >
            <div className="flex items-center transition-all duration-200">
              {copiedIndex === index ? (
                <>
                  <Check className="zoom-in-50 mr-2 h-3 w-3 animate-in duration-200" />
                  <span className="slide-in-from-right-2 animate-in text-xs duration-200 sm:text-sm">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-3 w-3" />
                  <span className="text-xs sm:text-sm">Copy</span>
                </>
              )}
            </div>
          </Button>
        </div>

        <div className="fade-in-50 relative animate-in overflow-hidden delay-200 duration-500">
          {isClient && (
            <>
              <div
                className={`overflow-auto ${
                  isMobile ? "max-h-64" : "max-h-96 sm:max-h-[600px]"
                }`}
              >
                <SyntaxHighlighter
                  codeTagProps={{
                    className: "dark:text-white text-black font-mono",
                    style: {
                      fontFamily:
                        "JetBrains Mono, Consolas, Monaco, 'Courier New', monospace",
                    },
                  }}
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    fontSize: isMobile ? "10px" : "12px",
                    lineHeight: isMobile ? "1.4" : "1.5",
                    padding: isMobile ? "12px" : "24px",
                    backgroundColor: "transparent",
                    color: "var(--foreground)",
                  }}
                  language="typescript"
                  lineNumberStyle={{
                    minWidth: isMobile ? "2em" : "3em",
                    paddingRight: isMobile ? "0.5em" : "1em",
                    color: "var(--muted-foreground)",
                    userSelect: "none",
                    fontSize: isMobile ? "9px" : "11px",
                  }}
                  PreTag={({ children, ...props }) => (
                    <pre
                      {...props}
                      className="bg-slate-50 font-mono text-black transition-colors duration-200 hover:bg-slate-100 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                      style={{
                        fontFamily:
                          "JetBrains Mono, Consolas, Monaco, 'Courier New', monospace",
                      }}
                    >
                      {children}
                    </pre>
                  )}
                  showLineNumbers={!isMobile}
                  wrapLongLines={true}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
              <style global jsx>{`
                pre code span,
                .hljs span,
                .token {
                  background: transparent !important;
                }
              `}</style>
            </>
          )}
        </div>
      </div>
    </TabsContent>
  );
}

// Props tab component
function PropsTab({
  propsInfo,
  defaultProps,
  copiedIndex,
  index,
  onCopyCode,
  isMobile,
}: {
  propsInfo?: ComponentPropsInfo | null;
  defaultProps?: Record<string, unknown>;
  copiedIndex: number | null;
  index: number;
  onCopyCode: (code: string) => void;
  isMobile: boolean;
}) {
  return (
    <TabsContent
      className="fade-in-50 slide-in-from-bottom-4 m-0 animate-in border-0 duration-400"
      value="props"
    >
      <div className="p-4 sm:p-8">
        <div className="space-y-6">
          {/* Props Header */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <h4 className="bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text font-semibold text-lg text-transparent dark:from-slate-100 dark:to-blue-300">
              Component Props
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                className="zoom-in-50 animate-in border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 text-xs delay-100 duration-300 dark:border-blue-800 dark:from-blue-950/50 dark:to-purple-950/50"
                variant="outline"
              >
                {propsInfo?.props?.length
                  ? (() => {
                      const requiredCount = propsInfo.props.filter(
                        (p) => p.required
                      ).length;
                      const optionalCount = propsInfo.props.filter(
                        (p) => !p.required
                      ).length;
                      return `${propsInfo.props.length} props (${requiredCount} required, ${optionalCount} optional)`;
                    })()
                  : (() => {
                      if (
                        defaultProps &&
                        Object.keys(defaultProps).length > 0
                      ) {
                        return `${Object.keys(defaultProps).length} default props`;
                      }
                      return "No props";
                    })()}
              </Badge>
              {propsInfo?.propsInterfaceName && (
                <Badge
                  className="zoom-in-50 animate-in bg-gradient-to-r from-purple-100 to-pink-100 text-xs delay-200 duration-300 dark:from-purple-900/50 dark:to-pink-900/50"
                  variant="secondary"
                >
                  {propsInfo.propsInterfaceName}
                </Badge>
              )}
            </div>
          </div>

          {/* Component Description */}
          {propsInfo?.description && (
            <div className="slide-in-from-top-4 animate-in rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 duration-500 sm:p-6 dark:border-blue-800 dark:from-blue-950/30 dark:to-indigo-950/30">
              <h5 className="mb-3 flex items-center gap-2 font-medium text-blue-900 text-sm dark:text-blue-100">
                <Info className="h-4 w-4" />
                Component Description
              </h5>
              <p className="text-blue-800 text-sm leading-relaxed dark:text-blue-200">
                {propsInfo.description}
              </p>
            </div>
          )}

          {/* Props Interface Definition */}
          {propsInfo?.propsInterfaceName &&
            propsInfo.props &&
            propsInfo.props.length > 0 && (
              <PropsInterface
                copiedIndex={copiedIndex}
                index={index}
                isMobile={isMobile}
                onCopyCode={onCopyCode}
                propsInfo={propsInfo}
              />
            )}

          {/* AST-extracted Props */}
          {propsInfo?.props && propsInfo.props.length > 0 ? (
            <DetailedPropsInfo propsInfo={propsInfo} />
          ) : null}

          {/* Fallback to Default Props */}
          {(!propsInfo?.props || propsInfo.props.length === 0) &&
          defaultProps &&
          Object.keys(defaultProps).length > 0 ? (
            <DefaultPropsInfo defaultProps={defaultProps} />
          ) : null}

          {/* Extends Information */}
          {propsInfo?.extendsFrom && propsInfo.extendsFrom.length > 0 && (
            <ExtendsInfo extendsFrom={propsInfo.extendsFrom} />
          )}

          {/* Examples */}
          {propsInfo?.examples && propsInfo.examples.length > 0 && (
            <ExamplesInfo examples={propsInfo.examples} />
          )}

          {/* No Props State */}
          {(!propsInfo?.props || propsInfo.props.length === 0) &&
            (!defaultProps || Object.keys(defaultProps).length === 0) && (
              <NoPropsInfo />
            )}
        </div>
      </div>
    </TabsContent>
  );
}

// Helper components to reduce complexity
function PropsInterface({
  propsInfo,
  copiedIndex,
  index,
  onCopyCode,
  isMobile,
}: {
  propsInfo: ComponentPropsInfo;
  copiedIndex: number | null;
  index: number;
  onCopyCode: (code: string) => void;
  isMobile: boolean;
}) {
  const interfaceCode = `interface ${propsInfo.propsInterfaceName} {${
    propsInfo.extendsFrom && propsInfo.extendsFrom.length > 0
      ? `\n  // extends ${propsInfo.extendsFrom.join(", ")}`
      : ""
  }
${propsInfo.props
  ?.map(
    (prop) =>
      `  ${prop.description ? `/** ${prop.description} */\n  ` : ""}${prop.name}${prop.required ? "" : "?"}: ${prop.type};`
  )
  .join("\n")}
}`;

  return (
    <div className="mb-8 space-y-4">
      <h5 className="flex items-center gap-2 font-medium text-md">
        <div className="rounded bg-gradient-to-br from-green-500 to-emerald-600 p-1">
          <Code2 className="h-3 w-3 text-white" />
        </div>
        Interface Definition
      </h5>
      <div className="group relative">
        <div className="absolute top-3 right-3 z-10">
          <Button
            className={`h-8 rounded-lg text-xs transition-all duration-300 hover:scale-105 ${
              copiedIndex === index
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
            }`}
            onClick={() => {
              onCopyCode(interfaceCode);
            }}
            size="sm"
            variant="ghost"
          >
            {copiedIndex === index ? (
              <>
                <Check className="mr-1 h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-1 h-3 w-3" />
                Copy
              </>
            )}
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border bg-gradient-to-br from-slate-50 to-white shadow-lg dark:from-slate-950 dark:to-slate-900">
          <div className="border-b bg-gradient-to-r from-slate-100 to-blue-100 px-4 py-3 dark:from-slate-900 dark:to-blue-950">
            <div className="flex items-center gap-2">
              <Badge
                className="bg-gradient-to-r from-blue-100 to-purple-100 font-mono text-xs dark:from-blue-900/50 dark:to-purple-900/50"
                variant="secondary"
              >
                TypeScript
              </Badge>
              <span className="font-mono text-muted-foreground text-sm">
                {propsInfo.propsInterfaceName}
              </span>
            </div>
          </div>
          <div
            className={`${isMobile ? "p-2" : "p-4"} font-mono ${
              isMobile ? "text-xs" : "text-xs sm:text-sm"
            } overflow-x-auto`}
          >
            <div className="text-blue-600 dark:text-blue-400">
              interface{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">
                {propsInfo.propsInterfaceName}
              </span>
              {propsInfo.extendsFrom && propsInfo.extendsFrom.length > 0 && (
                <span className="text-purple-600 dark:text-purple-400">
                  {" extends "}
                  <span className="text-orange-600 dark:text-orange-400">
                    {propsInfo.extendsFrom.join(", ")}
                  </span>
                </span>
              )}
              {" {"}
            </div>
            <div className="mt-2 ml-2 space-y-2 sm:ml-4">
              {propsInfo.props.map((prop) => (
                <div
                  className="group rounded p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  key={prop.name}
                >
                  {prop.description && (
                    <div className="mb-1 text-green-600 text-xs italic dark:text-green-400">
                      {`/** ${prop.description} */`}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-1">
                    <span
                      className={`font-semibold ${
                        prop.required
                          ? "text-red-600 dark:text-red-400"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {prop.name}
                    </span>
                    <span
                      className={`${
                        prop.required
                          ? "font-bold text-red-500 dark:text-red-500"
                          : "text-blue-500 dark:text-blue-500"
                      }`}
                    >
                      {prop.required ? "" : "?"}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">: </span>
                    <span className="break-all font-medium text-orange-600 dark:text-orange-400">
                      {prop.type}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">;</span>
                    {prop.required && (
                      <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 text-red-700 text-xs dark:bg-red-900/30 dark:text-red-300">
                        required
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-blue-600 dark:text-blue-400">{"}"}</div>
          </div>
        </div>
      </div>
      <Separator className="fade-in-50 my-6 animate-in delay-200 duration-500" />
    </div>
  );
}

function DetailedPropsInfo({ propsInfo }: { propsInfo: ComponentPropsInfo }) {
  return (
    <div className="space-y-4">
      <h5 className="flex items-center gap-2 font-medium text-md">
        <div className="rounded bg-gradient-to-br from-purple-500 to-pink-600 p-1">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
        Detailed Props Information
      </h5>

      <div className="grid gap-4">
        {propsInfo.props.map((prop, propIndex) => (
          <div
            className="group slide-in-from-left-4 fade-in-0 animate-in rounded-xl border bg-gradient-to-br from-white to-slate-50/50 p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:from-blue-50/50 hover:to-purple-50/30 hover:shadow-lg sm:p-6 dark:from-slate-900 dark:to-slate-800/50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/20"
            key={prop.name}
            style={{
              animationDelay: `${propIndex * 100}ms`,
              animationFillMode: "both",
            }}
          >
            <div className="space-y-3">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="break-all font-bold font-mono text-primary text-sm transition-colors duration-200 group-hover:text-primary/80">
                      {prop.name}
                    </code>
                    {prop.required ? (
                      <Badge
                        className="border-red-200 bg-red-100 text-red-800 text-xs dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
                        variant="destructive"
                      >
                        required
                      </Badge>
                    ) : (
                      <Badge
                        className="border-gray-200 bg-gray-50 text-gray-600 text-xs dark:border-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                        variant="outline"
                      >
                        optional
                      </Badge>
                    )}
                    {prop.isUnion && (
                      <Badge
                        className="border-purple-200 bg-purple-100 text-purple-700 text-xs dark:border-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                        variant="secondary"
                      >
                        union
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        Type:
                      </span>
                      <code className="break-all rounded bg-muted px-2 py-1 font-mono text-xs">
                        {prop.type}
                      </code>
                    </div>

                    {prop.unionTypes && prop.unionTypes.length > 0 && (
                      <div className="flex flex-wrap items-start gap-2">
                        <span className="mt-1 text-muted-foreground text-xs">
                          Options:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {prop.unionTypes.map((unionType, idx) => (
                            <Badge
                              className="font-mono text-xs"
                              key={`${prop.name}-union-${idx}`}
                              variant="outline"
                            >
                              {unionType}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {prop.enumValues && prop.enumValues.length > 0 && (
                      <div className="flex flex-wrap items-start gap-2">
                        <span className="mt-1 text-muted-foreground text-xs">
                          Values:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {prop.enumValues.map((enumValue, idx) => (
                            <Badge
                              className="font-mono text-xs"
                              key={`${prop.name}-enum-${idx}`}
                              variant="secondary"
                            >
                              {enumValue}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {prop.defaultValue !== undefined && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className="border-green-200 bg-green-100 font-mono text-green-800 text-xs transition-all duration-200 group-hover:scale-105 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300"
                      variant="default"
                    >
                      default
                    </Badge>
                    <code className="break-all rounded bg-muted px-2 py-1 font-mono text-green-700 text-xs dark:text-green-300">
                      {typeof prop.defaultValue === "string"
                        ? `"${prop.defaultValue}"`
                        : JSON.stringify(prop.defaultValue)}
                    </code>
                  </div>
                )}
              </div>

              {prop.description && (
                <div className="border-t border-dashed pt-3">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              )}

              {prop.tags && prop.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-muted-foreground text-xs">Tags:</span>
                  {prop.tags.map((tag, idx) => (
                    <Badge
                      className="text-xs"
                      key={`${prop.name}-tag-${idx}`}
                      variant="outline"
                    >
                      @{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Separator className="fade-in-50 my-6 animate-in delay-300 duration-500" />
    </div>
  );
}

function DefaultPropsInfo({
  defaultProps,
}: {
  defaultProps: Record<string, unknown>;
}) {
  return (
    <div className="space-y-4">
      <h5 className="flex items-center gap-2 font-medium text-md">
        <div className="rounded bg-gradient-to-br from-orange-500 to-red-600 p-1">
          <Terminal className="h-3 w-3 text-white" />
        </div>
        Default Props (Fallback)
      </h5>

      <div className="grid gap-3">
        {Object.entries(defaultProps).map(([key, value], propIndex) => (
          <div
            className="group slide-in-from-left-4 fade-in-0 animate-in rounded-lg border bg-gradient-to-br from-white to-slate-50/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:from-orange-50/50 hover:to-red-50/30 hover:shadow-md dark:from-slate-900 dark:to-slate-800/50 dark:hover:from-orange-950/30 dark:hover:to-red-950/20"
            key={key}
            style={{
              animationDelay: `${propIndex * 100}ms`,
              animationFillMode: "both",
            }}
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1 space-y-1">
                <code className="break-all font-mono font-semibold text-primary text-sm transition-colors duration-200 group-hover:text-primary/80">
                  {key}
                </code>
                <p className="text-muted-foreground text-xs">
                  Type: {typeof value}
                </p>
              </div>
              <Badge
                className="break-all font-mono text-xs transition-all duration-200 group-hover:scale-105"
                variant="secondary"
              >
                {(() => {
                  if (typeof value === "string") {
                    return `"${value}"`;
                  }
                  if (typeof value === "function") {
                    return "function";
                  }
                  return JSON.stringify(value);
                })()}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <Separator className="fade-in-50 my-6 animate-in delay-300 duration-500" />
    </div>
  );
}

function ExtendsInfo({ extendsFrom }: { extendsFrom: string[] }) {
  return (
    <div className="slide-in-from-bottom-4 animate-in rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 delay-500 duration-500 sm:p-6 dark:border-green-800 dark:from-green-950/30 dark:to-emerald-950/30">
      <h5 className="mb-3 flex items-center gap-2 font-medium text-green-900 text-sm dark:text-green-100">
        <Code2 className="h-4 w-4" />
        Extends
      </h5>
      <div className="flex flex-wrap gap-2">
        {extendsFrom.map((extend) => (
          <Badge
            className="bg-green-100 font-mono text-green-800 text-xs dark:bg-green-900/30 dark:text-green-200"
            key={extend}
            variant="outline"
          >
            {extend}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ExamplesInfo({ examples }: { examples: string[] }) {
  return (
    <div className="slide-in-from-bottom-4 animate-in rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-4 delay-600 duration-500 sm:p-6 dark:border-purple-800 dark:from-purple-950/30 dark:to-pink-950/30">
      <h5 className="mb-4 flex items-center gap-2 font-medium text-purple-900 text-sm dark:text-purple-100">
        <Sparkles className="h-4 w-4" />
        Examples
      </h5>
      <div className="space-y-3">
        {examples.map((example) => (
          <div className="group relative" key={example}>
            <pre className="overflow-x-auto rounded-lg border bg-white p-3 font-mono text-xs sm:p-4 sm:text-sm dark:bg-slate-900">
              <code>{example}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoPropsInfo() {
  return (
    <div className="fade-in-50 zoom-in-95 animate-in py-8 text-center duration-500 sm:py-12">
      <div className="zoom-in-50 mx-auto mb-4 flex h-16 w-16 animate-in items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg delay-200 duration-700 sm:mb-6 sm:h-20 sm:w-20 dark:from-blue-900/30 dark:to-purple-900/30">
        <Info className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8 dark:text-blue-400" />
      </div>
      <h5 className="slide-in-from-bottom-4 mb-2 animate-in bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text font-semibold text-lg text-transparent delay-300 duration-500 sm:mb-3 sm:text-xl dark:from-slate-100 dark:to-blue-300">
        No Props Required
      </h5>
      <p className="slide-in-from-bottom-4 mx-auto max-w-md animate-in text-muted-foreground text-sm delay-500 duration-500 sm:text-base">
        This component doesn&apos;t require any props to function. It works out
        of the box!
      </p>
    </div>
  );
}
