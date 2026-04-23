import { componentMap } from "@/data/ComponentMapping";

interface ComponentSearchResult {
  category: string;
  description: string;
  name: string;
  route: string;
}

const stripHtml = (value: string): string =>
  value.replace(/<[^>]*>/g, "").trim();

const normalize = (value: string): string => value.toLowerCase().trim();

export function GET(request: Request): Response {
  const requestUrl = new URL(request.url);
  const query = normalize(requestUrl.searchParams.get("q") ?? "");

  const allComponents: ComponentSearchResult[] = Object.entries(
    componentMap
  ).flatMap(([category, entries]) =>
    entries.map((entry) => ({
      category,
      name: entry.name,
      route: entry.route,
      description: stripHtml(entry.description),
    }))
  );

  const matches =
    query.length === 0
      ? allComponents
      : allComponents.filter((entry) => {
          const haystack =
            `${entry.category} ${entry.name} ${entry.description}`.toLowerCase();
          return haystack.includes(query);
        });

  return Response.json(
    {
      query,
      count: matches.length,
      results: matches.slice(0, 25),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300",
      },
    }
  );
}
