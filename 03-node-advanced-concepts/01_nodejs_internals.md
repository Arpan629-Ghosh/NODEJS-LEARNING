
Node js is a single threaded javascript runtime that handles many tasks at once using an event-driven, non-blocking model.
Its two core engines are V8(runs JavaScript) and libuv(manages the event loop, I/O, and a worker thread pool).

Your JavaScript code
        │
        ▼
┌─────────────────────────────┐
│         Node.js APIs        │
│  fs, http, crypto, timers   │
└─────────────┬───────────────┘
              │
      ┌───────┴────────┐
      ▼                ▼
┌───────────┐    ┌──────────────┐
│    V8     │    │    libuv     │
│ Runs JS   │    │ Event loop   │
│           │    │ Async I/O    │
└───────────┘    │ Thread pool  │
                 └──────────────┘
                        │
                        ▼
              Operating System
    
--> V8 parses and executes JavaScript
--> libuv provides the event loop and asynchoronous I/O support
--> Node APIs gives JavaScript a simple interface to low-level C/C++ functionality

## Main Components
1. V8 --> Executes JavaScript and manage Garbage Collections
          example: Runs app.js

2. libuv --> Handles event loop, timers, async I/O, thread pool
             examples: Read files, handles sockets
        
3. Event loop --> Decides which callback runs next
                  examples: Handle HTTP requests

4. Callback queue --> Holds functions waiting to run
                      examples: Response handlers

5. Worker pool --> Performs some blocking/background work
                   example: fs, DNS, crypto tasks

Node’s JavaScript code runs on one main thread, but a Node process can still have several background threads in libuv’s worker pool.

# Request Flow:

Client request
      │
      ▼
┌───────────────────────────┐
│        Event Queue        │
└─────────────┬─────────────┘
              ▼
┌───────────────────────────┐
│        Event Loop         │
│  (single JavaScript thread)│
└───────┬───────────┬───────┘
        │           │
  Quick JS work   I/O needed?
        │           │
        ▼           ▼
   Run callback   Send task to
                  libuv worker pool
                      │
                      ▼
              OS: file, DB, network
                      │
                      ▼
              Callback returns
                      │
                      ▼
              Event loop runs it

For normal JavaScript work, the event loop executes it directly. For I/O such as files, networking, DNS, or crypto, Node delegates work to libuv or the operating system, then runs the callback when the result is ready.

# Event loop phases

┌──────────────────────────────┐
│ 1. Timers                    │  setTimeout / setInterval
├──────────────────────────────┤
│ 2. Pending callbacks         │  Deferred I/O callbacks
├──────────────────────────────┤
│ 3. Idle / prepare            │  Internal use
├──────────────────────────────┤
│ 4. Poll                      │  New I/O events and callbacks
├──────────────────────────────┤
│ 5. Check                     │  setImmediate callbacks
├──────────────────────────────┤
│ 6. Close callbacks           │  e.g. socket close events
└──────────────────────────────┘

The event loop repeatedly moves through these phases, executing ready callbacks in each one. Timers run in the timers phase, most I/O callbacks in the poll phase, and setImmediate() callbacks in the check phase.

# Why Node is fast

Traditional model:
Request 1 ──▶ Thread 1 ──▶ wait for DB
Request 2 ──▶ Thread 2 ──▶ wait for DB
Request 3 ──▶ Thread 3 ──▶ wait for DB

Node model:
Request 1 ─┐
Request 2 ─┼──▶ Event loop ──▶ register callback ──▶ continue
Request 3 ─┘
                 │
                 ▼
          I/O completes later
                 │
                 ▼
          Run callback

