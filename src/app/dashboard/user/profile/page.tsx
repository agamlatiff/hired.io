"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ui/image-upload";

export default function UserProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) { const data = await res.json(); setName(data.name || ""); setHeadline(data.headline || ""); setLocation(data.location || ""); setSkills(data.skills || []); setAvatar(data.avatar || null); }
    } catch (error) { console.error("Error:", error); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (session) fetchProfile(); }, [session, fetchProfile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, headline, location, skills, avatar }) });
      if (res.ok) toast({ title: "Profile Updated", description: "Your changes have been saved." });
      else throw new Error("Failed");
    } catch (error) { toast({ title: "Error", description: "Failed to save.", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const addSkill = () => { if (skillInput.trim() && !skills.includes(skillInput.trim())) { setSkills([...skills, skillInput.trim()]); setSkillInput(""); } };
  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  if (!session) return <div className="flex items-center justify-center h-[60vh]"><p className="text-gray-400">Please sign in.</p></div>;
  if (loading) return <div className="animate-pulse space-y-6"><div className="h-8 bg-gray-700 rounded w-1/4" /><div className="h-64 bg-gray-700 rounded-2xl" /></div>;

  return (
    <>
      <header className="flex items-center justify-between mb-10">
        <div><h2 className="text-3xl font-bold text-white mb-1">My Profile</h2><p className="text-gray-400 text-sm">Update your profile to attract employers.</p></div>
        <button onClick={handleSave} disabled={saving} className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-6 py-2.5 rounded-full transition-all disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6">Basic Information</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="shrink-0"><ImageUpload currentImage={avatar} onUploadComplete={(url) => setAvatar(url)} onError={(err) => toast({ title: "Upload Failed", description: err, variant: "destructive" })} type="avatar" size="lg" shape="circle" placeholder={name} /></div>
              <div className="flex-1 space-y-4">
                <div><label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none" /></div>
                <div><label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Headline</label><input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Senior Frontend Developer" className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none" /></div>
                <div><label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase">Location</label><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Jakarta, Indonesia" className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none" /></div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (<span key={skill} className="px-3 py-1.5 bg-neon-green/10 text-neon-green rounded-full text-sm font-medium flex items-center gap-2">{skill}<button onClick={() => removeSkill(skill)} className="hover:text-red-400"><span className="material-symbols-outlined text-sm">close</span></button></span>))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Add a skill..." className="flex-1 px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none" />
              <button onClick={addSkill} className="px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"><span className="material-symbols-outlined">add</span></button>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="glass-panel p-6 rounded-2xl sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4">Profile Tips</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><span className="material-symbols-outlined text-neon-green text-sm mt-0.5">check_circle</span>Add a professional photo</li>
              <li className="flex items-start gap-2"><span className="material-symbols-outlined text-neon-green text-sm mt-0.5">check_circle</span>Write a compelling headline</li>
              <li className="flex items-start gap-2"><span className="material-symbols-outlined text-neon-green text-sm mt-0.5">check_circle</span>List your top skills</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
