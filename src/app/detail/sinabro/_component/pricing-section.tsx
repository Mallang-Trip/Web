"use client";

import { Check, X } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";

export default function PricingSection() {
  const { t, lang } = useTranslation();

  const pricingData = [
    { people: 2, total: 350000, perPerson: 175000 },
    { people: 3, total: 400000, perPerson: 133333 },
    { people: 4, total: 450000, perPerson: 112500 },
    { people: 5, total: 650000, perPerson: 130000 },
    { people: 6, total: 700000, perPerson: 116667 },
    { people: 7, total: 750000, perPerson: 107143 },
    { people: 8, total: 800000, perPerson: 100000 },
    { people: 9, total: 850000, perPerson: 94444 },
    { people: 10, total: null, perPerson: 0 },
  ];

  return (
    <section>
      <div className="container mx-auto px-4">
        {/* Included/Excluded */}
        <div className="mx-auto mb-24 max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            {t.sinabro.pricing.inclusionTitle}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Included */}
            <div className="rounded-xl bg-emerald-50 p-6">
              <h3 className="mb-6 flex items-center text-xl font-semibold text-emerald-800">
                <Check className="mr-2 h-6 w-6" />
                {t.sinabro.pricing.includedTitle}
              </h3>
              <ul className="space-y-3">
                {t.sinabro.pricing.includedItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded */}
            <div className="rounded-xl bg-red-50 p-6">
              <h3 className="mb-6 flex items-center text-xl font-semibold text-red-800">
                <X className="mr-2 h-6 w-6" />
                {t.sinabro.pricing.excludedTitle}
              </h3>
              <ul className="space-y-3">
                {t.sinabro.pricing.excludedItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <X className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-red-600" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pickup/Drop-off Notice */}
          <div className="mx-auto mt-8 rounded-xl bg-blue-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-blue-800">
              {t.sinabro.pricing.pickupTitle}
            </h3>
            <div className="space-y-2 text-gray-700">
              <p
                dangerouslySetInnerHTML={{
                  __html: t.sinabro.pricing.pickupInfo.basic,
                }}
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: t.sinabro.pricing.pickupInfo.additional,
                }}
              />
              <p
                className="mt-3 rounded-lg bg-white p-3 text-sm text-blue-600"
                dangerouslySetInnerHTML={{
                  __html: t.sinabro.pricing.pickupInfo.notice,
                }}
              />
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            {t.sinabro.pricing.title}
          </h2>

          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="bg-emerald-500 p-4 text-white">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-semibold">
                  {t.sinabro.pricing.table.people}
                </div>
                <div className="text-center font-semibold">
                  {t.sinabro.pricing.table.total}
                </div>
                <div className="text-right font-semibold">
                  {t.sinabro.pricing.table.perPerson}
                </div>
              </div>
            </div>

            {pricingData.map((row, index) => (
              <div
                key={index}
                className={`border-b border-gray-100 p-4 last:border-b-0 ${index === 0 ? "bg-emerald-50" : ""}`}
              >
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="font-medium">
                    {t.sinabro.peopleOptions[index].label}
                  </div>
                  <div className="text-center text-lg font-semibold whitespace-nowrap text-emerald-600">
                    {row.total
                      ? formatPrice(row.total, lang as "ko" | "en")
                      : lang === "ko"
                        ? "별도 문의"
                        : "Contact us"}
                  </div>
                  <div className="text-right text-gray-600">
                    {formatPrice(row.perPerson, lang as "ko" | "en")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">{t.sinabro.pricing.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
