export default function ApiDocsPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <h1 className="font-semibold text-3xl tracking-tight">
        Vyoma UI API Docs
      </h1>
      <p className="text-muted-foreground">
        Machine-readable API metadata for this site is available through
        discovery endpoints and OpenAPI.
      </p>

      <section className="space-y-2">
        <h2 className="font-medium text-xl">Endpoints</h2>
        <ul className="list-disc space-y-1 pl-6 text-sm">
          <li>/openapi.json</li>
          <li>/api/health</li>
          <li>/api/agent/components</li>
          <li>/api/agent-markdown</li>
          <li>/.well-known/api-catalog</li>
        </ul>
      </section>
    </main>
  );
}
