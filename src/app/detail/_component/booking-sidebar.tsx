import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingDrawer from "@/app/detail/_component/booking-drawer";
import { Button } from "@/components/ui/button";

interface PeopleOption {
  value: string;
  label: string;
}

interface BookingSidebarProps {
  title: string;
  price: string;
  time: string;
  baseMember?: string;
  subItems: {
    title: string;
    value: string;
  }[];
  destinationId: number;
  disabled: boolean;
  peopleOptions?: PeopleOption[];
  priceByPeople?: Record<string, number | null | undefined>;
  inquiryDeposit?: number;
}

export default function BookingSidebar({
  title,
  price,
  time,
  subItems,
  baseMember,
  destinationId,
  disabled,
  peopleOptions,
  priceByPeople,
  inquiryDeposit,
}: BookingSidebarProps) {
  return (
    <Card className="sticky top-20 w-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-b pb-4">
          <div className="text-2xl font-bold text-blue-600">₩ {price}</div>
          <div className="text-sm text-gray-600">
            {baseMember || `${time} 기본`} 요금
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {subItems.map((item) => (
            <div key={item.title} className="flex justify-between">
              <span className="text-gray-600">{item.title}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>

        <BookingDrawer
          title={title}
          price={price}
          time={time}
          destinationId={destinationId}
          peopleOptions={peopleOptions}
          priceByPeople={priceByPeople}
          inquiryDeposit={inquiryDeposit}
        >
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
            disabled={disabled}
          >
            {disabled ? "현재 예약 불가능" : "예약하기"}
          </Button>
        </BookingDrawer>
      </CardContent>
    </Card>
  );
}
