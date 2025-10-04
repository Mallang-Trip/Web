import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tours = [
  {
    id: "vip",
    name: "프라이빗 도어투도어 양조장 투어",
    description:
      "한국 전통주 & 와인 장인의 세계로 떠나는 유일한 올인클루시브 큐레이션 여정",
    image: "/tour-images/vip/Yesan/01.jpg",
    duration: "8시간",
    price: "1,160,000원",
    rating: 4.8,
    reviewCount: 127,
    tags: ["프라이빗", "도어투도어", "양조장"],
    featured: true,
  },
  {
    id: "jookhwa",
    name: "조옥화 안동소주 프라이빗 투어",
    description:
      "3대째 전승하는 전통 양조법과 맞춤형 칵테일 체험, 우리 그룹만을 위한 가장 프라이빗한 안동소주 체험을 만나보세요.",
    image: "/tour-images/jookhwa/00.jpg",
    duration: "2시간",
    price: "140,000원",
    rating: 4.8,
    reviewCount: 127,
    tags: ["조옥화", "안동소주", "프라이빗"],
    featured: true,
  },
  {
    id: "sinabro",
    name: "시나브로 와이너리 프라이빗 투어",
    description:
      "계절별 특별 체험과 수상작 와인, 집같은 따뜻함이 있는 우리 그룹만을 위한 가장 프라이빗한 와인 체험을 만나보세요.",
    image: "/tour-images/sinabro/00.jpg",
    duration: "2시간",
    price: "140,000원",
    rating: 4.8,
    reviewCount: 127,
    tags: ["시나브로", "와이너리", "프라이빗"],
    featured: true,
  },
  {
    id: "chunbi",
    name: "좋은술 천비향 프라이빗 투어",
    description:
      "대통령의 만찬주, 우리 그룹만을 위한 가장 프라이빗한 경험을 가장 편리하게 만나보세요.",
    image: "/tour-images/chunbi/00.jpg",
    duration: "2시간",
    price: "300,000원",
    rating: 4.8,
    reviewCount: 127,
    tags: ["좋은술", "천비향", "프라이빗"],
    featured: true,
  },
  {
    id: "yeongdong",
    name: "영동 와이너리 투어",
    description:
      "오직 우리만을 위한 하루, 소중한 사람들과 단독으로 즐기는 프라이빗 와인 여정",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1440",
    duration: "8시간",
    price: "가격 문의",
    rating: 4.8,
    reviewCount: 127,
    tags: ["영동", "와이너리", "프라이빗"],
    featured: true,
  },
  // {
  //   id: "jeju",
  //   name: "제주도 택시 투어",
  //   description:
  //     "내가 원하는 코스, 친절한 기사님과 함께 제주의 모든 것을 경험하세요.",
  //   image:
  //     "https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?q=80&w=1440",
  //   duration: "9시간",
  //   price: "190,000원",
  //   rating: 4.4,
  //   reviewCount: 86,
  //   tags: ["자연", "문화", "맛집"],
  //   featured: false,
  // },
  // {
  //   id: "seoul",
  //   name: "비오는날 서울투어",
  //   description: "비오는날 서울투어",
  //   image:
  //     "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/55e2af66-460e-4dd7-8c1f-97ce194b48fe%EC%96%91%ED%8F%89.jpg",
  //   duration: "5시간",
  //   price: "200,000원",
  //   rating: 4.2,
  //   reviewCount: 61,
  //   tags: ["비오는날", "서울", "투어"],
  //   featured: false,
  // },
  // {
  //   id: "gangneung",
  //   name: "강릉 손님 마음대로 투어",
  //   description: "강릉 손님 마음대로 투어",
  //   image:
  //     "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/4ddb1918-ab15-4d15-ac1b-b54aa1e30a16%EA%B0%95%EB%A6%89.jpg",
  //   duration: "7시간",
  //   price: "175,000원",
  //   rating: 4.3,
  //   reviewCount: 22,
  //   tags: ["강릉", "투어", "손님 마음대로"],
  //   featured: false,
  // },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative mt-16 overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              말랑트립으로
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                특별한 여행
              </span>
              을 시작하세요
            </h1>
            <p className="mx-auto max-w-2xl text-base text-blue-100 lg:text-xl">
              전문 드라이버와 함께하는 프리미엄 투어 서비스로
              <br />
              안전하고 편안한 여행을 경험해보세요
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 h-20 w-20 animate-bounce rounded-full bg-white/10"></div>
        <div className="absolute top-20 right-20 h-16 w-16 animate-pulse rounded-full bg-yellow-400/20"></div>
        <div className="absolute bottom-10 left-1/4 h-12 w-12 animate-spin rounded-full bg-purple-400/20"></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">안전한 여행</h3>
              <p className="text-gray-600">
                검증된 전문 드라이버와 함께 안전하게 여행하세요
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">편리한 예약</h3>
              <p className="text-gray-600">
                간편한 온라인 예약으로 언제든지 투어를 예약하세요
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">특별한 경험</h3>
              <p className="text-gray-600">
                현지인만 아는 숨겨진 명소와 특별한 경험을 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              인기 투어 목적지
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              말랑트립이 엄선한 최고의 여행지에서 특별한 추억을 만들어보세요
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <Link key={tour.id} href={`/detail/${tour.id}`}>
                <Card className="group h-full overflow-hidden py-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {tour.featured && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        인기
                      </Badge>
                    )}
                    {/* 평점 미사용 (임시) */}
                    {/* <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-sm text-white">
                      <svg
                        className="h-4 w-4 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{tour.rating}</span>
                      <span className="text-gray-300">
                        ({tour.reviewCount})
                      </span>
                    </div> */}
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <CardTitle className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600">
                          {tour.name}
                        </CardTitle>
                        <p className="mb-3 min-h-10 text-sm text-gray-600">
                          {tour.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {tour.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {tour.duration}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">시작가</div>
                        <div className="text-xl font-bold text-blue-600">
                          {tour.price}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            지금 바로 여행을 시작하세요
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            말랑트립과 함께 특별한 추억을 만들어보세요
          </p>
          <Link href="/detail/vip" className="inline-block">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              추천 여행 보기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
