'use server';

import 'server-only';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256'
    })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256']
    });
    // console.log(payload);
    return payload;
  } catch (error) {
    console.log(error);
    console.log('Failed to verify session');
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
}

export async function checkSession(): Promise<{
  payload: JWTPayload | undefined;
  isSession: boolean;
}> {
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);
  if (session) {
    return { payload: payload, isSession: true };
  } else {
    return { payload: undefined, isSession: false };
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
