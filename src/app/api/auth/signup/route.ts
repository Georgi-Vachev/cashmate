import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    console.log("Incoming signup request:", { name, email, password });

    if (!name || !email || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
    });

    if (error) {
        console.error("Supabase signup error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("User successfully registered:", data.user);

    return NextResponse.json({ message: "Registration successful", user: data.user });
}
