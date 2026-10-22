
The cluster module lets one Node.js program run multiple worker processes that share the same server port, so an app can use multiple CPU cores and handle more traffic. The main process accepts incoming connections and distributes them among workers.

# Why use it?

Without cluster:
CPU Core 1 ──▶ Node process ──▶ all requests
CPU Core 2 ──▶ unused
CPU Core 3 ──▶ unused
CPU Core 4 ──▶ unused

With cluster:
CPU Core 1 ──▶ Worker 1 ──▶ requests
CPU Core 2 ──▶ Worker 2 ──▶ requests
CPU Core 3 ──▶ Worker 3 ──▶ requests
CPU Core 4 ──▶ Worker 4 ──▶ requests

Cluster creates separate OS processes, each with its own V8 instance and event loop, allowing true parallelism across CPU cores.

Architecture

                 Client requests
                        │
                        ▼
              ┌──────────────────┐
              │  Primary process │
              │  Listens on :3000│
              └────────┬─────────┘
                       │ distribute connections
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Worker 1   │ │   Worker 2   │ │   Worker 3   │
│ Own event    │ │ Own event    │ │ Own event    │
│ loop + V8    │ │ loop + V8    │ │ loop + V8    │
└──────────────┘ └──────────────┘ └──────────────┘

The primary process listens on the port and, by default outside Windows, distributes connections to workers using round-robin scheduling. Workers are created with child_process.fork() and communicate with the primary through IPC.

# Basic Example

const cluster = require("node:cluster");
const http = require("node:http");
const os = require("node:os");

if (cluster.isPrimary) {
  const numWorkers = os.availableParallelism();

  console.log(`Primary ${process.pid} starting ${numWorkers} workers`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // restart it
  });
} else {
  http.createServer((req, res) => {
    res.end(`Handled by worker ${process.pid}`);
  }).listen(3000);

  console.log(`Worker ${process.pid} started`);
}

The if (cluster.isPrimary) block runs once in the primary process; the else block runs separately in every forked worker.

# How requests are shared

Request 1 ──▶ Worker 1
Request 2 ──▶ Worker 2
Request 3 ──▶ Worker 3
Request 4 ──▶ Worker 1
Request 5 ──▶ Worker 2

Node’s default strategy is round-robin: the primary accepts a connection and passes it to the next available worker, with logic to avoid sending work to an overloaded worker. On Windows, the default approach instead shares the listening socket so workers accept connections directly.

# Key points

 -- Primary process: manages workers and distributes connections; it should not handle normal request logic.

 -- Worker processes: run your HTTP server and handle requests independently.

 -- Shared port: all workers can listen on port 3000 without port conflicts.

 -- No shared memory: workers do not automatically share JavaScript variables; use a database, Redis, or IPC for shared state.

 -- Fault isolation: if one worker crashes, others can continue serving requests; you can restart the failed worker.

 -- You manage the pool: Node does not automatically maintain a target number of workers.

 Main concept is Cluster turns one Node.js server into several independent worker processes that share one port, letting Node use all CPU cores for incoming traffic.