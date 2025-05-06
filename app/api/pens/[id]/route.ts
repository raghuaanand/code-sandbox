import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(
  // req: NextRequest, 
  // context: { params: { id: string } }
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const pen = await prisma.pen.findUnique({ where: { id } });

    if (!pen) {
      return NextResponse.json({ message: 'Pen not found' }, { status: 404 });
    }

    return NextResponse.json(pen);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
