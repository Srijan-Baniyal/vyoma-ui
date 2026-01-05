"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Heart, User, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/buttonShadcn";

// Static Unsplash images - replace these URLs with your preferred images
const staticImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    alt: "Beautiful mountain landscape with reflection in lake",
    photographer: "John Doe",
    username: "johndoe",
    likes: 1240,
    downloads: 892,
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    alt: "Misty forest with tall trees",
    photographer: "Jane Smith",
    username: "janesmith",
    likes: 856,
    downloads: 634,
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    alt: "Serene lake surrounded by mountains",
    photographer: "Mike Johnson",
    username: "mikej",
    likes: 2103,
    downloads: 1456,
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80",
    alt: "Desert sand dunes at sunset",
    photographer: "Sarah Wilson",
    username: "sarahw",
    likes: 945,
    downloads: 723,
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80",
    alt: "Rolling green hills countryside",
    photographer: "Tom Brown",
    username: "tombrown",
    likes: 678,
    downloads: 445,
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80",
    alt: "Ocean waves crashing on rocks",
    photographer: "Lisa Davis",
    username: "lisad",
    likes: 1567,
    downloads: 1203,
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=80",
    alt: "Snow-capped mountain peaks",
    photographer: "Alex Chen",
    username: "alexc",
    likes: 892,
    downloads: 567,
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
    alt: "Autumn forest with golden leaves",
    photographer: "Emma Taylor",
    username: "emmat",
    likes: 734,
    downloads: 489,
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    alt: "Peaceful valley with river",
    photographer: "David Lee",
    username: "davidl",
    likes: 1245,
    downloads: 834,
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    alt: "Dramatic cliff overlooking ocean",
    photographer: "Rachel Green",
    username: "rachelg",
    likes: 1876,
    downloads: 1345,
  },
  {
    id: "11",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    alt: "Majestic mountain range with golden sunrise",
    photographer: "James Rodriguez",
    username: "jamesrod",
    likes: 2234,
    downloads: 1567,
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    alt: "Majestic mountain range with golden sunrise",
    photographer: "James Rodriguez",
    username: "jamesrod",
    likes: 2234,
    downloads: 1567,
  },
];

// Responsive grid items with different layouts for different screen sizes
const gridItems = [
  {
    id: 1,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1 md:col-span-3 md:row-span-1 lg:col-span-3 lg:row-span-1",
  },
  {
    id: 2,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1 md:col-span-3 md:row-span-1 lg:col-span-3 lg:row-span-1",
  },
  {
    id: 3,
    className:
      "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-4 md:row-span-2 lg:col-span-4 lg:row-span-2",
  },
  {
    id: 4,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 5,
    className:
      "col-span-2 row-span-1 sm:col-span-4 sm:row-span-1 md:col-span-6 md:row-span-1 lg:col-span-6 lg:row-span-1",
  },
  {
    id: 6,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 7,
    className:
      "col-span-2 row-span-2 sm:col-span-2 sm:row-span-3 md:col-span-4 md:row-span-3 lg:col-span-4 lg:row-span-3",
  },
  {
    id: 8,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1",
  },
  {
    id: 9,
    className:
      "col-span-2 row-span-1 sm:col-span-4 sm:row-span-1 md:col-span-6 md:row-span-1 lg:col-span-6 lg:row-span-1",
  },
  {
    id: 10,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 11,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 12,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  },
];

