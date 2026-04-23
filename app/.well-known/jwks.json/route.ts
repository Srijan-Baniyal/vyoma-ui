export function GET(): Response {
  return Response.json(
    {
      keys: [],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=1800",
      },
    }
  );
}
