"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Briefcase, Lock, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";

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
      // TODO: Implement actual authentication logic here
      // For now, simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set authentication in localStorage
      localStorage.setItem("recodd_auth", "true");
      localStorage.setItem("recodd_user_name", email.split("@")[0]);
      localStorage.setItem("recodd_user_email", email);

      router.push("/");
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10 p-12 text-center max-w-lg">
          <Briefcase
            size={80}
            className="text-[rgb(var(--accent))] mx-auto mb-6 animate-pulse"
          />
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Welcome to <span className="text-[rgb(var(--accent))]">Recodd</span>
          </h1>
          <p className="text-[rgb(var(--muted))] text-lg">
            Connect with top talent and businesses directly. No middlemen, no
            hidden fees.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgb(var(--accent))]/10 rounded-full blur-[120px]"></div>

        <div className="w-full max-w-md bg-[rgb(var(--surface))]/80 backdrop-blur-xl border border-[rgb(var(--border))] p-8 rounded-2xl shadow-2xl z-10">
          <h2 className="text-3xl font-bold mb-2 text-[rgb(var(--text))]">
            Welcome Back
          </h2>
          <p className="text-[rgb(var(--muted))] mb-8">
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

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-[rgb(var(--muted))]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[rgb(var(--accent))] font-bold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
