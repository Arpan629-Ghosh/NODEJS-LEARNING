


// env variables
// command line args
// exit code
// process lifecycle events

// read backend port from env file
// read secrets - db urls, api keys, passwprd, google auth secret
// read cli args in scripts

// process.env

// import process from 'node:process'

// const nodeEnv = process.env.NODE_ENV ?? "development"

// process.env values are always string or undefined

const command = process.argv[2] ?? "start";

// fail flag
// crash flag

const shouldFail = process.argv.includes("--fail")
const shouldCrash = process.argv.includes("--crash")

process.on("exit", (code) => {
    console.log(`Process finished with exit code ${code}`);
})

function runApp():void{
    console.log({
        command
    })

    if(shouldFail) {
        console.error("Manual failure triggered with --fail flag");
        process.exit(1);
    }

    if(shouldCrash) {
        console.error("Manual crash triggered with --crash flag");
        process.exit(1);
    }
}

runApp();