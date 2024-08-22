const env = 'dev'
export const s3BaseUrl = 'https://s3b.refurbia.in';
export const baseUrl = env === 'dev'?'http://localhost:3000':'https://refurbia.in';
export const version = 'api/v1'