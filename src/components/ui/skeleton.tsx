"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-700/50",
        className
      )}
    />
  );
}

// Stats Card Skeleton
export function StatsCardSkeleton() {
  return (
    <div className="glass-panel p-5 rounded-2xl h-32 animate-pulse">
      <div className="h-3 bg-gray-700 rounded w-1/2 mb-3"></div>
      <div className="h-8 bg-gray-700 rounded w-1/3"></div>
    </div>
  );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="animate-pulse border-b border-white/5">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-5">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </td>
      ))}
    </tr>
  );
}

// Job Card Skeleton
export function JobCardSkeleton() {
  return (
    <div className="glass-panel p-6 rounded-2xl animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-gray-700 rounded-full w-20"></div>
        <div className="h-6 bg-gray-700 rounded-full w-16"></div>
      </div>
    </div>
  );
}

// Activity Item Skeleton
export function ActivitySkeleton() {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white/5 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-gray-700"></div>
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
        <div className="h-2 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

// Form Skeleton
export function FormSkeleton() {
  return (
    <div className="glass-panel p-8 rounded-2xl space-y-6 animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-3 bg-gray-700 rounded w-1/4"></div>
          <div className="h-10 bg-gray-700 rounded-xl"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-700 rounded w-1/4"></div>
          <div className="h-10 bg-gray-700 rounded-xl"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-700 rounded w-1/6"></div>
        <div className="h-24 bg-gray-700 rounded-xl"></div>
      </div>
    </div>
  );
}

// Page Loading Skeleton
export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 bg-gray-700 rounded w-64 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-96 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-700 rounded-full w-32 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>
      <FormSkeleton />
    </div>
  );
}
