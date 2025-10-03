import { Clock, MapPin, Wine } from "lucide-react";

const itineraryItems = [
  {
    time: "14:00",
    title: "픽업 및 출발",
    description:
      "지정된 장소에서 픽업하여 좋은술 양조장으로 출발합니다. 편안한 차량으로 이동하며 투어에 대한 간단한 소개를 들으실 수 있습니다.",
    icon: MapPin,
    color: "bg-blue-500",
  },
  {
    time: "15:00-17:00",
    title: "양조장 투어 & 증류 체험",
    description:
      "천비향이 만들어지는 전통 양조 과정을 견학하고, 직접 소주고리 증류 체험을 해보실 수 있습니다. 마스터의 전문적인 설명과 함께 진행됩니다.",
    icon: Wine,
    color: "bg-emerald-500",
  },
  {
    time: "17:00-18:30",
    title: "시음 & 샌딩",
    description:
      "천비향을 포함한 다양한 전통주 시음과 함께 정성스럽게 준비된 안주를 즐기실 수 있습니다. 드랍오프 후 투어가 마무리됩니다.",
    icon: Clock,
    color: "bg-orange-500",
  },
];

export default function ItinerarySection() {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">하루의 여정</h2>
          <p className="text-gray-600">
            천비향 프라이빗 투어의 완성된 일정을 만나보세요
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
