"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

// MUI imports
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiSwitch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { pink } from "@mui/material/colors";

/* --------------------------- MUI Custom Switches --------------------------- */

const MaterialUISwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Android12Switch = styled(MuiSwitch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const IOSSwitch = styled((props: any) => (
  <MuiSwitch disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const AntSwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-thumb": {
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], { duration: 200 }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
  },
}));

const PinkSwitch = styled(MuiSwitch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

/* ------------------------ Main Component ------------------------ */

export default function SwitchShowcase() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12 md:space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Switch Components
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Clean, accessible, and animated toggle switches — built with Vyoma
            UI and Framer Motion.
          </p>
        </div>

        {/* Switch Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-900/40 dark:to-gray-800/20 backdrop-blur-xl border border-border/50 shadow-xl rounded-3xl p-6 md:p-10"
        >
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-2xl md:text-3xl font-bold text-primary">
                Toggle Preferences
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Simple, elegant switch controls with subtle motion.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ToggleItem label="Dark Mode" />
                <ToggleItem label="Email Notifications" />
                <ToggleItem label="Auto Sync" />
                <ToggleItem label="Enable Sounds" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Switch Variations */}
        <div className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Switch Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <SwitchVariant
              title="Classic Switch"
              desc="Clean and simple toggle style."
              variant="classic"
            />
            <SwitchVariant
              title="Neon Glow"
              desc="Bright glow effect on active state."
              variant="neon"
            />
            <SwitchVariant
              title="Glass Morphic"
              desc="Translucent background and soft edges."
              variant="glass"
            />
            <SwitchVariant
              title="Gradient Track"
              desc="Vibrant gradient background transitions."
              variant="gradient"
            />
          </div>
        </div>

        {/* MUI Switches Section */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            MUI Switches
          </h2>
          <FormGroup className="space-y-4">
            <FormControlLabel
              control={<Android12Switch defaultChecked />}
              label="Android 12"
            />
            <FormControlLabel
              control={<IOSSwitch defaultChecked />}
              label=" iOS Style"
            />
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Off</Typography>
              <AntSwitch defaultChecked inputProps={{ "aria-label": "ant design" }} />
              <Typography>On</Typography>
            </Stack>
          </FormGroup>
        </div>

        {/* Colored Switches Section */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Colored Switches
          </h2>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <MuiSwitch {...label} defaultChecked />
            <MuiSwitch {...label} defaultChecked color="secondary" />
            <MuiSwitch {...label} defaultChecked color="warning" />
            <MuiSwitch {...label} defaultChecked color="default" />
            <PinkSwitch {...label} defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
      <Label className="text-white font-medium">{label}</Label>
      <Switch />
    </div>
  );
}

type SwitchVariantProps = {
  title: string;
  desc: string;
  variant: "classic" | "neon" | "glass" | "gradient" | "emoji";
};

function SwitchVariant({ title, desc, variant }: SwitchVariantProps) {
  const variantClasses: Record<string, string> = {
    classic:
      "data-[state=checked]:bg-primary/80 data-[state=unchecked]:bg-gray-400",
    neon: "relative data-[state=checked]:bg-primary shadow-[0_0_15px_var(--tw-shadow-color)] shadow-primary/60 transition-shadow duration-300",
    glass:
      "backdrop-blur-md bg-white/10 border border-white/20 data-[state=checked]:bg-primary/60",
    gradient:
      "bg-gradient-to-r from-pink-500 to-purple-500 data-[state=unchecked]:from-gray-400 data-[state=unchecked]:to-gray-500",
    emoji:
      "relative data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-500",
  };

  return (
    <Card className="bg-gradient-to-br from-white/5 to-white/10 border border-border/30 shadow-lg backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          {title}
        </CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4">
          <Label className="text-white">Toggle Option</Label>

          {/* Emoji switch with icons */}
          {variant === "emoji" ? (
            <div className="relative w-[52px] h-[28px]">
              <Switch className="peer w-full h-full rounded-full bg-gray-500 data-[state=checked]:bg-yellow-400 transition-colors" />

              {/* Thumb */}
              <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all peer-checked:left-[calc(100%-1.5rem)] flex items-center justify-center">
                <span className="text-sm peer-checked:hidden">☀️</span>
                <span className="text-sm hidden peer-checked:flex">🌙</span>
              </div>
            </div>
          ) : (
            <Switch
              className={`${variantClasses[variant]} w-[52px] h-[28px] rounded-full`}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
