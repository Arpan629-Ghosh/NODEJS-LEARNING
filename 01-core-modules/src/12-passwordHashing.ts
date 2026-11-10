
import crypto from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(crypto.scrypt);

async function hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');

    const derivedKey = (await scryptAsync(
        password,
        salt,
        64
    )) as Buffer;

    return `${salt}:${derivedKey.toString('hex')}`;
}

async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    const [salt, key] = hashedPassword.split(':');

    if (!salt || !key) {
        return false;
    }

    try {
        const storedKey = Buffer.from(key, 'hex');

        if (storedKey.length !== 64 || storedKey.toString('hex') !== key) {
            return false;
        }

        const derivedKey = (await scryptAsync(
            password,
            salt,
            64
        )) as Buffer;

        return crypto.timingSafeEqual(storedKey, derivedKey);
    } catch {
        return false;
    }
}

async function main(): Promise<void> {
    const stored = await hashPassword('arpan@tcs123');

    const isValid = await verifyPassword('arpan@tcs123', stored);

    console.log('Password valid:', isValid);
}

main().catch(console.error);
