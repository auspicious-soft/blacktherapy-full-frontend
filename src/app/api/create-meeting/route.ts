import { NextRequest, NextResponse } from 'next/server';
import jwt, { Algorithm } from 'jsonwebtoken';
import { createVideoSDKMeeting } from '@/utils';


export async function POST(req: NextRequest) {
    const { appointmentId, participantId } = await req.json();

    if (!appointmentId) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    try {
        // You might want to add authentication here
        const meetingId = await createVideoSDKMeeting(appointmentId, participantId);
        return NextResponse.json({ meetingId });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}