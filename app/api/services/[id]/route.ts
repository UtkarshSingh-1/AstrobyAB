import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, price, description, icon, slug } = await request.json();

    const normalizedSlug =
      slug ||
      (name
        ? name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        : undefined);

    const updateWithSlug = () =>
      prisma.service.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(normalizedSlug && { slug: normalizedSlug }),
          ...(price !== undefined && { price }),
          ...(description && { description }),
          ...(icon && { icon }),
        },
      });

    const updateWithoutSlug = () =>
      prisma.service.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(price !== undefined && { price }),
          ...(description && { description }),
          ...(icon && { icon }),
        },
      });

    let service;
    try {
      service = await updateWithSlug();
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientValidationError &&
        typeof error.message === 'string' &&
        error.message.includes('Unknown argument `slug`')
      ) {
        service = await updateWithoutSlug();
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      } else if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return NextResponse.json(
          { error: 'Service name or slug already exists' },
          { status: 409 }
        );
      } else if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      } else {
        throw error;
      }
    }

    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    console.error('[v0] Service update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update service' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[v0] Service delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
