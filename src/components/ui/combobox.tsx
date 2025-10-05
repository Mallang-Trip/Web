"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = { value: string; label: string };

type ComboboxProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  popoverClassName?: string;
  buttonClassName?: string;
  disabled?: boolean;
  widthClassName?: string; // e.g. w-32
  modal?: boolean;
};

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "선택...",
  className,
  popoverClassName,
  buttonClassName,
  disabled,
  widthClassName = "w-[200px]",
  modal = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", widthClassName, buttonClassName)}
          disabled={disabled}
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
          {selected ? selected.label : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "border-gray-200 bg-white p-0",
          widthClassName,
          popoverClassName,
        )}
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;

          // 트리거 버튼을 클릭한 경우 Popover가 자동으로 토글하도록 둠
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
        <div
          className={cn("max-h-64 overflow-auto py-1", className)}
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-100",
                value === opt.value && "bg-slate-50",
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(opt.value === value ? "" : opt.value);
                setOpen(false);
              }}
            >
              <span className="flex-1">{opt.label}</span>
              <Check
                className={cn(
                  "size-4",
                  value === opt.value ? "opacity-100" : "opacity-0",
                )}
              />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
