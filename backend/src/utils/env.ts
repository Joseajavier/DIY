import dotenv from 'dotenv';
dotenv.config();

export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  PORT: parseInt(process.env.PORT || '3001', 10),
};

export function validateEnv(): void {
  if (!env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY is not set in .env');
    process.exit(1);
  }
}
