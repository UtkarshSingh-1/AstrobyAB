import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, email, serviceName, price, paymentMethod } = await request.json();

    if (!name || !email || !serviceName || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create consultation in database
    const consultation = await prisma.consultation.create({
      data: {
        userId: session.user.id,
        name,
        email,
        serviceName,
        price,
        paymentStatus: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      booking: consultation,
    });
  } catch (error) {
    console.error('[v0] Booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
