// config.ts

type Environment = 'prod' | 'dev';
const env: Environment = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment || 'prod';

export const s3BaseUrl = 'https://s3b.refurbia.in';

export const baseUrl = env === 'dev'
    ? 'http://localhost:3000'
    : 'https://refurbia.in';

export const version = 'api/v1';
