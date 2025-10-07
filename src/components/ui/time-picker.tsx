"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type TimePickerProps = {
  value: string; // HH:mm
  onChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
  stepMinutes?: number; // interval between options
  modal?: boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function TimePicker({
  value,
  onChange,
  className,
  buttonClassName,
  stepMinutes = 15,
  modal = false,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [hh, mm] = React.useMemo(() => {
    const m = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.exec(value || "") || [];
    return [Number(m[1] ?? 9), Number(m[2] ?? 0)];
  }, [value]);

  const setTime = (h: number, m: number) => {
    const hour = String(clamp(h, 0, 23)).padStart(2, "0");
    const min = String(clamp(m, 0, 59)).padStart(2, "0");
    onChange(`${hour}:${min}`);
  };

  const times = React.useMemo(() => {
    const list: string[] = [];
    for (let h = 7; h < 10; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        list.push(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        );
      }
    }
    list.push("10:00");
    return list;
  }, [stepMinutes]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          type="button"
          variant="outline"
          className={cn("h-9 w-full justify-between", buttonClassName)}
          onMouseDown={(e) => {
            // 버튼 클릭 시 즉시 포커스를 제거하여 aria-hidden 경고 방지
            const target = e.currentTarget;
            if (target) {
              setTimeout(() => target.blur(), 0);
            }
          }}
          onFocus={(e) => {
            // 포커스가 설정되면 즉시 제거하여 aria-hidden 경고 방지
            e.currentTarget.blur();
          }}
        >
          <span>{value || "시간을 선택하세요"}</span>
          <Clock className="opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[280px] border-gray-200 bg-white p-0 shadow-md",
          className,
        )}
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;

          // 트리거 버튼을 클릭한 경우
          if (
            triggerRef.current &&
            (triggerRef.current === target ||
              triggerRef.current.contains(target))
          ) {
            e.preventDefault();
            return;
          }

          // Dialog/Drawer overlay를 클릭한 경우
          const isOverlay =
            (target.hasAttribute("data-slot") &&
              (target.getAttribute("data-slot") === "dialog-overlay" ||
                target.getAttribute("data-slot") === "drawer-overlay")) ||
            target.hasAttribute("data-vaul-drawer-wrapper") ||
            target.hasAttribute("data-vaul-overlay") ||
            target.closest("[data-vaul-drawer-wrapper]");

          if (isOverlay) {
            // 이벤트를 완전히 차단하여 Dialog가 닫히지 않도록 함
            e.preventDefault();
            e.stopPropagation();
            setOpen(false);
            return;
          }
        }}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-gray-200 px-3 py-2">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => setTime(hh - 1, mm)}
            >
              <ChevronDown className="size-4" />
            </Button>
            <div className="text-xl font-semibold tabular-nums">
              {String(hh).padStart(2, "0")}
            </div>
            <Button
              type="button"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => setTime(hh + 1, mm)}
            >
              <ChevronUp className="size-4" />
            </Button>
          </div>
          <div className="text-center text-lg">:</div>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => setTime(hh, mm - stepMinutes)}
            >
              <ChevronDown className="size-4" />
            </Button>
            <div className="text-xl font-semibold tabular-nums">
              {String(mm).padStart(2, "0")}
            </div>
            <Button
              type="button"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => setTime(hh, mm + stepMinutes)}
            >
              <ChevronUp className="size-4" />
            </Button>
          </div>
        </div>
        <div className="max-h-60 overflow-auto p-1">
          {times.map((t) => (
            <button
              key={t}
              type="button"
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100",
                value === t && "bg-blue-600 text-white hover:bg-blue-600",
              )}
              onClick={(e) => {
                e.preventDefault();
                onChange(t);
                setOpen(false);
              }}
            >
              <span className="tabular-nums">{t}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
