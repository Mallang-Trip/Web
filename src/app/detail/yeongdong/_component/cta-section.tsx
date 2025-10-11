"use client";

import { useTranslation } from "@/hooks/use-translation";

interface CTASectionProps {
  heading: string;
  subheading: string;
}

export default function CTASection({ heading, subheading }: CTASectionProps) {
  const { lang } = useTranslation();
  return (
    <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 text-center text-white">
      <h2 className="mb-4 text-3xl font-light">{heading}</h2>
      <p className="mb-4 text-amber-200">{subheading}</p>
      <p className="text-[10px] text-amber-100">
        {lang === "ko"
          ? "※ 계절/시기 별로 체험 콘텐츠는 예고 없이 바뀔 수 있습니다."
          : "※ Experience content may change without notice depending on the season/timing."}
      </p>
    </section>
  );
}
