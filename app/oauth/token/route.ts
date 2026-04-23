export function POST(): Response {
  return Response.json(
    {
      error: "unsupported_grant_type",
      error_description:
        "OAuth token issuance is not enabled on this deployment.",
    },
    {
      status: 501,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
