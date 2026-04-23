import { AGENT_SKILL_ARTIFACTS } from "@/lib/agent/discovery";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ skill: string }> }
): Promise<Response> {
  const awaitedParams = await params;
  const skillName = awaitedParams.skill;
  const artifact = AGENT_SKILL_ARTIFACTS[skillName];

  if (!artifact) {
    return new Response("Skill not found\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(`${artifact}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=1800",
    },
  });
}
