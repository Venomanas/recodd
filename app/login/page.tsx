"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Lock, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { redirectToDashboard, setAuthData } from "@/lib/recodd/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: Implement actual authentication logic with Supabase
      // For now, simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock: Determine role based on email domain (for demo purposes)
      // In production, fetch this from the database
      let role: "freelancer" | "business" | "admin" = "freelancer";
      if (email.includes("business") || email.includes("company")) {
        role = "business";
      } else if (email.includes("admin")) {
        role = "admin";
      }

      // Set authentication data
      setAuthData({
        email,
        name: email.split("@")[0],
        role,
        id: `user_${Date.now()}`,
      });

      // Redirect based on role
      redirectToDashboard(router);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      {/* LEFT SIDE: Visuals */}
      <div className="hidden lg:flex w-1/2 bg-[rgb(var(--surface))] relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[rgb(var(--accent))]/10 via-transparent to-[rgb(var(--gray))]/10"></div>

        <div className="relative z-10 p-12 text-center max-w-lg">
          <div className="mb-6 inline-block p-4 bg-[rgb(var(--accent))]/10 rounded-3xl backdrop-blur-sm">
            <Image
              src="/logo-icon.webp"
              alt="Recodd Logo"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Welcome to <span className="text-[rgb(var(--accent))]">Recodd</span>
          </h1>
          <p className="text-[rgb(var(--text-secondary))] text-lg leading-relaxed">
            Connect with top talent and businesses directly. No middlemen, no
            hidden fees.
          </p>

          {/* Feature Pills */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <div className="px-4 py-2 bg-[rgb(var(--bg))] rounded-full text-sm border border-[rgb(var(--border))]">
              ✨ Direct Connection
            </div>
            <div className="px-4 py-2 bg-[rgb(var(--bg))] rounded-full text-sm border border-[rgb(var(--border))]">
              🚀 Fast Hiring
            </div>
            <div className="px-4 py-2 bg-[rgb(var(--bg))] rounded-full text-sm border border-[rgb(var(--border))]">
              💰 Fair Pricing
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgb(var(--accent))]/5 rounded-full blur-[120px]"></div>

        <div className="w-full max-w-md bg-[rgb(var(--surface))]/80 backdrop-blur-xl border border-[rgb(var(--border))] p-8 rounded-3xl shadow-(--shadow-xl) z-10">
          <h2 className="text-3xl font-bold mb-2 text-[rgb(var(--text))]">
            Welcome Back
          </h2>
          <p className="text-[rgb(var(--text-secondary))] mb-8">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <Mail
                className="absolute left-4 top-3.5 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-colors"
                size={20}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[rgb(var(--bg))]/80 border border-[rgb(var(--border))] rounded-xl py-3 pl-12 pr-4 text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 transition-all placeholder:text-[rgb(var(--muted))]"
                required
                autoComplete="email"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock
                className="absolute left-4 top-3.5 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-colors"
                size={20}
              />
              <input
                type="password"
                name="current-password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[rgb(var(--bg))]/80 border border-[rgb(var(--border))] rounded-xl py-3 pl-12 pr-4 text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 transition-all placeholder:text-[rgb(var(--muted))]"
                required
                autoComplete="current-password"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-[rgb(var(--accent))] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[rgb(var(--error))]/10 border border-[rgb(var(--error))]/50 text-[rgb(var(--error))] p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Animatedbutton
              type="submit"
              variant="primary"
              className="w-full justify-center py-3 mt-4"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Animatedbutton>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgb(var(--border))]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[rgb(var(--surface))] text-[rgb(var(--muted))]">
                OR
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
              Don&apos;t have an account?
            </p>
            <Link href="/signup">
              <button
                type="button"
                className="w-full py-3 px-4 border-2 border-[rgb(var(--accent))] text-[rgb(var(--accent))] rounded-xl font-semibold hover:bg-[rgb(var(--accent))] hover:text-white transition-all duration-300"
              >
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
