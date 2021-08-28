import TaskRepeater from '../src';

const job = TaskRepeater().do(console.log).every(1_000).for(5).finally(console.log);

job.start();
