"use client";

import { Navbar } from "@/app/components/Navbar";
import { MarketplaceContent } from "@/app/recodd/MarketplaceSection/MarketPlaceSection";
import { Suspense } from "react";

export default function FreelancersPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      <Navbar />
      <div className="pt-20">
        <Suspense
          fallback={<div className="py-20 text-center">Loading...</div>}
        >
          <MarketplaceContent forcedTab="freelancers" />
        </Suspense>
      </div>
    </div>
  );
}
