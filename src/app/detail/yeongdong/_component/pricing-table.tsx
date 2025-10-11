"use client";

import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";

interface PricingRow {
  people: string;
  total: number;
  perPerson: number;
  vehicle: string;
}

interface PricingTableProps {
  heading: string;
  subheading: string;
  rows: PricingRow[];
}

export default function PricingTable({
  heading,
  subheading,
  rows,
}: PricingTableProps) {
  const { lang } = useTranslation();
  return (
    <section className="rounded-2xl bg-slate-900 px-4 py-8 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-2 text-3xl font-light">{heading}</h2>
        <p className="text-amber-200">{subheading}</p>
      </div>
      <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-lg bg-white text-slate-900 shadow-xl">
        <div className="bg-amber-400 p-6 text-center">
          <h3 className="text-2xl font-medium text-slate-900">
            {lang === "ko"
              ? "영동 와이너리 프라이빗 투어"
              : "Yeongdong Winery Private Tour"}
          </h3>
          <p className="text-slate-800">
            {lang === "ko"
              ? "모든 체험, 시음, 차량 서비스, 점심 식사 포함"
              : "All experiences, tastings, vehicle service, and lunch included"}
          </p>
        </div>
        <table className="w-full table-fixed border-collapse">
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.people}
                className="border-b text-center last:border-b-0"
              >
                <td className="w-1/4 bg-slate-50 p-4 text-lg font-medium">
                  {row.people}
                </td>
                <td className="w-2/4 p-4">
                  <div className="text-xl font-semibold text-slate-900">
                    {formatPrice(row.total, lang as "ko" | "en")}
                  </div>
                  <div className="text-sm text-slate-600">
                    {lang === "ko" ? "1인당 " : "Per person "}
                    {formatPrice(row.perPerson, lang as "ko" | "en")}
                  </div>
                </td>
                <td className="w-1/4 p-4 text-slate-600">{row.vehicle}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-slate-50 p-4 text-center text-sm text-slate-600">
          {lang === "ko" ? (
            <>
              * 9인 이상 단체는 별도 문의 바랍니다
              <br />* 인원이 많을수록 1인당 요금이 저렴해집니다
            </>
          ) : (
            <>
              * For groups of 9 or more, please contact us separately
              <br />* The more people, the lower the per-person rate
            </>
          )}
        </div>
      </div>
    </section>
  );
}
