"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BookingForm from "./booking-form";
import { track } from "@/lib/analytics";

interface PeopleOption {
  value: string;
  label: string;
}

interface BookingDrawerProps {
  children: React.ReactNode;
  title: string;
  price: string;
  time: string;
  destinationId: number;
  peopleOptions?: PeopleOption[];
  priceByPeople?: Record<string, number | null | undefined>;
  inquiryDeposit?: number;
  color?: string;
}

export default function BookingDrawer({
  title,
  children,
  price,
  time,
  destinationId,
  peopleOptions,
  priceByPeople,
  inquiryDeposit,
  color = "blue",
}: BookingDrawerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (open: boolean) => {
    // Dialog/Drawer가 열리거나 닫힐 때 포커스를 정리
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      activeElement.blur();
    }
    setIsModalOpen(open);
    if (open) {
      track("begin_checkout");
    }
  };

  if (isDesktop)
    return (
      <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className="max-h-[90vh] max-w-md overflow-y-auto border-none bg-white px-6 pt-6 pb-0"
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            // Dialog가 열릴 때 자동 포커스를 방지하여 aria-hidden 경고 해결
            e.preventDefault();
          }}
          onInteractOutside={(e) => {
            // Popover가 열려있는지 확인
            const hasOpenPopover = document.querySelector(
              "[data-radix-popper-content-wrapper]",
            );
            if (hasOpenPopover) {
              // Popover가 열려있으면 Dialog는 닫히지 않도록 막음
              e.preventDefault();
            }
          }}
          onCloseAutoFocus={(e) => {
            // Dialog가 닫힐 때 포커스를 트리거로 돌리지 않고 방지
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>예약하기</DialogTitle>
          </DialogHeader>
          <BookingForm
            title={title}
            price={price}
            time={time}
            destinationId={destinationId}
            peopleOptions={peopleOptions}
            priceByPeople={priceByPeople}
            inquiryDeposit={inquiryDeposit}
            color={color}
          />
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={isModalOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent
        className="flex h-[100dvh] max-h-[100dvh] flex-col border-none bg-white data-[vaul-drawer-direction=bottom]:mt-0 data-[vaul-drawer-direction=bottom]:max-h-[100dvh]"
        aria-describedby={undefined}
        onInteractOutside={(e) => {
          // Popover가 열려있는지 확인
          const hasOpenPopover = document.querySelector(
            "[data-radix-popper-content-wrapper]",
          );
          if (hasOpenPopover) {
            // Popover가 열려있으면 Drawer는 닫히지 않도록 막음
            e.preventDefault();
          }
        }}
      >
        <DrawerHeader className="flex-shrink-0 text-left">
          <DrawerTitle>예약하기</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto px-4">
          <BookingForm
            title={title}
            price={price}
            time={time}
            destinationId={destinationId}
            peopleOptions={peopleOptions}
            priceByPeople={priceByPeople}
            inquiryDeposit={inquiryDeposit}
            color={color}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
