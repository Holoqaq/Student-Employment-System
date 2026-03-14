export interface Job {
  id: string;
  title: string;
  company: string;
  industry: string;
  companySize: string;
  companyType: string;
  city: string;
  salaryMin: number;
  salaryMax: number;
  education: string;
  matchScore: number;
  responsibilities: string[];
  requirements: string[];
  recommendReasons: string[];
  applicants: number;
  interviews: number;
  status: "active" | "inactive";
  postedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: "pending" | "interview" | "passed" | "rejected";
}

export interface UserProfile {
  name: string;
  gender: string;
  education: string;
  major: string;
  school: string;
  phone: string;
  email: string;
  avatar: string;
  skills: string[];
  preferredCities: string[];
  preferredIndustries: string[];
  expectedSalaryMin: number;
  expectedSalaryMax: number;
  jobCategory: string;
}

export const INDUSTRIES = [
  "IT/互联网",
  "金融",
  "教育",
  "制造业",
  "医疗健康",
  "房地产",
  "电子商务",
  "咨询",
];

export const CITIES = [
  "北京",
  "上海",
  "广州",
  "深圳",
  "杭州",
  "成都",
  "南京",
  "武汉",
  "西安",
  "重庆",
];

export const EDUCATION_LEVELS = ["大专", "本科", "硕士研究生", "博士研究生"];

export const COMPANY_TYPES = ["国企", "私企", "外企", "事业单位", "创业公司"];

