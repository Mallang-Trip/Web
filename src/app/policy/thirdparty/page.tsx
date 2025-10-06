import { termsData } from "./termsData";

export default function ThirdpartyPage() {
  const currentLang = "ko";
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
              <p className="text-gray-700">
                <strong>&apos;말랑트립&apos;</strong>(이하 &apos;회사&apos;라
                합니다)은 원활한 서비스 제공을 위하여, 개인정보보호법 등 관련
                법령에 따라 아래와 같이 개인정보를 제3자에게 제공하는 것에 대한
                고객님의 동의를 받고자 합니다.
              </p>
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

                    {/* 텍스트 컨텐츠 */}
                    {section.content && (
                      <div className="space-y-2">
                        {section.content.map((paragraph, idx) => (
                          <p key={idx} className="leading-relaxed break-keep">
                            {paragraph}
                          </p>
                        ))}
                      </div>
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
                                {row.map((cell, cellIdx) => (
                                  <td
                                    key={cellIdx}
                                    className="border border-gray-300 px-4 py-3 align-middle"
                                  >
                                    {/* 줄바꿈이 있는 셀 처리 */}
                                    {cell.includes("\n")
                                      ? cell
                                          .split("\n")
                                          .map((line, lineIdx) => (
                                            <div key={lineIdx}>
                                              {line.startsWith("•")
                                                ? line
                                                : `• ${line}`}
                                            </div>
                                          ))
                                      : cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
