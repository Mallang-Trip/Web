import { Check, X } from "lucide-react";

const includedItems = [
  "안동역/시내에서 양조장까지 왕복 이동 서비스",
  "[체험] 조옥화 안동소주 칵테일 클래스",
  "[시음] 명품 안동소주 테이스팅",
];

const excludedItems = [
  "개인 추가 구매 비용 (기념품, 추가 주류 등)",
  "여행자 보험",
  "안내된 픽업/드랍 권역 외 추가 이동 비용",
];

const pricingTable = [
  { people: "2인", total: "140,000원", perPerson: "70,000원" },
  { people: "3인", total: "140,000원", perPerson: "46,667원" },
  { people: "4인", total: "140,000원", perPerson: "35,000원" },
  { people: "5인", total: "175,000원", perPerson: "35,000원" },
  { people: "6인", total: "210,000원", perPerson: "35,000원" },
  { people: "7인", total: "245,000원", perPerson: "35,000원" },
  { people: "8인", total: "280,000원", perPerson: "35,000원" },
  { people: "9인", total: "315,000원", perPerson: "35,000원" },
  { people: "10인 이상", total: "별도 문의", perPerson: "35,000원" },
];

export default function PricingSection() {
  return (
    <section>
      <div className="container mx-auto px-4">
        {/* Included/Excluded */}
        <div className="mx-auto mb-24 max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            포함 및 불포함 내역
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Included */}
            <div className="rounded-xl bg-emerald-50 p-6">
              <h3 className="mb-6 flex items-center text-xl font-semibold text-emerald-800">
                <Check className="mr-2 h-6 w-6" />
                포함 내역
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
                불포함 내역
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

          {/* Pickup/Drop-off Notice */}
          <div className="mx-auto mt-8 rounded-xl bg-blue-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-blue-800">
              📍 픽업/드랍 서비스 안내
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>기본 픽업/드랍:</strong> 안동역, 안동 시내 (추가 요금
                없음)
              </p>
              <p>
                <strong>기타 지역:</strong> 추가 요금이 발생할 수 있습니다
              </p>
              <p className="mt-3 rounded-lg bg-white p-3 text-sm text-blue-600">
                💡 <strong>안내:</strong> 예약 확정 시점에 픽업/드랍 위치에 따른
                정확한 추가 요금을 안내해드리며, 해당 요금은 투어 당일 현장에서
                결제하시면 됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            상세 요금 안내
          </h2>

          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="bg-emerald-500 p-4 text-white">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-semibold">참여 인원</div>
                <div className="text-center font-semibold">총액</div>
                <div className="text-right font-semibold">1인당 가격</div>
              </div>
            </div>

            {pricingTable.map((row, index) => (
              <div
                key={index}
                className={`border-b border-gray-100 p-4 last:border-b-0 ${index === 0 ? "bg-emerald-50" : ""}`}
              >
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="font-medium">{row.people}</div>
                  <div className="text-center text-lg font-semibold whitespace-nowrap text-emerald-600">
                    {row.total}
                  </div>
                  <div className="text-right text-gray-600">
                    {row.perPerson}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              * 모든 가격은 부가세 포함 금액입니다
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
