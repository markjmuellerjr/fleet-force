// app/api/integrations/[brand]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { fetchMachineryData } from '../../../../utils/api';

export async function GET(req: NextRequest, { params }: { params: { brand: string } }) {
  const { brand } = params;

  try {
    const data = await fetchMachineryData(brand);
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}