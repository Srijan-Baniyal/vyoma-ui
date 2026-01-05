"use client";

import { Icons } from "@/components/ui/Icons";
import { Pill, type PillProps } from "@/components/ui/pill";

export function VuiPill(props: PillProps) {
  return <Pill {...props} />;
}

export function PillShowcase() {
  const variants: NonNullable<PillProps["variant"]>[] = [
    "default",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
    "outline",
  ];

  const statuses: NonNullable<PillProps["status"]>[] = [
    "none",
    "active",
    "inactive",
    "warning",
    "error",
    "info",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-16">
        {/* Header */}
        <div className="space-y-3 text-center sm:space-y-4">
          <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text font-bold text-3xl text-transparent sm:text-5xl">
            Pill Component
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Lightweight labels &amp; status indicators – with variants, sizes
            and optional icons.
          </p>
        </div>

        {/* Variant grid */}
        <section className="space-y-6">
          <h2 className="text-center font-semibold text-xl sm:text-2xl">
            Variants
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {variants.map((variant) => {
              const variantEmoji: Record<string, string> = {
                default: "🏷️",
                secondary: "📌",
                success: "✅",
                warning: "⚠️",
                error: "❌",
                info: "ℹ️",
                outline: "🔲",
              };

              return (
                <VuiPill
                  icon={
                    <span aria-label={variant} role="img">
                      {variantEmoji[variant]}
                    </span>
                  }
                  key={variant}
                  variant={variant as PillProps["variant"]}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </VuiPill>
              );
            })}
          </div>
        </section>

        {/* Status indicators */}
        <section className="space-y-6">
          <h2 className="text-center font-semibold text-xl sm:text-2xl">
            Statuses
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {statuses.map((status) => {
              const statusEmoji: Record<string, string> = {
                none: "🏷️",
                active: "🟢",
                inactive: "⚪",
                warning: "⚠️",
                error: "🔴",
                info: "ℹ️",
              };

              return (
                <VuiPill
                  icon={
                    <span aria-label={status} role="img">
                      {statusEmoji[status]}
                    </span>
                  }
                  key={status}
                  status={status as PillProps["status"]}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </VuiPill>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export function PillTheme() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <VuiPill
        icon={
          <span aria-label="label" role="img">
            🏷️
          </span>
        }
      >
        Default
      </VuiPill>
      <VuiPill
        icon={<Icons.gitHub className="h-4 w-4" />}
        status="active"
        variant="success"
      >
        Deployed
      </VuiPill>
      <VuiPill
        icon={<Icons.twitter className="h-4 w-4" />}
        status="warning"
        variant="warning"
      >
        Pending
      </VuiPill>
      <VuiPill
        icon={<Icons.npm className="h-4 w-4" />}
        status="error"
        variant="error"
      >
        Failed
      </VuiPill>
    </div>
  );
}
