"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface JobActionButtonsProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
}

export default function JobActionButtons({
  jobId,
  jobTitle,
  companyName,
}: JobActionButtonsProps) {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false); // TODO: Connect to backend

  const handleShare = async () => {
    const url = `${window.location.origin}/detail/job/${jobId}`;
    const shareData = {
      title: `${jobTitle} at ${companyName}`,
      text: `Check out this ${jobTitle} role at ${companyName} on hired.io!`,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
        console.log("Share cancelled");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link Copied!",
          description: "Job link copied to clipboard.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to copy link.",
          variant: "destructive",
        });
      }
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: !isBookmarked ? "Job Saved" : "Removed from Saved",
      description: !isBookmarked
        ? "This job has been saved to your dashboard."
        : "Job removed from your saved list.",
    });
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleBookmark}
        className={`flex-1 sm:flex-none h-12 px-4 rounded-xl bg-card-dark border transition-all group/btn flex items-center justify-center ${isBookmarked
            ? "border-neon-green text-neon-green hover:bg-neon-green/10"
            : "border-accent-dark text-gray-400 hover:border-white/20 hover:text-white"
          }`}
        title={isBookmarked ? "Unsave Job" : "Save Job"}
      >
        <span className="material-symbols-outlined group-hover/btn:scale-110 transition-transform">
          {isBookmarked ? "bookmark" : "bookmark_border"}
        </span>
      </button>
      <button
        onClick={handleShare}
        className="flex-1 sm:flex-none h-12 px-4 rounded-xl bg-card-dark border border-accent-dark hover:border-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-all group/btn"
        title="Share"
      >
        <span className="material-symbols-outlined group-hover/btn:scale-110 transition-transform">
          share
        </span>
      </button>
    </div>
  );
}
