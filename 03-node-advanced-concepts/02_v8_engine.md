
V8 is the JavaScript engine that turns your source code into fast machine code while the program is running. It balances fast startup with high execution speed using an interpreter, several compiler tiers, and a generational garbage collector.

# V8 execution pipeline

JavaScript source code
        │
        ▼
┌───────────────────┐
│      Parser       │
└─────────┬─────────┘
          ▼
┌───────────────────┐
│       AST         │  Abstract Syntax Tree
└─────────┬─────────┘
          ▼
┌───────────────────┐
│     Ignition      │  Interpreter
│  AST → Bytecode   │
└─────────┬─────────┘
          ▼
┌───────────────────┐
│  Runtime feedback │  Types, call counts, hot functions
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Sparkplug/Maglev  │  Faster compiled code
└─────────┬─────────┘
          ▼
┌───────────────────┐
│  TurboFan /       │  Highly optimized machine code
│  Turboshaft       │
└───────────────────┘
          │
          ▼
        CPU

# Step 1: Parsing:

  The parser reads Javascript text and checks that it is syntactically valid

    function add(a, b) {
        return a + b;
    }

  Conceptually, V8 builds a tree like this:

    FunctionDeclaration: add
    ├── Identifier: a
    ├── Identifier: b
    └── ReturnStatement
        └── BinaryExpression: +
            ├── Identifier: a
            └── Identifier: b

This structure is called an AST (Abstract Syntax Tree). It represents the meaning and structure of the code rather than its raw text.

# Step 2: Ignition interpreter

Ignition converts the AST into bytecode—compact instructions that V8 can execute immediately.

** Why bytecode?
--> It is smaller than machine code, so startup is faster
--> It is portable across CPU architectures.
--> It collects runtime information, such as which argument types a function receives.

add(2, 3);

Ignition may execute instructions conceptually like:

LoadArgument a
LoadArgument b
Add
Return

# Step 3: Runtime feedback

As Ignition runs code, V8 records feedback:

function multiply(a, b) {
  return a * b;
}

multiply(2, 3);      // number + number
multiply(2, 3);      // number + number
multiply(2, 3);      // number + number

V8 learns:

multiply()
├── called many times → hot function
├── a is usually a number
└── b is usually a number

This feedback lets the optimizing compiler make assumptions, such as “these values are numbers,” and generate specialized machine code.

# Step 4: Compiler tiers

V8 uses multiple tiers instead of jumping directly from bytecode to the fastest possible machine code.

1. Ignition --> Interprets bytecode; starts execution quickly --> Lower speed

2. Sparkplug --> Quickly compiles bytecode to basic machine code --> moderate speed, fast compilation

3. Maglev --> Mid-tier optimizing compiler --> Better optimization, faster than TurboFan to compile

4. Turbofan/Turboshaft --> Peak optimization compiler for very hot code --> Highest speed, more compilation work

# Memory and garbage collection:

V8 allocates objects in a managed heap and automatically removes unreachable objects.

┌────────────────────────────────────┐
│              V8 Heap               │
├──────────────────┬─────────────────┤
│  Young Generation│ Old Generation  │
│  New objects     │ Long-lived objs │
│  Frequent GC     │ Less frequent GC│
└──────────────────┴─────────────────┘

--> Young Genaration: stores newly created, usually short-lived objects.
--> Old generation: stores objects that survive multiple garbage-collection cycles.
--> V8 uses generational garbage collection with parallel and concurrent marking/sweeping to reduce pauses.

// Example:

function createUser() {
  return { name: "Asha", age: 25 };
}

let user = createUser();
user = null; // object becomes unreachable

Later, the garbage collector can reclaim the object because no live code can reach it.

# Where V8 fits in Node.js

Node.js
├── JavaScript APIs
├── libuv
└── V8 engine
    ├── Parser
    ├── Ignition
    ├── Sparkplug / Maglev
    ├── TurboFan / Turboshaft
    └── Garbage collector

--- One-line mental model

V8 quickly runs JavaScript as bytecode, watches how it is used, then compiles the hottest parts into specialized machine code—and cleans up unused memory automatically.