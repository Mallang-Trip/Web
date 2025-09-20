import { Card, CardTitle, CardContent } from "@/components/ui/card";

interface FeaturesSectionProps {
  features: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[];
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <Card className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          <span className="text-blue-500">말랑트립</span> 택시투어만의 특별함
        </CardTitle>

        <CardContent className="grid gap-8 px-0 md:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-gray-200 px-4 py-6 text-center"
              >
                <div className="mb-4 flex justify-center">
                  <IconComponent className="h-16 w-16 text-blue-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold whitespace-nowrap">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </CardContent>
      </div>
    </Card>
  );
}
