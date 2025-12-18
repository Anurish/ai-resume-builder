"use client";

export default function TemplateModern({ data }: { data: Record<string, any> }) {
  return (
    <div className="w-full max-w-[780px] mx-auto rounded-xl p-8 space-y-8"
         style={{ border: "1px solid #9ca3af" }}> {/* gray-400 */}

      {/* NAME + TITLE */}
      <div className="text-center">
        <h1 className="text-4xl font-bold" style={{ color: "#111827" }}> {/* gray-900 */}
          {data.name || "John Doe"}
        </h1>

        <p className="text-lg mt-1" style={{ color: "#4b5563" }}> {/* gray-600 */}
          {data.title || "Software Developer"}
        </p>

        <p className="mt-2" style={{ color: "#6b7280" }}> {/* gray-500 */}
          {(data.email || "email@example.com") + " • " + (data.phone || "000-000-0000")}
        </p>

        <hr className="mt-6" style={{ borderColor: "#d1d5db" }} /> {/* gray-300 */}
      </div>

      {/* SECTIONS */}
      <Section title="Summary" content={data.summary} />
      <Section title="Experience" content={data.experience} />
      <Section title="Education" content={data.education} />
      <Section title="Skills" content={data.skills} />
      <Section title="Languages" content={data.languages} />
      <Section title="Interests" content={data.interests} />
      <Section title="Certificates" content={data.certificates} />
      <Section title="Achievements" content={data.achievements} />
      <Section title="Projects" content={data.projects} />
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div style={{ pageBreakInside: "avoid" }}>
      <h3 className="text-xl font-semibold mb-1" style={{ color: "#1f2937" }}> {/* gray-800 */}
        {title}
      </h3>

      <p className="whitespace-pre-line" style={{ color: "#374151" }}> {/* gray-700 */}
        {content || `Add your ${title.toLowerCase()} here.`}
      </p>

      <hr className="mt-4" style={{ borderColor: "#e5e7eb" }} /> {/* gray-200 */}
    </div>
  );
}
