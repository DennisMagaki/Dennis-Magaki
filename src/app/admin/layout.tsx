// app/admin/layout.tsx
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server'; // adjust path if needed

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect('/');
  if (user.email !== 'dennismagaki.26@gmail.com') return redirect('/');

  return <>{children}</>;
}