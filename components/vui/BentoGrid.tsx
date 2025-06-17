"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  hoverable?: boolean;
}

const BentoCard = ({ className, children, delay = 0, hoverable = true }: BentoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        bounce: 0.3
      }}
      whileHover={hoverable ? { 
        scale: 1.02, 
        rotateY: 5,
        rotateX: 5,
        z: 50
      } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "rounded-3xl border bg-background shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative group",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
      <AnimatePresence>
        {isHovered && hoverable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FloatingParticles = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            y: [
              Math.random() * 100 + "%", 
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const AnimatedText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="inline-block"
    >
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + i * 0.05 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const PulsingOrb = ({ size = "w-4 h-4", color = "bg-purple-500" }) => {
  return (
    <motion.div
      className={cn("rounded-full", size, color)}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export function BentoGridShowcase() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 relative">
      {/* Global ambient lighting effect */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      
      <div className="grid grid-cols-6 gap-6 h-[700px]">
        {/* Hero Card - "Better Now Closer" */}
        <BentoCard 
          className="col-span-3 row-span-2 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-100 border-orange-200/50 p-8 relative overflow-hidden"
          delay={0.1}
        >
          <FloatingParticles count={15} />
          <div className="h-full flex flex-col justify-between relative z-10">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent leading-[0.85] tracking-tight">
                  <AnimatedText delay={0.5}>better</AnimatedText>
                  <br />
                  <AnimatedText delay={0.8}>now </AnimatedText>
                  <motion.span 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    closer
                  </motion.span>
                </h1>
              </motion.div>
              
              <motion.div 
                className="flex space-x-4 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                {[
                  { bg: "from-yellow-300 to-amber-400", border: "border-amber-500", emoji: "👨‍💻", name: "Dev" },
                  { bg: "from-rose-300 to-pink-400", border: "border-pink-500", emoji: "👩‍🎨", name: "Designer" },
                  { bg: "from-blue-300 to-indigo-400", border: "border-indigo-500", emoji: "👨‍💼", name: "Manager" },
                ].map((person, i) => (
                  <motion.div
                    key={i}
                    className="relative group cursor-pointer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.7 + i * 0.1 }}
                  >
                    <div className={cn(
                      "w-20 h-24 bg-gradient-to-b rounded-2xl border-3 shadow-lg flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-xl",
                      person.bg,
                      person.border
                    )}>
                      <span className="text-2xl mb-1">{person.emoji}</span>
                      <span className="text-xs font-bold text-gray-700">{person.name}</span>
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-md"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Creative bottom decoration */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </BentoCard>

        {/* Enhanced Handshake Card */}
        <BentoCard 
          className="col-span-3 bg-gradient-to-br from-teal-500 via-emerald-600 to-cyan-600 p-8 relative overflow-hidden"
          delay={0.2}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <FloatingParticles count={10} />
          <div className="h-full flex items-center justify-center relative z-10">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-8xl mb-6 filter drop-shadow-lg"
                animate={{ 
                  rotateY: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🤝
              </motion.div>
              <motion.div 
                className="flex justify-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white/60 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ 
                      duration: 1.5, 
                      delay: i * 0.2,
                      repeat: Infinity 
                    }}
                  />
                ))}
              </motion.div>
              <motion.p
                className="text-white/80 font-medium mt-4 text-lg tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Partnership Excellence
              </motion.p>
            </motion.div>
          </div>
        </BentoCard>

        {/* Creative Team Adaptation Card */}
        <BentoCard 
          className="col-span-2 bg-gradient-to-br from-red-500 via-rose-600 to-pink-600 text-white p-6 relative overflow-hidden"
          delay={0.3}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
          <div className="h-full flex flex-col justify-between relative z-10">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.25)" }}
              >
                <motion.div 
                  className="text-sm font-bold opacity-90"
                  animate={{ color: ["#fff", "#fbbf24", "#fff"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  24 Mar
                </motion.div>
                <div className="text-xs opacity-75 mt-1">09:00-10:00</div>
                <div className="flex justify-center mt-2 space-x-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <PulsingOrb key={i} size="w-2 h-2" color="bg-yellow-300" />
                  ))}
                </div>
              </motion.div>
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-2xl font-black italic bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                  Team
                </h3>
                <h3 className="text-2xl font-black italic bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
                  Adaptation
                </h3>
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.span 
                className="text-xs bg-white/20 px-3 py-2 rounded-full backdrop-blur-sm font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
              >
                HR grooming
              </motion.span>
              <motion.span 
                className="text-3xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📋
              </motion.span>
            </motion.div>
          </div>
        </BentoCard>

        {/* Enhanced Sync Card */}
        <BentoCard 
          className="col-span-2 bg-gradient-to-br from-slate-50 to-white border-slate-200 p-6 relative overflow-hidden"
          delay={0.4}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5" />
          <div className="h-full flex flex-col justify-center items-center text-center space-y-6 relative z-10">
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg"
                animate={{ 
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <h2 className="text-4xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                sync
              </h2>
            </motion.div>
            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.2,
                    repeat: Infinity 
                  }}
                />
              ))}
            </motion.div>
          </div>
        </BentoCard>

        {/* Enhanced "Bring People Together" Card */}
        <BentoCard 
          className="col-span-2 row-span-2 bg-gradient-to-br from-slate-50 via-white to-blue-50 border-slate-200 p-6 relative overflow-hidden"
          delay={0.5}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -mr-20 -mt-20" />
          <div className="h-full flex flex-col justify-between relative z-10">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-4xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-red-700 bg-clip-text text-transparent leading-tight">
                Bring People<br />
                <motion.span
                  animate={{ backgroundPosition: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="bg-gradient-to-r from-red-600 via-purple-600 to-red-600 bg-clip-text text-transparent bg-200%"
                >
                  Together
                </motion.span>
              </h2>
              <motion.p 
                className="text-slate-500 text-sm font-mono tracking-wider"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                [ sync.com ]
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { bg: "from-yellow-300 to-amber-400", border: "border-amber-500", emoji: "👱‍♂️" },
                { bg: "from-emerald-300 to-green-400", border: "border-green-500", emoji: "👨‍💼" },
                { bg: "from-blue-300 to-indigo-400", border: "border-indigo-500", emoji: "👩‍💼" }
              ].map((person, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "w-16 h-16 rounded-full bg-gradient-to-br border-3 shadow-lg flex items-center justify-center cursor-pointer relative group",
                    person.bg,
                    person.border
                  )}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    rotateY: 15,
                    rotateX: 10
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    y: [0, -2, 0],
                  }}
                                     transition={{ 
                     y: { duration: 2, delay: i * 0.3, repeat: Infinity },
                     type: "spring", 
                     stiffness: 300
                   }}
                >
                  <span className="text-xl relative z-10">{person.emoji}</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 blur-md"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </BentoCard>

        {/* Enhanced Chat Interface Card */}
        <BentoCard 
          className="col-span-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 border-slate-200 p-8 relative overflow-hidden"
          delay={0.6}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />
          <div className="h-full flex flex-col justify-between space-y-6 relative z-10">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-3xl rounded-bl-lg text-sm font-medium shadow-lg relative"
                  whileHover={{ scale: 1.02 }}
                >
                  Hi! Where are you?
                  <motion.div
                    className="absolute -bottom-1 left-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-teal-600"
                  />
                </motion.div>
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-red-300 to-rose-400 border-3 border-white shadow-lg flex-shrink-0 mt-1 relative overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4 justify-end"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 to-green-400 border-3 border-white shadow-lg flex-shrink-0 mt-1 relative overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-3xl rounded-br-lg text-sm font-medium shadow-lg border border-green-200 relative"
                  whileHover={{ scale: 1.02 }}
                >
                  I&apos;ll be in touch
                  <motion.div
                    className="absolute -bottom-1 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-green-100"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white px-6 py-4 rounded-3xl shadow-2xl relative overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" />
              <div className="flex items-center justify-between relative z-10">
                <motion.p 
                  className="text-sm font-medium"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  I&apos;ll be in touch
                </motion.p>
                <motion.div 
                  className="flex space-x-3 ml-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  {[
                    { bg: "from-yellow-400 to-amber-500", border: "border-yellow-600" },
                    { bg: "from-emerald-400 to-green-500", border: "border-green-600" },
                    { bg: "from-blue-400 to-indigo-500", border: "border-indigo-600" }
                  ].map((avatar, i) => (
                    <motion.div
                      key={i}
                      className={cn(
                        "w-8 h-8 rounded-full bg-gradient-to-br border-2 flex items-center justify-center cursor-pointer relative overflow-hidden",
                        avatar.bg,
                        avatar.border
                      )}
                      whileHover={{ scale: 1.2, y: -2 }}
                      animate={{ 
                        y: [0, -1, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        y: { duration: 2, delay: i * 0.5, repeat: Infinity },
                        scale: { duration: 3, delay: i * 0.7, repeat: Infinity }
                      }}
                    >
                      <span className="text-xs relative z-10">👤</span>
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
