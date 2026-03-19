// api/contact/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const { error } = await supabaseAdmin
      .from("contact_messages")
      .insert([{ name, email, message, status: "unread" }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}