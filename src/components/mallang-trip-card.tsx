"use client";

import { BellRing, CarTaxiFront } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { elapsedTime } from "@/utils";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const notifications = [
  {
    title: "프론트엔드 개발 환경 구축 및 기본 세팅",
    description: elapsedTime("2025-04-06T01:00:00"),
  },
  {
    title: "프론트엔드 임시 배포 완료",
    description: elapsedTime("2025-04-06T03:00:00"),
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export default function MallangTripCard({ className, ...props }: CardProps) {
  const [checked, setChecked] = useState(false);

  const onCheckedChange = () => {
    setChecked(!checked);
    toast(checked ? "알림 취소 완료" : "알림 설정 완료", {
      description: new Date().toLocaleString(),
    });
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>말랑트립 2.0</CardTitle>
        <CardDescription>출시를 기다려주세요.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm leading-none font-medium">알림</p>
            <p className="text-muted-foreground text-sm">
              출시 완료되면 알림 받기
            </p>
          </div>
          <Switch checked={checked} onCheckedChange={onCheckedChange} />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm leading-none font-medium">
                  {notification.title}
                </p>
                <p className="text-muted-foreground text-sm">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="https://mallangtrip.com/" className="w-full">
          <Button className="h-10 w-full">
            <CarTaxiFront /> 기존 말랑트립으로 돌아가기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
