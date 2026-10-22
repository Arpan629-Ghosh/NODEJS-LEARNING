

libuv is the C library underneath Node.js that provides the event loop, asynchronous I/O, timers, networking, file-system operations, and a small worker thread pool. It lets Node appear single-threaded to JavaScript while efficiently handling thousands of concurrent I/O operations.

# Where libuv fits: 
┌──────────────────────────────────────────┐
│                Node.js                   │
│                                          │
│  JavaScript APIs: fs, http, net, timers  │
│                    │                     │
│                    ▼                     │
│  ┌───────────────┐      ┌─────────────┐  │
│  │      V8       │      │    libuv    │  │
│  │ Runs JS       │◄────►│ Event loop  │  │
│  └───────────────┘      │ Async I/O   │  │
│                         │ Thread pool │  │
│                         └──────┬──────┘  │
└────────────────────────────────┼─────────┘
                                 ▼
                       Operating System