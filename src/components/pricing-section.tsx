import { Card, CardContent, CardTitle } from "./ui/card";

export default function PricingSection() {
  const pricingItems = [
    {
      item: "기본 대절 (9시간)",
      description: "제주 전지역 / 전용 기사 / 유류비 포함",
      payment: "선결제 (온라인)",
      amount: "₩ 190,000",
    },
    {
      item: "야간 운행",
      description: "18:00 이후 ~ 22:00 이전 종료",
      payment: "현장 카드 결제",
      amount: "+ ₩ 10,000",
    },
    {
      item: "휴식 시간 4시간",
      description: "이용 시간을 잠시 멈추고 기사님과 4시간 후에 뵙기",
      payment: "현장 카드 결제",
      amount: "+ ₩ 30,000",
    },
    {
      item: "시간 추가",
      description: "기본 9시간 초과 시",
      payment: "현장 카드 결제",
      amount: "+ ₩ 20,000 / 시간",
    },
  ];

  return (
    <Card className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          합리적인 요금 안내
        </CardTitle>

        <CardContent className="px-0">
          <div className="md:overflow-hidden md:rounded-lg md:border md:border-gray-200 md:bg-white md:shadow-sm">
            <table className="w-full table-fixed border-collapse text-left">
              <thead className="hidden bg-gray-50 md:table-header-group">
                <tr>
                  <th className="w-1/5 px-6 py-4 font-semibold text-gray-900">
                    항목
                  </th>
                  <th className="w-2/5 px-6 py-4 font-semibold text-gray-900">
                    상세 내용
                  </th>
                  <th className="w-1/5 px-6 py-4 font-semibold text-gray-900">
                    결제 방식
                  </th>
                  <th className="w-1/5 px-6 py-4 text-right font-semibold text-gray-900">
                    금액
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
                      data-label="항목"
                      className="flex w-full items-center justify-between border-none px-4 py-3 text-left font-medium before:font-semibold before:content-[attr(data-label)] md:table-cell md:border-0 md:px-6 md:py-4 md:text-sm md:before:content-none"
                    >
                      {item.item}
                    </td>
                    <td
                      data-label="상세 내용"
                      className="flex w-full items-center justify-between border-none px-4 py-3 text-left text-sm text-gray-600 before:text-base before:font-semibold before:text-gray-900 before:content-[attr(data-label)] md:table-cell md:border-0 md:px-6 md:py-4 md:text-sm md:before:content-none"
                    >
                      {item.description}
                    </td>
                    <td
                      data-label="결제 방식"
                      className="flex w-full items-center justify-between border-none px-4 py-3 text-left text-gray-600 before:font-semibold before:text-gray-900 before:content-[attr(data-label)] md:table-cell md:border-0 md:px-6 md:py-4 md:text-sm md:before:content-none"
                    >
                      {item.payment}
                    </td>
                    <td
                      data-label="금액"
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
