export async function GET(request: Request) {
  const url = new URL(request.url);
  const paymentNumber =
    url.searchParams.get("PCD_PAY_OID") ||
    url.searchParams.get("paymentNumber") ||
    "";
  const location = `/payple/return?paymentNumber=${encodeURIComponent(
    paymentNumber,
  )}`;
  return new Response(null, { status: 302, headers: { Location: location } });
}
