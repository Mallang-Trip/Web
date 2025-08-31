import { Card, CardContent } from "@/components/ui/card";

export interface BreweryInfo {
  id: number;
  number: string;
  name: string;
  tagline: string;
  story: string;
  experienceTitle: string;
  experienceText: string;
  signatureTitle: string;
  signatureText: string;
}

interface BrewerySectionProps {
  breweries: BreweryInfo[];
}

export default function BrewerySection({ breweries }: BrewerySectionProps) {
  return (
    <>
      {breweries.map((brewery, index) => (
        <Card
          key={brewery.id}
          className={`rounded-2xl p-8 ${index % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-slate-50 to-white"}`}
        >
          <CardContent className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400 text-lg text-amber-600">
                {brewery.number}
              </div>
              <h2 className="mb-2 text-3xl font-light text-slate-900">
                {brewery.name}
              </h2>
              <p className="text-lg font-light text-amber-600 italic">
                {brewery.tagline}
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <div className="space-y-4">
                  <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500">
                    메인 사진
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 text-sm text-slate-400"
                      >
                        서브 {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-6 text-lg leading-relaxed font-light text-slate-600">
                  {brewery.story}
                </p>

                <div className="mb-6 border-l-4 border-amber-400 bg-white py-4 pl-4">
                  <h4 className="mb-2 text-lg font-medium text-slate-900">
                    {brewery.experienceTitle}
                  </h4>
                  <p className="leading-relaxed font-light text-slate-600">
                    {brewery.experienceText}
                  </p>
                </div>

                <div className="relative overflow-hidden bg-slate-900 p-6">
                  <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>
                  <h4 className="mb-2 text-lg font-medium text-amber-400">
                    {brewery.signatureTitle}
                  </h4>
                  <p className="leading-relaxed font-light text-amber-100">
                    {brewery.signatureText}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
