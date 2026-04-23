export function GET(): Response {
  return Response.json(
    {
      error: "unsupported_operation",
      error_description:
        "Interactive OAuth authorization is not enabled on this deployment.",
    },
    {
      status: 501,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
