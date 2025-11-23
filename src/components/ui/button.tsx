import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { GAEventProps } from "@/lib/analytics-events";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 aria-invalid:ring-red-500/20 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500/20",
        outline:
          "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900",
        secondary: "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  gaEvent,
  gaParams,
  gaCategory,
  gaLabel,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  GAEventProps & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  // GA 이벤트 정보를 data attributes로 변환
  const gaDataAttributes = React.useMemo(() => {
    const attrs: Record<string, string> = {};

    if (gaEvent) {
      attrs["data-ga-event"] = gaEvent;
    }

    if (gaCategory) {
      attrs["data-ga-category"] = gaCategory;
    }

    if (gaLabel) {
      attrs["data-ga-label"] = gaLabel;
    }

    if (gaParams && Object.keys(gaParams).length > 0) {
      // params를 JSON 문자열로 직렬화
      attrs["data-ga-params"] = JSON.stringify(gaParams);
    }

    return attrs;
  }, [gaEvent, gaParams, gaCategory, gaLabel]);

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...gaDataAttributes}
      {...props}
    />
  );
}

export { Button, buttonVariants };
