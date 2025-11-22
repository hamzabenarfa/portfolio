"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    year: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -4 }}
        className="group grid gap-4 p-6 border border-secondary/40 bg-secondary/10 rounded-lg hover:border-primary/60 hover:bg-primary/10 hover:cursor-pointer hover:shadow-md transition-all duration-300"
      >
        <div>
          <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{project.year}</p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs text-muted-foreground group-hover:text-primary transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription className="text-base">{project.year}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Overview</h4>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary/20 text-foreground text-sm rounded-full border border-secondary/40 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
