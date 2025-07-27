// 추후 다국어 지원을 위한 데이터 구조
const termsData = {
  ko: {
    title: "말랑트립 투어 서비스 이용약관",
    preamble:
      "본 약관은 공정거래위원회 국내여행 표준약관(표준약관 제10020호)을 기준으로 하되, 말랑트립(이하 '회사'라 합니다)이 제공하는 기획여행상품의 특성을 반영하여 일부 조항을 수정 및 보완하였습니다. 고객님께서는 예약 전 반드시 모든 내용을 확인하시고 동의해주시기 바랍니다.",
    articles: [
      {
        title: "제1조 (목적)",
        content:
          "본 약관은 '회사'와 여행자(이하 '회원'이라 합니다)가 체결하는 국내 기획여행상품의 계약에 있어 양 당사자의 권리와 의무에 관한 사항을 규정함을 목적으로 합니다.",
      },
      {
        title: "제2조 (용어의 정의)",
        content:
          "'기획여행상품'이라 함은 '회사'가 미리 여행 목적지 및 일정, 여행자가 제공받을 운송 서비스의 내용(이하 '여행상품'이라 합니다)을 정하고, 이에 참가하는 '회원'을 모집하여 실시하는 여행을 말합니다.",
      },
      {
        title: "제3조 (회사의 의무)",
        content:
          "'회사'는 '회원'에게 안전하고 만족스러운 여행서비스를 제공하기 위하여 여행알선 및 안내·운송 등 여행계획의 수립 및 실행과정에서 맡은 바 임무를 충실히 수행하여야 합니다.",
      },
      {
        title: "제4조 (회원의 의무)",
        content:
          "'회원'은 즐겁고 안전한 여행을 위하여 '회사'의 서비스 및 안전에 대한 안내와 요청에 협조하여야 합니다.",
      },
      {
        title: "제5조 (계약의 구성 및 중요 고지사항)",
        content:
          "① 여행 계약은 여행계약서(전자문서 포함)와 여행약관, 여행일정표(예약 시 확정된 내용)를 계약내용으로 합니다.",
        notice: {
          title: "[여행자보험 미포함에 관한 중요 고지]",
          content:
            "② 본 '여행상품'의 가격에는 여행자보험 가입 비용이 포함되어 있지 않습니다. 여행 중 발생할 수 있는 각종 사고, 질병, 상해, 휴대품 분실 및 파손 등에 대비하여 '회원'께서 직접 국내 여행자보험에 가입하실 것을 강력히 권고합니다. '회사'는 여행자보험 미가입으로 인해 발생한 피해에 대해서는 '회사'의 고의 또는 중대한 과실이 없는 한 보상 책임을 지지 않으며, 이는 '회원'께서 본 약관에 동의함으로써 인지하고 수락한 것으로 간주합니다.",
        },
      },
      {
        title: "제6조 (계약 체결의 거절)",
        content:
          "'회사'는 '회원'에게 다음 각 호의 1에 해당하는 사유가 있을 경우에는 해당 '회원'과의 계약체결을 거절할 수 있습니다.",
        list: [
          "질병, 신체이상 등 기타 사유로 여행의 원활한 수행이 어렵다고 객관적으로 판단되는 경우",
          "다른 여행자에게 폐를 끼치거나 여행의 원활한 실시에 지장이 있다고 인정될 경우",
          "예약 시 필수 정보를 허위로 기재하거나 제공하지 않은 경우",
        ],
      },
      {
        title: "제7조 (여행요금)",
        content:
          "① '여행상품'의 가격은 각 상품의 예약 페이지에 명시된 총액으로 하며, 다음 각 호의 사항을 포함하거나 포함하지 않을 수 있습니다. 이는 예약 페이지에 명확히 구분하여 고지합니다.",
        includes: [
          {
            type: "포함 내역",
            content:
              "예약된 시간 동안의 전용 차량(택시), 운전기사 용역, 유류비 등 비용",
          },
          {
            type: "불포함 내역",
            content:
              "통행료, 주차비, 관광지 입장료, '회원'의 식대 및 개인 경비, 여행자보험 가입 비용 등",
          },
        ],
        additionalContent:
          "② '회원'은 계약 시 정한 바에 따라 여행요금을 '회사'에 지급하여야 합니다.",
      },
      {
        title: "제8조 (여행 조건의 변경)",
        content:
          "① 본 '여행상품'은 '회원'의 자율성을 존중하여, 사전에 정해진 코스 내에서 '파트너 기사'와 협의하여 방문 순서나 체류 시간을 조정할 수 있습니다.",
        additionalContent: [
          "② 단, '회원'의 요청으로 계약된 총 운행 시간을 초과하는 경우, 초과 시간에 대한 추가 요금이 발생할 수 있으며 이는 '회원'이 '파트너 기사'와 직접 협의하고 현장에서 지불해야 합니다.",
          "③ '회사'는 천재지변, 현지의 교통상황, 기상 여건 등 부득이한 사유라고 객관적으로 인정되는 경우 '회원'의 동의를 얻어 여행일정, 내용 등을 변경할 수 있습니다.",
        ],
      },
      {
        title: "제9조 (손해배상)",
        content:
          "① '회사'는 '회사' 또는 그 '파트너 기사'의 고의 또는 과실로 '회원'에게 손해를 가한 경우 그 손해를 배상합니다.",
        additionalContent:
          "② '회원'의 고의 또는 과실로 '회사'나 '파트너 기사'에게 손해가 발생한 경우, '회원'은 그 손해를 배상할 책임을 집니다.",
      },
      {
        title: "제10조 (취소 및 환불 규정)",
        content:
          "① 본 '여행상품'의 취소 및 환불 규정은 다음과 같이 '회사'가 정한 특별약관이 우선 적용됩니다. '회원'은 예약 시 본 규정을 확인하고 이에 동의한 것으로 간주합니다.",
        rules: [
          "여행 시작일 기준 3일 전 23:59까지 취소 통보 시: 결제 금액 전액 환불",
          "여행 시작일 기준 2일 전 00:00 이후 취소 통보 시: 환불 불가",
        ],
        additionalContent: [
          "② 위 규정은 공정거래위원회 국내여행 표준약관의 취소수수료 규정과 다를 수 있으며, '회원'은 이에 동의하여 계약을 체결하는 것입니다.",
          "③ '회사'의 귀책사유로 여행이 취소되는 경우, '회사'는 '회원'에게 결제 금액 전액을 환불합니다.",
        ],
      },
      {
        title: "제11조 (회사의 책임 한계)",
        content:
          "① '회사'는 '회원'의 부주의로 인한 분실, 도난, 상해 등의 사고에 대하여 '회사'의 직접적인 귀책사유가 없는 한 책임을 지지 않습니다.",
        additionalContent:
          "② '회원'이 여행일정 중 개별적으로 행동하여 발생한 사고에 대하여 '회사'는 책임을 지지 않습니다.",
      },
      {
        title: "제12조 (기타 사항)",
        content:
          "본 약관에 규정되지 않은 사항은 관계 법령 및 일반적인 상관례에 따릅니다.",
      },
    ],
    addendum: {
      title: "부칙",
      content: "제1조 (시행일) 본 약관은 2025년 7월 26일부터 시행됩니다.",
    },
  },
  en: {
    title: "MallangTrip Tour Service Terms and Conditions",
    preamble: `These terms are based on the Fair Trade Commission's Standard Terms and Conditions for Domestic Travel (Standard No. 10020), with certain clauses modified or supplemented to reflect the specific characteristics of the planned tour products offered by MallangTrip (hereinafter the "Company"). Customers must review and agree to all contents before booking.`,
    articles: [
      {
        title: "Article 1 (Purpose)",
        content: `The purpose of these terms is to define the rights and obligations of both parties in the contract for domestic planned tour products concluded between the "Company" and the traveler (hereinafter the "Member").`,
      },
      {
        title: "Article 2 (Definition of Terms)",
        content: `"Planned Tour Product" refers to a tour organized by the "Company" by pre-determining the destination, itinerary, and transportation services (hereinafter the "Tour Product"), and recruiting "Members" to participate.`,
      },
      {
        title: "Article 3 (Company's Obligations)",
        content: `The "Company" shall faithfully perform its duties in planning and executing the tour, including tour arrangement, guidance, and transportation, to provide safe and satisfactory travel services to the "Member".`,
      },
      {
        title: "Article 4 (Member's Obligations)",
        content: `The "Member" shall cooperate with the "Company's" guidance and requests regarding services and safety for an enjoyable and safe trip.`,
      },
      {
        title: "Article 5 (Composition of Contract and Important Notices)",
        content: `① The travel contract consists of the travel agreement (including electronic documents), these terms and conditions, and the travel itinerary (as confirmed at the time of booking).`,
        notice: {
          title:
            "[Important Notice Regarding Non-inclusion of Traveler's Insurance]",
          content: `② The price of this "Tour Product" does not include the cost of traveler's insurance. It is strongly recommended that the "Member" purchase domestic traveler's insurance separately to prepare for potential accidents, illnesses, injuries, and loss or damage of personal belongings during the trip. The "Company" is not liable for damages arising from the failure to purchase insurance, unless caused by the "Company's" willful misconduct or gross negligence. This is deemed acknowledged and accepted by the "Member" upon agreeing to these terms.`,
        },
      },
      {
        title: "Article 6 (Refusal to Conclude a Contract)",
        content: `The "Company" may refuse to conclude a contract with a "Member" if any of the following reasons apply:`,
        list: [
          `It is objectively judged that the "Member" may have difficulty in the smooth execution of the tour due to illness, physical conditions, or other reasons.`,
          `The "Member" is deemed likely to cause inconvenience to other travelers or disrupt the smooth running of the tour.`,
          `The "Member" provides false information or fails to provide required information at the time of booking.`,
        ],
      },
      {
        title: "Article 7 (Tour Fee)",
        content: `① The price of the "Tour Product" is the total amount specified on the booking page of each product and may or may not include the following items, which will be clearly specified on the booking page:`,
        includes: [
          {
            type: "Inclusions",
            content:
              "Private vehicle (taxi) for the reserved time, driver service, fuel costs, etc.",
          },
          {
            type: "Exclusions",
            content: `Toll fees, parking fees, attraction entrance fees, "Member's" meals and personal expenses, traveler's insurance costs, etc.`,
          },
        ],
        additionalContent: `② The "Member" must pay the tour fee to the "Company" as stipulated in the contract.`,
      },
      {
        title: "Article 8 (Change of Travel Conditions)",
        content: `① This "Tour Product" respects the "Member's" autonomy, allowing for adjustments to the visit order or stay duration within the pre-determined course in consultation with the "Partner Driver".`,
        additionalContent: [
          `② However, if the total operating time is exceeded at the "Member's" request, an overtime charge may apply, which the "Member" must settle directly with the "Partner Driver" on-site.`,
          `③ The "Company" may change the travel itinerary or contents with the "Member's" consent in case of objectively recognized unavoidable circumstances such as natural disasters, local traffic conditions, or weather.`,
        ],
      },
      {
        title: "Article 9 (Indemnification)",
        content: `① The "Company" shall compensate for any damages caused to the "Member" due to the willful misconduct or negligence of the "Company" or its "Partner Driver".`,
        additionalContent: `② If the "Member" causes damage to the "Company" or the "Partner Driver" through willful misconduct or negligence, the "Member" is liable for compensating for such damages.`,
      },
      {
        title: "Article 10 (Cancellation and Refund Policy)",
        content: `① The cancellation and refund policy for this "Tour Product" is primarily governed by the following special terms set by the "Company". The "Member" is deemed to have confirmed and agreed to this policy upon booking.`,
        rules: [
          "Cancellation notice received by 23:59, 3 days before the tour start date: Full refund of the payment",
          "Cancellation notice received after 00:00, 2 days before the tour start date: No refund",
        ],
        additionalContent: [
          `② The above policy may differ from the cancellation fee regulations of the Fair Trade Commission's Standard Terms and Conditions for Domestic Travel, and the "Member" agrees to this upon concluding the contract.`,
          `③ If the tour is canceled due to the "Company's" fault, the "Company" will refund the full payment to the "Member".`,
        ],
      },
      {
        title: "Article 11 (Limitation of Company's Liability)",
        content: `① The "Company" is not responsible for accidents such as loss, theft, or injury caused by the "Member's" carelessness, unless there is direct fault of the "Company".`,
        additionalContent: `② The "Company" is not responsible for accidents that occur while the "Member" is acting individually during the tour itinerary.`,
      },
      {
        title: "Article 12 (Miscellaneous)",
        content:
          "Matters not stipulated in these terms shall be governed by relevant laws and general commercial practices.",
      },
    ],
    addendum: {
      title: "Addendum",
      content:
        "Article 1 (Effective Date) These terms shall become effective on July 26, 2025.",
    },
  },
  zh: {
    title: "MallangTrip 旅游服务条款",
    preamble: `本条款以韩国公平交易委员会的国内旅游标准条款（标准第10020号）为基础，但为反映MallangTrip（以下简称"公司"）提供的企划旅游产品的特性，部分条款已作修改和补充。顾客在预订前必须确认并同意所有内容。`,
    articles: [
      {
        title: "第1条 (目的)",
        content: `本条款旨在规定"公司"与游客（以下简称"会员"）签订的国内企划旅游产品合同中双方的权利与义务。`,
      },
      {
        title: "第2条 (术语定义)",
        content: `"企划旅游产品"是指"公司"预先确定旅游目的地、日程及游客将获得的运输服务内容（以下简称"旅游产品"），并招募"会员"参加的旅游活动。`,
      },
      {
        title: "第3条 (公司义务)",
        content: `"公司"为向"会员"提供安全、满意的旅游服务，在旅游策划、执行过程中，应忠实履行旅游咨询、引导、运输等职责。`,
      },
      {
        title: "第4条 (会员义务)",
        content: `为享受愉快、安全的旅行，"会员"应配合"公司"就服务及安全事宜提供的引导和要求。`,
      },
      {
        title: "第5条 (合同构成及重要告知事项)",
        content: `① 旅游合同以旅游合同书（含电子文件）、旅游条款、旅游日程表（预订时确定的内容）为合同内容。`,
        notice: {
          title: "[关于不包含游客保险的重要告知]",
          content: `② 本"旅游产品"价格不包含游客保险费用。为应对旅游中可能发生的各类事故、疾病、伤害、行李丢失及损坏等情况，强烈建议"会员"自行购买国内游客保险。"公司"对因未购买游客保险而造成的损失，除非是因"公司"的故意或重大过失所致，否则不承担赔偿责任。"会员"同意本条款即视为已认知并接受此项。`,
        },
      },
      {
        title: "第6条 (拒绝签订合同)",
        content: `若"会员"存在下列任一情况，"公司"可拒绝与其签订合同：`,
        list: [
          `因疾病、身体异常等原因，被客观判断为难以顺利完成旅行的。`,
          `被认为可能给其他游客造成麻烦或妨碍旅行顺利进行的。`,
          "预订时提供虚假信息或未提供必要信息的。",
        ],
      },
      {
        title: "第7条 (旅游费用)",
        content: `① "旅游产品"的价格为各产品预订页面上标明的总额，可能包含或不包含以下项目，具体将在预订页面明确告知：`,
        includes: [
          {
            type: "包含项目",
            content: "预订时间内的专用车辆（出租车）、司机服务、燃油费等。",
          },
          {
            type: "不包含项目",
            content: `过路费、停车费、景点门票、"会员"的餐费及个人开销、游客保险费用等。`,
          },
        ],
        additionalContent: `② "会员"须按合同规定向"公司"支付旅游费用。`,
      },
      {
        title: "第8条 (旅游条件变更)",
        content: `① 本"旅游产品"尊重"会员"的自主性，可在预定行程范围内与"合作司机"协商调整访问顺序或停留时间。`,
        additionalContent: [
          `② 但若因"会员"要求超出合同约定的总运行时间，可能产生超时费用，该费用须由"会员"与"合作司机"直接协商并在现场支付。`,
          `③ 因天灾、当地交通状况、天气等不可抗力因素，"公司"在征得"会员"同意后，可变更旅游日程、内容等。`,
        ],
      },
      {
        title: "第9条 (损害赔偿)",
        content: `① 因"公司"或其"合作司机"的故意或过失给"会员"造成损失的，"公司"应予以赔偿。`,
        additionalContent: `② 因"会员"的故意或过失给"公司"或"合作司机"造成损失的，"会员"应承担赔偿责任。`,
      },
      {
        title: "第10条 (取消及退款规定)",
        content: `① 本"旅游产品"的取消及退款规定优先适用"公司"制定的以下特别条款。"会员"在预订时即被视为已确认并同意本规定。`,
        rules: [
          "以旅游开始日为准，提前3天23:59前通知取消：全额退款",
          "以旅游开始日为准，提前2天00:00后通知取消：不予退款",
        ],
        additionalContent: [
          `② 以上规定可能与韩国公平交易委员会国内旅游标准条款的取消费用规定不同，"会员"签订合同即表示同意此条款。`,
          `③ 若因"公司"的责任导致旅游取消，"公司"将向"会员"全额退款。`,
        ],
      },
      {
        title: "第11条 (公司责任范围)",
        content: `① 对于因"会员"疏忽造成的物品丢失、被盗、伤害等事故，除非"公司"存在直接责任，否则"公司"不承担责任。`,
        additionalContent: `② 对于"会员"在旅游日程中单独行动时发生的事故，"公司"不承担责任。`,
      },
      {
        title: "第12条 (其他)",
        content: "本条款未尽事宜，遵照相关法律法规及一般商业惯例处理。",
      },
    ],
    addendum: {
      title: "附则",
      content: "第1条 (生效日期) 本条款自2025年7月26日起生效。",
    },
  },
};

export default function ServicePage() {
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
