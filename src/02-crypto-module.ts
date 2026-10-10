 import crypto from "node:crypto";

 // This is a built in node js module
 // security related tasks
 // creating random UUID, IDs
 //creating secure tokens, password hashing, encryption, decryption, signing and verifying data

 // crypto.randomUUID() - generates a random UUID(Univarsally Unique Identifier) string like user id, session id, transaction id, order id, etc
 const requestId = crypto.randomUUID() 

 console.log(requestId);

 // crypto.randomBytes() - generates a random buffer of bytes, which can be used as a secure token for password reset, email verification, etc
 const resetToken = crypto.randomBytes(16); // generates a random 16 byte buffer, which can be used as a secure token for password reset, email verification, etc

console.log(resetToken.toString("hex")); // converts the buffer to a hexadecimal string representation of 32 characters, which can be used as a secure token for password reset, email verification, etc

// why 32? Because each byte is represented by two hexadecimal characters, so 16 bytes * 2 = 32 characters.

// crypto.createHash() - creates a hash of the given data using the specified algorithm, which can be used for password hashing, data integrity verification, etc. It is a one way function, meaning that it is not possible to get the original data back from the hash. It is also deterministic, meaning that the same input will always produce the same output.

const text = "Hello World";
const hash = crypto.createHash("sha256").update(text).digest("hex"); // creates a hash of the given text using the sha256 algorithm and returns it as a hexadecimal string representation

console.log(hash); // prints the hash of the given text

//crypto.createHmac() - creates a hash-based message authentication code (HMAC) of the given data using the specified algorithm and secret key, which can be used for data integrity verification and authentication. It is a one way function, meaning that it is not possible to get the original data back from the HMAC. It is also deterministic, meaning that the same input and secret key will always produce the same output.

const secretKey = "my-secret-key";
const message = "user_id=12345";
const signature = crypto.createHmac("sha256", secretKey).update(message).digest("hex"); // creates a HMAC of the given message using the sha256 algorithm and the secret key and returns it as a hexadecimal string representation

console.log(signature); // prints the HMAC of the given message

const signatureVerify = crypto.createHmac("sha256", secretKey).update(message).digest("hex"); // creates a HMAC of the given message using the sha256 algorithm and the secret key and returns it as a hexadecimal string representation

console.log("signature is valid and matching:", signature === signatureVerify); // prints true, because the same input and secret key will always produce the same output