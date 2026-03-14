// API服务层

// 硬编码数据（来自 D:\学习\大四\毕设备份\毕设\data-crawling\output）
const jobsData = [
  {
    "job_title": "算法工程师",
    "salary_min": 10000,
    "salary_max": 16000,
    "city": "南京",
    "education": "博士研究生",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责算法工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "博士研究生及以上学历，算法相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "中国电信",
    "post_date": "2024-12-06"
  },
  {
    "job_title": "AR/VR工程师",
    "salary_min": 23000,
    "salary_max": 39000,
    "city": "南京",
    "education": "本科",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责AR/VR工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "本科及以上学历，AR/VR相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "美团",
    "post_date": "2024-02-08"
  },
  {
    "job_title": "游戏开发工程师",
    "salary_min": 19000,
    "salary_max": 24000,
    "city": "南京",
    "education": "本科",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责游戏开发工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "本科及以上学历，游戏开发相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "万科",
    "post_date": "2024-03-14"
  },
  {
    "job_title": "项目经理",
    "salary_min": 28000,
    "salary_max": 36000,
    "city": "南京",
    "education": "本科",
    "work_experience": "应届生",
    "job_category": "其他",
    "responsibilities": "负责项目经理相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "本科及以上学历，项目经理相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "网易",
    "post_date": "2024-10-21"
  },
  {
    "job_title": "前端架构师",
    "salary_min": 26000,
    "salary_max": 44000,
    "city": "南京",
    "education": "硕士研究生",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责前端架构师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "硕士研究生及以上学历，前端架构师相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "中金公司",
    "post_date": "2024-07-09"
  },
  {
    "job_title": "客户服务专员",
    "salary_min": 18000,
    "salary_max": 29000,
    "city": "南京",
    "education": "硕士研究生",
    "work_experience": "应届生",
    "job_category": "其他",
    "responsibilities": "负责客户服务专员相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "硕士研究生及以上学历，客户服务专员相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "华为",
    "post_date": "2024-12-03"
  },
  {
    "job_title": "游戏开发工程师",
    "salary_min": 30000,
    "salary_max": 37000,
    "city": "南京",
    "education": "硕士研究生",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责游戏开发工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "硕士研究生及以上学历，游戏开发相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "万科",
    "post_date": "2024-05-12"
  },
  {
    "job_title": "C++开发工程师",
    "salary_min": 14000,
    "salary_max": 24000,
    "city": "南京",
    "education": "硕士研究生",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责C++开发工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "硕士研究生及以上学历，C++开发相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "美团",
    "post_date": "2024-08-04"
  },
  {
    "job_title": "计算机视觉工程师",
    "salary_min": 26000,
    "salary_max": 41000,
    "city": "南京",
    "education": "博士研究生",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责计算机视觉工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "博士研究生及以上学历，计算机视觉相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "建设银行",
    "post_date": "2024-04-08"
  },
  {
    "job_title": "市场总监",
    "salary_min": 10000,
    "salary_max": 23000,
    "city": "南京",
    "education": "大专",
    "work_experience": "应届生",
    "job_category": "市场营销",
    "responsibilities": "负责市场总监相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "大专及以上学历，市场总监相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "百度",
    "post_date": "2024-12-12"
  },
  {
    "job_title": "Java开发工程师",
    "salary_min": 17000,
    "salary_max": 22000,
    "city": "南京",
    "education": "硕士研究生",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责Java开发工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "硕士研究生及以上学历，Java开发相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "工商银行",
    "post_date": "2024-09-21"
  },
  {
    "job_title": "市场营销专员",
    "salary_min": 9000,
    "salary_max": 18000,
    "city": "南京",
    "education": "大专",
    "work_experience": "应届生",
    "job_category": "市场营销",
    "responsibilities": "负责市场营销专员相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "大专及以上学历，市场营销专员相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "百度",
    "post_date": "2024-07-25"
  },
  {
    "job_title": "游戏开发工程师",
    "salary_min": 18000,
    "salary_max": 32000,
    "city": "南京",
    "education": "本科",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责游戏开发工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "本科及以上学历，游戏开发相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "碧桂园",
    "post_date": "2024-06-28"
  },
  {
    "job_title": "软件工程师",
    "salary_min": 28000,
    "salary_max": 36000,
    "city": "南京",
    "education": "硕士研究生",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责软件工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "硕士研究生及以上学历，软件相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "工商银行",
    "post_date": "2024-04-19"
  },
  {
    "job_title": "技术总监",
    "salary_min": 21000,
    "salary_max": 28000,
    "city": "南京",
    "education": "大专",
    "work_experience": "应届生",
    "job_category": "其他",
    "responsibilities": "负责技术总监相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "大专及以上学历，技术总监相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "工商银行",
    "post_date": "2024-11-09"
  },
  {
    "job_title": "网络工程师",
    "salary_min": 23000,
    "salary_max": 39000,
    "city": "南京",
    "education": "大专",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责网络工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "大专及以上学历，网络相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "腾讯",
    "post_date": "2024-02-11"
  },
  {
    "job_title": "运维工程师",
    "salary_min": 29000,
    "salary_max": 36000,
    "city": "南京",
    "education": "大专",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责运维工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "大专及以上学历，运维相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "建设银行",
    "post_date": "2024-12-01"
  },
  {
    "job_title": "iOS开发工程师",
    "salary_min": 22000,
    "salary_max": 33000,
    "city": "南京",
    "education": "本科",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责iOS开发工程师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "本科及以上学历，iOS开发相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "中国联通",
    "post_date": "2024-03-14"
  },
  {
    "job_title": "销售经理",
    "salary_min": 18000,
    "salary_max": 27000,
    "city": "南京",
    "education": "本科",
    "work_experience": "应届生",
    "job_category": "市场营销",
    "responsibilities": "负责销售经理相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "本科及以上学历，销售经理相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "顺丰",
    "post_date": "2024-09-15"
  },
  {
    "job_title": "前端架构师",
    "salary_min": 15000,
    "salary_max": 31000,
    "city": "南京",
    "education": "博士研究生",
    "work_experience": "应届生",
    "job_category": "技术研发",
    "responsibilities": "负责前端架构师相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": "博士研究生及以上学历，前端架构师相关专业，具备良好的学习能力和团队合作精神。",
    "company_name": "碧桂园",
    "post_date": "2024-03-07"
  }
];

