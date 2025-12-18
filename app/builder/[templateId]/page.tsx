"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ResumeBuilder() {
  const { templateId } = useParams();

  useEffect(() => {
    console.log("Loaded builder for:", templateId);
  }, [templateId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>
      <p className="text-gray-600">
        Currently editing: <span className="font-semibold">{templateId}</span>
      </p>
      {/* Later: load the selected resume layout dynamically here */}
    </div>
  );
}