export const SKILLS = [
  "Java",
  "Python",
  "JavaScript",
  "React",
  "Vue",
  "数据分析",
  "项目管理",
  "市场营销",
  "财务分析",
  "产品设计",
  "人工智能",
  "机器学习",
];

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "前端开发工程师",
    company: "字节跳动",
    industry: "IT/互联网",
    companySize: "10000人以上",
    companyType: "私企",
    city: "北京",
    salaryMin: 15,
    salaryMax: 30,
    education: "本科",
    matchScore: 95,
    responsibilities: [
      "负责公司前端产品的开发与维护",
      "与设计师和后端工程师紧密协作",
      "优化前端性能，提升用户体验",
      "参与前端架构设计和技术选型",
    ],
    requirements: [
      "熟练掌握React/Vue等前端框架",
      "本科及以上学历，计算机相关专业",
      "良好的沟通能力和团队合作精神",
      "了解前端性能优化和工程化实践",
    ],
    recommendReasons: [
      "本岗位与你的专业背景匹配度高",
      "该企业往年吸纳本校毕业生较多",
    ],
    applicants: 156,
    interviews: 23,
    status: "active",
    postedAt: "2026-01-15",
  },
  {
    id: "2",
    title: "数据分析师",
    company: "阿里巴巴",
    industry: "IT/互联网",
    companySize: "10000人以上",
    companyType: "私企",
    city: "杭州",
    salaryMin: 18,
    salaryMax: 35,
    education: "硕士研究生",
    matchScore: 88,
    responsibilities: [
      "负责业务数据分析与报表产出",
      "建立数据模型，挖掘业务增长机会",
      "与产品经理协作推动数据驱动决策",
      "设计并优化数据处理流程",
    ],
    requirements: [
      "硕士及以上学历，统计学/数学/计算机专业",
      "精通SQL和Python数据分析",
      "有数据可视化经验",
      "较强的逻辑思维和分析能力",
    ],
    recommendReasons: [
      "与你的技能高度匹配",
      "该岗位历年有不少毕业生就业",
    ],
    applicants: 203,
    interviews: 31,
    status: "active",
    postedAt: "2026-01-20",
  },
  {
    id: "3",
    title: "产品经理",
    company: "腾讯",
    industry: "IT/互联网",
    companySize: "10000人以上",
    companyType: "私企",
    city: "深圳",
    salaryMin: 20,
    salaryMax: 40,
    education: "本科",
    matchScore: 82,
    responsibilities: [
      "负责产品需求分析和功能设计",
      "撰写产品需求文档",
      "跟踪产品上线效果并持续优化",
      "协调研发、设计、测试等团队",
    ],
    requirements: [
      "本科及以上学历",
      "良好的沟通协调能力",
      "具备数据分析能力",
      "有产品实习经验者优先",
    ],
    recommendReasons: ["该公司福利待遇优厚", "深圳互联网发展前景好"],
    applicants: 312,
    interviews: 42,
    status: "active",
    postedAt: "2026-01-22",
  },
  {
    id: "4",
    title: "金融分析师",
    company: "中金公司",
    industry: "金融",
    companySize: "5000-10000人",
    companyType: "国企",
    city: "上海",
    salaryMin: 25,
    salaryMax: 50,
    education: "硕士研究生",
    matchScore: 76,
    responsibilities: [
      "撰写行业研究报告",
      "进行财务模型搭建和估值分析",
      "为客户提供投资建议",
      "跟踪宏观经济和市场动态",
    ],
    requirements: [
      "硕士及以上学历，金融/经济学专业",
      "CFA或CPA证书优先",
      "较强的财务分析能力",
      "良好的中英文写作能力",
    ],
    recommendReasons: [
      "国企稳定福利好",
      "金融行业前景广阔",
    ],
    applicants: 89,
    interviews: 12,
    status: "active",
    postedAt: "2026-02-01",
  },
  {
    id: "5",
    title: "人工智能算法工程师",
    company: "百度",
    industry: "IT/互联网",
    companySize: "10000人以上",
    companyType: "私企",
    city: "北京",
    salaryMin: 25,
    salaryMax: 50,
    education: "硕士研究生",
    matchScore: 91,
    responsibilities: [
      "负责AI算法的研发与应用落地",
      "设计并实现深度学习模型",
      "优化模型性能和推理效率",
      "撰写技术文档和论文",
    ],
    requirements: [
      "硕士及以上学历，人工智能/计算机专业",
      "精通PyTorch/TensorFlow",
      "有相关论文发表者优先",
      "良好的算法和编程基础",
    ],
    recommendReasons: [
      "AI是当下最热门的方向",
      "与你的研究方向高度一致",
    ],
    applicants: 178,
    interviews: 26,
    status: "active",
    postedAt: "2026-01-28",
  },
  {
    id: "6",
    title: "中学英语教师",
    company: "北京市第四中学",
    industry: "教育",
    companySize: "100-500人",
    companyType: "事业单位",
    city: "北京",
    salaryMin: 12,
    salaryMax: 20,
    education: "本科",
    matchScore: 70,
    responsibilities: [
      "负责中学英语课程教学",
      "设计教学方案和课程内容",
      "批改作业和考试试卷",
      "参与学校教研活动",
    ],
    requirements: [
      "本科及以上学历，英语/教育学专业",
      "持有教师资格证",
      "普通话二级甲等以上",
      "热爱教育事业",
    ],
    recommendReasons: ["事业编制稳定", "寒暑假福利好"],
    applicants: 67,
    interviews: 8,
    status: "active",
    postedAt: "2026-02-03",
  },
  {
    id: "7",
    title: "后端开发工程师",
    company: "美团",
    industry: "IT/互联网",
    companySize: "10000人以上",
    companyType: "私企",
    city: "北京",
    salaryMin: 18,
    salaryMax: 35,
    education: "本科",
    matchScore: 87,
    responsibilities: [
      "负责后端服务的设计与开发",
      "保障系统高可用性和稳定性",
      "优化服务性能，提升系统吞吐量",
      "参与技术方案评审和代码审查",
    ],
    requirements: [
      "本科及以上学历，计算机相关专业",
      "熟练掌握Java/Go",
      "了解分布式系统设计",
      "良好的编码习惯和团队意识",
    ],
    recommendReasons: [
      "与你的技术栈高度匹配",
      "美团发展迅速，晋升空间大",
    ],
    applicants: 234,
    interviews: 38,
    status: "active",
    postedAt: "2026-01-25",
  },
  {
    id: "8",
    title: "市场营销专员",
    company: "华为",
    industry: "IT/互联网",
    companySize: "10000人以上",
    companyType: "私企",
    city: "深圳",
    salaryMin: 12,
    salaryMax: 22,
    education: "本科",
    matchScore: 65,
    responsibilities: [
      "负责产品市场推广方案的策划与执行",
      "跟踪行业动态与竞争对手分析",
      "撰写市场分析报告",
      "组织并参与行业展会与活动",
    ],
    requirements: [
      "本科及以上学历，市场营销/传播学专业",
      "有新媒体运营经验优先",
      "较强的文案撰写能力",
      "良好的团队协作与沟通能力",
    ],
    recommendReasons: ["华为品牌知名度高", "有海外派遣机会"],
    applicants: 145,
    interviews: 18,
    status: "active",
    postedAt: "2026-02-05",
  },
  {
    id: "9",
    title: "UI/UX设计师",
    company: "网易",
    industry: "IT/互联网",
    companySize: "10000人以上",
    companyType: "私企",
    city: "杭州",
    salaryMin: 15,
    salaryMax: 28,
    education: "本科",
    matchScore: 79,
    responsibilities: [
      "负责产品界面设计和交互设计",
      "制定并维护设计规范",
      "产出高保真原型与设计稿",
      "与研发团队紧密配合推动设计落地",
    ],
    requirements: [
      "本科及以上学历，视觉传达/交互设计专业",
      "精通Figma/Sketch等设计工具",
      "有完整的项目设计作品集",
      "对前端实现有基本了解",
    ],
    recommendReasons: ["网易设计氛围好", "杭州生活品质高"],
    applicants: 98,
    interviews: 15,
    status: "active",
    postedAt: "2026-02-02",
  },
];

