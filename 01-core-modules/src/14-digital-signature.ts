
import crypto from 'node:crypto';

// Extract the required cryptographic functions from Node.js crypto module
const { generateKeyPairSync, sign, verify } = crypto;

// Generate an Ed25519 public-private key pair
// privateKey: Used to create digital signatures
// publicKey: Used to verify digital signatures
const { privateKey, publicKey } = generateKeyPairSync('ed25519');

// Original message that needs to be digitally signed
const data = 'Payment approved for order 101';

// Convert the message into a Buffer and generate a digital signature
// null: Ed25519 automatically selects its hashing algorithm
// privateKey: Used to sign the original message
const signature = sign(null, Buffer.from(data), privateKey);

// Verify whether the signature belongs to the given message and public key
// null: Ed25519 automatically handles the hashing algorithm
// Buffer.from(data): Original message to verify
// publicKey: Public key corresponding to the private key
// signature: Previously generated digital signature
const isValid = verify(
    null,
    Buffer.from(data),
    publicKey,
    signature
);

// Print true if the signature is valid; otherwise, print false
console.log(isValid);