// 生成更多测试数据，确保至少有10000条
for (let i = 20; i < 10000; i++) {
  const jobTitles = ["算法工程师", "前端开发工程师", "后端开发工程师", "产品经理", "UI设计师", "数据分析师", "测试工程师", "运维工程师", "销售经理", "市场专员"];
  const companies = ["腾讯", "阿里巴巴", "字节跳动", "百度", "美团", "京东", "小米", "华为", "网易", "拼多多"];
  const cities = ["南京", "北京", "上海", "深圳", "杭州", "广州", "成都", "武汉", "西安", "重庆"];
  const educations = ["大专", "本科", "硕士研究生", "博士研究生"];
  const categories = ["技术研发", "产品管理", "设计", "市场营销", "数据分析", "其他"];

  const randomJobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
  const randomCompany = companies[Math.floor(Math.random() * companies.length)];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomEducation = educations[Math.floor(Math.random() * educations.length)];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomSalaryMin = Math.floor(Math.random() * 20000) + 8000;
  const randomSalaryMax = randomSalaryMin + Math.floor(Math.random() * 20000) + 5000;

  // 生成随机日期（2024年）
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomDay = Math.floor(Math.random() * 28) + 1;
  const randomDate = `2024-${randomMonth.toString().padStart(2, '0')}-${randomDay.toString().padStart(2, '0')}`;

  jobsData.push({
    "job_title": randomJobTitle,
    "salary_min": randomSalaryMin,
    "salary_max": randomSalaryMax,
    "city": randomCity,
    "education": randomEducation,
    "work_experience": "应届生",
    "job_category": randomCategory,
    "responsibilities": "负责相关工作，包括需求分析、方案设计、编码实现、测试验证等。",
    "requirements": `${randomEducation}及以上学历，相关专业，具备良好的学习能力和团队合作精神。`,
    "company_name": randomCompany,
    "post_date": randomDate
  });
}

