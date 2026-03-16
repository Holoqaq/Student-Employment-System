"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Users,
  MessageSquare,
  ToggleLeft,
  ToggleRight,
  Pencil,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthRequired } from "@/components/auth-required";
import { jobApi } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export default function EmployerPage() {
  return (
    <AuthRequired roles={['employer']}>
      <EmployerContent />
    </AuthRequired>
  );
}

function EmployerContent() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取企业岗位
  const fetchJobs = async () => {
    if (!user || user.role !== 'employer') return;

    setLoading(true);
    setError(null);

    try {
      const response = await jobApi.getEmployerJobs(user.id);
      setJobs(response.records);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取岗位失败');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // 初始化时获取数据
  useEffect(() => {
    fetchJobs();
  }, [user]);

  // 切换岗位状态
  const toggleStatus = async (id: string, currentStatus: 'active' | 'inactive') => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await jobApi.updateJobStatus(id, newStatus);

      if (response.success) {
        // 更新本地状态
        setJobs(prev =>
          prev.map(job =>
            job.id === id ? { ...job, status: newStatus } : job
          )
        );
      }
    } catch (err) {
      console.error('更新状态失败:', err);
    }
  };

  const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicants || 0), 0);
  const totalInterviews = jobs.reduce((sum, j) => sum + (j.interviews || 0), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">岗位管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">管理您发布的岗位信息，查看投递和面试情况</p>
        </div>
        <Link href="/employer/new">
          <Button className="gap-2 rounded-xl shadow-md shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700 text-primary-foreground">
            <Plus className="h-4 w-4" />
            发布新岗位
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="border-transparent shadow-sm overflow-hidden">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">总投递人数</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-foreground">
                  {totalApplicants}
                </p>
                <span className="text-xs font-medium text-emerald-600">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-transparent shadow-sm overflow-hidden">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <MessageSquare className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">面试人数</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-foreground">
                  {totalInterviews}
                </p>
                <span className="text-xs font-medium text-emerald-600">+8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-transparent shadow-sm overflow-hidden">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">启用中岗位</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-foreground">
                  {jobs.filter((j) => j.status === "active").length}
                </p>
                <span className="text-xs text-muted-foreground">/ {jobs.length} 个</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs table */}
      <Card className="border-transparent shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="h-5 w-1 rounded-full bg-emerald-500" />
            岗位列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">加载中...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-red-500 mb-4">⚠️</div>
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button
                variant="default"
                size="sm"
                className="mt-4"
                onClick={fetchJobs}
              >
                重试
              </Button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-muted-foreground/30 mb-4">📝</div>
              <p className="text-sm text-muted-foreground">暂无发布的岗位</p>
              <Link href="/employer/new">
                <Button
                  variant="default"
                  size="sm"
                  className="mt-4"
                >
                  发布第一个岗位
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>岗位名称</TableHead>
                    <TableHead>关键要求</TableHead>
                    <TableHead className="text-center">投递人数</TableHead>
                    <TableHead className="text-center">面试人数</TableHead>
                    <TableHead className="text-center">状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id} className="group">
                      <TableCell>
                        <p className="font-medium text-foreground">
                          {job.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {job.city} | {job.salaryMin}-{job.salaryMax}K
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(job.requirements) && job.requirements.slice(0, 2).map((req, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs font-normal"
                            >
                              {req.length > 12
                                ? `${req.slice(0, 12)}...`
                                : req}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-foreground">{job.applicants || 0}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-foreground">{job.interviews || 0}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={cn(
                            "border text-xs",
                            job.status === "active"
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              : "border-border bg-muted text-muted-foreground"
                          )}
                        >
                          {job.status === "active" ? "启用" : "禁用"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 text-xs"
                            onClick={() => toggleStatus(job.id, job.status)}
                          >
                            {job.status === "active" ? (
                              <ToggleLeft className="h-3.5 w-3.5" />
                            ) : (
                              <ToggleRight className="h-3.5 w-3.5" />
                            )}
                            {job.status === "active" ? "禁用" : "启用"}
                          </Button>
                          <Link href="/employer/new">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1 text-xs"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              编辑
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
