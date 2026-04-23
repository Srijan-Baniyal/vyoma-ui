export function GET(): Response {
  return Response.json(
    {
      error: "not_implemented",
      message:
        "MCP transport endpoint is discoverable but not enabled in this deployment.",
    },
    {
      status: 501,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
