"use client";

import { use, useEffect, useState } from "react";
import TemplateModern from "@/components/templates/TemplateModern";
import TemplateElegant from "@/components/templates/TemplateElegant";
import TemplateSkillBased from "@/components/templates/TemplateSkillBased";

export default function PublicResumePage(props: any) {
  const { id } = use(props.params); // << FIX: unwrap params safely

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/public-resume?id=${id}`, {
        cache: "no-store",
      });

      const data = await res.json();
      if (data?.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    }

    fetchData();
  }, [id]);

  if (user === null)
    return <p className="text-center py-20">Resume not found</p>;

  const Template =
    user.resumeTemplate === 1 ? TemplateModern :
    user.resumeTemplate === 2 ? TemplateElegant :
    TemplateSkillBased;

  return (
    <div className="flex justify-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white shadow-xl p-6" style={{ width: "800px" }}>
        <Template data={user.resumeData} />
      </div>
    </div>
  );
}
