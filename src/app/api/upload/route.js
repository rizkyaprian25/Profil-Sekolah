import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { jwtVerify } from 'jose';

export async function POST(request) {
  try {
    // 1. Verify Authentication (Bypassed for now)
    // const token = request.cookies.get('admin_session')?.value;
    // if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key');
    // await jwtVerify(token, secret);

    // 2. Parse Form Data
    const data = await request.formData();
    const file = data.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No image file found' }, { status: 400 });
    }

    // 3. Save File
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename to prevent overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const filepath = path.join(process.cwd(), 'public/uploads', filename);

    await writeFile(filepath, buffer);

    // Return the relative URL to the saved image
    const imageUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
