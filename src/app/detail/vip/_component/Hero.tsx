interface HeroProps {
  titleLines: string[];
  subtitleLines: string[];
  backgroundImage?: string;
  videoSrc?: string;
}

export default function Hero({
  titleLines,
  subtitleLines,
  backgroundImage,
  videoSrc,
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center text-white">
      {videoSrc ? (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,20,25,0.4),rgba(15,20,25,0.6))]" />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15,20,25,0.4), rgba(15,20,25,0.6)), url('${backgroundImage ?? ""}')`,
          }}
        />
      )}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <span className="mb-6 inline-block border border-amber-400 px-6 py-2 text-sm tracking-[0.3em] text-amber-300">
          VIP 프리미엄 경험
        </span>
        <h1 className="mb-4 text-4xl font-light md:text-6xl">
          {titleLines.map((line, idx) => (
            <span
              key={idx}
              className={idx === 1 ? "text-amber-400" : undefined}
            >
              {idx > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </h1>
        <p className="text-amber-200 md:text-lg">
          {subtitleLines.map((line, idx) => (
            <span key={idx}>
              {idx > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
