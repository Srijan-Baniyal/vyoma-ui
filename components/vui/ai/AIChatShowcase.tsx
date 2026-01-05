// AIChatShowcase.tsx
"use client";

import { Check, Code, Copy, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/buttonShadcn";
import { cn } from "@/lib/utils";
import { AIChat } from "./AIChat";

const glassPanel =
  "bg-background/70 dark:bg-background/60 backdrop-blur-xl backdrop-saturate-150 border border-border/50 shadow-lg";

export default function AIChatShowcase() {
  const [apiKey, setApiKey] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = `import { AIChat } from '@/components/vui/ai/AIChat';

export default function MyChat() {
  return (
    <AIChat
      apiKey="your-openai-api-key"
      model="gpt-3.5-turbo"
      placeholder="Ask me anything..."
      maxHeight="600px"
      systemPrompt="You are a helpful AI assistant."
      onMessageSent={(message) => console.log('Sent:', message)}
      onResponseReceived={(response) => console.log('Received:', response)}
      onError={(error) => console.error('Error:', error)}
      className="max-w-2xl mx-auto"
    />
  );
}`;

    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-4xl text-transparent">
          AI Chat Component
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          A ready-to-use AI chat component with OpenAI integration. Just add
          your API key and start chatting!
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowCode(false)}
          variant={showCode ? "outline" : "default"}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowCode(true)}
          variant={showCode ? "default" : "outline"}
        >
          <Code className="h-4 w-4" />
          Code
        </Button>
      </div>

      {/* Content */}
      {showCode ? (
        <div className={cn("relative rounded-2xl p-6", glassPanel)}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-lg">Usage Example</h3>
            <Button
              className="flex items-center gap-2"
              onClick={handleCopy}
              size="sm"
              variant="outline"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-muted/50 p-4 text-sm">
            <code>{`import { AIChat } from '@/components/vui/ai/AIChat';

export default function MyChat() {
  return (
    <AIChat
      apiKey="your-openai-api-key"
      model="gpt-3.5-turbo"
      placeholder="Ask me anything..."
      maxHeight="600px"
      systemPrompt="You are a helpful AI assistant."
      onMessageSent={(message) => console.log('Sent:', message)}
      onResponseReceived={(response) => console.log('Received:', response)}
      onError={(error) => console.error('Error:', error)}
      className="max-w-2xl mx-auto"
    />
  );
}`}</code>
          </pre>
        </div>
      ) : (
        <div className="space-y-6">
          {/* API Key Input */}
          {!apiKey && (
            <div className={cn("mx-auto max-w-md rounded-2xl p-6", glassPanel)}>
              <h3 className="mb-4 font-semibold text-lg">
                Enter OpenAI API Key
              </h3>
              <div className="space-y-3">
                <input
                  className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  type="password"
                />
                <p className="text-muted-foreground text-xs">
                  Your API key is only used locally and never stored.
                </p>
              </div>
            </div>
          )}

          {/* Chat Component */}
          {apiKey && (
            <div className="mx-auto max-w-2xl">
              <AIChat
                apiKey={apiKey}
                maxHeight="500px"
                model="gpt-3.5-turbo"
                onError={(error) => console.error("Chat error:", error)}
                onMessageSent={(message) =>
                  console.log("Message sent:", message)
                }
                onResponseReceived={(response) =>
                  console.log("Response received:", response)
                }
                placeholder="Ask me anything... ✨"
                systemPrompt="You are a helpful AI assistant. Be concise and friendly."
              />
            </div>
          )}
        </div>
      )}

      {/* Features */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "OpenAI Integration",
            desc: "Direct integration with OpenAI's API",
          },
          {
            title: "Real-time Chat",
            desc: "Smooth typing indicators and message flow",
          },
          {
            title: "Error Handling",
            desc: "Graceful error states and recovery",
          },
          {
            title: "Customizable",
            desc: "Multiple props for styling and behavior",
          },
          {
            title: "TypeScript",
            desc: "Fully typed for better developer experience",
          },
          {
            title: "Responsive",
            desc: "Works perfectly on mobile and desktop",
          },
        ].map((feature, i) => (
          <div className={cn("rounded-xl p-4", glassPanel)} key={i}>
            <h4 className="mb-2 font-semibold">{feature.title}</h4>
            <p className="text-muted-foreground text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
