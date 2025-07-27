// 추후 다국어 지원을 위한 데이터 구조
const termsData = {
  ko: {
    title: "개인정보 제3자 제공 동의",
    preamble: `'말랑트립'(이하 '회사'라 합니다)은 원활한 서비스 제공을 위하여, 개인정보보호법 등 관련 법령에 따라 아래와 같이 개인정보를 제3자에게 제공하는 것에 대한 고객님의 동의를 받고자 합니다.`,
    sections: [
      {
        title: "1. 개인정보를 제공받는 자",
        hasTable: true,
        table: {
          headers: ["제공받는 자"],
          rows: [["제휴 파트너 기사"]],
        },
      },
      {
        title: "2. 개인정보 제공 목적 및 항목",
        hasTable: true,
        table: {
          headers: ["제공받는 자", "제공 목적", "제공하는 개인정보 항목"],
          rows: [
            [
              "제휴 파트너 기사",
              "예약 확인 및 픽업/드랍 등 투어 진행\n투어 관련 비상 연락",
              "예약자명\n연락처 (휴대전화번호)\n투어 날짜, 시간, 시작/종료 장소 정보",
            ],
          ],
        },
      },
      {
        title: "3. 개인정보의 보유 및 이용 기간",
        content: [
          "서비스 제공 완료(투어 종료) 후 즉시 파기",
          "단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우, 회사는 관계 법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.",
        ],
      },
      {
        title: "4. 동의 거부 권리 및 불이익",
        intro:
          "귀하는 위와 같은 개인정보 제3자 제공에 대한 동의를 거부할 권리가 있습니다.",
        hasImportantNotice: true,
        notice:
          "그러나 동의를 거부하실 경우, 파트너 기사에게 예약 정보가 전달되지 않아 기획여행상품의 예약 및 정상적인 서비스 제공이 불가능하여 말랑트립 서비스를 이용하실 수 없습니다.",
      },
    ],
  },
  en: {
    title: "Consent to Provide Personal Information to Third Parties",
    preamble: `'MallangTrip' (hereinafter the "Company") seeks your consent to provide personal information to third parties as described below, in accordance with the Personal Information Protection Act and other relevant laws, for the purpose of smooth service provision.`,
    sections: [
      {
        title: "1. Recipient of Personal Information",
        hasTable: true,
        table: {
          headers: ["Recipient"],
          rows: [["Affiliated Partner Driver"]],
        },
      },
      {
        title: "2. Purpose and Items of Personal Information Provided",
        hasTable: true,
        table: {
          headers: [
            "Recipient",
            "Purpose of Provision",
            "Items of Personal Information Provided",
          ],
          rows: [
            [
              "Affiliated Partner Driver",
              "Tour progression, including booking confirmation, pickup/drop-off\nEmergency contact related to the tour",
              "Booker's name\nContact number (mobile phone)\nTour date, time, start/end location information",
            ],
          ],
        },
      },
      {
        title: "3. Retention and Use Period of Personal Information",
        content: [
          "To be destroyed immediately after the completion of service provision (end of tour).",
          "However, if retention is required by the provisions of relevant laws, the Company will store member information for a certain period prescribed by those laws.",
        ],
      },
      {
        title: "4. Right to Refuse Consent and Disadvantages",
        intro:
          "You have the right to refuse consent to the provision of personal information to third parties as described above.",
        hasImportantNotice: true,
        notice:
          "However, if you refuse to consent, your booking information cannot be delivered to the partner driver, making it impossible to book the planned tour product and receive normal services. Therefore, you will be unable to use MallangTrip's services.",
      },
    ],
  },
  zh: {
    title: "个人信息第三方提供同意书",
    preamble: `"MallangTrip"（以下简称"公司"）为顺利提供服务，根据《个人信息保护法》等相关法律，就如下所述向第三方提供个人信息事宜，征求您的同意。`,
    sections: [
      {
        title: "1. 个人信息接收方",
        hasTable: true,
        table: {
          headers: ["接收方"],
          rows: [["合作司机"]],
        },
      },
      {
        title: "2. 提供个人信息的目的与项目",
        hasTable: true,
        table: {
          headers: ["接收方", "提供目的", "提供的个人信息项目"],
          rows: [
            [
              "合作司机",
              "预订确认及接送等旅游行程的进行\n旅游相关的紧急联络",
              "预订人姓名\n联系方式（手机号码）\n旅游日期、时间、开始/结束地点信息",
            ],
          ],
        },
      },
      {
        title: "3. 个人信息的持有与使用期限",
        content: [
          "服务提供完毕（旅游结束）后立即销毁。",
          "但若根据相关法律规定需要保存，公司将在相关法律规定的一定期限内保管会员信息。",
        ],
      },
      {
        title: "4. 拒绝同意的权利及不利之处",
        intro: "您有权拒绝同意上述向第三方提供个人信息的条款。",
        hasImportantNotice: true,
        notice:
          "但若您拒绝同意，预订信息将无法传递给合作司机，导致无法预订企划旅游产品及提供正常服务，因此您将无法使用MallangTrip的服务。",
      },
    ],
  },
};

export default function ThirdpartyPage() {
  // 현재는 한국어만 사용
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
