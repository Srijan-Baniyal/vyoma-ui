"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  RefreshCw,
  Copy,
  Check,
  Terminal,
  Eye,
  Maximize2,
  Minimize2,
  Info,
  Sparkles,
  Code2,
  PlayCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface ComponentShowcaseProps {
  componentName: string;
  description?: string;
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
  codeString: string;
}

interface ComponentShowCaseTableProps {
  components: ComponentShowcaseProps[];
}

export default function ComponentShowCaseTable({
  components,
}: ComponentShowCaseTableProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
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

  const formatProps = (props: Record<string, unknown>) => {
    if (!props || Object.keys(props).length === 0) return "No props";

    return Object.entries(props)
      .map(([key, value]) => {
        const formattedValue =
          typeof value === "string"
            ? `"${value}"`
            : typeof value === "function"
            ? "() => {...}"
            : JSON.stringify(value);
        return `${key}: ${formattedValue}`;
      })
      .join(", ");
  };

  if (components.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Code2 className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Components Found</h3>
          <p className="text-muted-foreground">
            No components available to showcase at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {components.map((comp, index) => (
        <Card
          key={`${comp.componentName}-${refreshKey}-${index}`}
          className={`overflow-hidden transition-all duration-300 ${
            fullscreenIndex === index
              ? "fixed inset-4 z-50 shadow-2xl"
              : "shadow-sm hover:shadow-md"
          }`}
        >
          <CardHeader className="border-b bg-gradient-to-r from-muted/30 to-muted/10">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {comp.componentName}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    <PlayCircle className="h-3 w-3 mr-1" />
                    Interactive
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {comp.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFullscreen(index)}
                  className="shrink-0"
                >
                  {fullscreenIndex === index ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="shrink-0"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs defaultValue="preview" className="w-full">
              <div className="border-b bg-muted/5">
                <TabsList className="h-14 w-full justify-start rounded-none bg-transparent p-0">
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-14 px-8 text-sm font-medium"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Live Preview
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-14 px-8 text-sm font-medium"
                  >
                    <Terminal className="h-4 w-4 mr-2" />
                    Source Code
                  </TabsTrigger>
                  <TabsTrigger
                    value="props"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-14 px-8 text-sm font-medium"
                  >
                    <Info className="h-4 w-4 mr-2" />
                    Props
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="preview" className="m-0 border-0">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h4 className="text-sm font-semibold text-foreground">
                        Component Preview
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground font-medium">
                          Live Component
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Refresh Count: {refreshKey}
                    </Badge>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative rounded-xl border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-muted/30 p-12 min-h-[300px] flex items-center justify-center backdrop-blur-sm">
                      <div className="w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        {isClient && (
                          <comp.component {...(comp.defaultProps || {})} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="m-0 border-0">
                <div className="relative">
                  <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                    <div className="flex items-center gap-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Code2 className="h-4 w-4" />
                        Component Source
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        TypeScript
                      </Badge>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleCopyCode(comp.codeString, index)}
                      className="h-9 shadow-sm"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-3 w-3 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-2" />
                          Copy Code
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="relative overflow-hidden">
                    {isClient && (
                      <>
                        <SyntaxHighlighter
                          language="typescript"
                          customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            fontSize: "12px",
                            lineHeight: "1.5",
                            padding: "24px",
                            backgroundColor: "transparent",
                            color: "var(--foreground)",
                          }}
                          showLineNumbers={true}
                          lineNumberStyle={{
                            minWidth: "3em",
                            paddingRight: "1em",
                            color: "var(--muted-foreground)",
                            userSelect: "none",
                          }}
                          codeTagProps={{
                            className: "dark:text-white text-black font-mono",
                            style: {
                              fontFamily: "JetBrains Mono, monospace",
                            },
                          }}
                          wrapLongLines={true}
                          PreTag={({ children, ...props }) => (
                            <pre
                              {...props}
                              className="dark:bg-slate-950 bg-slate-50 dark:text-white text-black font-mono transition-colors duration-200"
                              style={{
                                fontFamily: "JetBrains Mono, monospace",
                              }}
                            >
                              {children}
                            </pre>
                          )}
                        >
                          {comp.codeString}
                        </SyntaxHighlighter>
                        <style jsx global>{`
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

              <TabsContent value="props" className="m-0 border-0">
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <h4 className="text-lg font-semibold">Component Props</h4>
                      <Badge variant="outline" className="text-xs">
                        {comp.defaultProps &&
                        Object.keys(comp.defaultProps).length > 0
                          ? `${Object.keys(comp.defaultProps).length} props`
                          : "No props"}
                      </Badge>
                    </div>

                    {comp.defaultProps &&
                    Object.keys(comp.defaultProps).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(comp.defaultProps).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="group p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <code className="text-sm font-mono font-semibold text-primary">
                                    {key}
                                  </code>
                                  <p className="text-xs text-muted-foreground">
                                    Type: {typeof value}
                                  </p>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-mono"
                                >
                                  {typeof value === "string"
                                    ? `"${value}"`
                                    : typeof value === "function"
                                    ? "function"
                                    : JSON.stringify(value)}
                                </Badge>
                              </div>
                            </div>
                          )
                        )}

                        <Separator className="my-6" />

                        <div className="p-4 rounded-lg bg-muted/30 border border-dashed">
                          <h5 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Terminal className="h-4 w-4" />
                            Usage Example
                          </h5>
                          <code className="text-sm text-muted-foreground font-mono">
                            {`<${comp.componentName} ${formatProps(
                              comp.defaultProps
                            )} />`}
                          </code>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                          <Info className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h5 className="text-lg font-medium mb-2">
                          No Props Required
                        </h5>
                        <p className="text-muted-foreground text-sm">
                          This component doesn&apos;t require any props to
                          function.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
