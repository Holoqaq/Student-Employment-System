// 测试API功能
const fs = require('fs');
const path = require('path');

// 读取API文件内容
const apiContent = fs.readFileSync(path.join(__dirname, 'lib', 'api.ts'), 'utf8');

// 提取jobsData和companiesData的定义
const jobsDataMatch = apiContent.match(/const jobsData = \[([\s\S]*?)\];/m);
const companiesDataMatch = apiContent.match(/const companiesData = \[([\s\S]*?)\];/m);

if (jobsDataMatch) {
  console.log('Found jobsData definition');
  const jobsDataCode = jobsDataMatch[0];
  
  // 执行jobsData代码
  eval(jobsDataCode);
  console.log('Jobs data length:', jobsData.length);
  
  if (jobsData.length > 0) {
    console.log('First job:', jobsData[0]);
  } else {
    console.log('jobsData is empty');
  }
} else {
  console.log('Could not find jobsData definition');
}

if (companiesDataMatch) {
  console.log('Found companiesData definition');
  const companiesDataCode = companiesDataMatch[0];
  
  // 执行companiesData代码
  eval(companiesDataCode);
  console.log('Companies data length:', companiesData.length);
  
  if (companiesData.length > 0) {
    console.log('First company:', companiesData[0]);
  } else {
    console.log('companiesData is empty');
  }
} else {
  console.log('Could not find companiesData definition');
}

// 测试默认岗位数据
console.log('\nTesting default jobs data:');
const defaultJobsMatch = apiContent.match(/jobs = \[([\s\S]*?)\];/m);
if (defaultJobsMatch) {
  console.log('Found default jobs definition');
  const defaultJobsCode = 'const defaultJobs = ' + defaultJobsMatch[0].substring(6);
  eval(defaultJobsCode);
  console.log('Default jobs length:', defaultJobs.length);
  if (defaultJobs.length > 0) {
    console.log('First default job:', defaultJobs[0]);
  }
} else {
  console.log('Could not find default jobs definition');
}
