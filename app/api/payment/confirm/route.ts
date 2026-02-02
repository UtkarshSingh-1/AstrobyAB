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
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { consultationId, paymentMethod } = await request.json();

    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }

    if (consultation.userId !== session.user.id && session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Update payment status to completed
    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        paymentStatus: 'completed',
        paymentId: `pay_${Date.now()}`,
      },
    });

    return NextResponse.json(
      { success: true, consultation: updatedConsultation },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}
