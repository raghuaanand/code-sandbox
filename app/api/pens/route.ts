import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { html, css, js } = await req.json();

  if (!html || !css || !js) {
    return NextResponse.json({ message: 'Missing HTML, CSS, or JS' }, { status: 400 });
  }

  try {
    const pen = await prisma.pen.create({
      data: { html, css, js },
    });

    return NextResponse.json({ id: pen.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
