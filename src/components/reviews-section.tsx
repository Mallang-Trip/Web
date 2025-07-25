import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function ReviewsSection() {
  const reviews = [
    {
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800",
      rating: "★★★★★",
      author: "🇨🇳 Wang* (28)",
      comment:
        "드라이버가 매우 친절하고 사진도 잘 찍어줬어요! 덕분에 편하게 여행했습니다.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800",
      rating: "★★★★★",
      author: "🇺🇸 Chris* (35)",
      comment:
        "Perfect way to see Jeju! The driver recommended a fantastic local black pork restaurant.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800",
      rating: "★★★★☆",
      author: "🇨🇳 Li* (24)",
      comment:
        "코스 짜는게 어려웠는데 기사님이 추천해준 곳들이 다 좋았어요. 하지만 차가 조금 작았어요.",
    },
  ];

  return (
    <Card className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          생생한 이용 후기
        </CardTitle>

        <CardContent className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="gap-3 overflow-hidden py-0 pb-6">
              <div className="relative aspect-[4/3]">
                <Image
                  src={review.image}
                  alt={`후기 사진 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4 text-center">
                <div className="mb-2 text-yellow-500">{review.rating}</div>
                <p className="mb-2 font-semibold">{review.author}</p>
                <p className="text-sm leading-relaxed text-gray-600">
                  {review.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </div>
    </Card>
  );
}
