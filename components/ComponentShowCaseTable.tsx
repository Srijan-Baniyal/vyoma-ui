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
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/buttonShadcn";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import parser from "html-react-parser";
import type { ComponentPropsInfo } from "@/lib/TsASTAbstractionForDoc";

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const truncateDescription = (
    description: string | React.JSX.Element | React.JSX.Element[] | undefined,
    wordLimit: number = 25
  ): string | React.JSX.Element | React.JSX.Element[] => {
    if (!description) return "No description available";
    
    if (typeof description === "string") {
      const words = description.split(" ");
      if (words.length <= wordLimit) return description;
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    
    // For JSX elements, extract text content for length checking
    const extractText = (element: React.JSX.Element | React.JSX.Element[]): string => {
      if (Array.isArray(element)) {
        return element.map(extractText).join(" ");
      }
      if (typeof element === "object" && element.props?.children) {
        if (typeof element.props.children === "string") {
          return element.props.children;
        }
        if (Array.isArray(element.props.children)) {
          return element.props.children
            .map((child: unknown) => typeof child === "string" ? child : "")
            .join(" ");
        }
      }
      return "";
    };

    const textContent = extractText(description);
    const words = textContent.split(" ").filter(Boolean);
    
    if (words.length <= wordLimit) return description;
    
    // Return truncated text for JSX that's too long
    return words.slice(0, wordLimit).join(" ") + "...";
  };

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
                </div>
                <CardDescription
                  className="text-sm text-muted-foreground leading-relaxed max-w-2xl animate-in fade-in-50 slide-in-from-left-4 duration-400 delay-300"
                  style={{ animationFillMode: "forwards" }}
                >
                  {truncateDescription(
                    typeof comp.description === "string" 
                      ? parser(comp.description) 
                      : comp.description || "No description available", 
                    25
                  )}
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
                    <div
                      className={`relative rounded-xl border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm transition-all duration-300 group-hover:border-muted-foreground/40 group-hover:shadow-lg`}
                    >
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
                      <Badge
                        variant="outline"
                        className="text-xs animate-in zoom-in-50 duration-300 delay-200"
                      >
                        {comp.codeString.split("\n").length} lines
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
                    {/* Props Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <h4 className="text-lg font-semibold">Component Props</h4>
                      <Badge
                        variant="outline"
                        className="text-xs animate-in zoom-in-50 duration-300 delay-100"
                      >
                        {comp.propsInfo?.props?.length ? (
                          (() => {
                            const requiredCount = comp.propsInfo.props.filter(p => p.required).length;
                            const optionalCount = comp.propsInfo.props.filter(p => !p.required).length;
                            return `${comp.propsInfo.props.length} props (${requiredCount} required, ${optionalCount} optional)`;
                          })()
                        ) : comp.defaultProps && Object.keys(comp.defaultProps).length > 0
                          ? `${Object.keys(comp.defaultProps).length} default props`
                          : "No props"}
                      </Badge>
                      {comp.propsInfo?.propsInterfaceName && (
                        <Badge
                          variant="secondary"
                          className="text-xs animate-in zoom-in-50 duration-300 delay-200"
                        >
                          {comp.propsInfo.propsInterfaceName}
                        </Badge>
                      )}
                    </div>

                    {/* Component Description */}
                    {comp.propsInfo?.description && (
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 animate-in slide-in-from-top-4 duration-500">
                        <h5 className="text-sm font-medium mb-2 text-blue-900 dark:text-blue-100">
                          Component Description
                        </h5>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {comp.propsInfo.description}
                        </p>
                      </div>
                    )}

                    {/* Props Interface Definition */}
                    {comp.propsInfo?.propsInterfaceName && comp.propsInfo.props && comp.propsInfo.props.length > 0 && (
                      <div className="space-y-4 mb-8">
                        <h5 className="text-md font-medium flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-primary" />
                          Props Interface Definition
                        </h5>
                        <div className="relative group">
                          <div className="absolute top-3 right-3 z-10">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const interfaceCode = `interface ${comp.propsInfo?.propsInterfaceName} {${comp.propsInfo?.extendsFrom && comp.propsInfo.extendsFrom.length > 0 ? `\n  // extends ${comp.propsInfo.extendsFrom.join(", ")}` : ""}
${comp.propsInfo?.props?.map(prop => 
  `  ${prop.description ? `/** ${prop.description} */\n  ` : ""}${prop.name}${prop.required ? "" : "?"}: ${prop.type};`
).join("\n")}
}`;
                                handleCopyCode(interfaceCode, index);
                              }}
                              className={`h-8 text-xs transition-all duration-300 hover:scale-105 ${
                                copiedIndex === index
                                  ? "bg-green-600 hover:bg-green-700 text-white"
                                  : "bg-background/80 hover:bg-background"
                              }`}
                            >
                              {copiedIndex === index ? (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                          <div className="rounded-lg border bg-slate-50 dark:bg-slate-950 overflow-hidden">
                            <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 border-b">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs font-mono">
                                  TypeScript
                                </Badge>
                                <span className="text-sm font-mono text-muted-foreground">
                                  {comp.propsInfo.propsInterfaceName}
                                </span>
                              </div>
                            </div>
                            <div className="p-4 font-mono text-sm overflow-x-auto">
                              <div className="text-blue-600 dark:text-blue-400">
                                interface <span className="text-green-600 dark:text-green-400 font-semibold">{comp.propsInfo.propsInterfaceName}</span>
                                {comp.propsInfo.extendsFrom && comp.propsInfo.extendsFrom.length > 0 && (
                                  <span className="text-purple-600 dark:text-purple-400">
                                    {" extends "}
                                    <span className="text-orange-600 dark:text-orange-400">
                                      {comp.propsInfo.extendsFrom.join(", ")}
                                    </span>
                                  </span>
                                )}
                                {" {"}
                              </div>
                              <div className="ml-4 mt-2 space-y-2">
                                {comp.propsInfo.props.map((prop) => (
                                  <div key={prop.name} className="group hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded transition-colors">
                                    {prop.description && (
                                      <div className="text-green-600 dark:text-green-400 text-xs mb-1 italic">
                                        {`/** ${prop.description} */`}
                                      </div>
                                    )}
                                    <div className="flex items-center">
                                      <span className={`font-semibold ${prop.required 
                                        ? 'text-red-600 dark:text-red-400' 
                                        : 'text-blue-600 dark:text-blue-400'
                                      }`}>
                                        {prop.name}
                                      </span>
                                      <span className={`${prop.required 
                                        ? 'text-red-500 dark:text-red-500 font-bold' 
                                        : 'text-blue-500 dark:text-blue-500'
                                      }`}>
                                        {prop.required ? "" : "?"}
                                      </span>
                                      <span className="text-gray-600 dark:text-gray-400">: </span>
                                      <span className="text-orange-600 dark:text-orange-400 font-medium">
                                        {prop.type}
                                      </span>
                                      <span className="text-gray-600 dark:text-gray-400">;</span>
                                      {prop.required && (
                                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded dark:bg-red-900/30 dark:text-red-300">
                                          required
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="text-blue-600 dark:text-blue-400 mt-2">{"}"}</div>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-6 animate-in fade-in-50 duration-500 delay-200" />
                      </div>
                    )}

                    {/* AST-extracted Props */}
                    {comp.propsInfo?.props && comp.propsInfo.props.length > 0 ? (
                      <div className="space-y-4">
                        <h5 className="text-md font-medium flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          Detailed Props Information
                        </h5>
                        
                        {comp.propsInfo.props.map((prop, propIndex) => (
                          <div
                            key={prop.name}
                            className="group p-6 rounded-lg border bg-card hover:bg-muted/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02] animate-in slide-in-from-left-4 fade-in-0"
                            style={{
                              animationDelay: `${propIndex * 100}ms`,
                              animationFillMode: "both",
                            }}
                          >
                            <div className="space-y-3">
                              {/* Prop Header */}
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <code className="text-sm font-mono font-bold text-primary transition-colors duration-200 group-hover:text-primary/80">
                                      {prop.name}
                                    </code>
                                    {prop.required ? (
                                      <Badge variant="destructive" className="text-xs bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
                                        required
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-700">
                                        optional
                                      </Badge>
                                    )}
                                    {prop.isUnion && (
                                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700">
                                        union
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  {/* Type Information */}
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-muted-foreground">Type:</span>
                                      <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                                        {prop.type}
                                      </code>
                                    </div>
                                    
                                    {/* Union Types */}
                                    {prop.unionTypes && prop.unionTypes.length > 0 && (
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs text-muted-foreground">Options:</span>
                                        {prop.unionTypes.map((unionType, idx) => (
                                          <Badge
                                            key={idx}
                                            variant="outline"
                                            className="text-xs font-mono"
                                          >
                                            {unionType}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                    
                                    {/* Enum Values */}
                                    {prop.enumValues && prop.enumValues.length > 0 && (
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs text-muted-foreground">Values:</span>
                                        {prop.enumValues.map((enumValue, idx) => (
                                          <Badge
                                            key={idx}
                                            variant="secondary"
                                            className="text-xs font-mono"
                                          >
                                            {enumValue}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Default Value */}
                                {prop.defaultValue !== undefined && (
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="default"
                                      className="text-xs font-mono bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700 transition-all duration-200 group-hover:scale-105"
                                    >
                                      default
                                    </Badge>
                                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-green-700 dark:text-green-300">
                                      {typeof prop.defaultValue === 'string' 
                                        ? `"${prop.defaultValue}"` 
                                        : JSON.stringify(prop.defaultValue)}
                                    </code>
                                  </div>
                                )}
                              </div>

                              {/* Description */}
                              {prop.description && (
                                <div className="pt-2 border-t border-dashed">
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {prop.description}
                                  </p>
                                </div>
                              )}

                              {/* Tags */}
                              {prop.tags && prop.tags.length > 0 && (
                                <div className="flex items-center gap-2 flex-wrap pt-1">
                                  <span className="text-xs text-muted-foreground">Tags:</span>
                                  {prop.tags.map((tag, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      @{tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                        <Separator className="my-6 animate-in fade-in-50 duration-500 delay-300" />
                      </div>
                    ) : null}

                    {/* Fallback to Default Props */}
                    {(!comp.propsInfo?.props || comp.propsInfo.props.length === 0) &&
                    comp.defaultProps &&
                    Object.keys(comp.defaultProps).length > 0 ? (
                      <div className="space-y-4">
                        <h5 className="text-md font-medium flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-orange-500" />
                          Default Props (Fallback)
                        </h5>
                        
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
                      </div>
                    ) : null}

                    {/* Extends Information */}
                    {comp.propsInfo?.extendsFrom && comp.propsInfo.extendsFrom.length > 0 && (
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 animate-in slide-in-from-bottom-4 duration-500 delay-500">
                        <h5 className="text-sm font-medium mb-2 text-green-900 dark:text-green-100">
                          Extends
                        </h5>
                        <div className="flex gap-2 flex-wrap">
                          {comp.propsInfo.extendsFrom.map((extend, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs font-mono text-green-800 dark:text-green-200"
                            >
                              {extend}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Examples */}
                    {comp.propsInfo?.examples && comp.propsInfo.examples.length > 0 && (
                      <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 animate-in slide-in-from-bottom-4 duration-500 delay-600">
                        <h5 className="text-sm font-medium mb-3 text-purple-900 dark:text-purple-100">
                          Examples
                        </h5>
                        <div className="space-y-2">
                          {comp.propsInfo.examples.map((example, idx) => (
                            <pre key={idx} className="text-xs bg-background p-2 rounded border overflow-x-auto">
                              <code>{example}</code>
                            </pre>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No Props State */}
                    {(!comp.propsInfo?.props || comp.propsInfo.props.length === 0) &&
                    (!comp.defaultProps || Object.keys(comp.defaultProps).length === 0) && (
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
