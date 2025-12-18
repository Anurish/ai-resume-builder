"use client";

import Image from "next/image";

export default function TemplateSkillBased({ data = {} }: { data?: Record<string, any> }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        background: "#ffffff",
        display: "grid",
        gridTemplateColumns: "270px 1fr",
        borderRadius: "16px",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside
        style={{
          background: "#1F2E3D",
          color: "white",
          padding: "38px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {/* IMAGE */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data.photo ? (
            <Image
              src={data.photo}
              width={120}
              height={120}
              alt="photo"
              style={{
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "4px solid white",
              }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
              }}
            ></div>
          )}
        </div>

        {/* NAME + TITLE */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "4px" }}>
            {data.name || "John Doe"}
          </h1>
          <p style={{ fontSize: "13px", color: "#dce3eb" }}>
            {data.title || "Business Development Consultant"}
          </p>
        </div>

        {/* PHONE */}
        <section>
          <h3 style={leftLabel}>Phone</h3>
          <p style={leftText}>{data.phone || "+1 000 000 0000"}</p>
        </section>

        {/* SKILLS */}
        {data.skills && (
          <section>
            <h3 style={leftLabel}>Skills</h3>
            <ul style={leftBullets}>
              {data.skills.split(",").map((s, i) => (
                <li key={i}>• {s.trim()}</li>
              ))}
            </ul>
          </section>
        )}

        {/* LANGUAGES */}
        {data.languages && (
          <section>
            <h3 style={leftLabel}>Languages</h3>
            <ul style={leftBullets}>
              {data.languages.split(",").map((s, i) => (
                <li key={i}>• {s.trim()}</li>
              ))}
            </ul>
          </section>
        )}

        {/* INTERESTS */}
        {data.interests && (
          <section>
            <h3 style={leftLabel}>Interests</h3>
            <ul style={leftBullets}>
              {data.interests.split(",").map((s, i) => (
                <li key={i}>• {s.trim()}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* RIGHT SIDE CONTENT */}
      <div
        style={{
          padding: "40px 48px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          boxSizing: "border-box",
        }}
      >
        <RightSection title="Profile Summary" content={data.summary} />
        <RightSection title="Professional Experience" content={data.experience} />
        <RightSection title="Education" content={data.education} />
        <RightSection title="Certificates" content={data.certificates} />
        <RightSection title="Achievements" content={data.achievements} />
        <RightSection title="Projects" content={data.projects} />
      </div>
    </div>
  );
}

/* LEFT Sidebar label style */
const leftLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase",
  opacity: 0.65,
  marginBottom: "4px",
  letterSpacing: "0.5px",
};

const leftText: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "20px",
};

const leftBullets: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "20px",
  listStyle: "none",
  paddingLeft: 0,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

/* RIGHT SECTIONS */
function RightSection({ title, content }: { title: string; content: string }) {
  if (!content) return null;

  // Split into bullet lines for readability
  const lines = content
    .split(/\n{2,}|\n|•/g)
    .map((l) => l.trim())
    .filter((l) => l);

  return (
    <div style={{ breakInside: "avoid" }}>
      <h2
        style={{
          fontSize: "17px",
          fontWeight: 700,
          color: "#1F2E3D",
          marginBottom: "6px",
        }}
      >
        {title}
      </h2>

      {lines.map((line, i) => (
        <p
          key={i}
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            marginBottom: "4px",
            whiteSpace: "pre-line",
          }}
        >
          • {line}
        </p>
      ))}
    </div>
  );
}
