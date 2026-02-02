import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock pricing data - replace with database
const servicePrices: Record<string, number> = {
  'janam-kundli': 501,
  'career-guidance': 501,
  'marriage-matching': 501,
  'health-wealth': 501,
  'gemstone-remedies': 501,
  'mantra-remedies': 501,
  'complete-astrology': 21001,
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      prices: servicePrices,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { serviceName, price } = await request.json();

    if (!serviceName || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Service name and price required' },
        { status: 400 }
      );
    }

    // Update price
    servicePrices[serviceName] = price;

    return NextResponse.json({
      success: true,
      message: 'Price updated successfully',
      prices: servicePrices,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update price' },
      { status: 500 }
    );
  }
}
