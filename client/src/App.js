import React from 'react';
import './App.css';
import Jobs from './Jobs';

const mockJobs = [
  { title: 'Rus', company: 'Google ' },
  { title: 'USa', company: 'Google ' },
  { title: 'Can ', company: 'Google ' },
  { title: 'SWE', company: 'Google ' }
];
const JOB_API_URI = '/api/jobs';

async function fetchJobs(callback) {
  const res = await fetch(JOB_API_URI);
  const json = await res.json();
  callback(json);
}

function App() {
  const [jobsList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, []);

  return (
    <div className="App">
      <Jobs jobs={jobsList} />
    </div>
  );
}

export default App;
