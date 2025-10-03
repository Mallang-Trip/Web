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
}: BookingDrawerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop)
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto border-none bg-white">
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
          />
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex max-h-[90vh] flex-col border-none bg-white">
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
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
