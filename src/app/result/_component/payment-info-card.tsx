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
            기본 투어 요금 외 픽업/드랍 추가 등으로 발생하는 부가 비용은 예약
            확정 전 말랑트립이 이메일과 전화번호를 통해 따로 안내해드립니다.
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
