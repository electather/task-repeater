import TaskRepeater from '../src';

// runs every second and prints a job done function indefinitely
const job = TaskRepeater()
  .do((itteration) => console.log(`going through itteration No.${itteration}...`))
  .every(1_000)
  .finally((itterationsDone) => console.log(`job done with ${itterationsDone} itterations done`));

// reset the Job after 5 seconds
setTimeout(() => job.reset(), 5_000);

// Stop the Job after 10 seconds
setTimeout(() => job.stop(), 10_000);

// Start the job.
job.start();

// job that runs every 100ms for 5 times
const job2 = TaskRepeater()
  .do((itteration) => console.log(`going through itteration No.${itteration}...`))
  .every(100)
  .for(5);

// Start the job.
job2.start();
