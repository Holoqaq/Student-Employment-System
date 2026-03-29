"use client";

import { useState } from "react";
import {
  GraduationCap,
  Building2,
  MapPin,
  Banknote,
  Check,
  Rocket,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthRequired } from "@/components/auth-required";
import { CITIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const employmentTypes = [
  { value: "就业", label: "就业", icon: Briefcase, color: "text-primary", bg: "bg-primary/10", activeBorder: "border-primary", activeBg: "bg-primary/5" },
  { value: "升学", label: "升学", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-500/10", activeBorder: "border-emerald-500", activeBg: "bg-emerald-500/5" },
  { value: "创业", label: "创业", icon: Rocket, color: "text-amber-600", bg: "bg-amber-500/10", activeBorder: "border-amber-500", activeBg: "bg-amber-500/5" },
];

export default function EmploymentPage() {
  return (
    <AuthRequired roles={['student']}>
      <EmploymentContent />
    </AuthRequired>
  );
}

function EmploymentContent() {
  const [employmentType, setEmploymentType] = useState("就业");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <div className="flex flex-col items-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-16 text-center shadow-lg shadow-emerald-500/20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/20 ring-4 ring-primary-foreground/10">
            <Check className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-primary-foreground">
            提交成功
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            你的就业去向信息已成功提交，感谢你的配合！
          </p>
          <Button
            variant="outline"
            className="mt-8 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            onClick={() => setSubmitted(false)}
          >
            修改信息
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">就业去向填报</h1>
          <p className="text-sm text-muted-foreground">请如实填写你的就业去向信息，帮助学校做好就业统计工作</p>
        </div>
      </div>

      <Card className="border-transparent shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="h-5 w-1 rounded-full bg-primary" />
            就业类型选择
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup
            value={employmentType}
            onValueChange={setEmploymentType}
            className="grid grid-cols-3 gap-3"
          >
            {employmentTypes.map((type) => {
              const Icon = type.icon;
              const isActive = employmentType === type.value;
              return (
                <Label
                  key={type.value}
                  className={cn(
                    "flex cursor-pointer flex-col items-center gap-2.5 rounded-xl border-2 px-4 py-5 text-sm transition-all",
                    isActive
                      ? `${type.activeBorder} ${type.activeBg} shadow-sm`
                      : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
                  )}
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", type.bg)}>
                    <Icon className={cn("h-5 w-5", type.color)} />
                  </div>
                  <span className={cn("font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                    {type.label}
                  </span>
                  <RadioGroupItem value={type.value} className="sr-only" />
                </Label>
              );
            })}
          </RadioGroup>

          {employmentType === "就业" && (
            <div className="grid gap-5 rounded-xl border border-primary/10 bg-primary/5 p-5">
              <div className="grid gap-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Building2 className="h-4 w-4 text-primary/60" />
                  就业单位
                </Label>
                <Input
                  placeholder="请输入就业单位名称"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-card"
                />
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Briefcase className="h-4 w-4 text-primary/60" />
                  就业岗位
                </Label>
                <Input
                  placeholder="请输入就业岗位名称"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="bg-card"
                />
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Banknote className="h-4 w-4 text-primary/60" />
                  薪资水平
                </Label>
                <Select value={salary} onValueChange={setSalary}>
                  <SelectTrigger className="bg-card">
                    <SelectValue placeholder="选择薪资范围" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5k以下">5K以下</SelectItem>
                    <SelectItem value="5-10k">5-10K</SelectItem>
                    <SelectItem value="10-15k">10-15K</SelectItem>
                    <SelectItem value="15-20k">15-20K</SelectItem>
                    <SelectItem value="20-30k">20-30K</SelectItem>
                    <SelectItem value="30k以上">30K以上</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-primary/60" />
                  就业城市
                </Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="bg-card">
                    <SelectValue placeholder="选择就业城市" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {employmentType === "升学" && (
            <div className="grid gap-5 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-5">
              <div className="grid gap-2">
                <Label className="text-sm font-medium">升学院校</Label>
                <Input
                  placeholder="请输入录取院校名称"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-card"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium">录取专业</Label>
                <Input
                  placeholder="请输入录取专业名称"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="bg-card"
                />
              </div>
            </div>
          )}

          {employmentType === "创业" && (
            <div className="grid gap-5 rounded-xl border border-amber-500/10 bg-amber-500/5 p-5">
              <div className="grid gap-2">
                <Label className="text-sm font-medium">创业公司名称</Label>
                <Input
                  placeholder="请输入创业公司名称"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-card"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium">创业方向</Label>
                <Input
                  placeholder="请输入创业方向/行业"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="bg-card"
                />
              </div>
            </div>
          )}

          <Button className="mt-2 w-full rounded-xl shadow-md shadow-primary/20" size="lg" onClick={handleSubmit}>
            提交去向信息
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
