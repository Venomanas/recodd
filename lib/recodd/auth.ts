import { UserRole } from "./types";

/**
 * Authentication utilities for role-based access control
 */

// Get the current user's role from localStorage
export function getUserRole(): UserRole | null {
  if (typeof window === "undefined") return null;

  const role = localStorage.getItem("recodd_user_role");
  if (role === "freelancer" || role === "business" || role === "admin") {
    return role as UserRole;
  }
  return null;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("recodd_auth") === "true";
}

// Get user data from localStorage
export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const isAuth = isAuthenticated();
  if (!isAuth) return null;

  return {
    name: localStorage.getItem("recodd_user_name") || "",
    email: localStorage.getItem("recodd_user_email") || "",
    role: getUserRole(),
    id: localStorage.getItem("recodd_user_id") || "",
  };
}

// Set user authentication data
export function setAuthData(data: {
  email: string;
  name: string;
  role: UserRole;
  id: string;
}) {
  if (typeof window === "undefined") return;

  localStorage.setItem("recodd_auth", "true");
  localStorage.setItem("recodd_user_email", data.email);
  localStorage.setItem("recodd_user_name", data.name);
  localStorage.setItem("recodd_user_role", data.role);
  localStorage.setItem("recodd_user_id", data.id);
}

// Clear authentication data
export function clearAuthData() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("recodd_auth");
  localStorage.removeItem("recodd_user_email");
  localStorage.removeItem("recodd_user_name");
  localStorage.removeItem("recodd_user_role");
  localStorage.removeItem("recodd_user_id");
}

// Get dashboard route based on user role
export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case "freelancer":
      return "/dashboard/freelancer";
    case "business":
      return "/dashboard/business";
    case "admin":
      return "/dashboard/admin";
    default:
      return "/";
  }
}

// Redirect to appropriate dashboard based on role
export function redirectToDashboard(router: any) {
  const role = getUserRole();
  if (role) {
    const dashboardRoute = getDashboardRoute(role);
    router.push(dashboardRoute);
  } else {
    router.push("/");
  }
}

// Check if current user is admin
export function isAdmin(): boolean {
  return getUserRole() === "admin";
}

// Check if current user is freelancer
export function isFreelancer(): boolean {
  return getUserRole() === "freelancer";
}

// Check if current user is business owner
export function isBusiness(): boolean {
  return getUserRole() === "business";
}

// Validate admin access
export function validateAdminAccess(): boolean {
  return isAuthenticated() && isAdmin();
}
