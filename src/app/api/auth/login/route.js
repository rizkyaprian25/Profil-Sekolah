import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Check credentials against environment variables
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Create JWT payload
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key');
      const alg = 'HS256';
      
      const jwt = await new SignJWT({ user: username, role: 'admin' })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('8h') // Expires in 8 hours
        .sign(secret);

      const response = NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
      
      // Set HttpOnly cookie
      response.cookies.set({
        name: 'admin_session',
        value: jwt,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 8 // 8 hours
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Kredensial tidak valid' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
