import { CheckCheck, MapPin, Clock } from "lucide-react";
import { Card, CardTitle, CardContent } from "./ui/card";

export default function FeaturesSection() {
  const features = [
    {
      icon: CheckCheck,
      title: "100% 자유로운 코스",
      description: "가고 싶은 곳 어디든! 원하는 일정대로 자유롭게 여행하세요.",
    },
    {
      icon: MapPin,
      title: "친절한 전용 기사",
      description:
        "안전은 기본, 현지 맛집과 숨은 명소 추천까지! 최고의 여행 파트너",
    },
    {
      icon: Clock,
      title: "3일 전 무료 취소",
      description:
        "여행 계획이 변경되어도 걱정 마세요. 위약금 없이 취소 가능합니다.",
    },
  ];

  return (
    <Card className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          <span className="text-blue-500">말랑트립</span> 택시투어만의 특별함
        </CardTitle>

        <CardContent className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-gray-200 p-6 text-center"
              >
                <div className="mb-4 flex justify-center">
                  <IconComponent className="h-16 w-16 text-blue-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </CardContent>
      </div>
    </Card>
  );
}
