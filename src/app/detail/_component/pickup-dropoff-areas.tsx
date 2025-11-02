"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface PickupDropoffAreasSectionProps {
  includedItems: string[];
  excludedItems: string[];
}

export default function PickupDropoffAreasSection({
  includedItems,
  excludedItems,
}: PickupDropoffAreasSectionProps) {
  const { t } = useTranslation();
  const tData = t.common.detail.pickupDropoff;

  return (
    <section className="mx-auto">
      <Card className="overflow-hidden rounded-2xl">
        <CardContent className="p-8 md:p-12">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 md:text-4xl">
              {tData.title}
            </CardTitle>
            <CardDescription className="mt-3 text-gray-600">
              {tData.description}
            </CardDescription>
          </div>

          {/* Available Areas Section */}
          <div className="mb-10">
            <h3 className="mb-5 flex items-center text-xl font-semibold text-gray-800">
              <svg
                className="mr-3 h-6 w-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {tData.availableAreas}
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="rounded-lg bg-gray-50 p-4">
                <strong>{tData.incheonSeoul}</strong> {tData.incheonSeoulDesc}
              </p>
              <p className="rounded-lg bg-yellow-50 p-4 text-yellow-800">
                <strong>{tData.daejeonSejong}</strong> {tData.daejeonSejongDesc}
              </p>

              {/* Collapsible section for Gyeonggi-do */}
              <details className="rounded-lg bg-gray-50 transition-all duration-300">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold [&::-webkit-details-marker]:hidden">
                  <span>
                    <strong>{tData.gyeonggiSouth}</strong>
                  </span>
                  <svg
                    className="arrow-down h-5 w-5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </summary>
                <div className="border-t border-gray-200 p-4">
                  <p className="text-sm text-gray-600">
                    {tData.gyeonggiSouthCities}
                  </p>
                </div>
              </details>
            </div>
          </div>

          {/* Policy & Recommendations Section */}
          <div>
            <h3 className="mb-5 flex items-center text-xl font-semibold text-gray-800">
              <svg
                className="mr-3 h-6 w-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {tData.noticeTitle}
            </h3>
            <div
              className="rounded-r-lg border-l-4 border-indigo-500 bg-indigo-50 p-6 text-indigo-800"
              role="alert"
            >
              <p className="mb-2 font-bold">{tData.noticeAlertTitle}</p>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  {tData.notice1}
                  <strong className="font-semibold">{tData.notice1Bold}</strong>
                  {tData.notice1End}
                </li>
                <li>
                  {tData.notice2}
                  <strong className="font-semibold">{tData.notice2Bold}</strong>
                  {tData.notice2End}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Included */}
            <div className="rounded-xl bg-emerald-50 p-6">
              <h3 className="mb-6 flex items-center text-xl font-semibold text-emerald-800">
                <Check className="mr-2 h-6 w-6" />
                {tData.included}
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
                {tData.excluded}
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
        </CardContent>
      </Card>
    </section>
  );
}