const gridItems2 = [
  {
    id: 1,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1 md:col-span-3 md:row-span-1 lg:col-span-3 lg:row-span-1",
  },
  {
    id: 2,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1 md:col-span-3 md:row-span-1 lg:col-span-3 lg:row-span-1",
  },
  {
    id: 3,
    className:
      "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-4 md:row-span-2 lg:col-span-4 lg:row-span-2",
  },
  {
    id: 4,
    className:
      "col-span-2 row-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  },
];

// Image Dialog Component
function ImageDialog({
  image,
  isOpen,
  onClose,
}: {
  image: (typeof staticImages)[0] | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // ESC key functionality
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset image loaded state when image changes
  React.useEffect(() => {
    setImageLoaded(false);
  }, []);

  if (!image) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 backdrop-blur-md sm:p-4"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            className="relative max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl sm:rounded-3xl dark:bg-gray-900"
            exit={{ scale: 0.5, opacity: 0, rotateX: 15 }}
            initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.3,
              ease: "easeOut",
            }}
          >
            {/* Enhanced Close Button */}
            <motion.button
              animate={{ opacity: 1, scale: 1 }}
              aria-label="Close dialog"
              className="absolute top-2 right-2 z-20 rounded-full bg-black/30 p-2 text-white backdrop-blur-lg transition-all duration-200 hover:scale-110 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50 sm:top-4 sm:right-4 sm:p-3"
              exit={{ opacity: 0, scale: 0.8 }}
              initial={{ opacity: 0, scale: 0.8 }}
              onClick={onClose}
              transition={{ delay: 0.2 }}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>

            {/* Image Container with Loading State */}
            <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-blue-500 sm:h-8 sm:w-8 dark:border-gray-600"
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </div>
              )}

              <motion.div
                animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                initial={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  alt={image.alt}
                  className="object-cover"
                  fill
                  onLoad={() => setImageLoaded(true)}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  src={image.url || "/placeholder.svg"}
                />
              </motion.div>

              {/* Image Overlay Gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Enhanced Image Info */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="border-gray-100 border-t bg-white p-4 sm:p-6 lg:p-8 dark:border-gray-800 dark:bg-gray-900"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="mb-4 flex flex-col justify-between gap-4 sm:mb-6 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <motion.h3
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-2 font-bold text-gray-900 text-lg leading-tight sm:mb-3 sm:text-xl lg:text-2xl dark:text-white"
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 }}
                  >
                    {image.alt}
                  </motion.h3>

                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-4 flex items-center text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center rounded-full bg-gray-100 px-2 py-1 text-sm sm:px-3 sm:py-2 dark:bg-gray-800">
                      <User className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      <span className="font-semibold">
                        {image.photographer}
                      </span>
                      <span className="mx-1 text-gray-400 sm:mx-2 dark:text-gray-500">
                        •
                      </span>
                      <span className="text-xs opacity-75 sm:text-sm">
                        @{image.username}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-4 sm:space-x-8"
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center rounded-full bg-red-50 px-3 py-1 sm:px-4 sm:py-2 dark:bg-red-900/20">
                    <Heart className="mr-1 h-4 w-4 text-red-500 sm:mr-2 sm:h-5 sm:w-5" />
                    <span className="font-bold text-gray-900 text-sm sm:text-base dark:text-white">
                      {image.likes.toLocaleString()}
                    </span>
                    <span className="ml-1 hidden text-gray-500 text-xs sm:inline sm:text-sm dark:text-gray-400">
                      likes
                    </span>
                  </div>

                  <div className="flex items-center rounded-full bg-blue-50 px-3 py-1 sm:px-4 sm:py-2 dark:bg-blue-900/20">
                    <Download className="mr-1 h-4 w-4 text-blue-500 sm:mr-2 sm:h-5 sm:w-5" />
                    <span className="font-bold text-gray-900 text-sm sm:text-base dark:text-white">
                      {image.downloads.toLocaleString()}
                    </span>
                    <span className="ml-1 hidden text-gray-500 text-xs sm:inline sm:text-sm dark:text-gray-400">
                      downloads
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  className="w-full sm:w-auto"
                  initial={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    className="w-full rounded-full bg-gray-900 px-4 py-2 font-semibold text-sm text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800 hover:shadow-lg focus:ring-2 focus:ring-gray-500 sm:w-auto sm:px-6 sm:py-3 sm:text-base lg:px-8 dark:bg-white dark:text-gray-900 dark:focus:ring-gray-300 dark:hover:bg-gray-100"
                    onClick={() =>
                      window.open(
                        `https://unsplash.com/@${image.username}`,
                        "_blank"
                      )
                    }
                  >
                    View on Unsplash
                  </Button>
                </motion.div>
              </div>

              {/* Additional Info */}
              <motion.div
                animate={{ opacity: 1 }}
                className="mt-4 border-gray-100 border-t pt-4 sm:mt-6 sm:pt-6 dark:border-gray-800"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-center text-gray-500 text-xs sm:text-sm dark:text-gray-400">
                  Press{" "}
                  <kbd className="rounded bg-gray-100 px-1 py-1 font-mono text-xs sm:px-2 dark:bg-gray-800">
                    ESC
                  </kbd>{" "}
                  to close
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BentoGrid() {
  const [refreshKey] = useState(0);
  const [selectedImage, setSelectedImage] = useState<
    (typeof staticImages)[0] | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const openImageDialog = (image: (typeof staticImages)[0]) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  const closeImageDialog = () => {
    setDialogOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="grid auto-rows-[150px] grid-cols-2 gap-2 sm:auto-rows-[180px] sm:grid-cols-4 sm:gap-3 md:grid-cols-4 lg:auto-rows-[200px] lg:grid-cols-6 lg:gap-4">
        <AnimatePresence mode="wait">
          {gridItems.map((item, index) => {
            const image = staticImages[index];
            if (!image) {
              return null;
            }

            const isHovered = hoveredItem === image.id;

            return (
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`${item.className} group relative cursor-pointer overflow-hidden rounded-xl bg-gray-200 sm:rounded-2xl dark:bg-gray-700`}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                key={`${image.id}-${refreshKey}`}
                onClick={() => openImageDialog(image)}
                onHoverEnd={() => setHoveredItem(null)}
                onHoverStart={() => setHoveredItem(image.id)}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.4, 0.0, 0.2, 1],
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                }}
                whileHover={{
                  scale: 1.02,
                  zIndex: 10,
                  rotateY: 1,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <Image
                  alt={image.alt}
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  src={image.url || "/placeholder.svg"}
                />

                {/* Enhanced Overlay with gradient animation */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />

                {/* Enhanced Content overlay with staggered animations */}
                <motion.div
                  animate={{
                    y: isHovered ? "0%" : "100%",
                    opacity: isHovered ? 1 : 0,
                  }}
                  className="absolute right-0 bottom-0 left-0 p-2 text-white sm:p-3 lg:p-4"
                  initial={{ y: "100%", opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0.0, 0.2, 1],
                    delay: isHovered ? 0.1 : 0,
                  }}
                >
                  <div className="space-y-2 sm:space-y-3">
                    <motion.div
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      transition={{ delay: isHovered ? 0.2 : 0, duration: 0.3 }}
                    >
                      <p className="mb-1 truncate font-bold text-xs drop-shadow-lg sm:text-sm">
                        {image.alt}
                      </p>
                      <p className="truncate text-xs opacity-90 drop-shadow-md">
                        by {image.photographer}
                      </p>
                    </motion.div>

                    <motion.div
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                      }}
                      className="flex flex-wrap items-center justify-between gap-1 text-xs sm:gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      transition={{ delay: isHovered ? 0.3 : 0, duration: 0.3 }}
                    >
                      <div className="flex flex-shrink-0 items-center space-x-1 sm:space-x-2">
                        <motion.span
                          className="flex items-center rounded-full border border-white/20 bg-white/20 px-1.5 py-0.5 text-xs backdrop-blur-md sm:px-2 sm:py-1"
                          transition={{ duration: 0.2 }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255,255,255,0.3)",
                          }}
                        >
                          <Heart className="mr-0.5 h-2.5 w-2.5 text-red-400 sm:mr-1 sm:h-3 sm:w-3" />
                          <span className="hidden sm:inline">
                            {image.likes}
                          </span>
                          <span className="sm:hidden">
                            {Math.floor(image.likes / 1000)}k
                          </span>
                        </motion.span>
                        <motion.span
                          className="flex items-center rounded-full border border-white/20 bg-white/20 px-1.5 py-0.5 text-xs backdrop-blur-md sm:px-2 sm:py-1"
                          transition={{ duration: 0.2 }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255,255,255,0.3)",
                          }}
                        >
                          <Download className="mr-0.5 h-2.5 w-2.5 text-blue-400 sm:mr-1 sm:h-3 sm:w-3" />
                          <span className="hidden sm:inline">
                            {image.downloads}
                          </span>
                          <span className="sm:hidden">
                            {Math.floor(image.downloads / 1000)}k
                          </span>
                        </motion.span>
                      </div>
                      <motion.div
                        animate={{
                          scale: isHovered ? [1, 1.02, 1] : 1,
                          opacity: isHovered ? [0.9, 1, 0.95] : 0.9,
                        }}
                        className="flex-shrink-0 whitespace-nowrap rounded-full border border-white/40 bg-white/30 px-1.5 py-0.5 font-medium text-xs backdrop-blur-md sm:px-2 sm:py-1"
                        transition={{
                          duration: 1.5,
                          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="hidden sm:inline">
                          Click to expand
                        </span>
                        <span className="sm:hidden">Tap</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Hover border effect with animated gradient */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    backgroundPosition: isHovered
                      ? ["0% 0%", "100% 100%"]
                      : "0% 0%",
                  }}
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 sm:rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1), rgba(255,255,255,0.4))",
                    backgroundSize: "200% 200%",
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    backgroundPosition: {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    },
                  }}
                />

                {/* Shimmer effect on hover - enhanced */}
                <motion.div
                  animate={{
                    x: isHovered ? "100%" : "-100%",
                  }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                    repeatDelay: 2,
                  }}
                />

                {/* Corner accent */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-white/60 backdrop-blur-sm sm:top-3 sm:left-3 sm:h-2 sm:w-2"
                  initial={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, delay: isHovered ? 0.4 : 0 }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Image Dialog */}
      <ImageDialog
        image={selectedImage}
        isOpen={dialogOpen}
        onClose={closeImageDialog}
      />
    </div>
  );
}

