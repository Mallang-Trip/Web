"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JejuBookingDrawer from "./jeju-booking-drawer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { GA_EVENTS } from "@/lib/analytics-events";

interface JejuBookingSidebarProps {
  disabled?: boolean;
}

export default function JejuBookingSidebar({
  disabled = false,
}: JejuBookingSidebarProps) {
  const { t } = useTranslation();
  const tData = t.jeju?.sidebar || {};

  return (
    <Card className="sticky top-20 w-full">
      <CardHeader>
        <CardTitle className="text-xl">
          {tData.title || "제주도 택시투어"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-b pb-4">
          <div className="text-2xl font-bold text-blue-600">
            {tData.basePrice || "₩ 84,000"}
          </div>
          <div className="text-sm text-gray-600">
            {tData.baseTime || "4시간 기본 요금"}
          </div>
        </div>

        <div className="mb-5 space-y-2 text-sm">
          {tData.subItems?.map(
            (item: { title: string; value: string }, index: number) => (
              <div key={index} className="flex justify-between gap-4">
                <span className="text-gray-600">{item.title}</span>
                <span className="text-right">{item.value}</span>
              </div>
            ),
          ) || (
            <>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">투어 시간</span>
                <span className="text-right">최소 4시간 ~ 최대 12시간</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">포함 사항</span>
                <span className="text-right">
                  전용 차량, 기사님 사진 촬영, 유류비
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">취소 정책</span>
                <span className="text-right">4일 전 무료 취소</span>
              </div>
            </>
          )}
        </div>

        <JejuBookingDrawer>
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            size="lg"
            disabled={disabled}
            gaEvent={GA_EVENTS.JEJU_BOOKING_SIDEBAR}
            gaParams={{
              destination_id: 9,
              tour_name: "제주 택시투어",
            }}
          >
            {disabled
              ? tData.bookButtonDisabled || "예약 불가"
              : tData.bookButton || "예약하기"}
          </Button>
        </JejuBookingDrawer>
        <p className="text-center text-xs text-gray-500">
          {tData.approvalNote || "예약 후 24시간 이내 확정 여부 안내"}
        </p>
      </CardContent>
    </Card>
  );
}
