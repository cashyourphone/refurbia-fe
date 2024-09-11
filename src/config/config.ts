// config.ts

type Environment = 'prod' | 'dev';
const env: Environment = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment || 'prod';

export const s3BaseUrl = 'https://s3b.refurbia.in';

export const baseUrl = env === 'dev'
    ? 'http://localhost:3000'
    : 'https://refurbia.in';

export const version = 'api/v1';
export const firebaseConfig = {
    apiKey: "AIzaSyCbOH-pmwzd28RnY54PLQobsc2xqMTt268",
    authDomain: "used-phone-market.firebaseapp.com",
    projectId: "used-phone-market",
    storageBucket: "used-phone-market.appspot.com",
    messagingSenderId: "221553062983",
    appId: "1:221553062983:web:dd6a6c5adaf5f6847aed62",
    measurementId: "G-T1NL50Y3M9"
};