export function BentoGridShowcase() {
  return (
    <div className="space-y-4 bg-background p-4 sm:space-y-6 sm:p-6 lg:space-y-8 lg:p-8">
      <BentoGrid />
    </div>
  );
}

export function BentoGridTheme() {
  const [refreshKey] = useState(0);
  const [selectedImage, setSelectedImage] = useState<
    (typeof staticImages)[0] | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const openImageDialog = (image: (typeof staticImages)[0]) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  const closeImageDialog = () => {
    setDialogOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  return (
    <>
      <div className="grid auto-rows-[150px] grid-cols-5 gap-2 sm:auto-rows-[180px] sm:grid-cols-6 sm:gap-3 md:grid-cols-7 lg:auto-rows-[200px] lg:grid-cols-8 lg:gap-4">
        <AnimatePresence mode="wait">
          {gridItems2.map((item, index) => {
            const image = staticImages[index];
            if (!image) {
              return null;
            }
            const isHovered = hoveredItem === image.id;
            return (
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`${item.className} group relative cursor-pointer overflow-hidden rounded-xl bg-gray-200 sm:rounded-2xl dark:bg-gray-700`}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                key={`${image.id}-${refreshKey}`}
                onClick={() => openImageDialog(image)}
                onHoverEnd={() => setHoveredItem(null)}
                onHoverStart={() => setHoveredItem(image.id)}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.4, 0.0, 0.2, 1],
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                }}
                whileHover={{
                  scale: 1.02,
                  zIndex: 10,
                  rotateY: 1,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <Image
                  alt={image.alt}
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  src={image.url || "/placeholder.svg"}
                />

                {/* Enhanced Overlay with gradient animation */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />

                {/* Enhanced Content overlay with staggered animations */}
                <motion.div
                  animate={{
                    y: isHovered ? "0%" : "100%",
                    opacity: isHovered ? 1 : 0,
                  }}
                  className="absolute right-0 bottom-0 left-0 p-2 text-white sm:p-3 lg:p-4"
                  initial={{ y: "100%", opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0.0, 0.2, 1],
                    delay: isHovered ? 0.1 : 0,
                  }}
                >
                  <div className="space-y-2 sm:space-y-3">
                    <motion.div
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      transition={{ delay: isHovered ? 0.2 : 0, duration: 0.3 }}
                    >
                      <p className="mb-1 truncate font-bold text-xs drop-shadow-lg sm:text-sm">
                        {image.alt}
                      </p>
                      <p className="truncate text-xs opacity-90 drop-shadow-md">
                        by {image.photographer}
                      </p>
                    </motion.div>

                    <motion.div
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                      }}
                      className="flex flex-wrap items-center justify-between gap-1 text-xs sm:gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      transition={{ delay: isHovered ? 0.3 : 0, duration: 0.3 }}
                    >
                      <div className="flex flex-shrink-0 items-center space-x-1 sm:space-x-2">
                        <motion.span
                          className="flex items-center rounded-full border border-white/20 bg-white/20 px-1.5 py-0.5 text-xs backdrop-blur-md sm:px-2 sm:py-1"
                          transition={{ duration: 0.2 }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255,255,255,0.3)",
                          }}
                        >
                          <Heart className="mr-0.5 h-2.5 w-2.5 text-red-400 sm:mr-1 sm:h-3 sm:w-3" />
                          <span className="hidden sm:inline">
                            {image.likes}
                          </span>
                          <span className="sm:hidden">
                            {Math.floor(image.likes / 1000)}k
                          </span>
                        </motion.span>
                        <motion.span
                          className="flex items-center rounded-full border border-white/20 bg-white/20 px-1.5 py-0.5 text-xs backdrop-blur-md sm:px-2 sm:py-1"
                          transition={{ duration: 0.2 }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255,255,255,0.3)",
                          }}
                        >
                          <Download className="mr-0.5 h-2.5 w-2.5 text-blue-400 sm:mr-1 sm:h-3 sm:w-3" />
                          <span className="hidden sm:inline">
                            {image.downloads}
                          </span>
                          <span className="sm:hidden">
                            {Math.floor(image.downloads / 1000)}k
                          </span>
                        </motion.span>
                      </div>
                      <motion.div
                        animate={{
                          scale: isHovered ? [1, 1.02, 1] : 1,
                          opacity: isHovered ? [0.9, 1, 0.95] : 0.9,
                        }}
                        className="flex-shrink-0 whitespace-nowrap rounded-full border border-white/40 bg-white/30 px-1.5 py-0.5 font-medium text-xs backdrop-blur-md sm:px-2 sm:py-1"
                        transition={{
                          duration: 1.5,
                          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="hidden sm:inline">
                          Click to expand
                        </span>
                        <span className="sm:hidden">Tap</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Hover border effect with animated gradient */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    backgroundPosition: isHovered
                      ? ["0% 0%", "100% 100%"]
                      : "0% 0%",
                  }}
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 sm:rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1), rgba(255,255,255,0.4))",
                    backgroundSize: "200% 200%",
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    backgroundPosition: {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    },
                  }}
                />

                {/* Shimmer effect on hover - enhanced */}
                <motion.div
                  animate={{
                    x: isHovered ? "100%" : "-100%",
                  }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                    repeatDelay: 2,
                  }}
                />

                {/* Corner accent */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-white/60 backdrop-blur-sm sm:top-3 sm:left-3 sm:h-2 sm:w-2"
                  initial={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, delay: isHovered ? 0.4 : 0 }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <ImageDialog
        image={selectedImage}
        isOpen={dialogOpen}
        onClose={closeImageDialog}
      />
    </>
  );
}
