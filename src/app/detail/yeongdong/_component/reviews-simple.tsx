import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface ReviewItem {
  text: string;
  author: string;
}

interface ReviewsSimpleProps {
  heading: string;
  items: ReviewItem[];
}

export default function ReviewsSimple({ heading, items }: ReviewsSimpleProps) {
  return (
    <section>
      <Card className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <CardTitle className="mb-12 text-center text-3xl font-bold text-amber-800 md:text-4xl">
            {heading}
          </CardTitle>
          <CardContent className="grid gap-6 px-0 md:grid-cols-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border-t-4 border-yellow-500 bg-white p-6 shadow-sm"
              >
                <p className="leading-relaxed text-gray-700 italic">
                  &quot;{item.text}&quot;
                </p>
                <div className="mt-4 text-right font-semibold text-gray-900">
                  - {item.author}
                </div>
              </div>
            ))}
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
