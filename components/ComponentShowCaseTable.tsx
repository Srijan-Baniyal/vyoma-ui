"use client";

import type React from "react";
import { useState, useCallback, useEffect } from "react";
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
  const [refreshKeys, setRefreshKeys] = useState<Record<number, number>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
      <Card className="border-dashed animate-in fade-in-50 duration-500">
        <CardContent className="p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4 animate-in zoom-in-50 duration-700 delay-200">
            <Code2 className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2 animate-in slide-in-from-bottom-4 duration-500 delay-300">
            No Components Found
          </h3>
          <p className="text-muted-foreground animate-in slide-in-from-bottom-4 duration-500 delay-500">
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
          key={`${comp.componentName}-${refreshKeys[index] || 0}-${index}`}
          className={`overflow-hidden transition-all duration-500 ease-out animate-in slide-in-from-bottom-8 fade-in-0 ${
            fullscreenIndex === index
              ? "fixed inset-4 z-50 shadow-2xl scale-100"
              : "shadow-sm hover:shadow-xl hover:-translate-y-2"
          }`}
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "both",
          }}
        >
          <CardHeader className="border-b bg-gradient-to-r from-muted/30 to-muted/10 transition-all duration-300 hover:from-muted/40 hover:to-muted/20">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl flex items-center gap-2 transition-colors duration-200">
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                    {comp.componentName}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="text-xs animate-in zoom-in-50 duration-300 delay-200"
                  >
                    <PlayCircle className="h-3 w-3 mr-1 animate-pulse" />
                    Interactive
                  </Badge>
                </div>
                <CardDescription
                  className="text-base animate-in fade-in-50 slide-in-from-left-4 duration-400 delay-300"
                  style={{ animationFillMode: "forwards" }}
                >
                  {comp.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFullscreen(index)}
                  className="shrink-0 transition-all duration-200 hover:scale-110 hover:bg-muted/50"
                >
                  <div
                    className={`transition-transform duration-300 ${
                      fullscreenIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    {fullscreenIndex === index ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRefresh(index)}
                  className="shrink-0 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  disabled={isRefreshing}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 transition-transform duration-500 ${
                      isRefreshing ? "animate-spin" : ""
                    }`}
                  />
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
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-14 px-8 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
                    <Eye className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">Live Preview</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-14 px-8 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
                    <Terminal className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">Source Code</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="props"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-14 px-8 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
                    <Info className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">Props</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="preview"
                className="m-0 border-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-400"
              >
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
                    <Badge
                      variant="outline"
                      className="text-xs animate-in zoom-in-50 duration-300"
                    >
                      Refresh Count: {refreshKeys[index] || 0}
                    </Badge>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                    <div className={`relative rounded-xl border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm transition-all duration-300 group-hover:border-muted-foreground/40 group-hover:shadow-lg`}>
                      <div
                        key={refreshKeys[index] || 0}
                        className="w-full transition-all duration-500 animate-in zoom-in-50 fade-in-0"
                      >
                        {isClient && (
                          <comp.component {...(comp.defaultProps || {})} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="code"
                className="m-0 border-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-400"
              >
                <div className="relative">
                  <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Code2 className="h-4 w-4" />
                        Component Source
                      </h4>
                      <Badge
                        variant="secondary"
                        className="text-xs animate-in zoom-in-50 duration-300 delay-100"
                      >
                        TypeScript
                      </Badge>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleCopyCode(comp.codeString, index)}
                      className={`h-9 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md ${
                        copiedIndex === index
                          ? "bg-green-600 hover:bg-green-700"
                          : ""
                      }`}
                    >
                      <div className="flex items-center transition-all duration-200">
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-3 w-3 mr-2 animate-in zoom-in-50 duration-200" />
                            <span className="animate-in slide-in-from-right-2 duration-200">
                              Copied!
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-2" />
                            Copy Code
                          </>
                        )}
                      </div>
                    </Button>
                  </div>

                  <div className="relative overflow-hidden animate-in fade-in-50 duration-500 delay-200">
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
                              className="dark:bg-slate-950 bg-slate-50 dark:text-white text-black font-mono transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-900"
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

              <TabsContent
                value="props"
                className="m-0 border-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-400"
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <h4 className="text-lg font-semibold">Component Props</h4>
                      <Badge
                        variant="outline"
                        className="text-xs animate-in zoom-in-50 duration-300 delay-100"
                      >
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
                          ([key, value], propIndex) => (
                            <div
                              key={key}
                              className="group p-4 rounded-lg border bg-card hover:bg-muted/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02] animate-in slide-in-from-left-4 fade-in-0"
                              style={{
                                animationDelay: `${propIndex * 100}ms`,
                                animationFillMode: "both",
                              }}
                            >
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <code className="text-sm font-mono font-semibold text-primary transition-colors duration-200 group-hover:text-primary/80">
                                    {key}
                                  </code>
                                  <p className="text-xs text-muted-foreground">
                                    Type: {typeof value}
                                  </p>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-mono transition-all duration-200 group-hover:scale-105"
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

                        <Separator className="my-6 animate-in fade-in-50 duration-500 delay-300" />

                        <div className="p-4 rounded-lg bg-muted/30 border border-dashed transition-all hover:bg-muted/40 hover:border-solid animate-in slide-in-from-bottom-4 duration-500 delay-400">
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
                      <div className="text-center py-12 animate-in fade-in-50 zoom-in-95 duration-500">
                        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 animate-in zoom-in-50 duration-700 delay-200">
                          <Info className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h5 className="text-lg font-medium mb-2 animate-in slide-in-from-bottom-4 duration-500 delay-300">
                          No Props Required
                        </h5>
                        <p className="text-muted-foreground text-sm animate-in slide-in-from-bottom-4 duration-500 delay-500">
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
