"use client";

import { termsData } from "./termsData";
import { useTranslation } from "@/hooks/use-translation";

export default function PrivacyPage() {
  const { t, lang } = useTranslation();
  const currentLang =
    lang === "ko" || lang === "en" || lang === "zh" ? lang : "ko";
  const data = termsData[currentLang];
  const policyText = t.policy.privacy;

  return (
    <div className="bg-gray-50 font-sans leading-relaxed text-gray-900 antialiased">
      <main className="mt-16">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-xl bg-white px-6 py-12 shadow-md">
            {/* 제목 */}
            <h1 className="mb-10 text-center text-3xl leading-tight font-bold text-black md:text-5xl">
              {data.title}
            </h1>

            {/* 전문 */}
            <div className="mb-10 rounded-lg bg-blue-50 px-5 py-4 text-sm">
              <p className="text-gray-700">{policyText.preamble}</p>
            </div>

            {/* 섹션들 */}
            <div className="space-y-10">
              {data.sections.map((section, index) => (
                <article key={index}>
                  <h3 className="mb-4 text-lg leading-tight font-bold text-black">
                    {section.title}
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    {section.intro && (
                      <p className="leading-relaxed break-keep">
                        {section.intro}
                      </p>
                    )}

                    {/* 리스트 */}
                    {section.list && (
                      <ul className="ml-5 list-disc space-y-2">
                        {section.list.map((item, idx) => (
                          <li key={idx} className="leading-relaxed break-keep">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* 테이블 */}
                    {section.hasTable && section.table && (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr>
                              {section.table.headers.map((header, idx) => (
                                <th
                                  key={idx}
                                  className="border border-gray-300 bg-gray-50 px-4 py-3 text-left font-semibold"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, rowIdx) => (
                              <tr key={rowIdx}>
                                {row.map((cell, cellIdx) => {
                                  // 첫 번째 셀이고 빈 문자열인 경우 rowspan 처리
                                  if (
                                    cellIdx === 0 &&
                                    cell === "" &&
                                    rowIdx > 0
                                  ) {
                                    return null; // 빈 셀은 렌더링하지 않음
                                  }

                                  // 첫 번째 행의 첫 번째 셀에 rowspan 적용 (전자상거래법 관련)
                                  if (
                                    cellIdx === 0 &&
                                    rowIdx === 0 &&
                                    section.title.includes("보유")
                                  ) {
                                    return (
                                      <td
                                        key={cellIdx}
                                        rowSpan={3}
                                        className="border border-gray-300 px-4 py-3 align-top"
                                      >
                                        {cell}
                                      </td>
                                    );
                                  }

                                  return (
                                    <td
                                      key={cellIdx}
                                      className="border border-gray-300 px-4 py-3"
                                    >
                                      {cellIdx === 0 && cell === "필수" ? (
                                        <strong>{cell}</strong>
                                      ) : (
                                        cell
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* 테이블 주석 */}
                    {section.note && (
                      <p className="text-sm leading-relaxed break-keep text-gray-600">
                        {section.note}
                      </p>
                    )}

                    {/* 중요 고지사항 */}
                    {section.hasImportantNotice && section.notice && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4">
                        <p className="text-sm leading-relaxed font-medium break-keep text-red-800">
                          {section.notice}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