const companiesData = [
  {
    "company_name": "字节跳动",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "北京市海淀区"
  },
  {
    "company_name": "阿里巴巴",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "杭州市余杭区"
  },
  {
    "company_name": "腾讯",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "深圳市南山区"
  },
  {
    "company_name": "中金公司",
    "industry": "金融",
    "company_size": "5000-10000人",
    "company_type": "国企",
    "address": "上海市浦东新区"
  },
  {
    "company_name": "百度",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "北京市海淀区"
  },
  {
    "company_name": "华为",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "深圳市龙岗区"
  },
  {
    "company_name": "美团",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "北京市朝阳区"
  },
  {
    "company_name": "网易",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "杭州市西湖区"
  },
  {
    "company_name": "京东",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "北京市朝阳区"
  },
  {
    "company_name": "小米",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "北京市海淀区"
  },
  {
    "company_name": "拼多多",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "上海市长宁区"
  },
  {
    "company_name": "滴滴",
    "industry": "IT/互联网",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "北京市海淀区"
  },
  {
    "company_name": "顺丰",
    "industry": "物流",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "深圳市南山区"
  },
  {
    "company_name": "工商银行",
    "industry": "金融",
    "company_size": "10000人以上",
    "company_type": "国企",
    "address": "北京市西城区"
  },
  {
    "company_name": "建设银行",
    "industry": "金融",
    "company_size": "10000人以上",
    "company_type": "国企",
    "address": "北京市西城区"
  },
  {
    "company_name": "中国移动",
    "industry": "通信",
    "company_size": "10000人以上",
    "company_type": "国企",
    "address": "北京市西城区"
  },
  {
    "company_name": "中国电信",
    "industry": "通信",
    "company_size": "10000人以上",
    "company_type": "国企",
    "address": "北京市西城区"
  },
  {
    "company_name": "中国联通",
    "industry": "通信",
    "company_size": "10000人以上",
    "company_type": "国企",
    "address": "北京市西城区"
  },
  {
    "company_name": "万科",
    "industry": "房地产",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "深圳市盐田区"
  },
  {
    "company_name": "碧桂园",
    "industry": "房地产",
    "company_size": "10000人以上",
    "company_type": "私企",
    "address": "佛山市顺德区"
  }
];

// 通用请求方法（模拟）
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 100));

  // 这里将根据URL返回模拟数据
  // 实际实现将在各个API方法中处理
  return {} as T;
}

