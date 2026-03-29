"use client";

import Link from "next/link";
import { Heart, MapPin, Building2, GraduationCap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function JobCard({ job }: { job: Job }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const scoreColor =
    job.matchScore >= 90
      ? "text-emerald-600"
      : job.matchScore >= 75
        ? "text-primary"
        : "text-amber-600";

  const scoreBg =
    job.matchScore >= 90
      ? "bg-emerald-500"
      : job.matchScore >= 75
        ? "bg-primary"
        : "bg-amber-500";

  const scoreLabel =
    job.matchScore >= 90
      ? "极佳"
      : job.matchScore >= 75
        ? "良好"
        : "一般";

  return (
    <Card className="group relative overflow-hidden border-transparent bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
      {/* Top color accent line */}
      <div className={cn("absolute left-0 right-0 top-0 h-1", scoreBg)} />

      <CardContent className="p-5 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Link
              href={`/jobs/${job.id}`}
              className="text-base font-semibold text-foreground transition-colors group-hover:text-primary"
            >
              {job.title}
            </Link>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-primary/60" />
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary/60" />
                {job.city}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all",
                isFavorited
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-muted-foreground/50 group-hover:text-muted-foreground"
              )}
            />
            <span className="sr-only">收藏岗位</span>
          </Button>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {job.salaryMin}-{job.salaryMax}K
          </span>
          <Badge variant="secondary" className="border border-border/50 text-xs font-normal">
            {job.education}
          </Badge>
          <Badge variant="secondary" className="border border-border/50 text-xs font-normal">
            {job.industry}
          </Badge>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className={cn("h-3.5 w-3.5", scoreColor)} />
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 overflow-hidden rounded-full bg-muted" style={{ width: "60px" }}>
                <div
                  className={cn("h-full rounded-full transition-all", scoreBg)}
                  style={{ width: `${job.matchScore}%` }}
                />
              </div>
              <span className={cn("text-xs font-semibold", scoreColor)}>
                {job.matchScore}%
              </span>
              <span className="text-xs text-muted-foreground">
                {scoreLabel}
              </span>
            </div>
          </div>
          <Link href={`/jobs/${job.id}`}>
            <Button size="sm" className="h-7 rounded-md bg-primary/10 text-xs font-medium text-primary shadow-none hover:bg-primary hover:text-primary-foreground">
              查看详情
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
