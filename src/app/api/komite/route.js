import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';



export async function GET() {
  try {
    const komite = await prisma.komite.findFirst();
    return NextResponse.json(komite || {});
  } catch (error) {
    console.error("Error fetching Komite:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { title, content, photoUrl } = data;

    let komite = await prisma.komite.findFirst();

    if (komite) {
      komite = await prisma.komite.update({
        where: { id: komite.id },
        data: { title, content, photoUrl },
      });
    } else {
      komite = await prisma.komite.create({
        data: { title, content, photoUrl },
      });
    }

    return NextResponse.json(komite, { status: 200 });
  } catch (error) {
    console.error("Error updating Komite:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
