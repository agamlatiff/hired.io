"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/ui/image-upload";
import { toast } from "@/hooks/use-toast";
import NotificationsDropdown from "@/components/dashboard/NotificationsDropdown";

const settingsTabs = [
  { icon: "business", label: "Company Profile" },
  { icon: "group", label: "Team Members" },
  { icon: "notifications", label: "Notifications" },
  { icon: "security", label: "Security" },
];

interface TeamMember {
  id: string;
  name: string;
  position: string;
  instagram: string;
  linkedin: string;
}

interface CompanyData {
  id: string;
  name: string;
  email: string;
  logo: string | null;
  plan: string;
  CompanyOverview: Array<{
    id: string;
    name: string;
    image: string;
    website: string;
    location: string;
    employee: string;
    industry: string;
    description: string;
  }>;
  CompanySocialMedia: Array<{
    id: string;
    instagram: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  }>;
  CompanyTeam: TeamMember[];
}

interface NotificationPreferences {
  newApplicantAlert: boolean;
  interviewReminders: boolean;
  weeklyPerformanceReport: boolean;
  marketingUpdates: boolean;
}

const notificationConfig = [
  { key: "newApplicantAlert", title: "New Applicant Alert", desc: "Get notified when someone applies." },
  { key: "interviewReminders", title: "Interview Reminders", desc: "Daily summary of scheduled interviews." },
  { key: "weeklyPerformanceReport", title: "Weekly Performance Report", desc: "Analytics digest sent every Monday." },
  { key: "marketingUpdates", title: "Marketing & Product Updates", desc: "News about Hired.io features." },
] as const;

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("Company Profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Company data
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [industry, setIndustry] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedinPage, setLinkedinPage] = useState("");
  const [location, setLocation] = useState("");

  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
    newApplicantAlert: true,
    interviewReminders: true,
    weeklyPerformanceReport: true,
    marketingUpdates: false,
  });

  // Security tab state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // Invite member modal state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberPosition, setNewMemberPosition] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [addingMember, setAddingMember] = useState(false);

  // Fetch company data
  const fetchCompanyData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/company/profile");
      if (!res.ok) throw new Error("Failed to fetch company data");
      const data = await res.json();
      setCompanyData(data);

      // Populate form fields
      const overview = data.CompanyOverview?.[0];
      const social = data.CompanySocialMedia?.[0];

      setCompanyName(overview?.name || data.name || "");
      setCompanyLogo(data.logo || overview?.image || null);
      setIndustry(overview?.industry || "");
      setEmployeeCount(overview?.employee || "");
      setDescription(overview?.description || "");
      setWebsite(overview?.website?.replace("https://", "") || "");
      setLinkedinPage(social?.linkedin?.replace("https://linkedin.com/company/", "") || "");
      setLocation(overview?.location || "");
    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      fetchCompanyData();
    }
  }, [session, fetchCompanyData]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch("/api/company/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: companyName,
          overview: {
            name: companyName,
            industry,
            employee: employeeCount,
            description,
            website: website ? `https://${website}` : "",
            location,
            image: companyData?.CompanyOverview?.[0]?.image || "/images/logo.png",
            dateFounded: new Date(),
            techStack: [],
          },
          socialMedia: {
            linkedin: linkedinPage ? `https://linkedin.com/company/${linkedinPage}` : "",
            instagram: companyData?.CompanySocialMedia?.[0]?.instagram || "",
            twitter: companyData?.CompanySocialMedia?.[0]?.twitter || "",
            facebook: companyData?.CompanySocialMedia?.[0]?.facebook || "",
            youtube: companyData?.CompanySocialMedia?.[0]?.youtube || "",
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setSaveMessage({ type: "success", text: "Settings saved successfully!" });
      fetchCompanyData();
    } catch (error) {
      console.error("Error saving:", error);
      setSaveMessage({ type: "error", text: "Failed to save settings. Please try again." });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const toggleNotification = async (key: keyof NotificationPreferences) => {
    const newValue = !notificationPrefs[key];
    setNotificationPrefs((prev) => ({
      ...prev,
      [key]: newValue,
    }));

    // Save to API
    try {
      await fetch("/api/company/notification-preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: newValue }),
      });
    } catch (error) {
      // Revert on error
      setNotificationPrefs((prev) => ({
        ...prev,
        [key]: !newValue,
      }));
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      toast({
        title: "Success",
        description: "Password changed successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMemberName || !newMemberPosition) {
      toast({
        title: "Error",
        description: "Name and position are required",
        variant: "destructive",
      });
      return;
    }

    setAddingMember(true);
    try {
      const res = await fetch("/api/company/team-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newMemberName,
          position: newMemberPosition,
          email: newMemberEmail,
        }),
      });

      if (!res.ok) throw new Error("Failed to add member");

      toast({
        title: "Success",
        description: "Team member added successfully",
      });
      setShowInviteModal(false);
      setNewMemberName("");
      setNewMemberPosition("");
      setNewMemberEmail("");
      fetchCompanyData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    } finally {
      setAddingMember(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      const res = await fetch(`/api/company/team-members?id=${memberId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove member");

      toast({
        title: "Success",
        description: "Team member removed",
      });
      fetchCompanyData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-400">Please sign in to access settings.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1 glow-text">
            Company Settings
          </h2>
          <p className="text-gray-400 text-sm">
            Manage your organization profile, billing and preferences.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <div className={`text-sm px-4 py-2 rounded-lg ${saveMessage.type === "success"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}>
              {saveMessage.text}
            </div>
          )}
          <NotificationsDropdown />
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(73,230,25,0.2)] disabled:opacity-50"
          >
            {saving ? (
              <>
                <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                Saving...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">save</span>
                Save Changes
              </>
            )}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar - Tabs */}
        <div className="col-span-12 lg:col-span-3">
          <div className="glass-panel p-4 rounded-xl sticky top-6">
            <div className="space-y-1">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all border ${activeTab === tab.label
                    ? "text-neon-green bg-neon-green/10 border-neon-green"
                    : "text-gray-300 hover:text-white hover:bg-white/5 border-transparent"
                    }`}
                >
                  <span className="material-symbols-outlined">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 px-4">
              <p className="text-[10px] text-gray-500 text-center">
                {companyData?.plan === "pro" ? "Pro Plan" : "Free Plan"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {loading ? (
            <div className="glass-panel p-8 rounded-2xl">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Basic Information */}
              <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <span className="material-symbols-outlined text-9xl">
                    business
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-neon-green">
                      edit_square
                    </span>
                    Basic Information
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="shrink-0 flex flex-col items-center">
                      <ImageUpload
                        currentImage={companyLogo}
                        onUploadComplete={(url) => {
                          setCompanyLogo(url);
                          toast({
                            title: "Logo Updated",
                            description: "Company logo has been uploaded successfully.",
                          });
                        }}
                        onError={(error) => {
                          toast({
                            title: "Upload Failed",
                            description: error,
                            variant: "destructive",
                          });
                        }}
                        type="logo"
                        size="lg"
                        shape="square"
                        placeholder={companyName}
                      />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                          Company Name
                        </label>
                        <div className="relative">
                          <input
                            className="w-full px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                            verified
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                          Industry
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all appearance-none cursor-pointer"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                        >
                          <option value="">Select Industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Software Development">Software Development</option>
                          <option value="Fintech">Fintech</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Education">Education</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                          Company Size
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all appearance-none cursor-pointer"
                          value={employeeCount}
                          onChange={(e) => setEmployeeCount(e.target.value)}
                        >
                          <option value="">Select Size</option>
                          <option value="1-10">1-10 Employees</option>
                          <option value="10-50">10-50 Employees</option>
                          <option value="50-200">50-200 Employees</option>
                          <option value="200-500">200-500 Employees</option>
                          <option value="500+">500+ Employees</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                          Location
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g., Jakarta, Indonesia"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                          Description
                        </label>
                        <textarea
                          className="w-full px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600 h-24 resize-none"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe your company..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                        Website URL
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">
                          https://
                        </span>
                        <input
                          className="w-full pl-16 pr-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                          type="text"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="yourcompany.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                        LinkedIn Page
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">
                          linkedin.com/company/
                        </span>
                        <input
                          className="w-full pl-44 pr-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                          type="text"
                          value={linkedinPage}
                          onChange={(e) => setLinkedinPage(e.target.value)}
                          placeholder="yourcompany"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Management */}
              <div className="glass-panel p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-neon-purple">
                      groups
                    </span>
                    Team Management
                  </h3>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Invite Member
                  </button>
                </div>
                <div className="overflow-hidden rounded-xl border border-white/5">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.03] text-xs text-gray-500 uppercase">
                        <th className="p-4 font-semibold">User</th>
                        <th className="p-4 font-semibold">Position</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {companyData?.CompanyTeam && companyData.CompanyTeam.length > 0 ? (
                        companyData.CompanyTeam.map((member) => (
                          <tr
                            key={member.id}
                            className="border-b border-white/5 hover:bg-white/[0.02] transition-colors last:border-0"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">
                                  {member.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-bold text-white">{member.name}</p>
                                  <p className="text-xs text-gray-500">{member.linkedin}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 rounded text-[10px] font-bold border bg-white/5 text-gray-300 border-white/10">
                                {member.position}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="flex items-center gap-1.5 text-gray-300 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                                Active
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleRemoveMember(member.id)}
                                className="text-gray-500 hover:text-red-400 transition-colors"
                                title="Remove member"
                              >
                                <span className="material-symbols-outlined text-lg">
                                  delete
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-gray-500">
                            No team members yet. Click &quot;Invite Member&quot; to add your first team member.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notifications and Billing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Notifications */}
                <div className="glass-panel p-6 rounded-2xl h-full">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-500">
                      notifications_active
                    </span>
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    {notificationConfig.map((notif) => (
                      <div
                        key={notif.key}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                      >
                        <div>
                          <p className="text-sm font-bold text-gray-200">
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500">{notif.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notificationPrefs[notif.key]}
                            onChange={() => toggleNotification(notif.key)}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="glass-panel p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-500">
                    security
                  </span>
                  Security Settings
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full max-w-md px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full max-w-md px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                      placeholder="Enter new password (min 8 characters)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full max-w-md px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button
                    onClick={handleChangePassword}
                    disabled={changingPassword || !currentPassword || !newPassword || !confirmPassword}
                    className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-5 py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {changingPassword ? (
                      <>
                        <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                        Changing...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">lock</span>
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowInviteModal(false)}
          />
          <div className="relative bg-card-dark border border-white/10 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-neon-green">person_add</span>
              Add Team Member
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                  Name *
                </label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                  placeholder="Team member name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                  Position *
                </label>
                <input
                  type="text"
                  value={newMemberPosition}
                  onChange={(e) => setNewMemberPosition(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                  placeholder="e.g. Senior Developer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background-dark border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600"
                  placeholder="member@company.com"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-3 px-4 rounded-lg bg-white/5 text-white font-bold hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  disabled={addingMember || !newMemberName || !newMemberPosition}
                  className="flex-1 py-3 px-4 rounded-lg bg-neon-green text-background-dark font-bold hover:bg-[#3cd612] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {addingMember ? (
                    <>
                      <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                      Adding...
                    </>
                  ) : (
                    "Add Member"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
