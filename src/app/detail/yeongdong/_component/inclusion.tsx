import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface InclusionsProps {
  heading: string;
  includeTitle: string;
  includeItems: string[];
  excludeTitle: string;
  excludeItems: string[];
}

export default function Inclusion({
  heading,
  includeTitle,
  includeItems,
  excludeTitle,
  excludeItems,
}: InclusionsProps) {
  return (
    <section>
      <Card className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <CardTitle className="mb-12 text-center text-3xl font-bold text-amber-800 md:text-4xl">
            {heading}
          </CardTitle>
          <CardContent className="grid gap-8 px-0 md:grid-cols-2">
            <div className="rounded-xl border border-none bg-white p-6">
              <h3 className="mb-4 border-l-4 border-amber-700 pl-3 text-xl font-semibold text-amber-900">
                {includeTitle}
              </h3>
              <ul className="divide-y">
                {includeItems.map((text) => (
                  <li key={text} className="py-3 text-gray-700">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-none bg-white p-6">
              <h3 className="mb-4 border-l-4 border-amber-700 pl-3 text-xl font-semibold text-amber-900">
                {excludeTitle}
              </h3>
              <ul className="divide-y">
                {excludeItems.map((text) => (
                  <li key={text} className="py-3 text-gray-700">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
