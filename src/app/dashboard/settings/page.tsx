"use client";

import { useState } from "react";

const settingsTabs = [
  { icon: "business", label: "Company Profile" },
  { icon: "group", label: "Team Members" },
  { icon: "notifications", label: "Notifications" },
  { icon: "credit_card", label: "Billing & Plan" },
  { icon: "security", label: "Security" },
  { icon: "integration_instructions", label: "Integrations" },
];

const teamMembers = [
  {
    name: "Jane Doe",
    email: "jane@techcorp.io",
    initials: "JD",
    gradient: "from-purple-500 to-pink-500",
    role: "ADMIN",
    roleColor: "bg-neon-green/10 text-neon-green border-neon-green/20",
    status: "Active",
    statusColor: "bg-green-500",
  },
  {
    name: "Mike Ross",
    email: "mike@techcorp.io",
    initials: "MR",
    gradient: "from-blue-500 to-cyan-500",
    role: "RECRUITER",
    roleColor: "bg-white/5 text-gray-300 border-white/10",
    status: "Active",
    statusColor: "bg-green-500",
  },
  {
    name: "Alex Smith",
    email: "alex@techcorp.io",
    initials: "AS",
    gradient: "",
    bgColor: "bg-gray-700",
    role: "VIEWER",
    roleColor: "bg-white/5 text-gray-300 border-white/10",
    status: "Pending",
    statusColor: "bg-yellow-500",
  },
];

const notifications = [
  { title: "New Applicant Alert", desc: "Get notified when someone applies.", enabled: false },
  { title: "Interview Reminders", desc: "Daily summary of scheduled interviews.", enabled: true },
  { title: "Weekly Performance Report", desc: "Analytics digest sent every Monday.", enabled: true },
  { title: "Marketing & Product Updates", desc: "News about Hired.io features.", enabled: false },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Company Profile");
  const [notificationStates, setNotificationStates] = useState(
    notifications.map((n) => n.enabled)
  );

  const toggleNotification = (index: number) => {
    setNotificationStates((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

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
          <button className="relative p-2.5 rounded-full bg-card-dark border border-accent-dark hover:text-white text-gray-400 transition-colors">
            <span className="material-symbols-outlined text-xl">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-sm px-5 py-2.5 rounded-full transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">help</span>
            Support
          </button>
          <button className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(73,230,25,0.2)]">
            <span className="material-symbols-outlined text-lg">save</span>
            Save Changes
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
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Storage Used</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-neon-green to-neon-purple h-full w-[75%]" />
              </div>
              <p className="text-[10px] text-gray-500 mt-2">
                15.2 GB of 20 GB used
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
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
                <div className="shrink-0 flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-neon-green to-blue-600 flex items-center justify-center text-background-dark font-extrabold text-4xl shadow-[0_0_25px_rgba(73,230,25,0.3)] border-2 border-white/10">
                    TC
                  </div>
                  <button className="text-xs font-bold text-neon-green hover:text-white transition-colors border border-neon-green/30 hover:border-neon-green px-3 py-1.5 rounded-full bg-neon-green/10">
                    Change Logo
                  </button>
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
                        defaultValue="TechCorp Inc."
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
                    <select className="w-full px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all appearance-none cursor-pointer">
                      <option>Software Development</option>
                      <option>Fintech</option>
                      <option>Healthcare</option>
                      <option>E-commerce</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Company Size
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all appearance-none cursor-pointer">
                      <option>50-200 Employees</option>
                      <option>1-10 Employees</option>
                      <option>10-50 Employees</option>
                      <option>200-500 Employees</option>
                      <option>500+ Employees</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl bg-card-dark/60 border border-white/10 text-white focus:border-neon-green focus:ring-0 focus:outline-none transition-all placeholder-gray-600 h-24 resize-none"
                      defaultValue="Leading the future of tech innovation. We build scalable solutions for modern enterprises focusing on AI and cloud infrastructure."
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
                      defaultValue="techcorp.io"
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
                      defaultValue="techcorp"
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
              <button className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span>
                Invite Member
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.03] text-xs text-gray-500 uppercase">
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Role</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {teamMembers.map((member, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors last:border-0"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full ${member.bgColor || `bg-gradient-to-r ${member.gradient}`} flex items-center justify-center text-[10px] font-bold`}
                          >
                            {member.initials}
                          </div>
                          <div>
                            <p
                              className={`font-bold ${member.status === "Pending" ? "text-gray-400" : "text-white"}`}
                            >
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-bold border ${member.roleColor}`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-gray-300 text-xs">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${member.statusColor} ${member.status === "Active" ? "shadow-[0_0_5px_rgba(34,197,94,0.5)]" : ""}`}
                          />
                          {member.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-gray-500 hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-lg">
                            more_horiz
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
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
                {notifications.map((notif, i) => (
                  <div
                    key={i}
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
                        checked={notificationStates[i]}
                        onChange={() => toggleNotification(i)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green" />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan & Billing */}
            <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">
                  credit_card
                </span>
                Plan & Billing
              </h3>
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-5 border border-white/5 mb-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all" />
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <div>
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                      Current Plan
                    </p>
                    <h4 className="text-2xl font-bold text-white">
                      Pro Business
                    </h4>
                  </div>
                  <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-blue-500/20">
                    ACTIVE
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4 relative z-10">
                  $299/month • Renews on Nov 12, 2024
                </p>
                <div className="flex gap-2 relative z-10">
                  <button className="flex-1 bg-white text-black text-xs font-bold py-2 rounded hover:bg-gray-100 transition-colors">
                    Upgrade Plan
                  </button>
                  <button className="flex-1 bg-black/30 text-white text-xs font-bold py-2 rounded border border-white/10 hover:bg-black/50 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
              <h4 className="text-sm font-bold text-gray-300 mb-3">
                Payment Method
              </h4>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-black/20 mb-4">
                <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-[10px] text-white font-mono">
                  VISA
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    •••• •••• •••• 4242
                  </p>
                  <p className="text-[10px] text-gray-500">Expires 12/25</p>
                </div>
                <button className="text-xs text-neon-green font-bold hover:text-white transition-colors">
                  Edit
                </button>
              </div>
              <button className="w-full text-center text-xs text-gray-400 hover:text-white mt-auto py-2 border-t border-white/5 transition-colors">
                Download Invoices
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border border-red-500/20 bg-red-500/5 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined">warning</span>
                Danger Zone
              </h3>
              <p className="text-sm text-gray-400">
                Irreversible actions regarding your account and data.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-bold text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
