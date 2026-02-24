import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  DollarSign,
  Settings,
  Users,
  BarChart3,
  FolderOpen,
  Building2,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { UserRole } from "@/lib/recodd/types";

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
  userName?: string;
}

export default function DashboardLayout({
  children,
  role,
  userName = "User",
}: DashboardLayoutProps) {
  const pathname = usePathname();

  // Define navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: `/dashboard/${role}`,
      },
      {
        label: "Messages",
        icon: MessageSquare,
        href: `/dashboard/${role}/messages`,
      },
      {
        label: "Payments",
        icon: DollarSign,
        href: `/dashboard/${role}/payments`,
      },
      {
        label: "Settings",
        icon: Settings,
        href: `/dashboard/${role}/settings`,
      },
    ];

    // Role-specific items
    if (role === "freelancer") {
      return [
        ...baseItems.slice(0, 1),
        {
          label: "Projects",
          icon: Briefcase,
          href: `/dashboard/${role}/projects`,
        },
        {
          label: "Portfolio",
          icon: FolderOpen,
          href: `/dashboard/${role}/portfolio`,
        },
        ...baseItems.slice(1),
      ];
    } else if (role === "business") {
      return [
        ...baseItems.slice(0, 1),
        {
          label: "Projects",
          icon: Briefcase,
          href: `/dashboard/${role}/projects`,
        },
        {
          label: "Hired Talent",
          icon: Users,
          href: `/dashboard/${role}/hired`,
        },
        ...baseItems.slice(1),
      ];
    } else if (role === "admin") {
      return [
        { label: "Overview", icon: LayoutDashboard, href: `/dashboard/admin` },
        { label: "Users", icon: Users, href: `/dashboard/admin/users` },
        {
          label: "Analytics",
          icon: BarChart3,
          href: `/dashboard/admin/analytics`,
        },
        {
          label: "Moderation",
          icon: Shield,
          href: `/dashboard/admin/moderation`,
        },
        {
          label: "Settings",
          icon: Settings,
          href: `/dashboard/admin/settings`,
        },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] pt-20">
      {/* Back to Home Button (desktop only to avoid overlapping mobile nav) */}
      <div className="fixed top-24 left-4 z-50 hidden md:block">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] hover:bg-[rgb(var(--accent))] hover:text-white hover:border-[rgb(var(--accent))] transition-all shadow-md"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="flex max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[rgb(var(--surface))] border-r border-[rgb(var(--border))] p-6 sticky top-20 h-[calc(100vh-5rem)]">
          {/* User Info */}
          <div className="mb-8 pb-6 border-b border-[rgb(var(--border))]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-[rgb(var(--accent))] to-[rgb(var(--gray))] flex items-center justify-center text-white font-bold text-lg shadow-md">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-[rgb(var(--text))]">
                  {userName}
                </h3>
                <p className="text-xs text-[rgb(var(--muted))] capitalize">
                  {role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                    ${
                      isActive
                        ? "bg-[rgb(var(--accent))] text-white shadow-md"
                        : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg))] hover:text-[rgb(var(--text))]"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Role Badge */}
          <div className="mt-auto pt-4 border-t border-[rgb(var(--border))]">
            <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
              {role === "admin" && <Shield size={16} />}
              {role === "business" && <Building2 size={16} />}
              {role === "freelancer" && <Briefcase size={16} />}
              <span className="capitalize">{role} Dashboard</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
