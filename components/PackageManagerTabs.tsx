"use client";

import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import { Snippet } from "@/components/Snippet";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/Icons";
import {
  type PackageManagerType,
  usePackageManager,
} from "@/contexts/PackageManagerContext";

interface PackageManagerTab {
  color: string;
  command: string;
  description?: string;
  icon: React.ReactNode;
  id: string;
  name: string;
}

interface PackageManagerTabsProps {
  className?: string;
  command: string;
}

const getYarnCommand = (command: string) => {
  if (command.startsWith("create-next-app")) {
    return command.replace("create-next-app@latest", "create next-app");
  }
  return command;
};

const getPnpmCommand = (command: string) => {
  if (command.startsWith("create-next-app")) {
    return command.replace("create-next-app@latest", "create next-app");
  }
  return `dlx ${command}`;
};

const getBunCommand = (command: string) => {
  if (command.startsWith("create-next-app")) {
    return command.replace("create-next-app@latest", "create next-app");
  }
  return command;
};

const packageManagers: PackageManagerTab[] = [
  {
    id: "npm",
    name: "npm",
    icon: <Icons.npm className="h-4 w-4" />,
    command: "npx",
    color: "from-red-500 to-red-600",
    description: "Node Package Manager",
  },
  {
    id: "yarn",
    name: "Yarn",
    icon: <Icons.yarn className="h-4 w-4" />,
    command: "yarn",
    color: "from-blue-500 to-blue-600",
    description: "v1.22.22 (no dlx)",
  },
  {
    id: "pnpm",
    name: "pnpm",
    icon: <Icons.pnpm className="h-4 w-4" />,
    command: "pnpm",
    color: "from-orange-500 to-orange-600",
    description: "Efficient & Fast",
  },
  {
    id: "bun",
    name: "Bun",
    icon: <Icons.bun className="h-4 w-4" />,
    command: "bunx",
    color: "from-yellow-500 to-yellow-600",
    description: "Lightning Fast",
  },
];

export function PackageManagerTabs({
  command,
  className = "",
}: PackageManagerTabsProps) {
  const { selectedManager, setSelectedManager } = usePackageManager();
  const [activeTab, setActiveTab] =
    useState<PackageManagerType>(selectedManager);

  // Sync with global state
  useEffect(() => {
    setActiveTab(selectedManager);
  }, [selectedManager]);

  const activeManager =
    packageManagers.find((pm) => pm.id === activeTab) || packageManagers[0];

  const getFullCommand = () => {
    switch (activeManager.id) {
      case "yarn":
        if (command.startsWith("create-next-app")) {
          return `yarn ${getYarnCommand(command)}`;
        }
        // For non-create commands, show npx separately since yarn v1 doesn't support dlx
        return `npx ${command}`;
      case "pnpm":
        return `pnpm ${getPnpmCommand(command)}`;
      case "bun":
        return `bunx ${getBunCommand(command)}`;
      default:
        return `${activeManager.command} ${command}`;
    }
  };

  const fullCommand = getFullCommand();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 rounded-xl border bg-muted/50 p-1 backdrop-blur-sm">
        {packageManagers.map((pm) => (
          <button
            className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm transition-all duration-300 hover:scale-105 ${
              activeTab === pm.id
                ? "text-white shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
            key={pm.id}
            onClick={() => {
              setActiveTab(pm.id as PackageManagerType);
              setSelectedManager(pm.id as PackageManagerType);
            }}
            type="button"
          >
            {/* Active tab background */}
            {activeTab === pm.id && (
              <motion.div
                className={`absolute inset-0 bg-linear-to-r ${pm.color} rounded-lg`}
                initial={false}
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {/* Tab content */}
            <div className="relative z-10 flex items-center gap-2">
              <div
                className={`transition-transform duration-300 ${
                  activeTab === pm.id ? "scale-110" : ""
                }`}
              >
                {pm.icon}
              </div>
              <span className="hidden sm:inline">{pm.name}</span>
            </div>

            {/* Hover glow effect */}
            {activeTab !== pm.id && (
              <div
                className={`absolute inset-0 bg-linear-to-r ${pm.color} rounded-lg opacity-0 transition-opacity duration-300 hover:opacity-10`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Command Display */}
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          key={activeTab}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Card className="relative overflow-hidden border-0 bg-card/80 shadow-lg backdrop-blur-sm">
            {/* Animated gradient background */}
            <div
              className={`absolute inset-0 bg-linear-to-r ${activeManager.color} opacity-5`}
            />
            <div
              className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${activeManager.color}`}
            />

            <div className="relative p-6">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r ${activeManager.color} text-white shadow-lg`}
                >
                  {activeManager.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {activeManager.name}
                  </h3>
                  {activeManager.description && (
                    <p className="text-muted-foreground text-sm">
                      {activeManager.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Yarn v1 Disclaimer */}
              {activeManager.id === "yarn" && (
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/20">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                      <span className="font-bold text-amber-600 text-xs dark:text-amber-400">
                        !
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="mb-1 font-medium text-amber-800 dark:text-amber-200">
                        Using Yarn v1.22.22
                      </p>
                      <p className="text-amber-700 dark:text-amber-300">
                        This version does not support{" "}
                        <code className="rounded bg-amber-100 px-1 text-xs dark:bg-amber-900">
                          dlx
                        </code>
                        . For tools like shadcn, please run the{" "}
                        <code className="rounded bg-amber-100 px-1 text-xs dark:bg-amber-900">
                          npx
                        </code>{" "}
                        command separately.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Snippet text={fullCommand} />
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
