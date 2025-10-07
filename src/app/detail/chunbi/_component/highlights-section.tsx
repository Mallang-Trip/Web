import { Crown, Car, Users, Flame } from "lucide-react";

const highlights = [
  {
    icon: Crown,
    title: "대통령의 술",
    description: "천비향은 실제 청와대 만찬에 사용되는 프리미엄 전통주입니다.",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
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
    description: "2명 이상 그룹을 위한 완전 프라이빗 투어 경험입니다.",
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Flame,
    title: "소주고리 증류 체험",
    description: "전통 방식의 소주 증류 과정을 직접 체험해보실 수 있습니다.",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function HighlightsSection() {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">이런 점이 특별해요!</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            천비향 프라이빗 투어만의 특별한 경험을 만나보세요
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
