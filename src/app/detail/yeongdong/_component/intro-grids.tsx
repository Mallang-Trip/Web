import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface IntroItem {
  title: string;
  description: string;
}

interface IntroGridProps {
  heading: string;
  items: IntroItem[];
}

export default function IntroGrids({ heading, items }: IntroGridProps) {
  return (
    <section>
      <Card className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <CardTitle className="mb-12 text-center text-3xl font-bold text-amber-800 md:text-4xl">
            {heading}
          </CardTitle>
          <CardContent className="grid gap-8 px-0 md:grid-cols-3">
            {items.map((item, idx) => (
              <div key={idx} className="text-center">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="leading-relaxed whitespace-pre-line text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
