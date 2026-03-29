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
  Trash2,
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
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

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

  // 更新面试人数
  const updateInterviews = async (id: string, value: string) => {
    const interviews = parseInt(value);
    if (isNaN(interviews) || interviews < 0) {
      alert('请输入有效的面试人数');
      return;
    }

    try {
      // 从localStorage获取岗位（仅在客户端）
      if (typeof window !== 'undefined') {
        const jobsJson = localStorage.getItem('jobs');
        if (jobsJson) {
          const jobs = JSON.parse(jobsJson);
          const updatedJobs = jobs.map((job: any) => {
            if (job.id === id) {
              return {
                ...job,
                interviews: interviews
              };
            }
            return job;
          });
          localStorage.setItem('jobs', JSON.stringify(updatedJobs));

          // 更新本地状态
          setJobs(prev =>
            prev.map(job =>
              job.id === id ? { ...job, interviews: interviews } : job
            )
          );

          setEditingJobId(null);
        }
      }
    } catch (err) {
      console.error('更新面试人数失败:', err);
      alert('更新面试人数失败，请稍后重试');
    }
  };

  // 删除岗位
  const deleteJob = async (id: string) => {
    if (!confirm('确定要删除这个岗位吗？删除后将无法恢复。')) {
      return;
    }

    try {
      const response = await jobApi.deleteJob(id);
      if (response.success) {
        // 从本地状态中删除
        setJobs(prev => prev.filter(job => job.id !== id));
      } else {
        alert(response.message || '删除失败');
      }
    } catch (err) {
      console.error('删除岗位失败:', err);
      alert('删除岗位失败，请稍后重试');
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
              <p className="text-2xl font-bold text-foreground">
                {totalApplicants}
              </p>
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
              <p className="text-2xl font-bold text-foreground">
                {totalInterviews}
              </p>
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
                        {editingJobId === job.id ? (
                          <div className="flex items-center justify-center gap-1">
                            <input
                              type="number"
                              min="0"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-16 px-2 py-1 border rounded text-center"
                              onBlur={() => updateInterviews(job.id, editValue)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  updateInterviews(job.id, editValue);
                                }
                              }}
                              autoFocus
                            />
                            <button
                              className="p-1 text-primary hover:bg-primary/10 rounded"
                              onClick={() => updateInterviews(job.id, editValue)}
                            >
                              ✓
                            </button>
                            <button
                              className="p-1 text-muted-foreground hover:bg-muted rounded"
                              onClick={() => setEditingJobId(null)}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span
                            className="font-semibold text-foreground cursor-pointer hover:text-primary"
                            onClick={() => {
                              setEditingJobId(job.id);
                              setEditValue((job.interviews || 0).toString());
                            }}
                          >
                            {job.interviews || 0}
                          </span>
                        )}
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteJob(job.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            删除
                          </Button>
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
