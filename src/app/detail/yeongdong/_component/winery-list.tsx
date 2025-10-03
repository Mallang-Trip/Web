import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface WineryItem {
  name: string;
  tagline: string;
  description: string;
  image?: string;
}

interface WineryListProps {
  heading: string;
  items: WineryItem[];
}

export default function WineryList({ heading, items }: WineryListProps) {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-4 py-16">
        <CardTitle className="mb-12 text-center text-3xl font-bold text-amber-800 md:text-4xl">
          {heading}
        </CardTitle>

        <div className="space-y-8">
          {items.map((item, idx) => (
            <Card key={idx} className="overflow-hidden">
              <CardContent className="grid gap-6 p-6 md:grid-cols-5">
                <div
                  className={`relative h-56 w-full rounded-lg bg-amber-200 md:col-span-2`}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={`${item.name} 이미지`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-white/90">
                      이미지 플레이스홀더
                    </div>
                  )}
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-semibold text-amber-900">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-gray-500 italic">{item.tagline}</p>
                  <p className="mt-4 leading-relaxed text-gray-700">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
