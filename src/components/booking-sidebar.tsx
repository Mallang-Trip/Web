import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingDrawer from "./booking-drawer";
import { Button } from "./ui/button";

export default function BookingSidebar() {
  return (
    <Card className="sticky top-20 w-full">
      <CardHeader>
        <CardTitle className="text-xl">제주도 택시 투어</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-b pb-4">
          <div className="text-2xl font-bold text-blue-600">₩ 190,000</div>
          <div className="text-sm text-gray-600">9시간 기본 요금</div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">투어 시간</span>
            <span>9시간</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">포함 사항</span>
            <span>기사님, 유류비</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">취소 정책</span>
            <span>3일 전 무료</span>
          </div>
        </div>

        <BookingDrawer>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            예약하기
          </Button>
        </BookingDrawer>
      </CardContent>
    </Card>
  );
}
