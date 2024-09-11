// src/lib/firebase.ts
import { firebaseConfig } from '@/config/config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
