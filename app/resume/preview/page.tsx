"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

import TemplateModern from "@/components/templates/TemplateModern";
import TemplateElegant from "@/components/templates/TemplateElegant";
import TemplateSkillBased from "@/components/templates/TemplateSkillBased";
import { cleanLabColors } from "@/lib/html2canvas-fix";

export default function PreviewPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const componentRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any>(null);
  const [template, setTemplate] = useState<number | null>(null);
  const [margin, setMargin] = useState(true);
  const [html2pdf, setHtml2pdf] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const publicUrl =
    session?.user?.publicId ? `${baseUrl}/r/${session.user.publicId}` : null;

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // -----------------------------------------------------
  // LOAD RESUME FROM DATABASE INSTEAD OF LOCALSTORAGE
  // -----------------------------------------------------
 useEffect(() => {
  async function loadFromDB() {
    if (!session?.user?.email) return;

    const res = await fetch("/api/get-resume", {
      cache: "no-store",
    });

    const json = await res.json();

   if (json?.success && json.resumeData) {
  setData(json.resumeData);
  setTemplate(json.resumeTemplate);
  return;
}


    // No resume → redirect to builder
    router.push("/resume/new");
  }

  loadFromDB();
}, [session, router]);


  // Dynamically load html2pdf
  useEffect(() => {
    import("html2pdf.js").then((mod) => setHtml2pdf(() => mod.default));
  }, []);

  // -----------------------------------------------------
  // AUTO-SAVE TO DB AFTER DATA IS LOADED
  // -----------------------------------------------------
  useEffect(() => {
    async function autoSave() {
      if (!session?.user?.email || !data || !template) return;

      await fetch("/api/save-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          resumeData: data,
          resumeTemplate: template,
        }),
      });

      console.log("Resume auto-saved to DB");
    }

    autoSave();
  }, [session, data, template]);

  // Generate PDF
  const generatePDF = () => {
    return new Promise<void>((resolve, reject) => {
      if (!componentRef.current || !html2pdf)
        return reject("html2pdf not loaded");

      const opt = {
        margin: 10,
        filename: `${data?.name || "resume"}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#fff" },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      requestAnimationFrame(() => {
        cleanLabColors(); // Lab() fix before PDF

        setTimeout(() => {
          html2pdf()
            .from(componentRef.current)
            .set(opt)
            .save()
            .then(resolve)
            .catch(reject);
        }, 200);
      });
    });
  };

  // Download handler
  const handleDownload = async () => {
    if (!session?.user?.email || !html2pdf || isDownloading) return;

    setIsDownloading(true);

    await generatePDF();
    setIsDownloading(false);
  };

  if (!data || !template)
    return <p className="text-center py-20">Loading...</p>;

  const Template =
    template === 1
      ? TemplateModern
      : template === 2
      ? TemplateElegant
      : TemplateSkillBased;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col gap-6 items-center">
      <div className="flex flex-wrap gap-4 no-print">
        <button
          onClick={() => router.push(`/resume/new?template=${template}`)}
          className="px-5 py-2 bg-gray-700 text-white rounded-md"
        >
          Edit Resume
        </button>

        <button
          onClick={handleDownload}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
          disabled={isDownloading || !html2pdf}
        >
          {isDownloading ? "Downloading..." : "Download PDF"}
        </button>

        <button
          onClick={() => setMargin(!margin)}
          className="px-5 py-2 bg-purple-600 text-white rounded-md"
        >
          {margin ? "Remove Margin" : "Add Margin"}
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-5 py-2 bg-blue-600 text-white rounded-md"
        >
          Dashboard
        </button>
      </div>

      {/* Resume Preview */}
      <div className="w-full flex justify-center bg-gray-50 py-6">
        <div
          ref={componentRef}
          className="bg-white shadow-2xl"
          style={{
            width: "794px",
            minHeight: "1123px",
            padding: margin ? "40px" : "0px",
          }}
        >
          <Template data={data} />
        </div>

        {/* QR OUTSIDE (NOT included in PDF) */}
        {publicUrl && (
          <div className="no-print mt-6 flex flex-col items-end pr-10">
            <QRCodeCanvas value={publicUrl} size={120} />
            <p className="text-gray-500 text-sm mt-2">
              Scan to view this resume online
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
