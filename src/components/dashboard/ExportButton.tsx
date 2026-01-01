"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ExportButtonProps {
  type: "jobs" | "applicants";
}

export default function ExportButton({ type }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
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
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {exporting ? (
        <>
          <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
          Exporting...
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-lg">download</span>
          Export CSV
        </>
      )}
    </button>
  );
}
