import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface PricingCardItem {
  title: string;
  price: string;
  subtitle?: string;
}

interface PricingCardsProps {
  heading: string;
  items: PricingCardItem[];
}

export default function PricingCards({ heading, items }: PricingCardsProps) {
  return (
    <section>
      <Card className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <CardTitle className="mb-12 text-center text-3xl font-bold text-amber-800 md:text-4xl">
            {heading}
          </CardTitle>
          <CardContent className="grid gap-6 px-0 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-8 text-center"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-4 text-4xl font-extrabold text-amber-800">
                  {item.price}
                </p>
                {item.subtitle ? (
                  <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
                ) : null}
              </div>
            ))}
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
