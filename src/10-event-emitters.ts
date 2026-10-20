 // emit one event --> listeners listen it to this event, do something

import { EventEmitter } from "node:stream";

 //.on() - register one listener
 //.once() - register one listener that runs only one time
 //.emit() - triggers an event and sends to this listeners


 const appevents = new EventEmitter();

 type UserRegisterPayload = {
    id: number;
    email: string
 }

 appevents.on("user:registered", (user: UserRegisterPayload) => {
    console.log(`email listener: welcome email sent to this user ${user.email}`);
 })

 appevents.on("user:registered", (user: UserRegisterPayload) => {
    console.log(`log listener: user ${user.id} and email is ${user.email}`);
 })

 appevents.once("app.started", () => {
    console.log("once listener: app started");
 })



 function registerUser(): void{
    const user = {
        id: 1,
        email : 'arpanarpita@gmail.com'
    }

    console.log("user saved");

    appevents.emit('user:registered', user);

    console.log("register user: event listeners completed");

 }

 appevents.emit("app.started");
 appevents.emit("app.started");
 
 registerUser();