import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { jwtVerify } from 'jose';

import { isAuthenticated } from '@/lib/auth';

export async function POST(request) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Form Data
    const data = await request.formData();
    const file = data.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No image file found' }, { status: 400 });
    }

    // MIME type check
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Size limit check (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit.' }, { status: 400 });
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
