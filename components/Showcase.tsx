"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Project = {
  id: number
  name: string
  description: string
  image: string
  url: string
  category: string
  technologies: string[]
}

const showcaseProjects: Project[] = []

export default function Showcase() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects in Production</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover how businesses are leveraging our solutions to drive growth and innovation. See real implementations
          making a difference across various industries.
        </p>
      </div>

      {/* Showcase Grid */}
      {showcaseProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-6" />
          <h3 className="text-2xl font-semibold mb-2">Cooking something delicious...</h3>
          <p className="text-muted-foreground text-lg">Stay tuned! We are preparing some amazing showcases for you.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {showcaseProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      {project.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{project.name}</CardTitle>
                <CardDescription className="text-sm mb-4 line-clamp-2">{project.description}</CardDescription>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Visit Link */}
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  Visit Website
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Want Your Project Featured Here?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join our showcase and let the world see how you&apos;re using our solutions to transform your business. Get in
            touch to discuss featuring your implementation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="inline-flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Email Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
