"use client";

import { Navbar } from "@/app/components/Navbar";
import { InspirationalHero } from "@/app/recodd/InspirationalHero";
import { CategorySection } from "@/app/recodd/CategorySection";
import { MarketplaceSection } from "@/app/recodd/MarketplaceSection/MarketPlaceSection";
import { SocialProofSection } from "@/app/recodd/SocialProofSection";
import { GalleryTeaser } from "@/app/recodd/GalleryTeaser";
import { Footer } from "@/app/components/Footer";

export default function RecoddApp() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden bg-[rgb(var(--bg))]">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <InspirationalHero />
        <CategorySection />

        {/* Marketplace Section */}
        <div id="marketplace">
          <MarketplaceSection />
        </div>

        <SocialProofSection />

        {/* Gallery Teaser — top 3 community posts */}
        <GalleryTeaser />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
