"use client";

import { Crown, Car, Users, Flame } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function HighlightsSection() {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: Crown,
      data: t.chunbi.highlights.items[0],
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Car,
      data: t.chunbi.highlights.items[1],
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      data: t.chunbi.highlights.items[2],
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      icon: Flame,
      data: t.chunbi.highlights.items[3],
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            {t.chunbi.highlights.title}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            {t.chunbi.highlights.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`h-16 w-16 ${highlight.bgColor} mb-4 flex items-center justify-center rounded-xl`}
              >
                <highlight.icon className={`h-8 w-8 ${highlight.iconColor}`} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {highlight.data.title}
              </h3>
              <p className="text-gray-600">{highlight.data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
