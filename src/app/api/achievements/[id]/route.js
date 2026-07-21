import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';

export async function DELETE(request, { params }) {
  try {
    // const token = request.cookies.get('admin_session')?.value;
    // if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key');
    // await jwtVerify(token, secret);

    const { id } = await params;
    await prisma.achievement.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}
