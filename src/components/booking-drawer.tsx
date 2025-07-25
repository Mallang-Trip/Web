"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BookingForm from "./booking-form";

interface BookingDrawerProps {
  children: React.ReactNode;
}

export default function BookingDrawer({ children }: BookingDrawerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop)
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto border-none bg-white">
          <DialogHeader>
            <DialogTitle>예약 및 결제</DialogTitle>
          </DialogHeader>
          <BookingForm />
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex max-h-[90vh] flex-col bg-white">
        <DrawerHeader className="flex-shrink-0 text-left">
          <DrawerTitle>예약 및 결제</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto px-4">
          <BookingForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
