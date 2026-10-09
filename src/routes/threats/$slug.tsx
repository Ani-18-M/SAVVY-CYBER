import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, CheckCircle2, LifeBuoy, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero, RiskBadge, Section, DynamicIcon } from "@/components/site/primitives";
import { threats } from "@/lib/site-data";
import { threatImage } from "@/lib/threat-images";

export const Route = createFileRoute("/threats/$slug")({
  loader: ({ params }) => {
    const threat = threats.find((t) => t.slug === params.slug);
    if (!threat) throw notFound();
    return { threat };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Threat not found — CyberSafe" }, { name: "robots", content: "noindex" }],
      };
    }
    const { threat } = loaderData;
    const title = `${threat.name} — Cyber Threats | CyberSafe`;
    return {
      meta: [
        { title },
        { name: "description", content: threat.short },
        { property: "og:title", content: title },
        { property: "og:description", content: threat.short },
      ],
    };
  },
  component: ThreatDetail,
});

function ThreatDetail() {
  const { threat } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Threat profile"
        title={threat.name}
        description={threat.short}
        imageSrc={threatImage(threat.slug)}
        imageAlt={threat.name}
      >
        <div className="flex flex-wrap items-center gap-3">
          <RiskBadge risk={threat.risk} />
          <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
            <DynamicIcon name={threat.icon} className="size-5" />
          </span>
          <Button asChild variant="outline" size="sm">
            <Link to="/threats">
              <ArrowLeft className="mr-1 size-4" /> All threats
            </Link>
          </Button>
        </div>
      </PageHero>

      <Section className="pt-0">
        <img
          src={threatImage(threat.slug)}
          alt={`${threat.name} illustration`}
          width={1024}
          height={640}
          loading="eager"
          className="aspect-[16/7] w-full rounded-2xl border border-border object-cover"
        />
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle>What it is</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{threat.what}</p>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <ListOrdered className="size-4 text-primary" aria-hidden="true" /> How it works
                </h3>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {threat.how.map((h, i) => (
                    <li key={h} className="flex gap-3">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary">
                        {i + 1}
                      </span>
                      {h}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-xl border bg-secondary/40 p-4">
                <h3 className="text-sm font-semibold">Real-world style example</h3>
                <p className="mt-2 text-sm italic text-muted-foreground">{threat.example}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Illustrative scenario for awareness — names and details are fictional.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle className="size-4 text-warning" aria-hidden="true" /> Warning signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {threat.signs.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-warning" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle2 className="size-4 text-success" aria-hidden="true" /> How to prevent
                  it
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {threat.prevent.map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-destructive/40 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <LifeBuoy className="size-4 text-destructive" aria-hidden="true" /> If you are
                  affected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {threat.ifAffected.map((a, i) => (
                    <li key={a} className="flex gap-3">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-destructive/15 text-[11px] font-bold text-destructive">
                        {i + 1}
                      </span>
                      {a}
                    </li>
                  ))}
                </ol>
                <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                  <Link to="/incident">Full emergency guide</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
