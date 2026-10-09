import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { PageHero, Section } from "@/components/site/primitives";
import { resources } from "@/lib/site-data";
import resourcesBanner from "@/assets/threats/fake-websites.jpg";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resource Library — Guides & Checklists | CyberSafe" },
      {
        name: "description",
        content:
          "Searchable library of cybersecurity guides, safety checklists, password tips, scam awareness material and emergency resources.",
      },
      { property: "og:title", content: "Resource Library — CyberSafe" },
      {
        property: "og:description",
        content: "Find the right guide, checklist or emergency resource in seconds.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { t } = useI18n();
  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];
  const [category, setCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");

  const filtered = resources.filter((r) => {
    const q = query.trim().toLowerCase();
    return (
      (category === "All" || r.category === category) &&
      (!q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <PageHero
        eyebrow={t("page.resources.eyebrow")}
        title={t("page.resources.title")}
        description={t("page.resources.desc")}
        imageSrc={resourcesBanner}
        imageAlt="Cybersecurity verification tools and safety resource library"
      />

      <Section>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="w-full max-w-sm">
            <Label htmlFor="resource-search">Search resources</Label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="resource-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. checklist, scam, emergency"
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={category === c ? "default" : "outline"}
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <p className="font-semibold">Nothing found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a broader keyword or pick another category.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Reset
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <Card key={r.title} className="glass-card lift flex h-full flex-col">
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{r.category}</Badge>
                    <Badge variant="outline">{r.type}</Badge>
                  </div>
                  <CardTitle className="text-base">{r.title}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto">
                  <p className="text-sm text-muted-foreground">{r.description}</p>
                  <Button asChild variant="link" className="mt-3 px-0">
                    <Link to={r.to}>
                      Open <ArrowRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
