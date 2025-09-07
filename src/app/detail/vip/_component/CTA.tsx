interface CTAProps {
  heading: string;
  subheading: string;
}

export default function CTA({ heading, subheading }: CTAProps) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 text-center text-white">
      <h2 className="mb-4 text-3xl font-light">{heading}</h2>
      <p className="text-amber-200">{subheading}</p>
    </section>
  );
}
