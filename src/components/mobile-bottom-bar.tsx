import { Button } from "@/components/ui/button";
import BookingDrawer from "./booking-drawer";

export default function MobileBottomBar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200 bg-white p-4 lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-bold text-blue-600">₩ 190,000</div>
          <div className="text-sm text-gray-600">9시간 기본 요금</div>
        </div>

        <BookingDrawer>
          <Button className="bg-blue-600 px-8 hover:bg-blue-700" size="lg">
            예약하기
          </Button>
        </BookingDrawer>
      </div>
    </div>
  );
}
