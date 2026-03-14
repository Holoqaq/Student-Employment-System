"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowUpDown,
  Send,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthRequired } from "@/components/auth-required";
import { applicationApi } from "@/lib/api";
import { mockApplications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: {
    label: "已投递",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    badgeBg: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
  },
  interview: {
    label: "待面试",
    icon: MessageSquare,
    color: "text-primary",
    bg: "bg-primary/10",
    badgeBg: "bg-primary/10 text-primary border-primary/20",
  },
  passed: {
    label: "已通过",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400",
  },
  rejected: {
    label: "未通过",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    badgeBg: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
  },
};

export default function ApplicationsPage() {
  return (
    <AuthRequired roles={['student']}>
      <ApplicationsContent />
    </AuthRequired>
  );
}

function ApplicationsContent() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取申请数据
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await applicationApi.getApplications();
      // 暂时使用mock数据，等后端API就绪后切换
      setApplications(mockApplications);
    } catch (err) {
      setError("获取投递记录失败，使用模拟数据");
      // 失败时使用mock数据
      setApplications(mockApplications);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载数据
  useEffect(() => {
    fetchApplications();
  }, []);

  const filtered = applications
    .filter(
      (app) => statusFilter === "all" || app.status === statusFilter
    )
    .sort((a, b) => {
      const dateA = new Date(a.appliedAt).getTime();
      const dateB = new Date(b.appliedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Send className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">投递记录</h1>
          <p className="text-sm text-muted-foreground">跟踪你的求职进度和面试安排</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20">
          <Loader2 className="mb-3 h-12 w-12 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            加载中...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20">
          <div className="mb-3 text-red-500">⚠️</div>
          <p className="text-sm text-muted-foreground">
            {error}
          </p>
          <Button
            variant="default"
            size="sm"
            onClick={fetchApplications}
            className="mt-4"
          >
            重试
          </Button>
        </div>
      ) : (
        <>
          {/* Status summary */}
          <div className="mb-6 grid grid-cols-4 gap-3">
            {(["pending", "interview", "passed", "rejected"] as const).map((status) => {
              const config = statusConfig[status];
              const Icon = config.icon;
              const count = applications.filter((a) => a.status === status).length;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all",
                    statusFilter === status
                      ? "border-primary/30 bg-primary/5 shadow-sm"
                      : "border-transparent bg-card shadow-sm hover:border-border"
                  )}
                >
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                  <span className="text-lg font-bold text-foreground">{count}</span>
                  <span className="text-xs text-muted-foreground">{config.label}</span>
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="按状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">已投递</SelectItem>
                <SelectItem value="interview">待面试</SelectItem>
                <SelectItem value="passed">已通过</SelectItem>
                <SelectItem value="rejected">未通过</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 bg-transparent"
              onClick={() =>
                setSortOrder((o) => (o === "newest" ? "oldest" : "newest"))
              }
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              {sortOrder === "newest" ? "最新投递" : "最早投递"}
            </Button>
          </div>

          {/* Applications list */}
          {filtered.length > 0 ? (
            <div className="grid gap-3">
              {filtered.map((app) => {
                const config = statusConfig[app.status];
                const Icon = config.icon;
                return (
                  <Card key={app.id} className="group border-transparent shadow-sm transition-all hover:shadow-md hover:border-primary/10">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                          config.bg
                        )}
                      >
                        <Icon className={cn("h-5 w-5", config.color)} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/jobs/${app.jobId}`}
                          className="text-sm font-semibold text-foreground group-hover:text-primary"
                        >
                          {app.jobTitle}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {app.company}
                        </p>
                      </div>
                      <div className="hidden text-right sm:block">
                        <p className="text-xs text-muted-foreground">
                          投递时间
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-foreground">
                          {app.appliedAt}
                        </p>
                      </div>
                      <Badge
                        className={cn("shrink-0 border", config.badgeBg)}
                      >
                        {config.label}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card py-20">
              <Clock className="mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">暂无投递记录</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
