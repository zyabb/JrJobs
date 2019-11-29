import React from 'react';
import './App.css';
import Jobs from './Jobs';

const mockJobs = [
  { title: 'Rus', company: 'Google ' },
  { title: 'USa', company: 'Google ' },
  { title: 'Can ', company: 'Google ' },
  { title: 'SWE', company: 'Google ' }
];
function App() {
  return (
    <div className="App">
      <Jobs jobs={mockJobs} />
    </div>
  );
}

export default App;
