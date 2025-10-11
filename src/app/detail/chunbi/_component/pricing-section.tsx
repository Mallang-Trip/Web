"use client";

import { Check, X } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";

export default function PricingSection() {
  const { t, lang } = useTranslation();

  const includedItems = t.chunbi.pricing.includedItems;
  const excludedItems = t.chunbi.pricing.excludedItems;

  const pricingData = [
    {
      people: lang === "ko" ? "2~5인" : "2-5 people",
      totalKRW: 300000,
      perPersonKRW: 60000,
      suffix: lang === "ko" ? " ~" : "+",
    },
    {
      people: lang === "ko" ? "6인" : "6 people",
      totalKRW: 360000,
      perPersonKRW: 60000,
      suffix: "",
    },
    {
      people: lang === "ko" ? "7인" : "7 people",
      totalKRW: 420000,
      perPersonKRW: 60000,
      suffix: "",
    },
    {
      people: lang === "ko" ? "8인" : "8 people",
      totalKRW: 480000,
      perPersonKRW: 60000,
      suffix: "",
    },
    {
      people: lang === "ko" ? "9인" : "9 people",
      totalKRW: 540000,
      perPersonKRW: 60000,
      suffix: "",
    },
    {
      people: lang === "ko" ? "10인" : "10 people",
      totalKRW: 600000,
      perPersonKRW: 60000,
      suffix: "",
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-4">
        {/* Included/Excluded */}
        <div className="mx-auto mb-24 max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            {t.chunbi.pricing.inclusionTitle}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Included */}
            <div className="rounded-xl bg-emerald-50 p-6">
              <h3 className="mb-6 flex items-center text-xl font-semibold text-emerald-800">
                <Check className="mr-2 h-6 w-6" />
                {t.chunbi.pricing.includedTitle}
              </h3>
              <ul className="space-y-3">
                {includedItems.map((item, index) => (
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
                {t.chunbi.pricing.excludedTitle}
              </h3>
              <ul className="space-y-3">
                {excludedItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <X className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-red-600" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            {t.chunbi.pricing.title}
          </h2>

          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="bg-emerald-500 p-4 text-white">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-semibold">
                  {t.chunbi.pricing.table.people}
                </div>
                <div className="text-center font-semibold">
                  {t.chunbi.pricing.table.total}
                </div>
                <div className="text-right font-semibold">
                  {t.chunbi.pricing.table.perPerson}
                </div>
              </div>
            </div>

            {pricingData.map((row, index) => (
              <div
                key={index}
                className={`border-b border-gray-100 p-4 last:border-b-0 ${index === 0 ? "bg-emerald-50" : ""}`}
              >
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="font-medium">{row.people}</div>
                  <div className="text-center text-lg font-semibold whitespace-nowrap text-emerald-600">
                    {lang === "ko"
                      ? `${formatPrice(row.totalKRW, "ko")}`
                      : `${formatPrice(row.totalKRW, "en")}`}
                  </div>
                  <div className="text-right text-gray-600">
                    {lang === "ko"
                      ? `${formatPrice(row.perPersonKRW, "ko")}${row.suffix}`
                      : `${formatPrice(row.perPersonKRW, "en")}${row.suffix}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">{t.chunbi.pricing.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
