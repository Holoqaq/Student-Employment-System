"use client";

import { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Building2,
  Users,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { JobCard } from "@/components/job-card";
import { AuthRequired } from "@/components/auth-required";
import { jobApi, statsApi, dictApi } from "@/lib/api";
import { mockJobs, CITIES, INDUSTRIES, EDUCATION_LEVELS } from "@/lib/mock-data";

// 从localStorage读取用户的求职意向设置
const getCareerIntentions = () => {
  const savedProfile = localStorage.getItem('userProfile');
  if (savedProfile) {
    try {
      const profile = JSON.parse(savedProfile);
      // 确保返回的数据结构正确，并且有合理的值
      const cities = Array.isArray(profile.preferredCities) && profile.preferredCities.length > 0
        ? profile.preferredCities
        : ["北京", "上海", "杭州"];
      const industries = Array.isArray(profile.preferredIndustries) && profile.preferredIndustries.length > 0
        ? profile.preferredIndustries
        : ["IT/互联网", "金融"];
      const salaryMin = typeof profile.expectedSalaryMin === 'number' && profile.expectedSalaryMin > 0
        ? profile.expectedSalaryMin
        : 15;
      const salaryMax = typeof profile.expectedSalaryMax === 'number' && profile.expectedSalaryMax > salaryMin
        ? profile.expectedSalaryMax
        : 30;

      return {
        cities: cities,
        industries: industries,
        salaryMin: salaryMin, // K为单位
        salaryMax: salaryMax, // K为单位
        jobCategory: profile.jobCategory || "技术研发",
        skills: Array.isArray(profile.skills) ? profile.skills : []
      };
    } catch (error) {
      console.error('解析用户配置失败:', error);
    }
  }
  // 默认值
  return {
    cities: ["北京", "上海", "杭州"],
    industries: ["IT/互联网", "金融"],
    salaryMin: 15, // K为单位
    salaryMax: 30, // K为单位
    jobCategory: "技术研发",
    skills: []
  };
};

const PAGE_SIZE = 30;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedEducation, setSelectedEducation] = useState<string>("all");
  const [jobs, setJobs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({
    todayJobs: 28,
    companyCount: 328,
    employmentRate: 92.3,
  });

  // 获取岗位数据
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobApi.getAllJobs({
        page: 1,
        size: 10000, // 获取足够多的数据以进行客户端筛选
        city: selectedCity === "all" ? undefined : selectedCity,
        industry: selectedIndustry === "all" ? undefined : selectedIndustry,
        education: selectedEducation === "all" ? undefined : selectedEducation,
        keyword: searchQuery,
      });

      // 读取最新的求职意向设置
      const careerIntentions = getCareerIntentions();

      // 根据求职意向进行筛选
      let filteredJobs = response.records.filter(job => {
        // 只显示启用状态的岗位
        if (job.status !== 'active') return false;

        // 城市匹配
        const cityMatch = careerIntentions.cities.includes(job.city);
        // 行业匹配
        const industryMatch = careerIntentions.industries.includes(job.industry);
        // 薪资匹配
        const salaryMatch = job.salaryMin >= careerIntentions.salaryMin && job.salaryMax <= careerIntentions.salaryMax;

        return cityMatch && industryMatch && salaryMatch;
      });

      // 基于技能的匹配和排序
      if (careerIntentions.skills.length > 0) {
        filteredJobs = filteredJobs.map(job => {
          // 计算技能匹配度
          let skillMatchScore = 0;
          if (Array.isArray(job.requirements)) {
            careerIntentions.skills.forEach(skill => {
              if (job.requirements.some(req => req.includes(skill))) {
                skillMatchScore += 10;
              }
            });
          }

          return {
            ...job,
            finalScore: (job.matchScore || 0) + skillMatchScore
          };
        }).sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));
      }

      // 显示所有筛选后的岗位
      setJobs(filteredJobs);
      setTotal(filteredJobs.length);
    } catch (err) {
      setError("获取岗位数据失败，使用模拟数据");
      // 失败时使用mock数据，并应用相同的筛选条件
      const careerIntentions = getCareerIntentions();
      let filteredMockJobs = mockJobs.filter(job => {
        // 只显示启用状态的岗位
        if (job.status !== 'active') return false;

        // 城市匹配
        const cityMatch = careerIntentions.cities.includes(job.city);
        // 行业匹配
        const industryMatch = careerIntentions.industries.includes(job.industry);
        // 薪资匹配
        const salaryMatch = job.salaryMin >= careerIntentions.salaryMin && job.salaryMax <= careerIntentions.salaryMax;

        return cityMatch && industryMatch && salaryMatch;
      });
      setJobs(filteredMockJobs);
      setTotal(filteredMockJobs.length);
    } finally {
      setLoading(false);
    }
  };

  // 获取统计数据
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
      // 失败时使用默认数据
      console.log("获取统计数据失败，使用默认数据");
    }
  };

  // 初始加载和筛选条件变化时获取数据
  useEffect(() => {
    // 确保在客户端环境中运行
    if (typeof window !== 'undefined') {
      fetchJobs();
      fetchStats();
    }
  }, [searchQuery, selectedCity, selectedIndustry, selectedEducation]);

  // 监听localStorage中userProfile的变化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'userProfile') {
          fetchJobs();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  const filteredJobs = jobs;

  const activeFilters = [
    selectedCity !== "all" ? selectedCity : null,
    selectedIndustry !== "all" ? selectedIndustry : null,
    selectedEducation !== "all" ? selectedEducation : null,
  ].filter(Boolean);

  const clearFilters = () => {
    setSelectedCity("all");
    setSelectedIndustry("all");
    setSelectedEducation("all");
  };

  const HomeContent = () => (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      {/* Hero / Search section */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-blue-700 px-6 py-10 lg:px-10 lg:py-12">
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/5" />
        <div className="pointer-events-none absolute -bottom-8 right-24 h-32 w-32 rounded-full bg-primary-foreground/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI 智能推荐</span>
          </div>
          <h1 className="mt-2 text-balance text-2xl font-bold text-primary-foreground lg:text-3xl">
            找到最适合你的岗位
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/70 lg:text-base">
            基于你的专业和求职意向，为你智能推荐最匹配的工作机会
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索岗位名称 / 单位名称"
                className="h-12 rounded-xl border-none bg-card pl-10 text-foreground shadow-lg"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-12 gap-2 rounded-xl border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20 hover:text-primary-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  筛选
                  {activeFilters.length > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-xs font-bold text-primary">
                      {activeFilters.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-xl" align="end">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-foreground">
                      城市
                    </label>
                    <Select value={selectedCity} onValueChange={(v) => { setSelectedCity(v); setCurrentPage(1); }}>
                      <SelectTrigger>
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
                    <label className="text-sm font-medium text-foreground">
                      行业
                    </label>
                    <Select value={selectedIndustry} onValueChange={(v) => { setSelectedIndustry(v); setCurrentPage(1); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择行业" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部行业</SelectItem>
                        {INDUSTRIES.map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-foreground">
                      学历要求
                    </label>
                    <Select value={selectedEducation} onValueChange={(v) => { setSelectedEducation(v); setCurrentPage(1); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择学历" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">不限学历</SelectItem>
                        {EDUCATION_LEVELS.map((edu) => (
                          <SelectItem key={edu} value={edu}>
                            {edu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {activeFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground"
                    >
                      清除全部筛选
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-primary-foreground/60">当前筛选：</span>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  className="border-primary-foreground/20 bg-primary-foreground/10 text-xs font-normal text-primary-foreground"
                >
                  {filter}
                </Badge>
              ))}
            </div>
          )}
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
            <Building2 className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">合作企业</p>
            <p className="text-lg font-bold text-foreground">{stats.companyCount} 家</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
            <Users className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">就业率</p>
            <p className="text-lg font-bold text-foreground">{stats.employmentRate}%</p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Sparkles className="h-5 w-5 text-primary" />
          为你推荐
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            共 {total} 个岗位
          </span>
        </h2>
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
            onClick={fetchJobs}
            className="mt-4"
          >
            重试
          </Button>
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card py-20">
          <Search className="mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">
            没有找到符合条件的岗位
          </p>
          <Button
            variant="link"
            size="sm"
            onClick={clearFilters}
            className="mt-1 text-primary"
          >
            清除筛选条件
          </Button>
        </div>
      )}


    </div>
  );

  return (
    <AuthRequired>
      <HomeContent />
    </AuthRequired>
  );
}
