import React from 'react';
import Paper from '@material-ui/core/Paper';
const Job = ({ job }) => {
  return (
    <Paper className="job">
      {job.title} {job.company}
    </Paper>
  );
};

export default Job;
