import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    console.error("Login attempt");

    if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.error("Login error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
        console.error("Session error:", sessionError?.message);
        return NextResponse.json({ error: "Session retrieval failed" }, { status: 401 });
    }

    const response = NextResponse.json({
        message: "Login successful",
        user: data.user,
    });

    response.cookies.set("supabase-access-token", sessionData.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    return response;
}
