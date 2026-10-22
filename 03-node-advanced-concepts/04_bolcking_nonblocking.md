Blocking means the program must stop and wait until an operation finishes. Non-blocking means the program starts the operation, continues doing other work, and handles the result later through a callback, promise, or event.

Blocking:
You call a restaurant and stay on the phone
until the food is ready.
You cannot do anything else.

Non-blocking:
You place the order and hang up.
The restaurant calls you when the food is ready.
Meanwhile, you can do other work.

Node runs your JavaScript on one main event-loop thread. If that thread blocks, no other JavaScript callbacks can run until the blocking work completes.

Blocking:
JS thread ──▶ wait for file ──▶ continue
                 ▲
       Other requests are stuck

Non-blocking:
JS thread ──▶ start file read ──▶ do other work
                     │
                     ▼
              File finishes later
                     │
                     ▼
              Event loop runs callback

example: Blocking --> fs.readFileSync()
         Non-Blocking --> fs.readFile()