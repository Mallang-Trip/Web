export async function GET(request: Request) {
  const url = new URL(request.url);
  const message = url.searchParams.get("message") || "";
  const location = `/payple/failure?message=${encodeURIComponent(message)}`;
  return new Response(null, { status: 302, headers: { Location: location } });
}
