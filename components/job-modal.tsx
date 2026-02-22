"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface JobModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  job: {
    id: number;
    key: string;
    tech: string[];
  } | null;
}

export default function JobModal({ isOpen, onClose, job }: JobModalProps) {
  const t = useTranslations(job ? `experienceItems.${job.key}` : "experienceItems");

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("role")}</DialogTitle>
          <DialogDescription className="text-base">
            {t("company")} • {t("year")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Overview</h4>
            <p className="text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Details</h4>
            <p className="text-muted-foreground leading-relaxed">
              {t("details")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {job.tech.map((tech) => (
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
  );
}
