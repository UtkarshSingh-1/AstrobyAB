import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const consultations = await prisma.consultation.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        serviceName: true,
        price: true,
        paymentStatus: true,
        createdAt: true,
        consultationDate: true,
        birthPlace: true,
        birthDate: true,
        birthTime: true,
        consultationPurpose: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      { consultations },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Admin consultations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch consultations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      name,
      email,
      serviceName,
      price,
      consultationDate,
      birthPlace,
      birthDate,
      birthTime,
      consultationPurpose,
    } = await request.json();

    if (!name || !email || !serviceName || price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        userId: session.user?.id || '',
        name,
        email,
        serviceName,
        price,
        paymentStatus: 'pending',
        consultationDate: consultationDate ? new Date(consultationDate) : null,
        birthPlace,
        birthDate: birthDate ? new Date(birthDate) : null,
        birthTime,
        consultationPurpose,
      },
    });

    return NextResponse.json(
      { consultation },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Failed to create consultation:', error);
    return NextResponse.json(
      { error: 'Failed to create consultation' },
      { status: 500 }
    );
  }
}
