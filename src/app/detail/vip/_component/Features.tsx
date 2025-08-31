import { Card, CardContent } from "@/components/ui/card";

export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface FeaturesProps {
  heading: string;
  description: string;
  items: FeatureItem[];
}

export default function Features({
  heading,
  description,
  items,
}: FeaturesProps) {
  return (
    <section>
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="mb-2 text-3xl font-light text-slate-900">{heading}</h2>
        <p className="text-lg font-light text-slate-600">{description}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((feature, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400">
                <feature.icon className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl text-slate-900">{feature.title}</h3>
              <p className="whitespace-pre-line text-slate-600">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
