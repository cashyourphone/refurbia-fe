'use client';
export const isLoggedIn = (): boolean => {
    if (typeof window !== 'undefined') { // Check if running in browser
        const token = localStorage.getItem('access_token');
        return !!token;
    }
    return false; // Return false if running on the server
};