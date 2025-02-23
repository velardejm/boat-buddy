import { NextResponse, NextRequest } from 'next/server';
import { checkSession } from './lib/session';

// const privateRoutes = ["/trips/:path"]

export const middleware = async (req: NextRequest) => {
  const { isSession } = await checkSession();

  if (isSession) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
};

export const config = {
  matcher: ['/trips/:path*']
};
