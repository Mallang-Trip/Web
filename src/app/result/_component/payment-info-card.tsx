import { Card, CardContent } from "@/components/ui/card";

export default function PaymentInfoCard() {
  return (
    <Card className="mt-8">
      <CardContent>
        <details className="group" open>
          <summary className="flex cursor-pointer items-center justify-between font-semibold">
            <span>현장 결제 안내</span>
            <svg
              className="h-5 w-5 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <div className="mt-4 text-sm leading-relaxed text-gray-600">
            기본 대절료(9시간) 외 추가되는 요금은 투어 종료 시 담당 기사님께
            직접 카드로 결제해주세요. (국내/해외 카드 가능)
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
