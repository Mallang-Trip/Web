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

interface BookingDrawerProps {
  children: React.ReactNode;
  courseDetails: {
    [key: string]: {
      title: string;
      route: string;
      courseNo: number;
    };
  };
  price: string;
  time: string;
  variant?: "default" | "vip";
}

export default function BookingDrawer({
  children,
  courseDetails,
  price,
  time,
  variant = "default",
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
            courseDetails={courseDetails}
            price={price}
            time={time}
            variant={variant}
          />
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex max-h-[90vh] flex-col bg-white">
        <DrawerHeader className="flex-shrink-0 text-left">
          <DrawerTitle>예약하기</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto px-4">
          <BookingForm
            courseDetails={courseDetails}
            price={price}
            time={time}
            variant={variant}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