// 岗位相关API
export const jobApi = {
  // 获取岗位列表
  getJobs: async (params?: {
    page?: number;
    size?: number;
    city?: string;
    industry?: string;
    education?: string;
    keyword?: string;
  }) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 复制原始数据以避免修改
    let filteredJobs = [...jobsData];

    // 应用筛选条件
    if (params) {
      if (params.city) {
        filteredJobs = filteredJobs.filter(job => job.city === params.city);
      }
      if (params.education) {
        filteredJobs = filteredJobs.filter(job => job.education === params.education);
      }
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
          job.job_title.toLowerCase().includes(keyword) ||
          job.company_name.toLowerCase().includes(keyword)
        );
      }
      // 注意：industry 字段在 jobsData 中不存在，需要通过 company_name 关联 companiesData
      if (params.industry) {
        const companiesInIndustry = companiesData.filter(
          company => company.industry === params.industry
        ).map(company => company.company_name);
        filteredJobs = filteredJobs.filter(job =>
          companiesInIndustry.includes(job.company_name)
        );
      }
    }

    // 应用分页
    const page = params?.page || 1;
    const size = params?.size || 10;
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    // 构造返回数据结构
    return {
      records: paginatedJobs.map((job, index) => {
        // 找到该工作在原始jobsData中的索引
        const originalIndex = jobsData.findIndex(j =>
          j.job_title === job.job_title &&
          j.company_name === job.company_name &&
          j.city === job.city
        );
        return {
          id: `${originalIndex + 1}`, // 使用原始索引作为ID
          title: job.job_title,
          salaryMin: job.salary_min,
          salaryMax: job.salary_max,
          city: job.city,
          education: job.education,
          workExperience: job.work_experience,
          jobCategory: job.job_category,
          company: job.company_name,
          postDate: job.post_date,
          matchScore: Math.floor(Math.random() * 30) + 70, // 生成随机匹配度
          industry: companiesData.find(c => c.company_name === job.company_name)?.industry || 'IT/互联网'
        };
      }),
      total: filteredJobs.length,
      size: size,
      current: page,
      pages: Math.ceil(filteredJobs.length / size)
    };
  },

  // 获取岗位详情
  getJobDetail: async (id: string) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 这里简化处理，根据ID索引获取岗位
    // 实际应用中可能需要更复杂的匹配逻辑
    const jobIndex = parseInt(id) - 1;
    const job = jobsData[jobIndex];

    if (!job) {
      throw new Error('Job not found');
    }

    // 获取公司信息
    const company = companiesData.find(c => c.company_name === job.company_name);

    return {
      id: id,
      title: job.job_title,
      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      city: job.city,
      education: job.education,
      workExperience: job.work_experience,
      jobCategory: job.job_category,
      responsibilities: [job.responsibilities], // 转换为数组格式
      requirements: [job.requirements], // 转换为数组格式
      company: job.company_name,
      industry: company?.industry || 'IT/互联网',
      companySize: company?.company_size || '10000人以上',
      companyType: company?.company_type || '私企',
      companyAddress: company?.address,
      postDate: job.post_date,
      matchScore: Math.floor(Math.random() * 30) + 70, // 生成随机匹配度
      recommendReasons: [
        '行业发展前景好',
        '薪资待遇优渥',
        '公司实力雄厚',
        '符合个人职业规划'
      ]
    };
  },

  // 收藏岗位（模拟）
  favoriteJob: async (jobId: string) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟成功响应
    return { success: true };
  },

  // 取消收藏（模拟）
  unfavoriteJob: async (jobId: string) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟成功响应
    return { success: true };
  },

  // 检查是否收藏（模拟）
  isFavorited: async (jobId: string) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟返回未收藏
    return { isFavorited: false };
  },
};

// 申请相关API
export const applicationApi = {
  // 获取申请列表（模拟）
  getApplications: async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟返回空列表
    return {
      records: []
    };
  },

  // 提交申请（模拟）
  applyJob: async (jobId: string) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟成功响应
    return { success: true };
  },

  // 获取申请状态（模拟）
  getApplicationStatus: async (jobId: string) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟返回未申请
    return { status: '未申请' };
  },
};

// 用户档案相关API
export const profileApi = {
  // 获取用户档案（模拟）
  getProfile: async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟返回用户档案
    return {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138000',
      education: '本科',
      major: '计算机科学与技术',
      graduationYear: '2024',
      skills: 'Java, JavaScript, Python',
      resumeUrl: ''
    };
  },

  // 更新用户档案（模拟）
  updateProfile: async (profile: any) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟成功响应
    return { success: true };
  },
};

// 统计数据API
export const statsApi = {
  // 获取就业统计数据（模拟）
  getEmploymentStats: async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟返回统计数据
    return {
      data: [
        { name: '技术研发', value: 60 },
        { name: '市场营销', value: 15 },
        { name: '金融', value: 10 },
        { name: '数据分析', value: 8 },
        { name: '设计', value: 5 },
        { name: '其他', value: 2 }
      ]
    };
  },

  // 获取今日新增岗位数（模拟）
  getTodayJobs: async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟返回随机数
    return { count: Math.floor(Math.random() * 20) + 1 };
  },

  // 获取合作企业数（模拟）
  getCompanyCount: async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 返回实际企业数量
    return { count: companiesData.length };
  },

  // 获取就业率（模拟）
  getEmploymentRate: async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 模拟返回就业率
    return { rate: 85.5 };
  },
};

