"use client";

import { useState } from "react";

export default function ResumeSummaryForm({ onGenerate }: { onGenerate?: (data: any) => void }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (onGenerate) onGenerate(form);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 space-y-6 border max-w-xl w-full">
      <h2 className="text-2xl font-bold text-gray-800">Resume Details</h2>

      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="role"
        placeholder="Job Role (e.g. Developer)"
        value={form.role}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="experience"
        placeholder="Years of Experience"
        value={form.experience}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="skills"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-lg text-white font-semibold"
        style={{
          background: "linear-gradient(90deg, #FF2DBE, #6A00FF)",
        }}
      >
        Generate Summary
      </button>
    </div>
  );
}
