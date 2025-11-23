import Script from "next/script";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"
        strategy="beforeInteractive"
        id="jquery-cdn"
      />
    </>
  );
}
