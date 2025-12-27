"use client";

import { toast } from "@/hooks/use-toast";

interface ExportButtonProps {
  type: "jobs" | "applicants";
}

export default function ExportButton({ type }: ExportButtonProps) {
  const handleExport = async () => {
    try {
      const res = await fetch(`/api/company/export?type=${type}`);
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      toast({ title: "Export Complete", description: `${type === "jobs" ? "Jobs" : "Applicants"} exported successfully.` });
    } catch (error) {
      toast({ title: "Export Failed", description: "Failed to export data.", variant: "destructive" });
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
    >
      <span className="material-symbols-outlined text-lg">download</span>
      Export CSV
    </button>
  );
}
