import dotenv from 'dotenv'

dotenv.config();

function checkRequiredEnvVariables(key: string): string{
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

export const env = {
    port: Number(checkRequiredEnvVariables("PORT") ?? 3000),
    isProduction: (checkRequiredEnvVariables("NODE_ENV") ?? "development") === "production",
    nodeEnv: checkRequiredEnvVariables("NODE_ENV") ?? "development",
    logLevel: checkRequiredEnvVariables("LOG_LEVEL") ?? "info",
    databaseUrl: checkRequiredEnvVariables("DATABASE_URL"),
    jwtAccessSecret: checkRequiredEnvVariables("JWT_SECRET"),
    jwtAccessExpiresIn: checkRequiredEnvVariables("JWT_ACCESS_EXPIRES_IN"),
} as const;