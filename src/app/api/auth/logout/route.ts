import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
    }

    const response = NextResponse.json({ message: "Logged out successfully" });

    response.headers.set("Cache-Control", "no-store");

    response.cookies.set("supabase-access-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(0),
    });

    return response;
}
