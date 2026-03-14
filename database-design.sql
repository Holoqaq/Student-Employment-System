-- 数据库表结构设计
-- 遵循若依系统设计规范

-- 1. 企业表
CREATE TABLE `ry_company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '企业ID',
  `company_name` varchar(255) NOT NULL COMMENT '企业名称',
  `industry` varchar(100) DEFAULT NULL COMMENT '所属行业',
  `company_size` varchar(50) DEFAULT NULL COMMENT '企业规模',
  `company_type` varchar(50) DEFAULT NULL COMMENT '企业类型',
  `contact_name` varchar(50) DEFAULT NULL COMMENT '联系人姓名',
  `contact_phone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `contact_email` varchar(100) DEFAULT NULL COMMENT '联系邮箱',
  `address` varchar(255) DEFAULT NULL COMMENT '企业地址',
  `description` text COMMENT '企业描述',
  `logo_url` varchar(255) DEFAULT NULL COMMENT '企业Logo',
  `status` char(1) DEFAULT '0' COMMENT '状态（0正常 1禁用）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idx_industry` (`industry`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='企业信息表';

-- 2. 岗位表
CREATE TABLE `ry_job` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '岗位ID',
  `company_id` bigint(20) NOT NULL COMMENT '企业ID',
  `job_title` varchar(100) NOT NULL COMMENT '岗位名称',
  `salary_min` decimal(10,2) DEFAULT NULL COMMENT '最低薪资',
  `salary_max` decimal(10,2) DEFAULT NULL COMMENT '最高薪资',
  `city` varchar(50) DEFAULT NULL COMMENT '工作城市',
  `education` varchar(50) DEFAULT NULL COMMENT '学历要求',
  `work_experience` varchar(50) DEFAULT NULL COMMENT '工作经验',
  `job_category` varchar(100) DEFAULT NULL COMMENT '岗位类别',
  `responsibilities` text COMMENT '岗位职责',
  `requirements` text COMMENT '岗位要求',
  `recommend_reasons` text COMMENT '推荐理由',
  `applicants_count` int(11) DEFAULT '0' COMMENT '申请人数',
  `status` char(1) DEFAULT '0' COMMENT '状态（0招聘中 1已结束）',
  `post_date` date DEFAULT NULL COMMENT '发布日期',
  `expire_date` date DEFAULT NULL COMMENT '截止日期',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idx_company_id` (`company_id`),
  KEY `idx_city` (`city`),
  KEY `idx_education` (`education`),
  KEY `idx_status` (`status`),
  KEY `idx_post_date` (`post_date`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='岗位信息表';

-- 3. 用户档案表
CREATE TABLE `ry_user_profile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '档案ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `name` varchar(50) DEFAULT NULL COMMENT '姓名',
  `gender` char(1) DEFAULT NULL COMMENT '性别（0男 1女）',
  `education` varchar(50) DEFAULT NULL COMMENT '学历',
  `major` varchar(100) DEFAULT NULL COMMENT '专业',
  `school` varchar(100) DEFAULT NULL COMMENT '学校',
  `phone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `skills` text COMMENT '技能（JSON格式）',
  `preferred_cities` text COMMENT '意向城市（JSON格式）',
  `preferred_industries` text COMMENT '意向行业（JSON格式）',
  `expected_salary_min` decimal(10,2) DEFAULT NULL COMMENT '期望最低薪资',
  `expected_salary_max` decimal(10,2) DEFAULT NULL COMMENT '期望最高薪资',
  `job_category` varchar(100) DEFAULT NULL COMMENT '求职类别',
  `resume_url` varchar(255) DEFAULT NULL COMMENT '简历链接',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_id` (`user_id`),
  KEY `idx_education` (`education`),
  KEY `idx_major` (`major`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='用户档案表';

-- 4. 申请记录表
CREATE TABLE `ry_application` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '申请ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `job_id` bigint(20) NOT NULL COMMENT '岗位ID',
  `company_id` bigint(20) NOT NULL COMMENT '企业ID',
  `apply_date` datetime DEFAULT NULL COMMENT '申请日期',
  `status` varchar(20) DEFAULT 'pending' COMMENT '申请状态（pending:待处理 interview:面试 passed:通过 rejected:拒绝）',
  `resume_url` varchar(255) DEFAULT NULL COMMENT '投递简历链接',
  `interview_date` datetime DEFAULT NULL COMMENT '面试日期',
  `feedback` text COMMENT '反馈信息',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_job_id` (`job_id`),
  KEY `idx_company_id` (`company_id`),
  KEY `idx_status` (`status`),
  KEY `idx_apply_date` (`apply_date`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='申请记录表';

-- 5. 收藏表
CREATE TABLE `ry_favorite` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '收藏ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `job_id` bigint(20) NOT NULL COMMENT '岗位ID',
  `favorite_date` datetime DEFAULT NULL COMMENT '收藏日期',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_job` (`user_id`,`job_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_job_id` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='岗位收藏表';

-- 6. 就业信息表
CREATE TABLE `ry_employment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '就业ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `company_id` bigint(20) DEFAULT NULL COMMENT '企业ID',
  `job_id` bigint(20) DEFAULT NULL COMMENT '岗位ID',
  `employment_date` date DEFAULT NULL COMMENT '就业日期',
  `salary` decimal(10,2) DEFAULT NULL COMMENT '薪资',
  `job_title` varchar(100) DEFAULT NULL COMMENT '职位',
  `status` char(1) DEFAULT '0' COMMENT '状态（0就业中 1已离职）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_id` (`user_id`),
  KEY `idx_company_id` (`company_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='就业信息表';

-- 7. 系统参数表（用于存储字典数据）
CREATE TABLE `ry_job_dict` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '字典ID',
  `dict_type` varchar(100) NOT NULL COMMENT '字典类型',
  `dict_code` varchar(100) NOT NULL COMMENT '字典编码',
  `dict_name` varchar(100) NOT NULL COMMENT '字典名称',
  `dict_value` varchar(255) DEFAULT NULL COMMENT '字典值',
  `sort` int(4) DEFAULT '0' COMMENT '排序',
  `status` char(1) DEFAULT '0' COMMENT '状态（0正常 1禁用）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idx_dict_type` (`dict_type`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='就业系统字典表';

-- 插入基础字典数据
INSERT INTO `ry_job_dict` (`dict_type`, `dict_code`, `dict_name`, `dict_value`, `sort`, `status`) VALUES
('industry', 'it', 'IT/互联网', 'IT/互联网', 1, '0'),
('industry', 'finance', '金融', '金融', 2, '0'),
('industry', 'education', '教育', '教育', 3, '0'),
('industry', 'manufacturing', '制造业', '制造业', 4, '0'),
('industry', 'healthcare', '医疗健康', '医疗健康', 5, '0'),
('industry', 'real_estate', '房地产', '房地产', 6, '0'),
('industry', 'ecommerce', '电子商务', '电子商务', 7, '0'),
('industry', 'consulting', '咨询', '咨询', 8, '0'),
('city', 'beijing', '北京', '北京', 1, '0'),
('city', 'shanghai', '上海', '上海', 2, '0'),
('city', 'guangzhou', '广州', '广州', 3, '0'),
('city', 'shenzhen', '深圳', '深圳', 4, '0'),
('city', 'hangzhou', '杭州', '杭州', 5, '0'),
('city', 'chengdu', '成都', '成都', 6, '0'),
('city', 'nanjing', '南京', '南京', 7, '0'),
('city', 'wuhan', '武汉', '武汉', 8, '0'),
('city', 'xian', '西安', '西安', 9, '0'),
('city', 'chongqing', '重庆', '重庆', 10, '0'),
('education', 'college', '大专', '大专', 1, '0'),
('education', 'bachelor', '本科', '本科', 2, '0'),
('education', 'master', '硕士研究生', '硕士研究生', 3, '0'),
('education', 'doctor', '博士研究生', '博士研究生', 4, '0'),
('company_type', 'state_owned', '国企', '国企', 1, '0'),
('company_type', 'private', '私企', '私企', 2, '0'),
('company_type', 'foreign', '外企', '外企', 3, '0'),
('company_type', 'institution', '事业单位', '事业单位', 4, '0'),
('company_type', 'startup', '创业公司', '创业公司', 5, '0'),
('company_size', 'small', '100人以下', '100人以下', 1, '0'),
('company_size', 'medium', '100-500人', '100-500人', 2, '0'),
('company_size', 'large', '500-1000人', '500-1000人', 3, '0'),
('company_size', 'huge', '1000人以上', '1000人以上', 4, '0');

-- 8. 菜单配置
-- 注意：菜单ID需要根据实际系统情况调整
INSERT INTO `sys_menu` (`menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `remark`)
VALUES
('就业管理', '0', '1', 'employment', NULL, '1', '0', 'M', '0', '0', NULL, 'system', 'admin', NOW(), 'admin', NOW(), '就业管理模块'),
('企业管理', '10000', '1', 'company', 'employment/company/index', '1', '0', 'C', '0', '0', 'employment:company:list', 'company', 'admin', NOW(), 'admin', NOW(), '企业信息管理'),
('岗位管理', '10000', '2', 'job', 'employment/job/index', '1', '0', 'C', '0', '0', 'employment:job:list', 'job', 'admin', NOW(), 'admin', NOW(), '岗位信息管理'),
('用户档案', '10000', '3', 'profile', 'employment/profile/index', '1', '0', 'C', '0', '0', 'employment:profile:list', 'user', 'admin', NOW(), 'admin', NOW(), '用户档案管理'),
('申请管理', '10000', '4', 'application', 'employment/application/index', '1', '0', 'C', '0', '0', 'employment:application:list', 'application', 'admin', NOW(), 'admin', NOW(), '申请记录管理'),
('就业统计', '10000', '5', 'statistics', 'employment/statistics/index', '1', '0', 'C', '0', '0', 'employment:statistics:list', 'chart', 'admin', NOW(), 'admin', NOW(), '就业数据统计'),
('系统设置', '10000', '6', 'settings', 'employment/settings/index', '1', '0', 'C', '0', '0', 'employment:settings:list', 'setting', 'admin', NOW(), 'admin', NOW(), '系统设置');

-- 9. 权限配置
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`)
VALUES
(1, 10000),  -- 管理员角色拥有就业管理菜单
(1, 10001),  -- 企业管理
(1, 10002),  -- 岗位管理
(1, 10003),  -- 用户档案
(1, 10004),  -- 申请管理
(1, 10005),  -- 就业统计
(1, 10006);  -- 系统设置

-- 插入测试数据
-- 企业数据
INSERT INTO `ry_company` (`company_name`, `industry`, `company_size`, `company_type`, `contact_name`, `contact_phone`, `contact_email`, `address`, `description`, `status`, `create_by`, `create_time`)
VALUES
('字节跳动', 'IT/互联网', '10000人以上', '私企', '张经理', '13800138001', 'hr@bytedance.com', '北京市海淀区', '全球领先的科技公司', '0', 'admin', NOW()),
('阿里巴巴', 'IT/互联网', '10000人以上', '私企', '李经理', '13800138002', 'hr@alibaba.com', '杭州市余杭区', '全球知名的电子商务公司', '0', 'admin', NOW()),
('腾讯', 'IT/互联网', '10000人以上', '私企', '王经理', '13800138003', 'hr@tencent.com', '深圳市南山区', '中国领先的互联网综合服务提供商', '0', 'admin', NOW()),
('中金公司', '金融', '5000-10000人', '国企', '赵经理', '13800138004', 'hr@cicc.com', '上海市浦东新区', '中国国际金融股份有限公司', '0', 'admin', NOW()),
('百度', 'IT/互联网', '10000人以上', '私企', '钱经理', '13800138005', 'hr@baidu.com', '北京市海淀区', '全球最大的中文搜索引擎', '0', 'admin', NOW()),
('华为', 'IT/互联网', '10000人以上', '私企', '孙经理', '13800138006', 'hr@huawei.com', '深圳市龙岗区', '全球领先的ICT解决方案提供商', '0', 'admin', NOW()),
('美团', 'IT/互联网', '10000人以上', '私企', '周经理', '13800138007', 'hr@meituan.com', '北京市朝阳区', '中国领先的生活服务电子商务平台', '0', 'admin', NOW()),
('网易', 'IT/互联网', '10000人以上', '私企', '吴经理', '13800138008', 'hr@netease.com', '杭州市西湖区', '中国领先的互联网技术公司', '0', 'admin', NOW());

-- 岗位数据
INSERT INTO `ry_job` (`company_id`, `job_title`, `salary_min`, `salary_max`, `city`, `education`, `work_experience`, `job_category`, `responsibilities`, `requirements`, `recommend_reasons`, `status`, `post_date`, `expire_date`, `create_by`, `create_time`)
VALUES
(1000, '前端开发工程师', 15000, 30000, '北京', '本科', '1-3年', '技术研发', '负责公司前端产品的开发与维护', '熟练掌握React/Vue等前端框架', '本岗位与计算机专业背景匹配度高', '0', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'admin', NOW()),
(1001, '数据分析师', 18000, 35000, '杭州', '硕士研究生', '1-3年', '数据分析', '负责业务数据分析与报表产出', '精通SQL和Python数据分析', '与统计学/数学专业高度匹配', '0', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'admin', NOW()),
(1002, '产品经理', 20000, 40000, '深圳', '本科', '1-3年', '产品管理', '负责产品需求分析和功能设计', '良好的沟通协调能力', '该公司福利待遇优厚', '0', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'admin', NOW()),
(1003, '金融分析师', 25000, 50000, '上海', '硕士研究生', '1-3年', '金融分析', '撰写行业研究报告', '金融/经济学专业背景', '国企稳定福利好', '0', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'admin', NOW()),
(1004, '人工智能算法工程师', 25000, 50000, '北京', '硕士研究生', '1-3年', '算法研发', '负责AI算法的研发与应用落地', '精通PyTorch/TensorFlow', 'AI是当下最热门的方向', '0', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'admin', NOW()),
(1005, '市场营销专员', 12000, 22000, '深圳', '本科', '1-3年', '市场营销', '负责产品市场推广方案的策划与执行', '有新媒体运营经验优先', '华为品牌知名度高', '0', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'admin', NOW()),
(1006, '后端开发工程师', 18000, 35000, '北京', '本科', '1-3年', '技术研发', '负责后端服务的设计与开发', '熟练掌握Java/Go', '与计算机相关专业匹配度高', '0', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'admin', NOW()),
(1007, 'UI/UX设计师', 15000, 28000, '杭州', '本科', '1-3年', '设计', '负责产品界面设计和交互设计', '精通Figma/Sketch等设计工具', '网易设计氛围好', '0', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'admin', NOW());

-- 用户档案数据（示例）
INSERT INTO `ry_user_profile` (`user_id`, `name`, `gender`, `education`, `major`, `school`, `phone`, `email`, `skills`, `preferred_cities`, `preferred_industries`, `expected_salary_min`, `expected_salary_max`, `job_category`, `create_by`, `create_time`)
VALUES
(1, '张小明', '0', '硕士研究生', '计算机科学与技术', '清华大学', '138****6789', 'zhangxm@example.com', '["JavaScript", "React", "Python", "数据分析", "机器学习"]', '["北京", "上海", "杭州"]', '["IT/互联网", "金融"]', 15000, 30000, '技术研发', 'admin', NOW());

-- 申请记录数据
INSERT INTO `ry_application` (`user_id`, `job_id`, `company_id`, `apply_date`, `status`, `create_by`, `create_time`)
VALUES
(1, 1000, 1000, NOW(), 'pending', 'admin', NOW()),
(1, 1001, 1001, NOW(), 'pending', 'admin', NOW()),
(1, 1002, 1002, NOW(), 'interview', 'admin', NOW()),
(1, 1004, 1004, NOW(), 'passed', 'admin', NOW()),
(1, 1006, 1006, NOW(), 'rejected', 'admin', NOW());

-- 收藏数据
INSERT INTO `ry_favorite` (`user_id`, `job_id`, `favorite_date`, `create_by`, `create_time`)
VALUES
(1, 1000, NOW(), 'admin', NOW()),
(1, 1004, NOW(), 'admin', NOW()),
(1, 1007, NOW(), 'admin', NOW());

-- 就业信息数据
INSERT INTO `ry_employment` (`user_id`, `company_id`, `job_id`, `employment_date`, `salary`, `job_title`, `status`, `create_by`, `create_time`)
VALUES
(1, 1004, 1004, NOW(), 35000, '人工智能算法工程师', '0', 'admin', NOW());
