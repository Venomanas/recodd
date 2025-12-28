import React from "react";

type Props = object;

function SkeletonCard({}: Props) {
  return (
    <div className="rounded-3xl bg-[rgb(var(--surface))] p-1">
      <div className="h-full rounded-[20px] bg-[rgb(var(--bg))] p-5 border border-[rgb(var(--border))] space-y-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[rgb(var(--surface))] animate-pulse" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 w-1/3 bg-[rgb(var(--surface))] rounded animate-pulse" />
            <div className="h-3 w-1/4 bg-[rgb(var(--surface))] rounded animate-pulse" />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-[rgb(var(--surface))] rounded-md animate-pulse" />
          <div className="h-6 w-16 bg-[rgb(var(--surface))] rounded-md animate-pulse" />
        </div>
        <div className="pt-4 flex gap-3">
          <div className="h-10 flex-1 bg-[rgb(var(--surface))] rounded-full animate-pulse" />
          <div className="h-10 flex-1 bg-[rgb(var(--surface))] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
