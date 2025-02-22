import { cookies } from "next/headers";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
    const token = (await cookies()).get("supabase-access-token")?.value;

    if (!token) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        console.error("Session error:", error?.message);
        return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
}
