import { Profile } from "../types";

//Anas separated API concerns from UI using a service layer to keep components clean.

type MarketplaceResponse = {
  data: Profile[];
  count: number;
};

export async function getFreelancers(): Promise<MarketplaceResponse> {
  const res = await fetch("/api/marketplace/freelancers", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch freelancers");
  return res.json();
}

export async function getBusinesses(): Promise<MarketplaceResponse> {
  const res = await fetch("/api/marketplace/businesses");
  if (!res.ok) throw new Error("Failed to fetch businesses");
  return res.json();
}

export async function getFreelancerById(id: string): Promise<Profile> {
  const res = await fetch(`/api/marketplace/freelancers/${id}`);
  if (!res.ok) throw new Error("Profile not found");
  return res.json();
}

export async function getBusinessById(id: string): Promise<Profile> {
  const res = await fetch(`/api/marketplace/businesses/${id}`);
  if (!res.ok) throw new Error("Profile not found");
  return res.json();
}
