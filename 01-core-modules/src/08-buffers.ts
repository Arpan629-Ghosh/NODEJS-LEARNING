
//buffers - work with raw binary data
// binary data means - when u have your data stored in bytes

// reading files
// receiving http req 
// working with streams
// handling images, pdf files, videos
// encrypt and hashing


const textBuffer = Buffer.from("Node");

console.log(textBuffer); // prints a buffer of txt "Node" in hexadecimal format

// N - 4e, o-6f, d-64, e-65

console.log(textBuffer.toString("utf-8"));

const engBuffer = Buffer.from("Hello");
console.log('====================================');
console.log(engBuffer.length);
console.log('====================================');

//.alloc --> creates a buffer with a fixed number of bytes

const fixedBuffer = Buffer.alloc(5);
console.log('====================================');
console.log("empty fixed buffer", fixedBuffer);
console.log('====================================');

fixedBuffer.write("API");
console.log("fixed buffer after write: ", fixedBuffer);
console.log("fixed buffer as text", fixedBuffer.toString("utf-8"));

//chunks

const chunks = [
    Buffer.from("Hello "),
    Buffer.from("Node "),
    Buffer.from("JS")
]

const combineBuffer = Buffer.concat(chunks);
console.log(combineBuffer);
console.log(combineBuffer.toString("utf-8"));