import Image from "next/image";

const partners = [
  {
    name: "시나브로",
    logo: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=100&fit=crop&crop=center",
    description: "시나브로 와이너리",
  },
  {
    name: "한국관광공사",
    logo: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=200&h=100&fit=crop&crop=center",
    description: "공식 관광 파트너",
  },
  {
    name: "한국농수산식품공사",
    logo: "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=200&h=100&fit=crop&crop=center",
    description: "공식 협력 및 인증 기관",
  },
  {
    name: "안양 산업진흥원",
    logo: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=200&h=100&fit=crop&crop=center",
    description: "지역 산업 진흥",
  },
];

export default function PartnersSection() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">공식 파트너</h2>
          <p className="text-gray-600">신뢰할 수 있는 파트너들과 함께합니다</p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex cursor-pointer flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative mb-4 flex h-16 w-24 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                  className="object-cover grayscale transition-all group-hover:grayscale-0"
                />
              </div>
              <h3 className="mb-1 text-center text-sm font-medium">
                {partner.name}
              </h3>
              <p className="text-center text-xs text-gray-500">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
