"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Briefcase,
  User,
  Clock,
  DollarSign,
} from "lucide-react";
import Animatedbutton from "./components/Animatedbutton";

// --- Types ---
type Profile = {
  id: number;
  name: string;
  role: string;
  experience: string;
  budget: string;
  type: "freelancer" | "business";
};

// --- Mock Data ---
const freelancers: Profile[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Full Stack Developer",
    experience: "3 Years",
    budget: "$20/hr",
    type: "freelancer",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "UI/UX Designer",
    experience: "5 Years",
    budget: "$45/hr",
    type: "freelancer",
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "Video Editor",
    experience: "2 Years",
    budget: "$30/hr",
    type: "freelancer",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Content Writer",
    experience: "4 Years",
    budget: "$25/hr",
    type: "freelancer",
  },
];

const businesses: Profile[] = [
  {
    id: 1,
    name: "TechNova",
    role: "Looking for React Dev",
    experience: "Project Basis",
    budget: "$2000 Fixed",
    type: "business",
  },
  {
    id: 2,
    name: "Creative Studio",
    role: "Need Logo Design",
    experience: "One-time",
    budget: "$500 Fixed",
    type: "business",
  },
  {
    id: 3,
    name: "Growth Marketing",
    role: "SEO Specialist Needed",
    experience: "Contract",
    budget: "$1500/mo",
    type: "business",
  },
  {
    id: 4,
    name: "StartUp Inc",
    role: "Mobile App MVP",
    experience: "3 Months",
    budget: "$5000 Est",
    type: "business",
  },
];

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
    {/* Mimicking the aperture logo from your images */}
  
  </div>
);

const InspirationalHero = () => {
  const words = [
    "Make your online presence.",
    "Connect with top talent.",
    "Build your dream project.",
    "Work without commissions.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  });

  return (
    <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <h2 className="text-sm font-bold text-[#E53935] uppercase tracking-widest mb-2">
        Welcome to Recodd
      </h2>
      <div className="h-10 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-[#212121] dark:text-white text-center"
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProfileCard = ({ profile }: { profile: Profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-[#BDBDBD] dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-6"
    >
      {/* Avatar Placeholder */}
      <div className="shrink-0">
        <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-zinc-700 border-2 border-[#E53935] flex items-center justify-center">
          <User className="w-8 h-8 text-gray-300" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-2">
        <h3 className="text-xl font-bold text-[#212121] dark:text-white">
          {profile.name}
        </h3>
        <p className="text-[#E53935] font-medium text-sm flex items-center gap-1">
          <Briefcase size={14} /> {profile.role}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-300 mt-2">
          <span className="flex items-center gap-1 ">
            <Clock size={14} /> {profile.experience}
          </span>
          <span className="flex items-center gap-1 font-semibold text-[#212121] dark:text-white">
            <DollarSign size={14} /> {profile.budget}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function RecoddApp() {
  const [activeTab, setActiveTab] = useState<"freelancers" | "business">(
    "freelancers"
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Theme Class on Body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const displayedProfiles =
    activeTab === "freelancers" ? freelancers : businesses;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-[#121212]" : "bg-white"
      }`}
    >
      {/* --- Navbar --- */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-6">
            <div className="hidden md:flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-full">
              <Animatedbutton
                onClick={() => setActiveTab("freelancers")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "freelancers"
                    ? "bg-[#E53935] text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
              >
                Freelancers
              </Animatedbutton>
              <Animatedbutton
                onClick={() => setActiveTab("business")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "business"
                    ? "bg-[#E53935] text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
              >
                Business
              </Animatedbutton>
            </div>

            <Animatedbutton
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-yellow-300" />
              ) : (
                <Moon size={20} className="text-[#fffefe]" />
              )}
            </Animatedbutton>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <InspirationalHero />

      {/* --- Main Content --- */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        {/* Mobile Tab Toggle (Visible only on small screens) */}
        <div className="md:hidden flex mb-8 bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
          <Animatedbutton
            onClick={() => setActiveTab("freelancers")}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "freelancers"
                ? "bg-[#E53935] text-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Freelancers
          </Animatedbutton>
          <Animatedbutton
            onClick={() => setActiveTab("business")}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "business"
                ? "bg-[#E53935] text-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Business
          </Animatedbutton>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold dark:text-red-[#E53935] mb-2">
            {activeTab === "freelancers" ? "Find Talent" : "Find Projects"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {activeTab === "freelancers"
              ? "Browse highly skilled professionals ready to work."
              : "Discover businesses looking for your expertise."}
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <AnimatePresence mode="popLayout">
            {displayedProfiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <Logo />
              <p className="text-sm text-gray-500 mt-2">
                Connecting talent with opportunity. <br /> Commission free.
              </p>
            </div>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#E53935] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E53935] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E53935] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E53935] transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-[#212121] dark:text-white font-medium">
                Contact Us
              </p>
              <p className="text-sm text-gray-500">support@recodd.com</p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 dark:bg-zinc-800 my-8" />

          <div className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-sm text-gray-400"
            >
              © 2025 Recodd. All rights reserved.
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}
