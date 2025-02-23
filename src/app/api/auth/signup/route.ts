import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    console.log("Incoming signup request:", { name, email, password });

    if (!name || !email || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
    });

    if (authError) {
        console.error("Supabase signup error:", authError.message);
        return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    console.log("User successfully registered:", authData.user);

    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    const { error: insertError } = await supabase.from("users").insert([
        {
            id: authData.user?.id,
            name,
            email,
            account_number: accountNumber,
            balance: 10000,
            currency: "BGN",
        },
    ]);

    if (insertError) {
        console.error("Database insert error:", insertError.message);
        return NextResponse.json({ error: "Failed to store user data" }, { status: 500 });
    }

    return NextResponse.json({ message: "Registration successful", user: authData.user });
}
