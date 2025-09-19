"use client";

import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode } from "react";

export interface FAQItem {
  question: string;
  answer: ReactNode;
}

interface FAQProps {
  items: FAQItem[];
  selectedIndex: number | null;
  onToggle: (index: number) => void;
}

export default function FAQ({ items, selectedIndex, onToggle }: FAQProps) {
  return (
    <section>
      <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
        자주 묻는 질문
      </h2>
      <div className="space-y-4">
        {items.map((faq, index) => (
          <Card
            key={index}
            className="overflow-hidden border-none py-0 shadow-sm"
          >
            <button
              onClick={() => onToggle(index)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {faq.question}
              </h3>
              {selectedIndex === index ? (
                <ChevronUp className="h-5 w-5 text-slate-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-500" />
              )}
            </button>
            {selectedIndex === index && (
              <div className="px-6 pb-6 leading-relaxed text-slate-600">
                {faq.answer}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
