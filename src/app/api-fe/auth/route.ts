import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' },{status:405});
    }

    const body = await req.json();
    const { url, credentials } = body;
    if (!url || !credentials) {
        return NextResponse.json({ message: 'Missing URL or credentials' });
    }

    try {
        const response = await axios.post(url, credentials);
        const data = response.data;
        const cookie = cookies()
        cookie.set('token', data.data.access_token, { httpOnly: true, maxAge: 60 * 60 * 24 });

        return NextResponse.json({ message: 'Login successful', data: data.data },{status:200});
    } catch (error) {
        return NextResponse.json({ message: 'Login failed', error },{status:500});
    }
}
