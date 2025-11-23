"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/use-translation";

export default function JejuFAQSection() {
  const { t } = useTranslation();
  const tData = t.jeju?.faq || {};

  const faqs = tData.items || [
    {
      question: "여행 코스는 어떻게 정하나요?",
      answer:
        "100% 맞춤형으로 진행됩니다. 예약 시 '대략적인 경로' 란에 가고 싶은 곳들을 자유롭게 적어주시거나, 잘 모르시겠다면 '동쪽 위주로', '아이와 함께 가기 좋은 곳' 등으로만 알려주셔도 기사님께서 당일 컨디션과 날씨에 맞춰 최고의 코스를 제안해드립니다.",
    },
    {
      question: "예약 금액 외에 추가 요금이 발생하는 경우가 있나요?",
      answer:
        "네, 아래의 경우 추가 요금이 발생하며 투어 종료 후 기사님께 직접 현장 결제해주시면 됩니다.\n시간 초과: 예약 시간을 초과하여 이용하는 경우 (시간당 20,000원)\n야간 할증: 20시 이후 야간 운행을 하는 경우 (시간당 10,000원)\n지역 할증: 제주시가 아닌 서귀포 등 다른 지역에서 픽업 또는 하차를 원하시는 경우 (각 20,000원)",
    },
    {
      question: "예약이 확정되면 어떻게 진행되나요?",
      answer:
        "고객님께서 예약 및 결제를 완료하시면, 영업일 기준 24시간 이내에 말랑트립에서 예약 확정 여부를 SMS(문자)로 안내해 드립니다. 만약 픽업/하차 장소가 불명확하거나 추가 확인이 필요한 경우, 확정 전에 먼저 연락드릴 수 있습니다. 투어 하루 전에는 담당 기사님께서 직접 연락드려 최종 인사를 드릴 예정입니다.",
    },
    {
      question: "기사님 식사는 어떻게 하나요?",
      answer:
        "기사님께서는 점심시간에 따로 식사를 해결하시므로 고객님께서는 전혀 신경 쓰지 않으셔도 됩니다.",
    },
    {
      question: "짐이 많은데, 다 실을 수 있을까요?",
      answer:
        "현대 아이오닉5 차량 트렁크에 실을 수 있는 수준의 짐은 충분히 가능합니다. (예: 24인치 캐리어 2개 + 작은 짐들) 만약 짐이 매우 많을 경우, 예약 전 카카오톡 채널로 문의해주세요.",
    },
    {
      question: "환불 규정이 어떻게 되나요?",
      answer:
        "여행 시작일 기준 4일 전까지 통보 시: 전액 환불\n여행 시작일 기준 3일 전 ~ 당일 통보 시: 환불 불가",
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            {tData.title || "자주 묻는 질문 (FAQ)"}
          </h2>
          <p className="text-gray-600">
            {tData.subtitle || "제주도 택시 투어에 대해 궁금한 점들을 확인해보세요"}
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="overflow-hidden rounded-xl border-0 bg-white shadow-sm"
              >
                <AccordionTrigger className="p-6 text-left text-base hover:bg-gray-50 hover:no-underline">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2 pb-6 whitespace-pre-line text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
