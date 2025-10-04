import { Star } from "lucide-react";

const reviews = [
  {
    name: "김○○",
    rating: 5,
    date: "2024.01.15",
    content:
      "정말 특별한 경험이었어요! 시나브로 와인의 풍부한 맛과 함께 와인 제조 과정을 직접 볼 수 있어서 너무 좋았습니다. 가이드분도 전문적이고 친절하셨어요.",
    highlight: "시나브로 와인의 풍부한 맛",
  },
  {
    name: "이○○",
    rating: 5,
    date: "2024.01.08",
    content:
      "회사 동료들과 함께 갔는데 모두 만족했어요. 프라이빗 투어라서 편안하게 질문도 하고 체험도 할 수 있었습니다. 픽업 서비스도 정말 편리했어요!",
    highlight: "프라이빗 투어의 편안함",
  },
  {
    name: "박○○",
    rating: 5,
    date: "2023.12.22",
    content:
      "3대째 전승되는 전통 양조법에 대한 설명이 정말 흥미로웠고, 직접 만든 맞춤형 안동소주 칵테일이 놀라울 정도로 맛있었어요! 45도 안동소주의 깊은 맛과 향이 인상적이었습니다.",
    highlight: "전통의 깊이와 맞춤형 체험",
  },
  {
    name: "최○○",
    rating: 5,
    date: "2023.12.10",
    content:
      "가성비가 정말 좋은 투어예요. 이 가격에 이런 퀄리티의 경험을 할 수 있다니 놀라웠습니다. 친구들에게도 추천하고 싶어요!",
    highlight: "훌륭한 가성비",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">생생한 후기</h2>
          <p className="text-gray-600">
            조옥화 안동소주 프라이빗 투어를 경험한 고객들의 솔직한 후기
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-2">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <span className="font-semibold text-emerald-600">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <p className="mb-3 leading-relaxed text-gray-700">
                {review.content}
              </p>

              <div className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                #{review.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
