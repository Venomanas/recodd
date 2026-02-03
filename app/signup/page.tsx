"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Animatedbutton from "@/app/components/Animatedbutton";
import { Briefcase, Lock, Mail, AlertCircle, User } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: Implement actual registration logic here
      // For now, simulate successful signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Account created successfully! Check your email for confirmation.");
      router.push("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      {/* LEFT SIDE: Visuals */}
      <div className="hidden lg:flex w-1/2 bg-[rgb(var(--surface))] relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10 p-12 text-center max-w-lg">
          <Briefcase
            size={80}
            className="text-[rgb(var(--accent))] mx-auto mb-6 animate-pulse"
          />
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Join <span className="text-[rgb(var(--accent))]">Recodd</span>
          </h1>
          <p className="text-[rgb(var(--muted))] text-lg">
            Start connecting with professionals and businesses worldwide.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgb(var(--accent))]/10 rounded-full blur-[120px]"></div>

        <div className="w-full max-w-md bg-[rgb(var(--surface))]/80 backdrop-blur-xl border border-[rgb(var(--border))] p-8 rounded-2xl shadow-2xl z-10">
          <h2 className="text-3xl font-bold mb-2 text-[rgb(var(--text))]">
            Create Account
          </h2>
          <p className="text-[rgb(var(--muted))] mb-8">
            Start your journey with Recodd today.
          </p>

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Full Name Input */}
            <div className="relative group">
              <User
                className="absolute left-4 top-3.5 text-[rgb(var(--muted))] group-focus-within:text-[rgb(var(--accent))] transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full bg-[rgb(var(--bg))]/80 border border-[rgb(var(--border))] rounded-xl py-3 pl-12 pr-4 text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 transition-all placeholder:text-[rgb(var(--muted))]"
                required
              />
            </div>

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
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[rgb(var(--bg))]/80 border border-[rgb(var(--border))] rounded-xl py-3 pl-12 pr-4 text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 transition-all placeholder:text-[rgb(var(--muted))]"
                required
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
              {loading ? "Creating Account..." : "Sign Up"}
            </Animatedbutton>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-[rgb(var(--muted))]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[rgb(var(--accent))] font-bold hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
