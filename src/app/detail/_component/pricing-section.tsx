"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

interface PricingSectionProps {
  pricingItems: {
    item: string;
    description: string;
    payment: string;
    amount: string;
  }[];
}

export default function PricingSection({ pricingItems }: PricingSectionProps) {
  const { t } = useTranslation();

  return (
    <Card className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          {t.common.detail.pricing.title}
        </CardTitle>

        <CardContent className="px-0">
          <div className="md:overflow-hidden md:rounded-lg md:border md:border-gray-200 md:bg-white md:shadow-sm">
            <table className="w-full table-fixed border-collapse text-left">
              <thead className="hidden bg-gray-50 md:table-header-group">
                <tr>
                  <th className="w-1/5 px-6 py-4 font-semibold text-gray-900">
                    {t.common.detail.pricing.item}
                  </th>
                  <th className="w-2/5 px-6 py-4 font-semibold text-gray-900">
                    {t.common.detail.pricing.description}
                  </th>
                  <th className="w-1/5 px-6 py-4 font-semibold text-gray-900">
                    {t.common.detail.pricing.paymentMethod}
                  </th>
                  <th className="w-1/5 px-6 py-4 text-right font-semibold text-gray-900">
                    {t.common.detail.pricing.amount}
                  </th>
                </tr>
              </thead>
              <tbody className="block divide-y divide-gray-200 md:table-row-group">
                {pricingItems.map((item, index) => (
                  <tr
                    key={index}
                    className={`mb-2 block w-full overflow-hidden rounded-lg border border-gray-300 md:mb-0 md:table-row md:overflow-visible md:rounded-none md:border-0 ${index % 2 === 1 ? "md:bg-gray-50" : "md:bg-white"} `}
                  >
                    <td
                      data-label={t.common.detail.pricing.item}
                      className="flex w-full items-center justify-between border-none px-4 py-3 text-left font-medium before:font-semibold before:content-[attr(data-label)] md:table-cell md:border-0 md:px-6 md:py-4 md:text-sm md:before:content-none"
                    >
                      {item.item}
                    </td>
                    <td
                      data-label={t.common.detail.pricing.description}
                      className="flex w-full items-center justify-between border-none px-4 py-3 text-left text-sm text-gray-600 before:text-base before:font-semibold before:text-gray-900 before:content-[attr(data-label)] md:table-cell md:border-0 md:px-6 md:py-4 md:text-sm md:before:content-none"
                    >
                      {item.description}
                    </td>
                    <td
                      data-label={t.common.detail.pricing.paymentMethod}
                      className="flex w-full items-center justify-between border-none px-4 py-3 text-left text-gray-600 before:font-semibold before:text-gray-900 before:content-[attr(data-label)] md:table-cell md:border-0 md:px-6 md:py-4 md:text-sm md:before:content-none"
                    >
                      {item.payment}
                    </td>
                    <td
                      data-label={t.common.detail.pricing.amount}
                      className="flex w-full items-center justify-between border-none px-4 py-3 text-right font-bold before:font-semibold before:text-gray-900 before:content-[attr(data-label)] md:table-cell md:border-0 md:px-6 md:py-4 md:text-right md:text-sm md:before:content-none"
                    >
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
