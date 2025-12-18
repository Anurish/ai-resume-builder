"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const templates = [
  {
    id: 1,
    name: "Modern Resume",
    desc: "Best for software, startups,年轻 professionals",
    image: "/templates/modern.png",
  },
  {
    id: 2,
    name: "Elegant Resume",
    desc: "Clean and professional for corporate roles",
    image: "/templates/elegant.png",
  },
  {
    id: 3,
    name: "Skill-Based Resume",
    desc: "Perfect for freshers & career switchers",
    image: "/templates/skill.png",
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 px-6 lg:px-20 py-16">
      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900">
          Choose a Resume Template
        </h1>
        <p className="text-gray-600 mt-3">
          Preview professionally designed templates. Login to start editing.
        </p>
      </div>

      {/* TEMPLATE GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border"
          >
            {/* Preview */}
            <div className="relative h-[420px] bg-gray-100">
              <Image
                src={tpl.image}
                alt={tpl.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {tpl.name}
              </h3>
              <p className="text-sm text-gray-600">{tpl.desc}</p>

              <button
                onClick={() =>
                  router.push(`/login?redirect=/resume/new&template=${tpl.id}`)
                }
                className="mt-4 w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                Use This Template →
              </button>

              <p className="text-xs text-center text-gray-500">
                Sign-in required
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 bg-blue-600 rounded-xl text-white py-12 text-center">
        <h2 className="text-2xl font-semibold">
          Build your resume in minutes
        </h2>
        <p className="text-sm text-blue-100 mt-2">
          ATS-friendly • Instant PDF • Public resume link
        </p>

        <button
          onClick={() => router.push("/login")}
          className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition"
        >
          Get Started Free
        </button>
      </div>
    </main>
  );
}
