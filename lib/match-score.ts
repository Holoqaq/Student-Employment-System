import type { UserProfile } from "./mock-data";
import { mockProfile } from "./mock-data";

/** 与简历页 localStorage `userProfile` 及岗位字段对应的匹配维度 */
export type MatchDimensions = {
  /** 专业 + 学历与岗位要求 */
  major: number;
  /** 技能标签与岗位文本的命中比例 */
  skills: number;
  /** 求职意向岗位类别 vs 岗位类别 */
  category: number;
  /** 意向行业 vs 岗位行业 */
  industry: number;
  /** 意向城市 vs 岗位城市 */
  location: number;
  /** 期望薪资区间与岗位薪资区间重叠度 */
  salary: number;
};

export type JobMatchInput = {
  title: string;
  city: string;
  industry: string;
  company?: string;
  salaryMin: number;
  salaryMax: number;
  jobCategory?: string;
  education?: string;
  requirements: string[] | string;
  responsibilities: string[] | string;
};

function flattenJobText(job: JobMatchInput): string {
  const req = job.requirements;
  const res = job.responsibilities;
  const r = Array.isArray(req) ? req.join(" ") : String(req ?? "");
  const s = Array.isArray(res) ? res.join(" ") : String(res ?? "");
  return `${job.title} ${r} ${s}`;
}

/** 岗位薪资在库中可能为「元/月」或「K」；统一为 K（月薪） */
export function normalizeSalaryToK(salaryMin: number, salaryMax: number): {
  minK: number;
  maxK: number;
} {
  const hi = Math.max(salaryMin, salaryMax);
  if (hi >= 1000) {
    return {
      minK: salaryMin / 1000,
      maxK: salaryMax / 1000,
    };
  }
  return { minK: salaryMin, maxK: salaryMax };
}

function parseEducationLevel(text: string): number {
  const s = text || "";
  if (s.includes("博士")) return 4;
  if (s.includes("硕士") || s.includes("研究生")) return 3;
  if (s.includes("本科")) return 2;
  if (s.includes("大专") || s.includes("专科")) return 1;
  return 2;
}

function educationFitScore(userEducation: string, jobEducation: string): number {
  const u = parseEducationLevel(userEducation);
  const j = parseEducationLevel(jobEducation);
  if (u >= j) return 100;
  return Math.max(35, 100 - (j - u) * 28);
}

function majorKeywordScore(major: string, jobText: string): number {
  const m = (major || "").trim();
  if (!m) return 55;
  const text = jobText;
  if (text.includes(m)) return 96;
  const parts = m.split(/[\s、，,]/).filter((p) => p.length >= 2);
  let hit = 0;
  for (const p of parts) {
    if (text.includes(p)) hit++;
  }
  if (parts.length > 0) {
    return Math.round(45 + (hit / parts.length) * 50);
  }
  if (m.length >= 2 && text.includes(m.slice(0, 2))) return 72;
  return 48;
}

function skillsScore(skills: string[], jobText: string): number {
  if (!skills?.length) return 52;
  const text = jobText.toLowerCase();
  let hits = 0;
  for (const sk of skills) {
    const s = (sk || "").trim();
    if (!s) continue;
    if (text.includes(s.toLowerCase()) || jobText.includes(s)) hits++;
  }
  return Math.round((hits / skills.length) * 100);
}

function categoryScore(userCategory: string, jobCategory: string | undefined): number {
  const j = (jobCategory || "").trim();
  const u = (userCategory || "").trim();
  if (!j || !u) return 58;
  if (u === j) return 100;
  const related: Record<string, string[]> = {
    技术研发: ["技术研发", "其他"],
    市场营销: ["市场营销", "其他"],
    其他: ["其他", "技术研发", "市场营销"],
  };
  const rel = related[u];
  if (rel?.includes(j)) return j === "其他" && u === "技术研发" ? 62 : 68;
  return 45;
}

