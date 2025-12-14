export type ProfileType = "freelancer" | "business";

export type Profile = {
  id: number;
  name: string;
  role: string;
  experience: string;
  budget: string;
  type: ProfileType;
  tags?: string[];
  location?: string;
  availability?: "part-time" | "full-time" | "contract" | "project";
};
