"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Radar,
  DollarSign,
  Search,
  Filter,
  Download,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthRequired } from "@/components/auth-required";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
} from "recharts";
import { statsApi } from "@/lib/api";
import { CITIES, INDUSTRIES, EDUCATION_LEVELS } from "@/lib/mock-data";



// 模拟行业需求分布数据
const industryDemandData = [
  { name: "IT/互联网", value: 35 },
  { name: "金融", value: 18 },
  { name: "教育", value: 12 },
  { name: "医疗", value: 10 },
  { name: "制造业", value: 8 },
  { name: "其他", value: 17 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export default function AnalyticsPage() {
  return (
    <AuthRequired roles={['student']}>
      <AnalyticsContent />
    </AuthRequired>
  );
}

function AnalyticsContent() {
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedEducation, setSelectedEducation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    todayJobs: 28,
    companyCount: 328,
    employmentRate: 92.3,
  });
  const [salaryPredictionData, setSalaryPredictionData] = useState([
    { year: "2023", salary: 12000 },
    { year: "2024", salary: 13500 },
    { year: "2025", salary: 15000 },
    { year: "2026", salary: 16500 },
    { year: "2027", salary: 18000 },
    { year: "2028", salary: 19500 },
  ]);
  const [matchRadarData, setMatchRadarData] = useState([
    { subject: "专业匹配", A: 90, fullMark: 100 },
    { subject: "技能匹配", A: 85, fullMark: 100 },
    { subject: "经验匹配", A: 70, fullMark: 100 },
    { subject: "兴趣匹配", A: 80, fullMark: 100 },
    { subject: "地理位置", A: 75, fullMark: 100 },
    { subject: "薪资期望", A: 85, fullMark: 100 },
  ]);

  // 获取统计数据
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [todayJobsRes, companyCountRes, employmentRateRes] = await Promise.all([
          statsApi.getTodayJobs(),
          statsApi.getCompanyCount(),
          statsApi.getEmploymentRate(),
        ]);
        setStats({
          todayJobs: todayJobsRes.count,
          companyCount: companyCountRes.count,
          employmentRate: employmentRateRes.rate,
        });
      } catch (err) {
        console.log("获取统计数据失败，使用默认数据");
      }
    };

    fetchStats();
  }, []);

  // 根据筛选条件更新薪资预测数据
  useEffect(() => {
    // 基础薪资根据城市、行业、学历调整
    let baseSalary = 12000;

    // 城市调整
    if (selectedCity === "北京" || selectedCity === "上海" || selectedCity === "深圳") {
      baseSalary += 3000;
    } else if (selectedCity === "杭州" || selectedCity === "广州") {
      baseSalary += 2000;
    }

    // 行业调整
    if (selectedIndustry === "IT/互联网") {
      baseSalary += 4000;
    } else if (selectedIndustry === "金融") {
      baseSalary += 3000;
    } else if (selectedIndustry === "教育") {
      baseSalary -= 2000;
    }

    // 学历调整
    if (selectedEducation === "硕士研究生") {
      baseSalary += 3000;
    } else if (selectedEducation === "博士研究生") {
      baseSalary += 6000;
    } else if (selectedEducation === "大专") {
      baseSalary -= 2000;
    }

    // 生成预测数据
    const newSalaryData = [];
    for (let i = 0; i < 6; i++) {
      const year = 2023 + i;
      const salary = Math.round(baseSalary * (1 + i * 0.1));
      newSalaryData.push({ year: year.toString(), salary });
    }

    setSalaryPredictionData(newSalaryData);
  }, [selectedCity, selectedIndustry, selectedEducation]);

  // 根据筛选条件和用户简历更新匹配度数据
  useEffect(() => {
    // 模拟用户简历数据（实际应该从API获取）
    const userSkills = ["JavaScript", "React", "Python", "数据分析", "机器学习"];
    const userMajor = "计算机科学与技术";
    const userEducation = "硕士研究生";

    // 行业技能需求映射
    const industrySkills = {
      "IT/互联网": ["JavaScript", "React", "Python", "Java", "前端开发", "后端开发", "数据分析"],
      "金融": ["数据分析", "金融知识", "Excel", "Python", "统计学"],
      "教育": ["教育学", "心理学", "沟通能力", "教学设计"],
      "医疗": ["医学知识", "护理技能", "沟通能力"],
      "制造业": ["机械设计", "工程知识", "CAD"]
    };

    // 计算技能匹配度
    let skillMatch = 70;
    if (industrySkills[selectedIndustry as keyof typeof industrySkills]) {
      const requiredSkills = industrySkills[selectedIndustry as keyof typeof industrySkills];
      const matchedSkills = userSkills.filter(skill => requiredSkills.includes(skill));
      skillMatch = Math.round((matchedSkills.length / requiredSkills.length) * 100);
    }

    // 计算专业匹配度
    let majorMatch = 80;
    if (selectedIndustry === "IT/互联网" && userMajor.includes("计算机")) {
      majorMatch = 95;
    } else if (selectedIndustry === "金融" && userMajor.includes("金融")) {
      majorMatch = 90;
    } else if (selectedIndustry === "教育" && userMajor.includes("教育")) {
      majorMatch = 90;
    }

    // 计算学历匹配度
    let educationMatch = 85;
    if (selectedEducation === "博士研究生" && userEducation !== "博士研究生") {
      educationMatch = 60;
    } else if (selectedEducation === "硕士研究生" && userEducation === "本科") {
      educationMatch = 70;
    }

    // 计算地理位置匹配度
    let locationMatch = 75;
    const userPreferredCities = ["北京", "上海", "杭州"];
    if (userPreferredCities.includes(selectedCity)) {
      locationMatch = 90;
    }

    // 生成新的匹配度数据
    const newMatchData = [
      { subject: "专业匹配", A: majorMatch, fullMark: 100 },
      { subject: "技能匹配", A: skillMatch, fullMark: 100 },
      { subject: "经验匹配", A: 70, fullMark: 100 }, // 假设经验匹配度不变
      { subject: "兴趣匹配", A: 80, fullMark: 100 }, // 假设兴趣匹配度不变
      { subject: "地理位置", A: locationMatch, fullMark: 100 },
      { subject: "薪资期望", A: 85, fullMark: 100 }, // 假设薪资期望匹配度不变
    ];

    setMatchRadarData(newMatchData);
  }, [selectedCity, selectedIndustry, selectedEducation]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      {/* Hero section */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-blue-700 px-6 py-10 lg:px-10 lg:py-12">
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/5" />
        <div className="pointer-events-none absolute -bottom-8 right-24 h-32 w-32 rounded-full bg-primary-foreground/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI 数据分析</span>
          </div>
          <h1 className="mt-2 text-balance text-2xl font-bold text-primary-foreground lg:text-3xl">
            就业数据分析与预测
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/70 lg:text-base">
            基于大数据分析，为你提供个性化的就业趋势、薪资预测和岗位匹配分析
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索行业或岗位"
                className="h-12 rounded-xl border-none bg-card pl-10 text-foreground shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="h-12 gap-2 rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Filter className="h-4 w-4" />
              高级筛选
            </Button>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">今日新增</p>
            <p className="text-lg font-bold text-foreground">{stats.todayJobs} 个岗位</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">合作企业</p>
            <p className="text-lg font-bold text-foreground">{stats.companyCount} 家</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
            <PieChart className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">就业率</p>
            <p className="text-lg font-bold text-foreground">{stats.employmentRate}%</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="grid gap-2">
          <Label className="text-sm font-medium">城市</Label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="选择城市" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部城市</SelectItem>
              {CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-medium">行业</Label>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="选择行业" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部行业</SelectItem>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-medium">学历</Label>
          <Select value={selectedEducation} onValueChange={setSelectedEducation}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="选择学历" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">不限学历</SelectItem>
              {EDUCATION_LEVELS.map((education) => (
                <SelectItem key={education} value={education}>
                  {education}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="gap-2 self-end">
          <Download className="h-4 w-4" />
          导出报告
        </Button>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Salary prediction */}
        <Card className="border-transparent shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-5 w-1 rounded-full bg-primary" />
              薪资水平预测（K/月）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salaryPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
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
                    formatter={(value: number) => [`${value}K`, "预测薪资"]}
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
                    name="预测薪资"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span>基于过去5年数据预测，未来3年薪资将持续增长</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span>年均增长率约为10%，高于全国平均水平</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry demand */}
        <Card className="border-transparent shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-5 w-1 rounded-full bg-emerald-500" />
              行业需求分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={industryDemandData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={true}
                    fontSize={11}
                    strokeWidth={2}
                    stroke="hsl(var(--card))"
                  >
                    {industryDemandData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                    formatter={(value: number) => [`${value}%`, "需求占比"]}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-emerald-500" />
                <span>IT/互联网行业需求最高，占比35%</span>
              </div>
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-emerald-500" />
                <span>金融和教育行业紧随其后，分别占比18%和12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job matching radar */}
        <Card className="border-transparent shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-5 w-1 rounded-full bg-primary" />
              岗位匹配度分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={matchRadarData}>
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
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Radar className="h-4 w-4 text-primary" />
                <span>专业匹配度最高，达到90%</span>
              </div>
              <div className="flex items-center gap-2">
                <Radar className="h-4 w-4 text-primary" />
                <span>经验匹配度相对较低，建议积累相关经验</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employment trend */}
        <Card className="border-transparent shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-5 w-1 rounded-full bg-amber-500" />
              就业趋势分析（近五年）
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
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
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
                  <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="就业率" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span>就业率持续上升，五年增长7.1个百分点</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span>预计2026年就业率将达到93.5%以上</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