export const mockApplications: Application[] = [
  {
    id: "a1",
    jobId: "1",
    jobTitle: "前端开发工程师",
    company: "字节跳动",
    appliedAt: "2026-01-20",
    status: "interview",
  },
  {
    id: "a2",
    jobId: "2",
    jobTitle: "数据分析师",
    company: "阿里巴巴",
    appliedAt: "2026-01-25",
    status: "pending",
  },
  {
    id: "a3",
    jobId: "3",
    jobTitle: "产品经理",
    company: "腾讯",
    appliedAt: "2026-01-28",
    status: "passed",
  },
  {
    id: "a4",
    jobId: "5",
    jobTitle: "人工智能算法工程师",
    company: "百度",
    appliedAt: "2026-02-01",
    status: "rejected",
  },
  {
    id: "a5",
    jobId: "7",
    jobTitle: "后端开发工程师",
    company: "美团",
    appliedAt: "2026-02-03",
    status: "pending",
  },
];

export const mockProfile: UserProfile = {
  name: "张小明",
  gender: "男",
  education: "硕士研究生",
  major: "计算机科学与技术",
  school: "清华大学",
  phone: "138****6789",
  email: "zhangxm@example.com",
  avatar: "",
  skills: ["JavaScript", "React", "Python", "数据分析", "机器学习"],
  preferredCities: ["北京", "上海", "杭州"],
  preferredIndustries: ["IT/互联网", "金融"],
  expectedSalaryMin: 15,
  expectedSalaryMax: 30,
  jobCategory: "技术研发",
};

export const employmentTrendData = [
  { year: "2021", count: 45 },
  { year: "2022", count: 52 },
  { year: "2023", count: 68 },
  { year: "2024", count: 75 },
  { year: "2025", count: 82 },
];

export const industryDistribution = [
  { name: "IT/互联网", value: 35 },
  { name: "金融", value: 20 },
  { name: "教育", value: 15 },
  { name: "制造业", value: 12 },
  { name: "医疗健康", value: 10 },
  { name: "其他", value: 8 },
];

export const salaryByMajor = [
  { major: "计算机", salary: 22 },
  { major: "金融", salary: 18 },
  { major: "电子工程", salary: 17 },
  { major: "会计", salary: 13 },
  { major: "市场营销", salary: 12 },
  { major: "教育学", salary: 10 },
];

export const salaryByEducation = [
  { education: "大专", salary: 8 },
  { education: "本科", salary: 12 },
  { education: "硕士", salary: 18 },
  { education: "博士", salary: 25 },
];
