"use client";

import { useState } from "react";

export default function Template2() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Form Section */}
        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Template 2 — Elegant Minimal</h1>
          <div className="space-y-4">
            {["name", "email", "phone", "summary", "experience", "education", "skills"].map((field) => (
              <textarea
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={data[field as keyof typeof data]}
                onChange={handleChange}
                rows={field === "summary" ? 2 : 3}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-400"
              />
            ))}
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-8">
          <div className="border-b border-gray-700 pb-4 mb-4">
            <h1 className="text-4xl font-bold">{data.name || "John Doe"}</h1>
            <p className="text-gray-300 mt-1">
              {data.email || "email@example.com"} | {data.phone || "+91 9999999999"}
            </p>
          </div>

          <div className="space-y-5">
            <section>
              <h2 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-2">Profile</h2>
              <p className="text-gray-200">{data.summary || "Professional summary goes here..."}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-2">Experience</h2>
              <p className="text-gray-200 whitespace-pre-line">{data.experience}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-2">Education</h2>
              <p className="text-gray-200 whitespace-pre-line">{data.education}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-2">Skills</h2>
              <p className="text-gray-200 whitespace-pre-line">{data.skills}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
