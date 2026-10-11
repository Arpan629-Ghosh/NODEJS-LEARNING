

// after some delay, the timer will be executed

import {setTimeout as sleep} from 'node:timers/promises';

function runSetTimeoutExample(): void{
    console.log('1. Before setTimeout');

    setTimeout(() => {
        console.log('2. Inside setTimeout');
    }, 1000);

    console.log("3. This run immediately after setTimeout is called, not after the delay. node.js is non-blocking, so the code continues to run while waiting for the timer to complete.");    
}

function runClearTimeoutExample(): void {
    const timerId = setTimeout(()=> {
        console.log('This will not be printed because the timer is cleared before it executes.');
    }, 2000);

    clearTimeout(timerId);
    console.log('4. Timer cleared before execution.');
}

function runSetIntervalExample(): void {
    let count = 0;
    const intervalId = setInterval(() => {
        console.log(`Interval executed ${++count} times.`);
        if (count >= 5) {
            clearInterval(intervalId);
            console.log('Interval cleared.');
        }
    }, 1000);
}

// setImmediate -- executes the callback asynchronously as soon as the current event loop iteration completes

function runSetImmediateExample(): void {
    setImmediate(() => {
        console.log('5. Inside setImmediate');
    }) // depricated

    console.log('6. This runs before setImmediate callback because setImmediate is executed after the current event loop iteration.');
}

async function runPromiseTimerExample(): Promise<void> {
    console.log('Before Promise timer');
    await sleep(5500);
    console.log('After Promise timer 5.5 seconds');
}

function runTimerDemo(): void {
    runSetTimeoutExample();
    runClearTimeoutExample();
    runSetIntervalExample();
    runSetImmediateExample();
}

runTimerDemo();

runPromiseTimerExample().catch((error: unknown) => {
    console.error("timer based demo failed with error: ", error);
})