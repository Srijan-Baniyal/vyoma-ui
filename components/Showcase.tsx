"use client";

import { ExternalLink, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttonShadcn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
  technologies: string[];
}

const showcaseProjects: Project[] = [];

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24">
    <span
      aria-label="Rocket"
      className="mb-4 animate-bounce text-6xl"
      role="img"
    >
      🚀
    </span>
    <h3 className="mb-2 font-semibold text-2xl">
      Cooking something Beautiful...
    </h3>
    <p className="mb-4 text-lg text-muted-foreground">
      Stay tuned! We are preparing some amazing showcases for you.
    </p>
  </div>
);

export default function Showcase() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 animate-gradient-x bg-gradient-to-r from-primary to-secondary bg-clip-text font-extrabold text-3xl text-transparent md:text-5xl">
          Projects in Production
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover how businesses are leveraging our solutions to drive growth
          and innovation. See real implementations making a difference across
          various industries.
        </p>
      </div>

      {/* Showcase Grid */}
      {showcaseProjects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {showcaseProjects.map((project) => (
            <Card
              aria-label={`Showcase project: ${project.name}`}
              className="group border-2 border-transparent bg-white/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl dark:bg-black/60"
              key={project.id}
              tabIndex={0}
            >
              <CardHeader className="relative p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    alt={project.name}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    height={200}
                    src={project.image}
                    width={300}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      className="bg-white/90 text-black shadow"
                      variant="secondary"
                    >
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 font-bold text-xl transition-colors group-hover:text-primary">
                  {project.name}
                </CardTitle>
                <CardDescription className="mb-4 line-clamp-2 text-sm">
                  {project.description}
                </CardDescription>
                {/* Technologies */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {project.technologies.map((tech: string) => (
                    <Badge
                      className="border-primary/30 text-xs"
                      key={tech}
                      variant="outline"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                {/* Visit Link */}
                <Link
                  aria-label={`Visit ${project.name} website`}
                  className="inline-flex items-center text-primary text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50"
                  href={project.url}
                  rel="noopener noreferrer"
                  target="_blank"
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
      <div className="mt-8 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/20 to-secondary/10 p-8 text-center shadow-lg md:p-14">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-4 flex items-center justify-center gap-2 font-extrabold text-2xl md:text-3xl">
            <span className="inline-block animate-wiggle">✨</span>
            Want Your Project Featured Here?
          </h3>
          <p className="mb-8 text-lg text-muted-foreground">
            Join our showcase and let the world see how you&apos;re using our
            solutions to transform your business. Get in touch to discuss
            featuring your implementation.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="inline-flex animate-glow items-center"
              size="lg"
            >
              <a
                aria-label="Email to get featured"
                href="mailto:john.rambo.9901@gmail.com"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
