import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ messages: data });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}