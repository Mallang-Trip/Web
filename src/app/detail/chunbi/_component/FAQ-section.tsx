import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "투어 참여 최소/최대 인원은 어떻게 되나요?",
    answer:
      "최소 2명부터 최대 20명까지 참여 가능합니다. 10명 이하는 온라인 예약 가능하며, 10명을 초과하는 경우 별도 문의를 통해 맞춤형 투어를 제공합니다.",
  },
  {
    question: "픽업 서비스 지역은 어디까지 가능한가요?",
    answer:
      "서울 시내 주요 지역(강남, 홍대, 명동, 여의도 등)에서 픽업 서비스를 제공합니다. 기타 지역의 경우 추가 비용이 발생할 수 있으니 예약 시 문의해 주세요.",
  },
  {
    question: "취소 및 환불 정책은 어떻게 되나요?",
    answer:
      "투어 4일 전까지는 100% 환불, 3일 전까지는 50% 환불, 2일 전까지는 30% 환불, 당일 취소는 환불이 불가합니다. 천재지변이나 불가피한 상황의 경우 별도 협의 가능합니다.",
  },
  {
    question: "미성년자도 참여할 수 있나요?",
    answer:
      "양조장 견학 및 체험은 가능하지만, 시음은 만 19세 이상만 가능합니다. 미성년자를 위한 무알코올 음료를 별도로 준비해 드립니다.",
  },
  {
    question: "날씨가 좋지 않을 때도 투어가 진행되나요?",
    answer:
      "실내 프로그램이 주를 이루기 때문에 일반적인 비나 눈 날씨에도 투어가 진행됩니다. 다만, 태풍이나 폭설 등 극한 날씨의 경우 안전을 위해 일정을 조정할 수 있습니다.",
  },
  {
    question: "투어 중 사진 촬영이 가능한가요?",
    answer:
      "네, 개인 사진 촬영은 자유롭게 가능합니다. 다만, 양조장의 제조 기밀과 관련된 일부 구역에서는 촬영이 제한될 수 있습니다.",
  },
];

export default function FAQSection() {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">자주 묻는 질문</h2>
          <p className="text-gray-600">
            천비향 프라이빗 투어에 대해 궁금한 점들을 확인해보세요
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
                <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 hover:no-underline">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
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
