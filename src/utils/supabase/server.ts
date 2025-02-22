import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => [...cookieStore.getAll()],
        setAll: (cookieList) => {
          cookieList.forEach((cookie) => {
            cookieStore.set(cookie);
          });
        }
      }
    }
  );
}; 