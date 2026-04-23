"use client";

import { useEffect } from "react";

interface WebMcpTool {
  description: string;
  execute: (input: unknown) => Promise<unknown> | unknown;
  inputSchema: Record<string, unknown>;
  name: string;
}

interface ModelContextApi {
  provideContext?: (
    context: { tools: WebMcpTool[] },
    options?: {
      signal?: AbortSignal;
    }
  ) => Promise<void> | void;
  registerTool?: (
    tool: WebMcpTool,
    options?: {
      signal?: AbortSignal;
    }
  ) => Promise<void> | void;
}

interface NavigatorWithModelContext extends Navigator {
  modelContext?: ModelContextApi;
}

const tools: WebMcpTool[] = [
  {
    name: "list_primary_pages",
    description: "Lists key Vyoma UI pages for navigation.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: () => ({
      pages: [
        { name: "Home", path: "/" },
        { name: "Showcase", path: "/showcase" },
        { name: "Themes", path: "/Themes" },
        { name: "API Docs", path: "/docs/api" },
      ],
    }),
  },
  {
    name: "search_components",
    description: "Searches Vyoma UI component metadata by keyword.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search text for component name, category, or description.",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    execute: async (input) => {
      const query =
        typeof input === "object" && input !== null && "query" in input
          ? String((input as { query: unknown }).query)
          : "";

      const response = await fetch(
        `/api/agent/components?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        return {
          error: "search_failed",
          status: response.status,
        };
      }

      return response.json();
    },
  },
];

const registerWebMcpTools = async (
  modelContext: ModelContextApi,
  controller: AbortController
): Promise<void> => {
  if (typeof modelContext.registerTool === "function") {
    for (const tool of tools) {
      await modelContext.registerTool(tool, { signal: controller.signal });
    }
    return;
  }

  if (typeof modelContext.provideContext === "function") {
    await modelContext.provideContext({ tools }, { signal: controller.signal });
  }
};

const ignoreRegistrationError = (): undefined => undefined;

export default function WebMcpProvider() {
  useEffect(() => {
    const navigatorWithModelContext = navigator as NavigatorWithModelContext;
    const modelContext = navigatorWithModelContext.modelContext;

    if (!modelContext) {
      return;
    }

    const controller = new AbortController();
    registerWebMcpTools(modelContext, controller).catch(
      ignoreRegistrationError
    );

    return () => {
      controller.abort();
    };
  }, []);

  return null;
}
