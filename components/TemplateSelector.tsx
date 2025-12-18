"use client";

interface Props {
  selected: string;
  onSelect: (template: string) => void;
}

export default function TemplateSelector({ selected, onSelect }: Props) {
  const templates = [
    { id: "modern", label: "Modern" },
    { id: "elegant", label: "Elegant" },
    { id: "skillbased", label: "Skill-Based" },
  ];

  return (
    <div className="flex gap-3 mb-6">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`px-6 py-2 rounded-md text-sm font-medium border transition ${
            selected === t.id
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
