"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectShowcaseProps {
  project: {
    id: number;
    slug: string;
    featured?: boolean;
    tech: string[];
    year: string;
    image: string;
    url?: string;
  };
}

export default function ProjectShowcase({ project }: ProjectShowcaseProps) {
  const [imageError, setImageError] = useState(false);
  const t = useTranslations(`projectsItems.${project.slug}`);

  // Safely get impact array from translations
  let impactItems: string[] = [];
  try {
    const raw = t.raw("impact");
    if (Array.isArray(raw)) impactItems = raw;
  } catch {
    // impact key may not exist for some projects
  }

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group cursor-pointer h-full"
      >
        <div className="relative overflow-hidden rounded-xl border border-secondary/30 bg-secondary/5 transition-all duration-300 h-full flex flex-col">
          {/* Category Badge */}
          <div className="absolute top-4 start-4 z-10">
            <span className="text-xs px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-primary border border-primary/20 font-medium">
              {t("category")}
            </span>
          </div>

          {/* Year Badge */}
          <div className="absolute top-4 end-4 z-10">
            <span className="text-xs px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground">
              {project.year}
            </span>
          </div>

          <div className="relative h-48 sm:h-56 overflow-hidden bg-linear-to-br from-secondary/20 to-primary/10">
            {!imageError ? (
              <Image
                src={project.image || "/placeholder.svg"}
                alt={t("title")}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
                loading="lazy"
                quality={85}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-secondary/20">
                <div className="text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <p className="text-sm text-muted-foreground">{t("title")}</p>
                </div>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 flex flex-col grow">
            <div className="space-y-3 grow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {t("title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {t("subtitle")}
                  </p>
                </div>
                <div className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <MoveUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 rtl:-scale-x-100" />
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
                {t("description")}
              </p>

              {impactItems.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-primary/5 text-primary border border-primary/10">
                    {impactItems[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Tech stack preview */}
            <div className="flex flex-wrap gap-1.5 pt-4 mt-auto border-t border-secondary/20">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded bg-secondary/30 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-xs px-2 py-0.5 text-muted-foreground">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
