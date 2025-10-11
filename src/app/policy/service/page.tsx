"use client";

import { termsData } from "./termsData";
import { useTranslation } from "@/hooks/use-translation";

export default function ServicePage() {
  const { lang } = useTranslation();
  const currentLang = lang === "ko" || lang === "en" ? lang : "ko";
  const data = termsData[currentLang];

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
              <p className="text-gray-700">{data.preamble}</p>
            </div>

            {/* 조항들 */}
            <div className="space-y-8">
              {data.articles.map((article, index) => (
                <article key={index}>
                  <h3 className="mb-4 text-lg leading-tight font-bold text-black">
                    {article.title}
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed break-keep">
                      {article.content}
                    </p>

                    {/* 중요 고지사항 */}
                    {article.notice && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4">
                        <h4 className="mb-2 text-base font-bold text-red-800">
                          {article.notice.title}
                        </h4>
                        <p className="text-sm leading-relaxed break-keep text-red-800">
                          {article.notice.content}
                        </p>
                      </div>
                    )}

                    {/* 순서가 있는 목록 */}
                    {article.list && (
                      <ol className="ml-5 list-decimal space-y-2">
                        {article.list.map((item, idx) => (
                          <li key={idx} className="leading-relaxed break-keep">
                            {item}
                          </li>
                        ))}
                      </ol>
                    )}

                    {/* 포함/불포함 항목 */}
                    {article.includes && (
                      <ul className="ml-5 list-disc space-y-2">
                        {article.includes.map((item, idx) => (
                          <li key={idx} className="leading-relaxed break-keep">
                            <strong className="text-gray-900">
                              {item.type}:
                            </strong>{" "}
                            {item.content}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* 환불 규정 리스트 */}
                    {article.rules && (
                      <ul className="ml-5 list-disc space-y-2">
                        {article.rules.map((rule, idx) => (
                          <li key={idx} className="leading-relaxed break-keep">
                            {rule}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* 추가 내용 */}
                    {article.additionalContent && (
                      <>
                        {Array.isArray(article.additionalContent) ? (
                          article.additionalContent.map((content, idx) => (
                            <p key={idx} className="leading-relaxed break-keep">
                              {content}
                            </p>
                          ))
                        ) : (
                          <p className="leading-relaxed break-keep">
                            {article.additionalContent}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* 부칙 */}
            <section className="mt-15 border-t border-gray-200 pt-6">
              <h3 className="mb-4 text-lg font-bold text-black">
                {data.addendum.title}
              </h3>
              <div className="text-sm text-gray-600">
                <p className="leading-relaxed break-keep">
                  <strong className="text-gray-900">
                    {data.addendum.content}
                  </strong>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
