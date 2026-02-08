// User and Profile Types
export type UserRole = "freelancer" | "business" | "admin";
export type ProfileType = "freelancer" | "business";
export type PostType = "work_showcase" | "hiring_alert";
export type ProjectStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";

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

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  phone?: string;
  bio?: string;
  skills?: string[];
  category?: string;
  total_projects?: number;
  total_earnings?: number;
  rating?: number;
  created_at: string;
}

// Post Gallery Types
export interface Post {
  id: string;
  author_id: string;
  author?: User;
  type: PostType;
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  budget?: number;
  likes: number;
  views: number;
  created_at: string;
  updated_at?: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Chat {
  id: string;
  user1_id: string;
  user2_id: string;
  user1?: User;
  user2?: User;
  last_message?: ChatMessage;
  unread_count?: number;
  created_at: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  client_id: string;
  freelancer_id?: string;
  client?: User;
  freelancer?: User;
  status: ProjectStatus;
  budget: number;
  category: string;
  deadline?: string;
  created_at: string;
  completed_at?: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  earnings: number;
  spent?: number;
  rating: number;
  totalHires?: number;
  projectsServed?: number;
}

export interface AdminStats extends DashboardStats {
  totalUsers: number;
  totalFreelancers: number;
  totalBusinesses: number;
  platformRevenue: number;
  monthlyGrowth: number;
}

// Payment Types
export interface Payment {
  id: string;
  project_id: string;
  from_user_id: string;
  to_user_id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  transaction_id?: string;
  created_at: string;
  completed_at?: string;
}
