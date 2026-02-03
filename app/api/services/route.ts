import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    console.error('[v0] Services fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, price, description, icon, slug } = await request.json();

    if (!name || price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const normalizedSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const createWithSlug = () =>
      prisma.service.create({
        data: { name, price, description, icon, slug: normalizedSlug },
      });

    const createWithoutSlug = () =>
      prisma.service.create({
        data: { name, price, description, icon },
      });

    let service;
    try {
      service = await createWithSlug();
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientValidationError &&
        typeof error.message === 'string' &&
        error.message.includes('Unknown argument `slug`')
      ) {
        service = await createWithoutSlug();
      } else if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return NextResponse.json(
          { error: 'Service already exists' },
          { status: 409 }
        );
      } else {
        throw error;
      }
    }

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error('[v0] Service creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
