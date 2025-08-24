import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface ReviewsSectionProps {
  reviews: {
    image: string;
    rating: string;
    author: string;
    comment: string;
  }[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <Card className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          생생한 이용 후기
        </CardTitle>

        <CardContent className="grid gap-6 px-0 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="gap-3 overflow-hidden py-0 pb-6">
              <div className="relative aspect-[4/3]">
                <Image
                  src={review.image}
                  alt={`후기 사진 ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
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
