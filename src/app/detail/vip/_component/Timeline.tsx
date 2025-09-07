import { Card, CardContent } from "@/components/ui/card";

export interface TimelineItem {
  time: string;
  activity: string;
  description: string;
}

interface TimelineProps {
  heading: string;
  subheading: string;
  items: TimelineItem[];
}

export default function Timeline({
  heading,
  subheading,
  items,
}: TimelineProps) {
  return (
    <Card className="rounded-2xl bg-white p-8">
      <CardContent className="mx-auto max-w-4xl p-0">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-light text-slate-900">{heading}</h2>
          <p className="text-lg font-light text-slate-600">{subheading}</p>
        </div>

        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-sm font-bold text-slate-900">
                  {item.time}
                </div>
                {index < items.length - 1 && (
                  <div className="mt-2 h-16 w-0.5 bg-gradient-to-b from-amber-400 to-amber-200"></div>
                )}
              </div>
              <div className="flex-1 pb-8">
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {item.activity}
                </h3>
                <p className="leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
