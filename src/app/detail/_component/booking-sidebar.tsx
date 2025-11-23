"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingDrawer from "@/app/detail/_component/booking-drawer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { GA_EVENTS } from "@/lib/analytics-events";

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
  color?: string;
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
  color = "blue",
}: BookingSidebarProps) {
  const { t, lang } = useTranslation();
  const tData = t.common.detail.booking;
  let colorClass: { priceColor: string; buttonColor: string };

  switch (color) {
    case "emerald":
      colorClass = {
        priceColor: "text-emerald-600",
        buttonColor: "bg-emerald-500 hover:bg-emerald-600",
      };
      break;
    case "amber":
      colorClass = {
        priceColor: "text-amber-400",
        buttonColor: "bg-amber-400 hover:bg-amber-500",
      };
      break;
    default:
      colorClass = {
        priceColor: "text-blue-600",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
      };
  }

  return (
    <Card className="sticky top-20 w-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-b pb-4">
          <div className={`text-2xl font-bold ${colorClass.priceColor}`}>
            {lang === "ko" ? "₩" : ""} {price}
          </div>
          <div className="text-sm text-gray-600">
            {baseMember || `${time} ${tData.baseRate}`} {tData.rate}
          </div>
        </div>

        <div className="mb-5 space-y-2 text-sm">
          {subItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="flex justify-between gap-4"
            >
              <span className="text-gray-600">{item.title}</span>
              <span
                className="text-right"
                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
              >
                {item.value}
              </span>
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
          color={color}
        >
          <Button
            className={`w-full text-white ${colorClass.buttonColor}`}
            size="lg"
            disabled={disabled}
            gaEvent={GA_EVENTS.TOUR_BOOKING_SIDEBAR}
            gaParams={{
              destination_id: destinationId,
              tour_name: title,
            }}
          >
            {disabled ? tData.unavailable : tData.bookNow}
          </Button>
        </BookingDrawer>
        <p className="text-center text-xs text-gray-500">
          {tData.approvalRequired}
        </p>
      </CardContent>
    </Card>
  );
}
