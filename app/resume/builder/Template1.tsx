"use client";

import { useState } from "react";

export default function Template1() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left: Form */}
        <div className="bg-white shadow-xl p-8 rounded-2xl border border-gray-100">
          <h1 className="text-2xl font-bold mb-6">Template 1 — Modern Blue</h1>
          <div className="space-y-4">
            <input
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border p-2 rounded-md"
            />
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 rounded-md"
            />
            <input
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border p-2 rounded-md"
            />
            <textarea
              name="summary"
              value={data.summary}
              onChange={handleChange}
              placeholder="Professional Summary"
              className="w-full border p-2 rounded-md"
            />
            <textarea
              name="experience"
              value={data.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="w-full border p-2 rounded-md"
            />
            <textarea
              name="education"
              value={data.education}
              onChange={handleChange}
              placeholder="Education"
              className="w-full border p-2 rounded-md"
            />
            <textarea
              name="skills"
              value={data.skills}
              onChange={handleChange}
              placeholder="Skills"
              className="w-full border p-2 rounded-md"
            />
          </div>
        </div>

        {/* Right: Preview */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
            <p>{data.email || "Email"} | {data.phone || "Phone"}</p>
          </div>
          <div className="p-6 space-y-4">
            <section>
              <h2 className="font-semibold text-xl border-b pb-1 border-gray-300 mb-2">Profile</h2>
              <p className="text-gray-700">{data.summary || "Professional summary..."}</p>
            </section>

            <section>
              <h2 className="font-semibold text-xl border-b pb-1 border-gray-300 mb-2">Experience</h2>
              <p className="text-gray-700 whitespace-pre-line">{data.experience}</p>
            </section>

            <section>
              <h2 className="font-semibold text-xl border-b pb-1 border-gray-300 mb-2">Education</h2>
              <p className="text-gray-700 whitespace-pre-line">{data.education}</p>
            </section>

            <section>
              <h2 className="font-semibold text-xl border-b pb-1 border-gray-300 mb-2">Skills</h2>
              <p className="text-gray-700 whitespace-pre-line">{data.skills}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
