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
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
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
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        list.push(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        );
      }
    }
    return list;
  }, [stepMinutes]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("h-9 w-full justify-between", buttonClassName)}
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
        onPointerDownOutside={(e) => e.preventDefault()}
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
              onMouseDown={(e) => {
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
