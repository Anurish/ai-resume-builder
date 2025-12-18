"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function ResumeForm({ setSummary, setFormData }: any) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    experience: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Generating summary...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          experience: form.experience,
          skills: form.skills.split(",").map((s) => s.trim()),
        }),
      });

      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
        setFormData(form);
        toast.dismiss();
        toast.success("✨ Summary Generated!");
      } else throw new Error();
    } catch {
      toast.dismiss();
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md flex flex-col gap-4 w-full max-w-md"
    >
      <input
        placeholder="Your Name"
        className="p-3 rounded bg-white/10 border border-white/20 text-white"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Job Role (e.g. Developer)"
        className="p-3 rounded bg-white/10 border border-white/20 text-white"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />
      <input
        placeholder="Years of Experience"
        className="p-3 rounded bg-white/10 border border-white/20 text-white"
        value={form.experience}
        onChange={(e) => setForm({ ...form, experience: e.target.value })}
      />
      <input
        placeholder="Skills (comma separated)"
        className="p-3 rounded bg-white/10 border border-white/20 text-white"
        value={form.skills}
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded text-white font-semibold mt-2"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>
    </form>
  );
}
