"use client";

import { Crown, Car, Users, Grape } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const iconConfig = [
  {
    icon: Crown,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Car,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Grape,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
];

export default function HighlightsSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            {t.jookhwa.highlights.title}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            {t.jookhwa.highlights.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {t.jookhwa.highlights.items.map((highlight, index) => {
            const config = iconConfig[index];
            return (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`h-16 w-16 ${config.bgColor} mb-4 flex items-center justify-center rounded-xl`}
                >
                  <config.icon className={`h-8 w-8 ${config.iconColor}`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
