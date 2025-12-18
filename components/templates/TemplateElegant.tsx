"use client";

export default function TemplateElegant({ data }: { data: Record<string, any> }) {
  return (
    <div
      className="w-full max-w-[900px] bg-white shadow-xl rounded-xl overflow-hidden"
      style={{ border: "1px solid #d1d5db" }} // gray-300
    >
      {/* HEADER */}
      <div className="text-center px-6 pt-8 pb-5">
        <h1
          className="font-bold text-3xl leading-tight"
          style={{ color: "#111827" }} // gray-900
        >
          {data.name || "John Doe"}
        </h1>

        <p className="text-lg mt-1" style={{ color: "#374151" }}> {/* gray-700 */}
          {data.title || "Software Developer"}
        </p>

        <p className="text-sm mt-1 break-all" style={{ color: "#6b7280" }}> {/* gray-500 */}
          {(data.email || "email@example.com")} • {(data.phone || "000-000-0000")}
        </p>

        <div style={{ borderBottom: "1px solid #e5e7eb", marginTop: "24px" }} /> {/* gray-200 */}
      </div>

      {/* BODY SECTIONS */}
      <div
        className="space-y-6 w-full max-w-[900px] px-10 pb-10 text-[13px] leading-[1.45]"
        style={{ color: "#1f2937" }} // gray-800
      >
        <Sec title="Summary" text={data.summary} />
        <Sec title="Experience" text={formatBullets(data.experience)} />
        <Sec title="Education" text={formatBullets(data.education)} />
        <Sec title="Skills" text={commaToBullets(data.skills)} />
        <Sec title="Languages" text={commaToBullets(data.languages)} />
        <Sec title="Interests" text={commaToBullets(data.interests)} />
        <Sec title="Certificates" text={formatBullets(data.certificates)} />
        <Sec title="Achievements" text={formatBullets(data.achievements)} />
        <Sec title="Projects" text={formatBullets(data.projects)} />
      </div>
    </div>
  );
}

/* Section Block */
function Sec({ title, text }: { title: string; text: string }) {
  if (!text) return null;
  return (
    <div style={{ pageBreakInside: "avoid" }}>
      <h3
        className="text-[16px] font-semibold mb-1 underline underline-offset-[3px]"
        style={{ color: "#111827" }} // gray-900
      >
        {title}
      </h3>
      <p style={{ color: "#1f2937", whiteSpace: "pre-line" }}> {/* gray-800 */}
        {text}
      </p>
    </div>
  );
}

/* Convert comma values → bullets */
function commaToBullets(str?: string) {
  if (!str) return "";
  return str
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => `• ${s}`)
    .join("\n");
}

/* Preserve bullets or convert paragraphs to bullets */
function formatBullets(str?: string) {
  if (!str) return "";
  if (str.includes("•")) {
    return str.replace(/\n{2,}/g, "\n").replace(/•\s*/g, "• ");
  }
  return str
    .split(/\n+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => `• ${s}`)
    .join("\n");
}
