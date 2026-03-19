// proxy.ts
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy'; // we'll create this helper

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // adjust the matcher to protect desired routes; this pattern covers all except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};