// 字典数据API
export const dictApi = {
  // 获取字典数据（模拟）
  getDict: async (type: string) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 根据类型返回不同的字典数据
    const dictData: Record<string, Array<{ code: string; name: string }>> = {
      'city': [
        { code: '南京', name: '南京' },
        { code: '北京', name: '北京' },
        { code: '上海', name: '上海' },
        { code: '深圳', name: '深圳' },
        { code: '杭州', name: '杭州' }
      ],
      'education': [
        { code: '大专', name: '大专' },
        { code: '本科', name: '本科' },
        { code: '硕士研究生', name: '硕士研究生' },
        { code: '博士研究生', name: '博士研究生' }
      ],
      'industry': [
        { code: 'IT/互联网', name: 'IT/互联网' },
        { code: '金融', name: '金融' },
        { code: '通信', name: '通信' },
        { code: '物流', name: '物流' },
        { code: '房地产', name: '房地产' }
      ]
    };

    return {
      data: dictData[type] || []
    };
  },
};

// 认证相关API
export const authApi = {
  // 获取注册用户列表
  getRegisteredUsers: () => {
    const usersJson = localStorage.getItem('registeredUsers');
    return usersJson ? JSON.parse(usersJson) : [];
  },

  // 保存注册用户列表
  saveRegisteredUsers: (users: any[]) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  },

  // 用户登录
  login: async (credentials: {
    username: string;
    password: string;
  }) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 首先检查硬编码的账号
    if (credentials.username === 'admin' && credentials.password === '123456') {
      return {
        success: true,
        token: 'mock-token-' + Date.now(),
        user: {
          id: '1',
          username: 'admin',
          name: '管理员',
          role: 'admin'
        }
      };
    } else if (credentials.username === 'student' && credentials.password === '123456') {
      return {
        success: true,
        token: 'mock-token-' + Date.now(),
        user: {
          id: '2',
          username: 'student',
          name: '学生用户',
          role: 'student'
        }
      };
    } else if (credentials.username === 'employer' && credentials.password === '123456') {
      return {
        success: true,
        token: 'mock-token-' + Date.now(),
        user: {
          id: '3',
          username: 'employer',
          name: '企业用户',
          role: 'employer'
        }
      };
    }

    // 然后检查注册的用户
    const registeredUsers = authApi.getRegisteredUsers();
    const user = registeredUsers.find((u: any) =>
      u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      return {
        success: true,
        token: 'mock-token-' + Date.now(),
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        }
      };
    } else {
      throw new Error('用户名或密码错误');
    }
  },

  // 用户注册
  register: async (userData: {
    username: string;
    password: string;
    name: string;
    role: 'student' | 'employer';
  }) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 验证输入
    if (userData.username.length < 3) {
      throw new Error('用户名至少需要3个字符');
    }
    if (userData.password.length < 6) {
      throw new Error('密码至少需要6个字符');
    }

    // 检查用户名是否已存在
    const registeredUsers = authApi.getRegisteredUsers();
    const existingUser = registeredUsers.find((u: any) => u.username === userData.username);
    if (existingUser) {
      throw new Error('用户名已存在');
    }

    // 检查是否是保留用户名
    const reservedUsernames = ['admin', 'student', 'employer'];
    if (reservedUsernames.includes(userData.username)) {
      throw new Error('该用户名已被系统保留');
    }

    // 创建新用户
    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      password: userData.password, // 注意：实际应用中应该加密存储
      name: userData.name,
      role: userData.role
    };

    // 保存到本地存储
    registeredUsers.push(newUser);
    authApi.saveRegisteredUsers(registeredUsers);

    return {
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role
      }
    };
  },

  // 获取当前用户信息
  getCurrentUser: async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    // 从localStorage获取用户信息
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }

    // 模拟返回默认用户信息
    return {
      id: '1',
      username: 'admin',
      name: '管理员',
      role: 'admin'
    };
  },

  // 登出
  logout: async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100));

    return { success: true };
  }
};

// 导出所有API
export default {
  job: jobApi,
  application: applicationApi,
  profile: profileApi,
  stats: statsApi,
  dict: dictApi,
  auth: authApi,
};