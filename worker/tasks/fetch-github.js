const fetch = require('node-fetch');
const baseURL = 'https://jobs.github.com/positions.json';
var redis = require('redis'),
  client = redis.createClient();
async function fetchGitHub() {
  let resultCount = 1,
    onPage = 0;
  const allJobs = [];
  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log('got ', jobs.length, 'jobs');
    onPage++;
  }
  console.log(`got ${allJobs.length} jobs`);
}

fetchGitHub();
module.exports = fetchGitHub;
