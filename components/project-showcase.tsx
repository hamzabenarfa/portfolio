"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { MoveUpRight } from "lucide-react";

interface ProjectShowcaseProps {
  project: {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    year: string;
    image: string;
    url?: string;
    slug: string; // Added slug for Link component
  };
}

export default function ProjectShowcase({ project }: ProjectShowcaseProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-xl border border-secondary/30 bg-secondary/5 hover:border-primary/60 transition-all duration-300">
          <div className="relative h-64 sm:h-80 overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/10">
            {!imageError ? (
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
                loading="lazy"
                quality={85}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <p className="text-sm text-muted-foreground">{project.title}</p>
                </div>
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    {project.year}
                  </p>
                </div>
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <MoveUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[65ch] group-hover:text-foreground/80 transition-colors duration-300">
                {project.description}
              </p>

              {/* Tech stack preview */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-xs px-2.5 py-1 text-muted-foreground">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
