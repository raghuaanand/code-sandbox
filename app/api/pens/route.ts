import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession();
  const userId = session?.user?.email;

  const body = await req.json();
  const { html, css, js, isPublic = true } = body;

  if (!html || !css || !js) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const pen = await prisma.pen.create({
      data: { 
        html, 
        css, 
        js,
        isPublic,
        userId: userId || null, // Use userId if available, otherwise set to null
      },
    });

    return NextResponse.json({ id: pen.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