function industryScore(jobIndustry: string, preferred: string[]): number {
  if (!preferred?.length) return 55;
  if (preferred.includes(jobIndustry)) return 100;
  return 38;
}

function locationScore(city: string, preferredCities: string[]): number {
  if (!preferredCities?.length) return 55;
  if (preferredCities.includes(city)) return 100;
  return 42;
}

function salaryOverlapScore(
  userMin: number,
  userMax: number,
  jobMinK: number,
  jobMaxK: number
): number {
  const u0 = Math.min(userMin, userMax);
  const u1 = Math.max(userMin, userMax);
  const j0 = Math.min(jobMinK, jobMaxK);
  const j1 = Math.max(jobMinK, jobMaxK);
  const overlap = Math.max(0, Math.min(u1, j1) - Math.max(u0, j0));
  if (overlap <= 0) {
    const midJ = (j0 + j1) / 2;
    const midU = (u0 + u1) / 2;
    const gap = Math.abs(midJ - midU);
    return Math.max(25, Math.round(55 - Math.min(30, gap * 2)));
  }
  const userSpan = u1 - u0 || 1;
  const ratio = overlap / userSpan;
  return Math.round(Math.min(100, 58 + ratio * 42));
}

function buildRecommendReasons(
  d: MatchDimensions,
  meta: { company: string; industry: string; city: string }
): string[] {
  const out: string[] = [];
  if (d.industry >= 78) {
    out.push(`「${meta.industry}」行业与您的意向行业相符`);
  }
  if (d.location >= 78) {
    out.push(`工作地点「${meta.city}」在您期望的城市范围内`);
  }
  if (d.salary >= 78) {
    out.push("岗位薪资区间与您的期望薪资匹配良好");
  }
  if (d.skills >= 72) {
    out.push("您的技能标签与该岗位描述匹配度较高");
  }
  if (d.category >= 82) {
    out.push("岗位类别与您的求职意向类别一致");
  }
  if (d.major >= 75) {
    out.push("学历与专业方向与该岗位要求较为契合");
  }
  if (out.length < 2) {
    out.push(`${meta.company} 为平台在库企业，信息来源于招聘数据`);
  }
  if (out.length < 3) {
    out.push("建议结合岗位职责与个人职业规划综合评估");
  }
  return [...new Set(out)].slice(0, 5);
}

export function getUserProfileForMatch(): UserProfile {
  if (typeof window === "undefined") return mockProfile;
  try {
    const raw = localStorage.getItem("userProfile");
    if (raw) {
      const p = JSON.parse(raw) as UserProfile;
      if (p && typeof p === "object") return p;
    }
  } catch {
    /* ignore */
  }
  return mockProfile;
}

export function computeJobMatch(
  profile: UserProfile,
  job: JobMatchInput
): {
  matchScore: number;
  matchDimensions: MatchDimensions;
  recommendReasons: string[];
} {
  const jobText = flattenJobText(job);
  const majorKw = majorKeywordScore(profile.major, jobText);
  const eduFit = educationFitScore(profile.education, job.education || "");
  const major = Math.round((majorKw + eduFit) / 2);

  const skills = skillsScore(profile.skills, jobText);
  const category = categoryScore(profile.jobCategory, job.jobCategory);
  const industry = industryScore(job.industry, profile.preferredIndustries);
  const location = locationScore(job.city, profile.preferredCities);

  const { minK, maxK } = normalizeSalaryToK(job.salaryMin, job.salaryMax);
  const salary = salaryOverlapScore(
    profile.expectedSalaryMin,
    profile.expectedSalaryMax,
    minK,
    maxK
  );

  const dims: MatchDimensions = {
    major,
    skills,
    category,
    industry,
    location,
    salary,
  };

  const matchScore = Math.round(
    (major + skills + category + industry + location + salary) / 6
  );

  const recommendReasons = buildRecommendReasons(dims, {
    company: job.company || "",
    industry: job.industry,
    city: job.city,
  }).filter((r) => r.length > 0);

  return { matchScore, matchDimensions: dims, recommendReasons };
}
