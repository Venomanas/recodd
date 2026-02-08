"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Animatedbutton from "@/app/components/Animatedbutton";
import {
  Lock,
  Mail,
  AlertCircle,
  User,
  Users,
  Shield,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { UserRole } from "@/lib/recodd/types";
import { setAuthData, getDashboardRoute } from "@/lib/recodd/auth";

export default function SignupPage() {
  const router = useRouter();

  // Form states
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Role selection, Step 2: Account details
  const [role, setRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const roles: Array<{
    value: UserRole;
    label: string;
    icon: typeof Users;
    description: string;
    color: string;
  }> = [
    {
      value: "freelancer",
      label: "Freelancer / Student",
      icon: GraduationCap,
      description: "Offer your skills and find exciting projects",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "business",
      label: "Business Owner",
      icon: Briefcase,
      description: "Post projects and hire talented freelancers",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "admin",
      label: "Admin",
      icon: Shield,
      description: "Manage platform and moderate users",
      color: "from-red-500 to-orange-500",
    },
  ];

  const handleRoleSelection = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!role) {
        throw new Error("Please select a role");
      }

      // TODO: Implement actual registration logic with Supabase
      // For now, simulate successful signup
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate mock user ID
      const userId = `user_${Date.now()}`;

      // Set authentication data
      setAuthData({
        email,
        name: fullName,
        role,
        id: userId,
      });

      // Redirect to appropriate dashboard
      const dashboardRoute = getDashboardRoute(role);
      router.push(dashboardRoute);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      {/* LEFT SIDE: Visuals */}
      <div className="hidden lg:flex w-1/2 bg-[rgb(var(--surface))] relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[rgb(var(--accent))]/10 via-transparent to-[rgb(var(--gray))]/10"></div>

        <div className="relative z-10 p-8 text-center max-w-lg">
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
            Join <span className="text-[rgb(var(--accent))]">Recodd</span>
          </h1>
          <p className="text-[rgb(var(--text-secondary))] text-lg leading-relaxed">
            {step === 1
              ? "Choose your role and start your journey with us"
              : "Create your account and unlock endless opportunities"}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[rgb(var(--accent))]/5 rounded-full blur-[100px]"></div>

        <div className="w-full max-w-md bg-[rgb(var(--surface))]/80 backdrop-blur-xl border border-[rgb(var(--border))] p-8 rounded-3xl shadow-(--shadow-xl) z-10">
          {/* Step Indicator */}
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-6 gap-2">
            <div
              className={`h-2 w-12 rounded-full transition-all ${
                step === 1
                  ? "bg-[rgb(var(--accent))]"
                  : "bg-[rgb(var(--border))]"
              }`}
            ></div>
            <div
              className={`h-2 w-12 rounded-full transition-all ${
                step === 2
                  ? "bg-[rgb(var(--accent))]"
                  : "bg-[rgb(var(--border))]"
              }`}
            ></div>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-[rgb(var(--text))]">
            {step === 1 ? "Select Your Role" : "Create Account"}
          </h2>
          <p className="text-[rgb(var(--text-secondary))] mb-8">
            {step === 1
              ? "How would you like to use Recodd?"
              : `${role === "freelancer" ? "Freelancer" : role === "business" ? "Business" : "Admin"} account`}
          </p>

          {/* STEP 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-4">
              {roles.map(roleOption => {
                const Icon = roleOption.icon;
                return (
                  <button
                    key={roleOption.value}
                    onClick={() => handleRoleSelection(roleOption.value)}
                    className="w-full group relative overflow-hidden bg-[rgb(var(--bg))] hover:bg-[rgb(var(--surface))] border-2 border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] p-6 rounded-2xl text-left transition-all duration-300 hover:shadow-(--shadow-lg) hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl bg-linear-to-br ${roleOption.color} text-white shadow-lg`}
                      >
                        <Icon size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[rgb(var(--text))] mb-1">
                          {roleOption.label}
                        </h3>
                        <p className="text-sm text-[rgb(var(--text-secondary))]">
                          {roleOption.description}
                        </p>
                      </div>
                      <div className="text-[rgb(var(--accent))] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 2: Account Details */}
          {step === 2 && (
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
                  placeholder="Password (min. 8 characters)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[rgb(var(--bg))]/80 border border-[rgb(var(--border))] rounded-xl py-3 pl-12 pr-4 text-[rgb(var(--text))] focus:outline-none focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 transition-all placeholder:text-[rgb(var(--muted))]"
                  required
                  minLength={8}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-[rgb(var(--error))]/10 border border-[rgb(var(--error))]/50 text-[rgb(var(--error))] p-3 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-[rgb(var(--border))] text-[rgb(var(--text))] hover:bg-[rgb(var(--bg))] transition-colors"
                >
                  Back
                </button>
                <Animatedbutton
                  type="submit"
                  variant="primary"
                  className="flex-1 justify-center py-3"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Animatedbutton>
              </div>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-[rgb(var(--text-secondary))]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[rgb(var(--accent))] font-semibold hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
