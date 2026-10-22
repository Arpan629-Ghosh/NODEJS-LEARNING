

// os, cpu info, memory info, home/temp dir

import * as os from 'node:os'

function runOsDemo(): void{
    console.log('====================================');
    console.log('platform', os.platform());
    console.log('====================================');
    console.log('====================================');
    console.log("architecture", os.arch());
    console.log('====================================');
    console.log('====================================');
    console.log("os type", os.type());
    console.log('====================================');
    console.log('====================================');
    console.log("os release", os.release());
    console.log('====================================');
    console.log('====================================');
    console.log("home dir", os.homedir());
    console.log('====================================');
    console.log('====================================');
    console.log("temp dir", os.tmpdir());
    console.log('====================================');

    const cpus = os.cpus();
    console.log(cpus.length)

    if(cpus.length > 0){
        for(let i=0; i<cpus.length; i++){
            console.log('====================================');
            console.log('cpu models of: ', i,' ', cpus[i].model, ' ', cpus[i].speed, ' ', cpus[i].times);
            console.log('====================================');
        }
    }

    console.log('====================================');
    console.log(os.totalmem(), os.freemem());
    console.log('====================================');
}

runOsDemo();