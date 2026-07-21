import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // const token = request.cookies.get('admin_session')?.value;
    // if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key');
    // await jwtVerify(token, secret);

    const { title, category, studentName, level, imageUrl } = await request.json();
    const newAchievement = await prisma.achievement.create({
      data: { title, category, studentName, level, imageUrl }
    });
    return NextResponse.json(newAchievement);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}
