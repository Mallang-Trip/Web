import { Clock, MapPin, Wine } from "lucide-react";

const itineraryItems = [
  {
    time: "선택한 시간",
    title: "픽업 및 출발",
    description:
      "안동역, 안동 시내 또는 기타 지역에서 픽업하여 조옥화안동소주 양조장으로 출발합니다. 편안한 차량으로 이동하며 투어에 대한 간단한 소개를 들으실 수 있습니다.",
    icon: MapPin,
    color: "bg-blue-500",
  },
  {
    time: "약 2시간",
    title: "양조장 투어 & 체험",
    description:
      "경북 무형문화재와 식품명인이 3대째 전승하는 조옥화 명인 직계 가족의 전통 양조법 설명, 안동소주 시음, 개인 맞춤형 안동소주 칵테일 제작 체험을 즐기실 수 있습니다.",
    icon: Wine,
    color: "bg-emerald-500",
  },
  {
    time: "체험 후",
    title: "종료 및 드랍",
    description:
      "투어 종료 후 원하는 장소(안동역, 안동 시내 또는 기타 지역)로 안전하게 드랍 서비스를 제공해드립니다.",
    icon: Clock,
    color: "bg-orange-500",
  },
];

export default function ItinerarySection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">하루의 여정</h2>
          <p className="text-gray-600">
            조옥화 안동소주 프라이빗 투어의 완성된 일정을 만나보세요
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 bottom-8 left-8 w-1 bg-emerald-200" />

            {itineraryItems.map((item, index) => (
              <div
                key={index}
                className="relative mb-12 flex items-start last:mb-0"
              >
                {/* Timeline dot */}
                <div
                  className={`${item.color} z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg`}
                >
                  <item.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="ml-8 flex-1 rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-center">
                    <span className="mr-4 text-lg font-semibold text-emerald-600">
                      {item.time}
                    </span>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
