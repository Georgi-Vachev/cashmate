"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import HomeContent from "@/components/HomeContent";

interface User {
  id: string;
  email: string;
  name?: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || "Guest",
        } as User);
      } else {
        setUser(null);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || "Guest",
        } as User);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (user) {
    return <HomeContent user={user} setUser={setUser} />;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      <LoginForm setUser={setUser} />
      <RegisterForm setUser={setUser} />
    </div>
  );
}
