const fs = require('fs');
const path = require('path');

// 测试文件路径
const jobsFilePath = 'D:\\学习\\大四\\毕设备份\\毕设\\data-crawling\\output\\jobs.json';
const companiesFilePath = 'D:\\学习\\大四\\毕设备份\\毕设\\data-crawling\\output\\companies.json';

console.log('测试文件读取...');

// 测试 jobs.json
if (fs.existsSync(jobsFilePath)) {
  console.log('✓ jobs.json 文件存在');
  try {
    const jobsData = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
    console.log(`✓ jobs.json 数据长度: ${jobsData.length}`);
    console.log('✓ 前3个职位:', jobsData.slice(0, 3).map(job => job.job_title));
  } catch (error) {
    console.log('✗ 读取 jobs.json 失败:', error.message);
  }
} else {
  console.log('✗ jobs.json 文件不存在');
}

// 测试 companies.json
if (fs.existsSync(companiesFilePath)) {
  console.log('✓ companies.json 文件存在');
  try {
    const companiesData = JSON.parse(fs.readFileSync(companiesFilePath, 'utf8'));
    console.log(`✓ companies.json 数据长度: ${companiesData.length}`);
    console.log('✓ 前3个公司:', companiesData.slice(0, 3).map(company => company.company_name));
  } catch (error) {
    console.log('✗ 读取 companies.json 失败:', error.message);
  }
} else {
  console.log('✗ companies.json 文件不存在');
}

console.log('测试完成');
