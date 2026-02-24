/* eslint-disable @typescript-eslint/no-unused-vars */"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import Animatedbutton from "@/app/components/Animatedbutton";
import {
  MapPin,
  Calendar,
  Mail,
  User as UserIcon,
  Briefcase,
  Heart,
} from "lucide-react";

// Mock user - replace with actual auth
type User = {
  id: string;
  email: string;
  full_name?: string;
  created_at?: string;
};

// Add type for saved profiles
type SavedProfile = {
  id: string;
  name: string;
  role: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);

  useEffect(() => {
    // Use setTimeout to avoid synchronous state update warning
    const timer = setTimeout(() => {
      // Check localStorage for authentication
      const authStatus = localStorage.getItem("recodd_auth");
      if (authStatus === "true") {
        const mockUser: User = {
          id: "1",
          email: localStorage.getItem("recodd_user_email") || "user@recodd.com",
          full_name:
            localStorage.getItem("recodd_user_name") || "Professional User",
          created_at: new Date().toISOString(),
        };
        setUser(mockUser);
      } else {
        // If not authenticated, redirect to login
        router.push("/login");
      }
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  const handleSignOut = () => {
    // Clear localStorage
    localStorage.removeItem("recodd_auth");
    localStorage.removeItem("recodd_user_name");
    localStorage.removeItem("recodd_user_email");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg))] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[rgb(var(--accent))] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      <Navbar />

      <div className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="bg-[rgb(var(--surface))]/80 backdrop-blur-xl border border-[rgb(var(--border))] p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-[rgb(var(--accent))]/20 rounded-full flex items-center justify-center border-2 border-[rgb(var(--accent))] shadow-lg">
              <UserIcon size={40} className="text-[rgb(var(--accent))]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[rgb(var(--text))] mb-2">
                {user?.full_name || "Welcome"}
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 text-[rgb(var(--muted))] text-sm">
                <span className="flex items-center gap-1.5">
                  <Mail size={14} /> {user?.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> Joined{" "}
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "Recently"}
                </span>
              </div>
            </div>
            <Animatedbutton variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Animatedbutton>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase size={20} className="text-[rgb(var(--accent))]" />
                <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                  Projects
                </h3>
              </div>
              <p className="text-3xl font-bold text-[rgb(var(--text))]">0</p>
              <p className="text-sm text-[rgb(var(--muted))]">
                Active projects
              </p>
            </div>

            <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Heart size={20} className="text-[rgb(var(--accent))]" />
                <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                  Saved
                </h3>
              </div>
              <p className="text-3xl font-bold text-[rgb(var(--text))]">
                {savedProfiles.length}
              </p>
              <p className="text-sm text-[rgb(var(--muted))]">Saved profiles</p>
            </div>

            <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <MapPin size={20} className="text-[rgb(var(--accent))]" />
                <h3 className="text-lg font-bold text-[rgb(var(--text))]">
                  Connections
                </h3>
              </div>
              <p className="text-3xl font-bold text-[rgb(var(--text))]">0</p>
              <p className="text-sm text-[rgb(var(--muted))]">
                Active connections
              </p>
            </div>
          </div>

          {/* Saved Profiles Section */}
          <div>
            <h2 className="text-2xl font-bold text-[rgb(var(--text))] mb-4 flex items-center gap-2">
              <Heart className="text-[rgb(var(--accent))]" /> Saved Profiles
            </h2>

            {savedProfiles.length === 0 ? (
              <div className="text-[rgb(var(--muted))] bg-[rgb(var(--surface))]/50 p-12 rounded-2xl text-center border border-dashed border-[rgb(var(--border))]">
                <Heart size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg mb-2">No saved profiles yet</p>
                <p className="text-sm">
                  Browse talent and click the heart icon to save profiles for
                  later!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedProfiles.map(profile => (
                  <div
                    key={profile.id}
                    className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]/50 transition-all p-4 rounded-xl group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-[rgb(var(--text))]">
                        {profile.name}
                      </h3>
                    </div>
                    <p className="text-[rgb(var(--muted))] text-sm mb-4">
                      {profile.role}
                    </p>
                    <Animatedbutton
                      onClick={() => router.push(`/freelancer/${profile.id}`)}
                      variant="secondary"
                      className="w-full justify-center text-sm"
                    >
                      View Profile
                    </Animatedbutton>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
