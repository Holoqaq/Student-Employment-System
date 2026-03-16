"use client";

import { useState } from "react";
import { ArrowLeft, Check, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthRequired } from "@/components/auth-required";
import { CITIES, EDUCATION_LEVELS, INDUSTRIES } from "@/lib/mock-data";
import { jobApi } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

const REQUIREMENTS = [
  "熟练掌握相关技术栈",
  "本科及以上学历",
  "硕士及以上学历",
  "有实习经验",
  "良好的沟通能力",
  "团队合作精神",
  "英语流利",
  "有项目管理经验",
];

export default function NewJobPage() {
  return (
    <AuthRequired roles={['employer']}>
      <NewJobContent />
    </AuthRequired>
  );
}

function NewJobContent() {
  const { user } = useAuth();
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 表单数据
  const [formData, setFormData] = useState({
    title: '',
    company: '字节跳动科技有限公司',
    city: '',
    industry: '',
    salaryMin: '',
    salaryMax: '',
    education: '',
    responsibilities: ''
  });

  const toggleReq = (req: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // 验证表单
      if (!formData.title || !formData.city || !formData.industry ||
        !formData.salaryMin || !formData.salaryMax || !formData.education ||
        !formData.responsibilities) {
        throw new Error('请填写所有必填字段');
      }

      if (user?.role !== 'employer') {
        throw new Error('只有企业用户才能发布岗位');
      }

      // 调用API创建岗位
      const response = await jobApi.createJob({
        title: formData.title,
        company: formData.company,
        city: formData.city,
        industry: formData.industry,
        salaryMin: parseInt(formData.salaryMin),
        salaryMax: parseInt(formData.salaryMax),
        education: formData.education,
        responsibilities: formData.responsibilities,
        requirements: selectedRequirements,
        employerId: user.id
      });

      if (response.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '发布失败');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <div className="flex flex-col items-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-16 text-center shadow-lg shadow-emerald-500/20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/20 ring-4 ring-primary-foreground/10">
            <Check className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-primary-foreground">
            岗位发布成功
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            岗位信息已成功发布，等待审核后即可展示给学生
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/employer">
              <Button variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground">
                返回岗位列表
              </Button>
            </Link>
            <Button className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30" onClick={() => {
              setSubmitted(false);
              setFormData({
                title: '',
                company: '字节跳动科技有限公司',
                city: '',
                industry: '',
                salaryMin: '',
                salaryMax: '',
                education: '',
                responsibilities: ''
              });
              setSelectedRequirements([]);
            }}>继续发布</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:px-8">
      <Link
        href="/employer"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回岗位列表
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
          <FileText className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">发布新岗位</h1>
          <p className="text-sm text-muted-foreground">填写岗位信息，发布后将展示给匹配的学生</p>
        </div>
      </div>

      <Card className="border-transparent shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="h-5 w-1 rounded-full bg-emerald-500" />
            岗位信息
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <div className="grid gap-2">
            <Label className="text-sm font-medium">岗位标题</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="例如：前端开发工程师"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">单位名称</Label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">自动填充当前单位信息</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-sm font-medium">工作城市</Label>
              <Select onValueChange={(value) => handleSelectChange('city', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择城市" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium">所属行业</Label>
              <Select onValueChange={(value) => handleSelectChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择行业" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-sm font-medium">最低薪资（K/月）</Label>
              <Input
                name="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={handleChange}
                placeholder="15"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium">最高薪资（K/月）</Label>
              <Input
                name="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={handleChange}
                placeholder="30"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">学历要求</Label>
            <Select onValueChange={(value) => handleSelectChange('education', value)}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="选择学历要求" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_LEVELS.map((edu) => (
                  <SelectItem key={edu} value={edu}>
                    {edu}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">岗位职责</Label>
            <Textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="请详细描述岗位职责..."
              className="min-h-32"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">任职要求（多选）</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {REQUIREMENTS.map((req) => (
                <label
                  key={req}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm text-foreground transition-colors has-[button[data-state=checked]]:border-emerald-500 has-[button[data-state=checked]]:bg-emerald-500/5 hover:bg-muted"
                >
                  <Checkbox
                    checked={selectedRequirements.includes(req)}
                    onCheckedChange={() => toggleReq(req)}
                  />
                  {req}
                </label>
              ))}
            </div>
          </div>

          <Button
            className="mt-2 w-full rounded-xl bg-emerald-600 shadow-md shadow-emerald-500/20 hover:bg-emerald-700"
            size="lg"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                发布中...
              </>
            ) : (
              '发布岗位'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
