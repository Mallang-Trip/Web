import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface TimelineAltItem {
  time: string;
  text: string;
}

interface TimelineAltProps {
  heading: string;
  items: TimelineAltItem[];
}

export default function TimelineAlt({ heading, items }: TimelineAltProps) {
  return (
    <section>
      <Card className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <CardTitle className="mb-12 text-center text-3xl font-bold text-amber-800 md:text-4xl">
            {heading}
          </CardTitle>

          <CardContent className="px-0">
            <div className="relative mx-auto max-w-3xl">
              {/* 중앙 라인 (모바일에서는 숨김) */}
              <div className="absolute top-0 left-1/2 hidden h-full w-[3px] -translate-x-1/2 bg-gradient-to-b from-yellow-500 to-amber-200 md:block" />

              <div className="space-y-10">
                {items.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div
                      key={`${item.time}-${index}`}
                      className={`relative grid grid-cols-1 items-start gap-6 md:grid-cols-2`}
                    >
                      {/* 마커 점 (모바일 숨김) */}
                      <span
                        className={`absolute top-8 left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-4 border-amber-700 bg-white md:block`}
                      />

                      {isLeft ? (
                        <>
                          <div className="md:pr-8">
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                              <h3 className="text-lg font-semibold text-amber-900">
                                {item.time}
                              </h3>
                              <p className="mt-2 text-base leading-relaxed text-gray-700">
                                {item.text}
                              </p>
                            </div>
                          </div>
                          <div />
                        </>
                      ) : (
                        <>
                          <div />
                          <div className="md:pl-8">
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                              <h3 className="text-lg font-semibold text-amber-900">
                                {item.time}
                              </h3>
                              <p className="mt-2 text-base leading-relaxed text-gray-700">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
