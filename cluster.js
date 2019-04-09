const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const server = require('./server')
let workers = [];

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

function masterProcess() {
 // Fork workers
 for (let i = 0; i < numCPUs; i++) {

    const worker = cluster.fork();

    // Listen for messages from worker
    worker.on('message', function(message) {
      console.log(`Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`);
    });
   
 }
  // process is clustered on a core and process id is assigned
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is listening');
});

// if any of the worker process dies then start a new one by simply forking another one
cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
    workers.push(cluster.fork());
    // to receive messages from worker process
    workers[workers.length-1].on('message', function(message) {
        console.log(message);
    });
});
   
}


function childProcess() {
   server.start(process.pid)
   
   console.log(`Worker ${process.pid} started`);
}