"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import DesignSelector from "@/components/DesignSelector";
import TemplateModern from "@/components/templates/TemplateModern";
import TemplateElegant from "@/components/templates/TemplateElegant";
import TemplateSkillBased from "@/components/templates/TemplateSkillBased";

/* ==============================
   SAMPLE RESUME (PREVIEW ONLY)
================================ */
const SAMPLE_RESUME = {
  name: "John Doe",
  title: "Software Developer",
  email: "john.doe@email.com",
  phone: "9876543210",
  summary:
    "Detail-oriented software developer with experience building scalable web applications and REST APIs.",
  experience:
    "• Built REST APIs using Node.js\n• Integrated MongoDB\n• Collaborated with frontend teams",
  education:
    "• B.Tech in Computer Science – 2022\n• XYZ University",
  skills: "JavaScript, Node.js, React, MongoDB",
  languages: "",
  interests: "",
  certificates: "",
  achievements: "",
  projects: "• AI Resume Builder\n• Portfolio Website",
  photo: "",
};

/* ==============================
   EMPTY FORM (LEFT SIDE)
================================ */
const EMPTY_FORM = {
  name: "",
  title: "",
  email: "",
  phone: "",
  summary: "",
  experience: "",
  education: "",
  skills: "",
  languages: "",
  interests: "",
  certificates: "",
  achievements: "",
  projects: "",
  photo: "",
};

/* ==============================
   SAFE MERGE FUNCTION
   (THIS IS THE CORE FIX)
================================ */
function mergeWithSample(sample: any, form: any) {
  const merged = { ...sample };

  Object.keys(form).forEach((key) => {
    if (form[key] && form[key].trim() !== "") {
      merged[key] = form[key];
    }
  });

  return merged;
}

/* ==============================
   TEMPLATE CONFIG
================================ */
const templates = [
  { id: 1, label: "Modern", thumbnail: "/templates/modern.png" },
  { id: 2, label: "Elegant", thumbnail: "/templates/elegant.png" },
  { id: 3, label: "Skill-Based", thumbnail: "/templates/skill.png" },
];

export default function ResumeBuilder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const defaultTemplate = Number(searchParams.get("template") || 1);

  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplate);
  const [showSelector, setShowSelector] = useState(false);

  /* 🔥 KEY STATES */
  const [formData, setFormData] = useState(EMPTY_FORM);        // LEFT
  const [previewData, setPreviewData] = useState(SAMPLE_RESUME); // RIGHT
  const [isSample, setIsSample] = useState(true);

  /* ==============================
     LOAD DB DATA (IF EXISTS)
================================ */
  useEffect(() => {
    if (!session?.user?.email) return;

    async function load() {
      const res = await fetch("/api/get-resume", { cache: "no-store" });
      const json = await res.json();

      if (
        json.success &&
        json.resumeData &&
        Object.values(json.resumeData).some((v: any) => v)
      ) {
        setFormData(json.resumeData);
        setPreviewData(json.resumeData);
        setSelectedTemplate(json.resumeTemplate);
        setIsSample(false);
      }
    }

    load();
  }, [session]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You are not logged in.</p>;

  /* ==============================
     HANDLE INPUT (NON-DESTRUCTIVE)
================================ */
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedForm);

    // ✅ CRITICAL FIX
    setPreviewData(
      mergeWithSample(SAMPLE_RESUME, updatedForm)
    );

    if (isSample) setIsSample(false);
  };

  const Template =
    selectedTemplate === 1
      ? TemplateModern
      : selectedTemplate === 2
      ? TemplateElegant
      : TemplateSkillBased;

  /* ==============================
     SAVE & PREVIEW
================================ */
  async function goToPreview() {
    await fetch("/api/save-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        resumeData: formData,
        resumeTemplate: selectedTemplate,
      }),
    });

    router.push("/resume/preview");
  }

  /* ==============================
     UI
================================ */
  return (
    <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
   {/* LEFT FORM */}
<div className="bg-white rounded-xl shadow flex flex-col max-h-[90vh]">
  
  {/* SCROLLABLE CONTENT */}
  <div className="p-8 space-y-6 overflow-y-auto flex-1">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Resume Details</h2>
      <button
        onClick={() => setShowSelector(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Switch Template
      </button>
    </div>

    {isSample && (
      <p className="text-purple-600 font-medium animate-bounce">
        👈 Start typing to customize the resume preview
      </p>
    )}

    {Object.keys(formData)
      .filter((k) => k !== "photo")
      .map((field) => (
        <div key={field}>
          <label className="font-semibold capitalize">{field}</label>
          <textarea
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows={4}
          />
        </div>
      ))}
  </div>

  {/* STICKY FOOTER */}
  <div className="sticky bottom-0 bg-white border-t p-6">
    <button
      onClick={goToPreview}
      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-lg text-lg font-bold"
    >
      Continue / Next Step
    </button>
  </div>
</div>


      {/* RIGHT PREVIEW */}
      <div className="relative rounded-xl shadow-lg bg-gray-50 p-5 flex justify-center overflow-auto">
        {isSample && (
          <div className="absolute top-3 right-3 text-xs text-purple-600 animate-pulse">
            Sample Preview
          </div>
        )}
        <Template data={previewData} />
      </div>

      {showSelector && (
        <DesignSelector
          templates={templates}
          selected={selectedTemplate}
          onSelect={(id) => {
            setSelectedTemplate(Number(id));
            setShowSelector(false);
          }}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  );
}
