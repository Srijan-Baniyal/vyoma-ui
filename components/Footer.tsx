"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Icons } from "@/components/ui/Icons"
import { Button } from "@/components/ui/button"

export default function Footer() {
  // This prevents the footer from rendering during initial hydration
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render the footer until client-side hydration is complete
  if (!mounted) {
    return null
  }

  return (
    <footer className="w-full bg-background border-t py-12 px-4 md:px-6 relative z-0 clear-both">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-24 h-24" />
              <h2 className="text-lg font-bold">Vyoma UI</h2>
            </Link>

            <h1 className="text-muted-foreground mt-4">
              Build by{" "}
              <span className="text-primary">
                <Link href="https://github.com/Srijan-Baniyal" target="_blank">
                  @srijanbaniyal
                </Link>
              </span>
            </h1>
            <div className="mt-2">
              <Link href="https://x.com/compose/tweet?text=I%27ve%20been%20using%20%VyomaUI%20share%20yourthought%20%@srijanbaniyal%20">
                <Button variant="secondary">
                  Share Your Thoughts On
                  <Icons.twitter className="icon-class ml-1 w-3.5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-5">
              © {new Date().getFullYear()} Vyoma UI. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="/blocks" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blocks
                  </Link>
                </li>
                <li>
                  <Link href="/colors" className="text-muted-foreground hover:text-foreground transition-colors">
                    Colors
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/Srijan-Baniyal/VyomaUI"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/srijan-baniyal/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/tos" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-8 items-center justify-center">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 dark:from-neutral-300 dark:to-neutral-500 select-none">
            VYOMA UI
          </h1>
        </div>
      </div>
    </footer>
  )
}
