import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  subtitle?: string;
  color?: "red" | "blue" | "green" | "purple" | "gray";
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  subtitle,
  color = "red",
}: StatsCardProps) {
  const colorClasses = {
    red: "from-red-500 to-red-600",
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    gray: "from-gray-500 to-gray-600",
  };

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColorClass =
    trend === "up"
      ? "text-green-600 bg-green-50"
      : trend === "down"
        ? "text-red-600 bg-red-50"
        : "text-gray-600 bg-gray-50";

  return (
    <div className="relative bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl p-6 hover:shadow-(--shadow-md) transition-all duration-300 overflow-hidden group">
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-linear-to-br from-[rgb(var(--accent))]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">
              {title}
            </p>
            <h3 className="text-3xl font-bold text-[rgb(var(--text))]">
              {value}
            </h3>
            {subtitle && (
              <p className="text-xs text-[rgb(var(--muted))] mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Icon */}
          <div
            className={`p-3 rounded-xl bg-linear-to-br ${colorClasses[color]} text-white shadow-lg`}
          >
            <Icon size={24} />
          </div>
        </div>

        {/* Trend Indicator */}
        {trend && trendValue && (
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${trendColorClass}`}
          >
            <TrendIcon size={14} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
