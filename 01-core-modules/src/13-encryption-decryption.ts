
import crypto from "node:crypto";

interface EncryptedObject {
    iv: string;
    encryptedData: string;
    authTag: string;
}

const algorithm = "aes-256-gcm";
const IV_LENGTH = 12; // Recommended for GCM
const KEY_LENGTH = 32; // 256 bits

// Generate a secure 256-bit encryption key
function generateSecretKey(): string {
    return crypto.randomBytes(KEY_LENGTH).toString("hex");
}

// Encrypt data
function encryptData(
    data: string,
    secretKey: string
): EncryptedObject {
    const key = Buffer.from(secretKey, "hex"); // creates a buffer object from the hex string for the key

    if (key.length !== KEY_LENGTH) {
        throw new Error("Invalid encryption key. Expected 32 bytes.");
    }

    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString("hex"),
        encryptedData: encrypted,
        authTag: authTag.toString("hex"),
    };
}

// Decrypt data
function decryptData(
    encryptedObject: EncryptedObject,
    secretKey: string
): string {
    const key = Buffer.from(secretKey, "hex");

    if (key.length !== KEY_LENGTH) {
        throw new Error("Invalid encryption key. Expected 32 bytes.");
    }

    const iv = Buffer.from(encryptedObject.iv, "hex");
    const authTag = Buffer.from(encryptedObject.authTag, "hex");

    if (iv.length !== IV_LENGTH || authTag.length !== 16) {
        throw new Error("Invalid IV or authentication tag.");
    }

    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        iv
    );

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(
        encryptedObject.encryptedData,
        "hex",
        "utf8"
    );

    decrypted += decipher.final("utf8");

    return decrypted;
}

// Test
const secretKey = generateSecretKey();

const originalData = "ArpanGhosh+ArpitaJana";

const encryptedObject = encryptData(originalData, secretKey);

console.log("Encrypted Object:", encryptedObject);

const decryptedData = decryptData(encryptedObject, secretKey);

console.log("Decrypted Data:", decryptedData);
console.log("Original Data:", originalData);
console.log("Match:", originalData === decryptedData);
