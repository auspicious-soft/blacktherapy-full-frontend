import { NextRequest, NextResponse } from 'next/server';
import jwt, { Algorithm } from 'jsonwebtoken';
import { generateVideoSDKToken } from '@/actions';

export async function POST(req: NextRequest, res: NextResponse) {
    const { appointmentId, participantId, role = 'rtc' } = await req.json();

    if (!appointmentId || !participantId) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const { appointmentId, participantId } = await req.json()
        const token = generateVideoSDKToken(appointmentId, participantId);
        return NextResponse.json({ token })
    }
    catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}