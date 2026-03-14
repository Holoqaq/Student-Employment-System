"use client";

import {
  TrendingUp,
  Users,
  Briefcase,
  GraduationCap,
  Download,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthRequired } from "@/components/auth-required";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  industryDistribution,
  salaryByMajor,
  salaryByEducation,
} from "@/lib/mock-data";

const PIE_COLORS = [
  "hsl(217, 91%, 50%)",
  "hsl(152, 60%, 46%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 84%, 60%)",
  "hsl(280, 65%, 60%)",
  "hsl(220, 10%, 70%)",
];

const stats = [
  {
    label: "总就业率",
    value: "92.3%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    ringColor: "ring-emerald-500/20",
  },
  {
    label: "就业人数",
    value: "1,847",
    change: "+156",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
    ringColor: "ring-primary/20",
  },
  {
    label: "合作单位",
    value: "328",
    change: "+24",
    icon: Briefcase,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    ringColor: "ring-amber-500/20",
  },
  {
    label: "升学人数",
    value: "423",
    change: "+38",
    icon: GraduationCap,
    color: "text-red-500",
    bg: "bg-red-500/10",
    ringColor: "ring-red-500/20",
  },
];

export default function AdminPage() {
  return (
    <AuthRequired roles={['admin']}>
      <AdminContent />
    </AuthRequired>
  );
}

function AdminContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/10">
            <BarChart3 className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              就业数据统计与分析
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              2025-2026学年毕业生就业数据总览
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2 rounded-xl bg-transparent shadow-sm">
          <Download className="h-4 w-4" />
          导出报表
        </Button>
      </div>

      {/* Stats grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-transparent shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-2 ${stat.bg} ${stat.ringColor}`}
                >
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-xs font-semibold text-emerald-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Employment rate bar chart */}
        <Card className="border-transparent shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-5 w-1 rounded-full bg-primary" />
              就业率趋势（近五年）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { year: "2021", rate: 85.2 },
                    { year: "2022", rate: 87.5 },
                    { year: "2023", rate: 89.1 },
                    { year: "2024", rate: 90.8 },
                    { year: "2025", rate: 92.3 },
                  ]}
                >
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
                    domain={[80, 100]}
                    tickFormatter={(v) => `${v}%`}
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
                    formatter={(value: number) => [`${value}%`, "就业率"]}
                  />
                  <Bar
                    dataKey="rate"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                    name="就业率"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Industry distribution pie chart */}
        <Card className="border-transparent shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-5 w-1 rounded-full bg-emerald-500" />
              行业分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={true}
                    fontSize={11}
                    strokeWidth={2}
                    stroke="hsl(var(--card))"
                  >
                    {industryDistribution.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "10px",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value: number) => [`${value}%`, "占比"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Salary by major */}
        <Card className="border-transparent shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-5 w-1 rounded-full bg-amber-500" />
              各专业平均薪资（K/月）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryByMajor} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(v) => `${v}K`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="major"
                    type="category"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={60}
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
                    formatter={(value: number) => [`${value}K`, "平均薪资"]}
                  />
                  <Bar
                    dataKey="salary"
                    fill="hsl(152, 60%, 46%)"
                    radius={[0, 6, 6, 0]}
                    name="平均薪资"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Salary by education - line chart */}
        <Card className="border-transparent shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-5 w-1 rounded-full bg-primary" />
              各学历平均薪资趋势（K/月）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salaryByEducation}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="education"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(v) => `${v}K`}
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
                    formatter={(value: number) => [`${value}K`, "平均薪资"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="salary"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{
                      fill: "hsl(var(--card))",
                      stroke: "hsl(var(--primary))",
                      strokeWidth: 2.5,
                      r: 6,
                    }}
                    activeDot={{
                      r: 8,
                      fill: "hsl(var(--primary))",
                      stroke: "hsl(var(--card))",
                      strokeWidth: 3,
                    }}
                    name="平均薪资"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
