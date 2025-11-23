"use client";

import { Clock, MapPin, Wine, HeartPulse } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function ItinerarySection() {
  const { t } = useTranslation();

  const itineraryItems = [
    {
      icon: MapPin,
      color: "bg-blue-500",
    },
    {
      icon: Wine,
      color: "bg-emerald-500",
    },
    {
      icon: HeartPulse,
      color: "bg-pink-500",
    },
    {
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            {t.sinabro.itinerary.title}
          </h2>
          <p className="text-gray-600">{t.sinabro.itinerary.subtitle}</p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 bottom-8 left-8 w-1 bg-emerald-200" />

            {itineraryItems.map((item, index) => (
              <div
                key={index}
                className="relative mb-12 flex items-start last:mb-0"
              >
                {/* Timeline dot */}
                <div
                  className={`${item.color} z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg`}
                >
                  <item.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="ml-8 flex-1 rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-2 flex flex-col items-start md:flex-row md:items-center">
                    <span className="mr-4 text-lg font-semibold text-emerald-600">
                      {t.sinabro.itinerary.items[index].time}
                    </span>
                    <h3 className="text-xl font-semibold">
                      {t.sinabro.itinerary.items[index].title}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    {t.sinabro.itinerary.items[index].description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
