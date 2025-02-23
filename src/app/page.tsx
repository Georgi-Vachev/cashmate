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
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

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

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || "Guest",
          } as User);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (user) {
    return (
      <div className="relative w-full max-w-md h-[400px] mx-auto overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <HomeContent user={user} setUser={setUser} />
        </div>
      </div>)
  }

  return (
    <div className="relative w-full max-w-md h-[400px] mx-auto overflow-hidden">
      <div
        className={`
          absolute inset-0 
          flex flex-col items-center justify-center gap-4
          transition-transform duration-500
          ${isLoginView ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <LoginForm setUser={setUser} />
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setIsLoginView(false)}
        >
          Or Register
        </button>
      </div>
      <div
        className={`
          absolute inset-0 
          flex flex-col items-center justify-center gap-4
          transition-transform duration-500
          ${isLoginView ? "translate-x-full" : "translate-x-0"}
        `}
      >
        <RegisterForm setUser={setUser} />
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setIsLoginView(true)}
        >
          Or Login
        </button>
      </div>
    </div>
  );
}
