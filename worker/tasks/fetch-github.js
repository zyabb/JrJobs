const fetch = require('node-fetch');
const baseURL = 'https://jobs.github.com/positions.json';
var redis = require('redis'),
  client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

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

  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    //algo logic
    if (
      jobTitle.includes('senior') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('architect')
    ) {
      return false;
    }
    return true;
  });
  console.log(`got ${allJobs.length} jobs`);
  console.log(`filtering out to Junior Jobs ${jrJobs.length}`);

  //set in Redis
  const success = await setAsync('github', JSON.stringify(allJobs));
  console.log({ success });
}

module.exports = fetchGitHub;
