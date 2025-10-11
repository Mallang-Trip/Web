"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

type DatePickerProps = {
  value: string; // yyyy-MM-dd
  onChange: (value: string) => void;
  className?: string;
  minDate?: Date; // 선택 불가 하한
  buttonClassName?: string;
  modal?: boolean;
};

function formatDate(d: Date, weekdays: string[]): string {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const w = weekdays[d.getDay()];
  return `${y}.${String(m).padStart(2, "0")}.${String(day).padStart(2, "0")} (${w})`;
}

function parseYmd(value: string): Date | null {
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map((v) => Number(v));
  const dt = new Date(y, m - 1, d);
  if (isNaN(dt.getTime())) return null;
  return dt;
}

function toYmd(d: Date): string {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export function DatePicker({
  value,
  onChange,
  className,
  minDate,
  buttonClassName,
  modal = false,
}: DatePickerProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const selected = React.useMemo(() => parseYmd(value) || new Date(), [value]);
  const [view, setView] = React.useState<Date>(() => startOfMonth(selected));

  React.useEffect(() => {
    const p = parseYmd(value);
    if (p) setView(startOfMonth(p));
  }, [value]);

  const min = React.useMemo<Date | undefined>(() => {
    if (!minDate) return undefined;
    const d = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate(),
    );
    return d;
  }, [minDate]);

  const weeks = React.useMemo(() => {
    const start = startOfMonth(view);
    const end = endOfMonth(view);
    const startWeekday = start.getDay();
    const daysInMonth = end.getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++)
      cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);
    const result: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7)
      result.push(cells.slice(i, i + 7));
    return result;
  }, [view]);

  const monthTitle = React.useMemo(() => {
    const y = view.getFullYear();
    const m = view.getMonth() + 1;
    return t.common.ui.datePicker.monthFormat(y, m);
  }, [view, t]);

  const handleSelect = (d: Date) => {
    if (min && d < min) return;
    onChange(toYmd(d));
    setOpen(false);
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const today = new Date();
  const todayYmd = toYmd(today);

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
          <span className="truncate">
            {value
              ? formatDate(
                  parseYmd(value) || new Date(),
                  t.common.ui.datePicker.weekdays,
                )
              : t.common.ui.datePicker.placeholder}
          </span>
          <CalendarIcon className="opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[320px] border-gray-200 bg-white p-0 shadow-md",
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
        <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
          <Button
            type="button"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() =>
              setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
            }
            aria-label={t.common.ui.datePicker.prevMonth}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="text-sm font-medium">{monthTitle}</div>
          <Button
            type="button"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() =>
              setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
            }
            aria-label={t.common.ui.datePicker.nextMonth}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 px-2 pt-2 pb-2 text-center text-xs text-slate-500">
          {t.common.ui.datePicker.weekdays.map((w) => (
            <div key={w} className="py-1">
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 px-2 pb-3">
          {weeks.flat().map((d, idx) => {
            if (!d) return <div key={idx} className="h-9" />;
            const ymd = toYmd(d);
            const disabled = !!(min && d < min);
            const isSelected =
              value && parseYmd(value) && isSameDay(d, parseYmd(value) as Date);
            const isToday = ymd === todayYmd;
            return (
              <button
                key={idx}
                type="button"
                disabled={disabled}
                onClick={() => handleSelect(d)}
                className={cn(
                  "h-9 rounded-md text-sm transition-colors",
                  disabled && "text-slate-300",
                  isSelected && "bg-blue-600 text-white",
                  !isSelected && !disabled && "hover:bg-slate-100",
                  !isSelected &&
                    isToday &&
                    !disabled &&
                    "ring-1 ring-blue-500/30",
                )}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
