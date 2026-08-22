import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

import { isAuthenticated } from '@/lib/auth';

export async function POST(request) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Form Data
    const data = await request.formData();
    const file = data.get('image');

    if (!file || typeof file === 'string') {
      console.log('Upload error: No file found or file is a string');
      return NextResponse.json({ error: 'No image file found' }, { status: 400 });
    }

    // MIME type check
    if (!file.type || !file.type.startsWith('image/')) {
      console.log('Upload error: Invalid file type:', file.type);
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Size limit check (20MB)
    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      console.log('Upload error: File too large:', file.size);
      return NextResponse.json({ error: 'File size exceeds 20MB limit.' }, { status: 400 });
    }

    // 3. Save File
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename to prevent overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Force webp extension for optimized image
    const filename = uniqueSuffix + '.webp';
    const filepath = path.join(process.cwd(), 'public/uploads', filename);

    // Compress with sharp
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1920, withoutEnlargement: true }) // Max width 1920px, keep aspect ratio
      .webp({ quality: 80 })
      .toBuffer();

    await writeFile(filepath, optimizedBuffer);

    // Return the relative URL to the saved image
    const imageUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
