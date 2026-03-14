"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Building2,
  GraduationCap,
  Users,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
  CheckCircle2,
  Star,
  Radar,
  DollarSign,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { employmentTrendData } from "@/lib/mock-data";
import { jobApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
} from "recharts";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // 获取岗位详情
  useEffect(() => {
    const fetchJobDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const jobDetail = await jobApi.getJobDetail(id);
        setJob(jobDetail);
      } catch (err) {
        setError("获取岗位详情失败");
        console.error("获取岗位详情失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loader2 className="mb-3 h-12 w-12 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <p className="text-muted-foreground">岗位不存在</p>
        <Link href="/">
          <Button variant="link" className="mt-2">
            返回首页
          </Button>
        </Link>
      </div>
    );
  }

  const scoreColor =
    job.matchScore >= 90
      ? "text-emerald-600"
      : job.matchScore >= 75
        ? "text-primary"
        : "text-amber-600";

  const scoreStroke =
    job.matchScore >= 90
      ? "stroke-emerald-500"
      : job.matchScore >= 75
        ? "stroke-primary"
        : "stroke-amber-500";

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-8">
      {/* Back button */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        返回岗位列表
      </Link>

      {/* Application success message */}
      {applicationSuccess && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <span>投递成功！您的申请已提交，相关信息已添加到投递记录中。</span>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-transparent shadow-sm">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-transparent px-6 pb-0 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {job.title}
                  </h1>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-primary/60" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary/60" />
                      {job.city}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-primary/60" />
                      {job.education}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-primary/60" />
                      {job.companySize}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="shrink-0 rounded-full"
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-all",
                      isFavorited
                        ? "fill-red-500 text-red-500 scale-110"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="sr-only">收藏</span>
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {job.salaryMin}-{job.salaryMax}K
                </span>
                <span className="text-sm text-muted-foreground">/ 月</span>
                <Badge className="ml-2 border border-primary/20 bg-primary/10 text-xs text-primary">
                  {job.industry}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {job.companyType}
                </Badge>
              </div>

              <div className="mt-5 flex gap-3 pb-6">
                <Button
                  className="gap-2 rounded-xl bg-primary px-6 shadow-md shadow-primary/20"
                  size="lg"
                  disabled={hasApplied}
                  onClick={() => {
                    setHasApplied(true);
                    setApplicationSuccess(true);

                    // 存储投递记录到localStorage
                    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
                    const newApplication = {
                      id: `a${Date.now()}`,
                      jobId: job.id,
                      jobTitle: job.title,
                      company: job.company,
                      appliedAt: new Date().toISOString(),
                      status: "pending"
                    };
                    applications.push(newApplication);
                    localStorage.setItem('applications', JSON.stringify(applications));

                    // 3秒后关闭成功提示
                    setTimeout(() => {
                      setApplicationSuccess(false);
                    }, 3000);
                  }}
                >
                  {hasApplied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      已投递
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      立即投递
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl bg-transparent"
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart className={cn("mr-2 h-4 w-4", isFavorited ? "fill-red-500 text-red-500" : "")} />
                  {isFavorited ? "已收藏" : "收藏"}
                </Button>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Responsibilities */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
                  <div className="h-5 w-1 rounded-full bg-primary" />
                  岗位职责
                </h3>
                <ul className="grid gap-2.5 pl-3">
                  {(expanded
                    ? job.responsibilities
                    : job.responsibilities.slice(0, 2)
                  ).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                      {item}
                    </li>
                  ))}
                </ul>
                {job.responsibilities.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 gap-1 text-primary hover:text-primary"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? (
                      <>
                        收起 <ChevronUp className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        查看更多 <ChevronDown className="h-3 w-3" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              <Separator className="my-6" />

              {/* Requirements */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
                  <div className="h-5 w-1 rounded-full bg-emerald-500" />
                  任职要求
                </h3>
                <ul className="grid gap-2.5 pl-3">
                  {job.requirements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Job benefits */}
          <Card className="mt-6 border-transparent shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="h-5 w-1 rounded-full bg-primary" />
                岗位福利
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground"> competitive salary</p>
                    <p className="text-xs text-muted-foreground">{job.salaryMin}-{job.salaryMax}K/月</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">团队氛围</p>
                    <p className="text-xs text-muted-foreground">年轻活力，扁平化管理</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">职业发展</p>
                    <p className="text-xs text-muted-foreground">清晰的晋升路径</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">培训学习</p>
                    <p className="text-xs text-muted-foreground">丰富的学习资源</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company culture */}
          <Card className="mt-6 border-transparent shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="h-5 w-1 rounded-full bg-emerald-500" />
                公司文化
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.company}致力于营造积极向上的工作环境，鼓励创新和协作。我们相信员工是公司最宝贵的财富，因此注重员工的成长和发展。
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-emerald-50 p-3 text-center text-sm dark:bg-emerald-900/10">
                    <p className="font-medium text-emerald-700 dark:text-emerald-400">创新</p>
                    <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-300">鼓励创新思维</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3 text-center text-sm dark:bg-blue-900/10">
                    <p className="font-medium text-blue-700 dark:text-blue-400">协作</p>
                    <p className="mt-1 text-xs text-blue-600 dark:text-blue-300">团队合作精神</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-3 text-center text-sm dark:bg-amber-900/10">
                    <p className="font-medium text-amber-700 dark:text-amber-400">成长</p>
                    <p className="mt-1 text-xs text-amber-600 dark:text-amber-300">持续学习发展</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment trends chart */}
          <Card className="mt-6 border-transparent shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="h-5 w-1 rounded-full bg-primary" />
                历年该岗位毕业生就业趋势
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={employmentTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="year"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "10px",
                        fontSize: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="hsl(var(--primary))"
                      radius={[6, 6, 0, 0]}
                      name="就业人数"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Match score */}
          <Card className="overflow-hidden border-transparent shadow-sm">
            <div className="bg-gradient-to-br from-primary/5 to-transparent p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                匹配分析
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                  <svg className="h-20 w-20 -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="5"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      className={scoreStroke}
                      strokeWidth="5"
                      strokeDasharray={`${(job.matchScore / 100) * 175.93} 175.93`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className={cn("absolute text-lg font-bold", scoreColor)}>
                    {job.matchScore}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    综合匹配度
                  </p>
                  <p className={cn("mt-1 text-xs font-medium", scoreColor)}>
                    {job.matchScore >= 90
                      ? "非常匹配 - 强烈推荐"
                      : job.matchScore >= 75
                        ? "比较匹配 - 推荐投递"
                        : "一般匹配 - 可以了解"}
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-5">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Radar className="h-4 w-4 text-primary" />
                多维度匹配分析
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                    { subject: "专业匹配", A: 90, fullMark: 100 },
                    { subject: "技能匹配", A: 85, fullMark: 100 },
                    { subject: "经验匹配", A: 70, fullMark: 100 },
                    { subject: "兴趣匹配", A: 80, fullMark: 100 },
                    { subject: "地理位置", A: 75, fullMark: 100 },
                    { subject: "薪资期望", A: 85, fullMark: 100 },
                  ]}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <RechartsRadar
                      name="匹配度"
                      dataKey="A"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "10px",
                        fontSize: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value: number) => [`${value}%`, "匹配度"]}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">专业匹配</span>
                  <span className="font-medium text-emerald-600">90%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">技能匹配</span>
                  <span className="font-medium text-emerald-600">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">经验匹配</span>
                  <span className="font-medium text-amber-600">70%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">兴趣匹配</span>
                  <span className="font-medium text-emerald-600">80%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">地理位置</span>
                  <span className="font-medium text-amber-600">75%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">薪资期望</span>
                  <span className="font-medium text-emerald-600">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommend reasons */}
          <Card className="mt-4 border-transparent shadow-sm">
            <CardContent className="p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Star className="h-4 w-4 text-amber-500" />
                推荐理由
              </h3>
              <ul className="grid gap-3">
                {job.recommendReasons.map((reason, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {reason}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Company info */}
          <Card className="mt-4 border-transparent shadow-sm">
            <CardContent className="p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Building2 className="h-4 w-4 text-primary" />
                单位概况
              </h3>
              <dl className="grid gap-3 text-sm">
                {[
                  { label: "单位名称", value: job.company },
                  { label: "行业类型", value: job.industry },
                  { label: "单位规模", value: job.companySize },
                  { label: "单位性质", value: job.companyType },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2.5"
                  >
                    <dt className="text-muted-foreground">{item.label}</dt>
                    <dd className="font-medium text-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
