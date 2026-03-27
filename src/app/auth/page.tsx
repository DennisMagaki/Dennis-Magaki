"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import toast from "react-hot-toast";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message, {
        duration: 5000,
        style: {
          background: "#111",
          color: "#ba0000",
          border: "1px solid #ba0000",
          fontFamily: "var(--font-montserrat)",
          width: "300px",
          textAlign: "center",
        },
      });
      setLoading(false);
      return;
    }
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-montserrat px-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
        
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Admin Login
        </h1>

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-400 hover:bg-blue-500 transition-colors text-black font-semibold rounded-xl px-6 py-3 mt-2 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* NOTE */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Restricted access — admin only
        </p>
      </div>
    </div>
  );
}