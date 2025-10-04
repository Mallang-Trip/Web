import { Crown, Car, Users, Grape } from "lucide-react";

const highlights = [
  {
    icon: Crown,
    title: "수상작 청수 화이트",
    description:
      "우리나라 토종 청포도 '청수'로 만든 국제 수상작 와인을 시음해보세요.",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Car,
    title: "전용 차량 이동",
    description: "편안한 픽업/드랍 서비스로 이동의 부담 없이 투어를 즐기세요.",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "우리만의 투어",
    description:
      "2명 이상 20명 이하 그룹을 위한 완전 프라이빗 투어 경험입니다.",
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Grape,
    title: "계절별 특별 체험",
    description:
      "포도 수확·와인 양조 체험(수확철), 뱅쇼 만들기(겨울), 베이커리 체험까지!",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
];

export default function HighlightsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">이런 점이 특별해요!</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            시나브로 와이너리 프라이빗 투어만의 특별한 경험을 만나보세요
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`h-16 w-16 ${highlight.bgColor} mb-4 flex items-center justify-center rounded-xl`}
              >
                <highlight.icon className={`h-8 w-8 ${highlight.iconColor}`} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{highlight.title}</h3>
              <p className="text-gray-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
