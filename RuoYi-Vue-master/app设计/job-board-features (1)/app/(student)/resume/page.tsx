"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Briefcase,
  Upload,
  Pencil,
  Check,
  X,
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthRequired } from "@/components/auth-required";
import {
  mockProfile,
  CITIES,
  INDUSTRIES,
} from "@/lib/mock-data";

export default function ResumePage() {
  return (
    <AuthRequired roles={['student']}>
      <ResumeContent />
    </AuthRequired>
  );
}

function ResumeContent() {
  // 从localStorage读取保存的求职意向，或使用默认数据
  const loadProfile = () => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : mockProfile;
  };

  const [profile, setProfile] = useState(loadProfile);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [tempCities, setTempCities] = useState(profile.preferredCities);
  const [tempIndustries, setTempIndustries] = useState(
    profile.preferredIndustries
  );
  const [tempSalary, setTempSalary] = useState([
    profile.expectedSalaryMin,
    profile.expectedSalaryMax,
  ]);
  const [tempCategory, setTempCategory] = useState(profile.jobCategory);
  const [tempProfile, setTempProfile] = useState(profile);
  const [tempSkills, setTempSkills] = useState(profile.skills);
  const [newSkill, setNewSkill] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadedResume, setUploadedResume] = useState<string | null>(profile.resumeUrl || null);

  // 当profile变化时，保存到localStorage
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const startEditing = () => {
    setTempCities(profile.preferredCities);
    setTempIndustries(profile.preferredIndustries);
    setTempSalary([profile.expectedSalaryMin, profile.expectedSalaryMax]);
    setTempCategory(profile.jobCategory);
    setIsEditingPreferences(true);
  };

  const savePreferences = () => {
    setProfile((p) => ({
      ...p,
      preferredCities: tempCities,
      preferredIndustries: tempIndustries,
      expectedSalaryMin: tempSalary[0],
      expectedSalaryMax: tempSalary[1],
      jobCategory: tempCategory,
    }));
    setIsEditingPreferences(false);
  };

  const startEditingProfile = () => {
    setTempProfile({ ...profile });
    setIsEditingProfile(true);
  };

  const saveProfile = () => {
    setProfile(tempProfile);
    setIsEditingProfile(false);
  };

  const startEditingSkills = () => {
    setTempSkills([...profile.skills]);
    setIsEditingSkills(true);
  };

  const saveSkills = () => {
    setProfile((p) => ({ ...p, skills: tempSkills }));
    setIsEditingSkills(false);
  };

  const addSkill = () => {
    if (newSkill && !tempSkills.includes(newSkill)) {
      setTempSkills([...tempSkills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setTempSkills(tempSkills.filter(s => s !== skill));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
        setResumeFile(file);
        // 模拟上传成功
        setTimeout(() => {
          const resumeUrl = file.name; // 实际应用中应该是服务器返回的文件URL
          setUploadedResume(resumeUrl);
          setProfile((p) => ({ ...p, resumeUrl }));
          setResumeFile(null);
        }, 1000);
      }
    }
  };

  const deleteResume = () => {
    setUploadedResume(null);
    setProfile((p) => ({ ...p, resumeUrl: null }));
  };

  const toggleCity = (city: string) => {
    setTempCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const toggleIndustry = (ind: string) => {
    setTempIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">个人简历与求职意向</h1>
          <p className="text-sm text-muted-foreground">完善你的资料，获取更精准的岗位推荐</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile info */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden border-transparent shadow-sm">
            {/* Profile header with gradient */}
            <div className="bg-gradient-to-br from-primary via-primary to-blue-700 px-6 pb-12 pt-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/20 ring-4 ring-primary-foreground/30">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              {isEditingProfile ? (
                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="w-full rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1.5 text-sm text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                    placeholder="姓名"
                  />
                  <input
                    type="text"
                    value={tempProfile.school}
                    onChange={(e) => setTempProfile({ ...tempProfile, school: e.target.value })}
                    className="w-full rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1.5 text-sm text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                    placeholder="学校"
                  />
                  <input
                    type="text"
                    value={tempProfile.major}
                    onChange={(e) => setTempProfile({ ...tempProfile, major: e.target.value })}
                    className="w-full rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1.5 text-sm text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                    placeholder="专业"
                  />
                </div>
              ) : (
                <>
                  <h2 className="mt-4 text-lg font-semibold text-primary-foreground">
                    {profile.name}
                  </h2>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    {profile.school} - {profile.major}
                  </p>
                </>
              )}
            </div>

            <CardContent className="-mt-6 relative rounded-t-2xl bg-card px-6 pb-6 pt-8">
              {isEditingProfile ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium">性别</Label>
                    <Select
                      value={tempProfile.gender}
                      onValueChange={(value) => setTempProfile({ ...tempProfile, gender: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="男">男</SelectItem>
                        <SelectItem value="女">女</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium">学历</Label>
                    <Select
                      value={tempProfile.education}
                      onValueChange={(value) => setTempProfile({ ...tempProfile, education: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="本科">本科</SelectItem>
                        <SelectItem value="硕士研究生">硕士研究生</SelectItem>
                        <SelectItem value="博士研究生">博士研究生</SelectItem>
                        <SelectItem value="大专">大专</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium">电话</Label>
                    <input
                      type="text"
                      value={tempProfile.phone}
                      onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                      className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="电话"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium">邮箱</Label>
                    <input
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                      className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="邮箱"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsEditingProfile(false)}>
                      取消
                    </Button>
                    <Button size="sm" className="flex-1" onClick={saveProfile}>
                      保存
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-end mb-3">
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={startEditingProfile}>
                      <Pencil className="h-3.5 w-3.5" />
                      编辑
                    </Button>
                  </div>
                  <dl className="grid gap-3 text-sm">
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
                      <User className="h-4 w-4 text-primary/60" />
                      <dt className="text-muted-foreground">性别</dt>
                      <dd className="ml-auto font-medium text-foreground">
                        {profile.gender}
                      </dd>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
                      <GraduationCap className="h-4 w-4 text-primary/60" />
                      <dt className="text-muted-foreground">学历</dt>
                      <dd className="ml-auto font-medium text-foreground">
                        {profile.education}
                      </dd>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
                      <Phone className="h-4 w-4 text-primary/60" />
                      <dt className="text-muted-foreground">电话</dt>
                      <dd className="ml-auto font-medium text-foreground">
                        {profile.phone}
                      </dd>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
                      <Mail className="h-4 w-4 text-primary/60" />
                      <dt className="text-muted-foreground">邮箱</dt>
                      <dd className="ml-auto font-medium text-foreground">
                        {profile.email}
                      </dd>
                    </div>
                  </dl>
                </>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="mt-4 border-transparent shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" />
                技能标签
              </CardTitle>
              {!isEditingSkills && (
                <Button variant="outline" size="sm" className="gap-1.5" onClick={startEditingSkills}>
                  <Pencil className="h-3.5 w-3.5" />
                  编辑
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isEditingSkills ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {tempSkills.map((skill) => (
                      <Badge key={skill} className="border border-primary/20 bg-primary/10 text-primary flex items-center gap-1">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1 rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="添加技能"
                    />
                    <Button size="sm" onClick={addSkill}>
                      添加
                    </Button>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsEditingSkills(false)}>
                      取消
                    </Button>
                    <Button size="sm" className="flex-1" onClick={saveSkills}>
                      保存
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} className="border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resume upload */}
          <Card className="mt-4 border-transparent shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Upload className="h-4 w-4 text-primary" />
                简历文件
              </CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedResume ? (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{uploadedResume}</p>
                        <p className="text-xs text-muted-foreground">PDF 文件</p>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm" onClick={deleteResume}>
                      删除
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="group flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 px-4 py-8 transition-colors hover:border-primary/40 hover:bg-primary/10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">
                      上传个人简历
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      支持 PDF 格式，最大 10MB
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                      选择文件
                    </Button>
                  </label>
                  {resumeFile && (
                    <div className="mt-4 rounded-lg bg-primary/5 p-3 text-center">
                      <p className="text-sm text-primary">上传中... {resumeFile.name}</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Job preferences */}
        <div className="lg:col-span-2">
          <Card className="border-transparent shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Briefcase className="h-4 w-4 text-primary" />
                求职意向设置
              </CardTitle>
              {!isEditingPreferences ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 bg-transparent"
                  onClick={startEditing}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  编辑
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 bg-transparent"
                    onClick={() => setIsEditingPreferences(false)}
                  >
                    <X className="h-3.5 w-3.5" />
                    取消
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={savePreferences}
                  >
                    <Check className="h-3.5 w-3.5" />
                    保存
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Preferred cities */}
              <div className="grid gap-3">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <div className="h-4 w-1 rounded-full bg-primary" />
                  意向城市
                </Label>
                {isEditingPreferences ? (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {CITIES.map((city) => (
                      <label
                        key={city}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-primary/5 hover:bg-muted"
                      >
                        <Checkbox
                          checked={tempCities.includes(city)}
                          onCheckedChange={() => toggleCity(city)}
                        />
                        {city}
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredCities.map((city) => (
                      <Badge key={city} className="border border-primary/20 bg-primary/10 text-primary">
                        <MapPin className="mr-1 h-3 w-3" />
                        {city}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Preferred industries */}
              <div className="grid gap-3">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <div className="h-4 w-1 rounded-full bg-emerald-500" />
                  意向行业
                </Label>
                {isEditingPreferences ? (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {INDUSTRIES.map((ind) => (
                      <label
                        key={ind}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors has-[button[data-state=checked]]:border-emerald-500 has-[button[data-state=checked]]:bg-emerald-500/5 hover:bg-muted"
                      >
                        <Checkbox
                          checked={tempIndustries.includes(ind)}
                          onCheckedChange={() => toggleIndustry(ind)}
                        />
                        {ind}
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredIndustries.map((ind) => (
                      <Badge key={ind} className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        <Briefcase className="mr-1 h-3 w-3" />
                        {ind}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Expected salary */}
              <div className="grid gap-3">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <div className="h-4 w-1 rounded-full bg-amber-500" />
                  期望薪资
                </Label>
                {isEditingPreferences ? (
                  <div className="grid gap-3">
                    <div className="rounded-lg bg-amber-500/5 px-4 py-2.5 text-center text-sm font-semibold text-amber-700 dark:text-amber-400">
                      {tempSalary[0]}K - {tempSalary[1]}K / 月
                    </div>
                    <Slider
                      value={tempSalary}
                      onValueChange={setTempSalary}
                      max={60}
                      min={0}
                      step={5}
                    />
                  </div>
                ) : (
                  <Badge className="w-fit border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    {profile.expectedSalaryMin}K - {profile.expectedSalaryMax}K / 月
                  </Badge>
                )}
              </div>

              <Separator />

              {/* Job category */}
              <div className="grid gap-3">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <div className="h-4 w-1 rounded-full bg-primary" />
                  岗位类别
                </Label>
                {isEditingPreferences ? (
                  <Select
                    value={tempCategory}
                    onValueChange={setTempCategory}
                  >
                    <SelectTrigger className="w-60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="技术研发">技术研发</SelectItem>
                      <SelectItem value="产品设计">产品设计</SelectItem>
                      <SelectItem value="市场营销">市场营销</SelectItem>
                      <SelectItem value="金融财务">金融财务</SelectItem>
                      <SelectItem value="教育培训">教育培训</SelectItem>
                      <SelectItem value="运营管理">运营管理</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className="w-fit border border-primary/20 bg-primary/10 text-primary">
                    {profile.jobCategory}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
