"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, LayoutGrid, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCard } from "@/components/job-card";
import { jobApi } from "@/lib/api";
import {
  CITIES,
  INDUSTRIES,
  EDUCATION_LEVELS,
  COMPANY_TYPES,
} from "@/lib/mock-data";

const PAGE_SIZE = 30;

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [salaryRange, setSalaryRange] = useState<number[]>([0, 60]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string>("all");
  const [selectedCompanyType, setSelectedCompanyType] = useState<string>("all");
  const [jobs, setJobs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  // 获取岗位数据
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching jobs with params:', {
        page: currentPage,
        size: PAGE_SIZE,
        city: selectedCities.length > 0 ? selectedCities[0] : undefined,
        industry: selectedIndustry === "all" ? undefined : selectedIndustry,
        education: selectedEducation === "all" ? undefined : selectedEducation,
        companyType: selectedCompanyType === "all" ? undefined : selectedCompanyType,
        salaryMin: salaryRange[0],
        salaryMax: salaryRange[1],
        keyword: searchQuery,
      });

      // 使用getAllJobs方法，与主页保持一致
      const response = await jobApi.getAllJobs({
        page: currentPage,
        size: PAGE_SIZE,
        city: selectedCities.length > 0 ? selectedCities[0] : undefined,
        industry: selectedIndustry === "all" ? undefined : selectedIndustry,
        education: selectedEducation === "all" ? undefined : selectedEducation,
        companyType: selectedCompanyType === "all" ? undefined : selectedCompanyType,
        salaryMin: salaryRange[0],
        salaryMax: salaryRange[1],
        keyword: searchQuery,
      });

      console.log('API response:', response);

      // 薪资已经在 API 中转换为 K 为单位，不需要再次转换
      const jobsWithConvertedSalary = response.records;

      setJobs(jobsWithConvertedSalary);
      setTotal(response.total);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError("获取岗位数据失败: " + (err instanceof Error ? err.message : String(err)));
      setJobs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // 筛选条件变化时获取数据
  useEffect(() => {
    fetchJobs();
  }, [currentPage, searchQuery, selectedIndustry, selectedCities, selectedEducation, selectedCompanyType, salaryRange]);

  // 由于我们使用API进行分页和筛选，直接使用API返回的数据
  const filteredJobs = jobs;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Search className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">岗位搜索</h1>
          <p className="text-sm text-muted-foreground">多条件筛选，精准找到目标岗位</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Filter sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-transparent shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                筛选条件
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
              {/* Search */}
              <div className="grid gap-2">
                <Label className="text-sm font-medium text-foreground">关键词搜索</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="岗位名称 / 单位名称"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Industry */}
              <div className="grid gap-2">
                <Label className="text-sm font-medium text-foreground">行业筛选</Label>
                <Select
                  value={selectedIndustry}
                  onValueChange={setSelectedIndustry}
                >
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

              {/* Salary range */}
              <div className="grid gap-2">
                <Label className="text-sm font-medium text-foreground">
                  薪资范围
                </Label>
                <div className="rounded-lg bg-primary/5 px-3 py-2 text-center text-sm font-semibold text-primary">
                  {salaryRange[0]}K - {salaryRange[1]}K / 月
                </div>
                <Slider
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                  max={60}
                  min={0}
                  step={5}
                  className="mt-1"
                />
              </div>

              {/* Cities */}
              <div className="grid gap-2">
                <Label className="text-sm font-medium text-foreground">工作地点</Label>
                <div className="grid grid-cols-2 gap-2">
                  {CITIES.map((city) => (
                    <label
                      key={city}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <Checkbox
                        checked={selectedCities.includes(city)}
                        onCheckedChange={() => toggleCity(city)}
                      />
                      {city}
                    </label>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="grid gap-2">
                <Label className="text-sm font-medium text-foreground">学历要求</Label>
                <Select
                  value={selectedEducation}
                  onValueChange={setSelectedEducation}
                >
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

              {/* Company type */}
              <div className="grid gap-2">
                <Label className="text-sm font-medium text-foreground">单位性质</Label>
                <Select
                  value={selectedCompanyType}
                  onValueChange={setSelectedCompanyType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择单位性质" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部性质</SelectItem>
                    {COMPANY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-sm">
            <p className="text-sm text-muted-foreground">
              共找到 <span className="font-semibold text-primary">{total}</span> 个岗位
            </p>
            <div className="flex items-center gap-4">
              {/* Pagination */}
              {total > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="bg-transparent"
                  >
                    上一页
                  </Button>

                  {/* 生成分页按钮 */}
                  {(() => {
                    const totalPages = Math.ceil(total / PAGE_SIZE);
                    const pagesToShow = [];

                    // 总是显示第一页
                    if (totalPages > 0) {
                      pagesToShow.push(1);
                    }

                    // 显示当前页附近的页码
                    const startPage = Math.max(2, currentPage - 1);
                    const endPage = Math.min(totalPages - 1, currentPage + 1);

                    // 如果第一页和当前页附近有间隔，添加省略号
                    if (startPage > 2) {
                      pagesToShow.push('...');
                    }

                    // 添加当前页附近的页码
                    for (let i = startPage; i <= endPage; i++) {
                      pagesToShow.push(i);
                    }

                    // 如果当前页附近和最后一页有间隔，添加省略号
                    if (endPage < totalPages - 1) {
                      pagesToShow.push('...');
                    }

                    // 总是显示最后一页
                    if (totalPages > 1) {
                      pagesToShow.push(totalPages);
                    }

                    return pagesToShow.map((page) => {
                      if (page === '...') {
                        return (
                          <span key="ellipsis" className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground">
                            ...
                          </span>
                        );
                      }
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          className={page === currentPage ? "h-8 w-8 p-0" : "h-8 w-8 bg-transparent p-0"}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    });
                  })()}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(Math.ceil(total / PAGE_SIZE), p + 1))}
                    disabled={currentPage === Math.ceil(total / PAGE_SIZE)}
                    className="bg-transparent"
                  >
                    下一页
                  </Button>

                  {/* 页码输入跳转 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">前往</span>
                    <Input
                      type="number"
                      min="1"
                      max={Math.ceil(total / PAGE_SIZE)}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value);
                        if (!isNaN(page) && page >= 1 && page <= Math.ceil(total / PAGE_SIZE)) {
                          setCurrentPage(page);
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const page = parseInt(e.currentTarget.value);
                          if (!isNaN(page) && page >= 1 && page <= Math.ceil(total / PAGE_SIZE)) {
                            setCurrentPage(page);
                          }
                        }
                      }}
                      className="w-16 h-8 text-center"
                    />
                    <span className="text-sm text-muted-foreground">页</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20">
              <Loader2 className="mb-3 h-12 w-12 animate-spin text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                正在加载岗位数据...
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
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card py-20">
              <Search className="mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                没有找到符合条件的岗位，请调整筛选条件
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
