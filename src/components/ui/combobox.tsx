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

  const selected = options.find((o) => o.value === value);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} modal={modal}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("justify-between", widthClassName, buttonClassName)}
            disabled={disabled}
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
        >
          <div className={cn("max-h-64 overflow-auto py-1", className)}>
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-100",
                  value === opt.value && "bg-slate-50",
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
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
    </>
  );
}
