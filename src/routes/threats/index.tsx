import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { PageHero, RiskBadge, Section, DynamicIcon } from "@/components/site/primitives";
import { riskOrder, threats, type Risk } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { threatImage } from "@/lib/threat-images";
import threatsBanner from "@/assets/threats/data-breaches.jpg";

export const Route = createFileRoute("/threats/")({
  head: () => ({
    meta: [
      { title: "Cyber Threats Explained — CyberSafe" },
      {
        name: "description",
        content:
          "Twelve common cyber threats with risk levels, warning signs, prevention steps and what to do if you are affected.",
      },
      { property: "og:title", content: "Cyber Threats Explained — CyberSafe" },
      {
        property: "og:description",
        content: "Phishing, malware, ransomware, identity theft and more — explained for everyone.",
      },
    ],
  }),
  component: ThreatsPage,
});

function ThreatsPage() {
  const { t } = useI18n();
  const [query, setQuery] = React.useState("");
  const [risk, setRisk] = React.useState<Risk | "All">("All");

  const filtered = threats.filter((t) => {
    const matchesRisk = risk === "All" || t.risk === risk;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || t.name.toLowerCase().includes(q) || t.short.toLowerCase().includes(q);
    return matchesRisk && matchesQuery;
  });

  return (
    <>
      <PageHero
        eyebrow={t("page.threats.eyebrow")}
        title={t("page.threats.title")}
        description={t("page.threats.desc")}
        imageSrc={threatsBanner}
        imageAlt="Server room data breach and cybersecurity attack"
      />

      <Section>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="w-full max-w-sm">
            <Label htmlFor="threat-search">Search threats</Label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="threat-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. phishing, ransomware"
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by risk level">
            {(["All", ...riskOrder] as const).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={risk === r ? "default" : "outline"}
                onClick={() => setRisk(r)}
              >
                {r}
              </Button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <p className="font-semibold">No threats match your filters</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different word or reset the risk filter.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setRisk("All");
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3")}>
            {filtered.map((th) => (
              <Card
                key={th.slug}
                className="group lift flex h-full flex-col overflow-hidden border-border/70 bg-card pt-0 shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={threatImage(th.slug)}
                    alt={`${th.name} illustration`}
                    width={1024}
                    height={576}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute right-3 top-3">
                    <RiskBadge risk={th.risk} />
                  </span>
                </div>
                <CardHeader className="relative space-y-2 pb-2">
                  <span className="absolute -top-6 left-5 grid size-12 place-items-center rounded-xl border border-border/60 bg-card text-primary shadow-md">
                    <DynamicIcon name={th.icon} className="size-5" />
                  </span>
                  <CardTitle className="pt-7 text-lg leading-snug">{th.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col pt-0">
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {th.short}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      to="/threats/$slug"
                      params={{ slug: th.slug }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      Learn more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
