import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { PageHero, Section } from "@/components/site/primitives";
import { LessonCard } from "@/components/site/LessonCard";
import { lessons } from "@/lib/site-data";
import learnBanner from "@/assets/threats/phishing.jpg";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learning Center — Cyber Safety Lessons | CyberSafe" },
      {
        name: "description",
        content:
          "Beginner to advanced cyber safety lessons with key points, safety checklists and a quiz for every topic.",
      },
      { property: "og:title", content: "Learning Center — CyberSafe" },
      {
        property: "og:description",
        content: "Thirteen structured lessons across beginner, intermediate and advanced levels.",
      },
    ],
  }),
  component: LearnPage,
});

const levels = ["All", "Beginner", "Intermediate", "Advanced"] as const;

function LearnPage() {
  const { t } = useI18n();
  const [level, setLevel] = React.useState<(typeof levels)[number]>("All");
  const [query, setQuery] = React.useState("");

  const filtered = lessons.filter((l) => {
    const q = query.trim().toLowerCase();
    return (
      (level === "All" || l.level === level) &&
      (!q || l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <PageHero
        eyebrow={t("page.learn.eyebrow")}
        title={t("page.learn.title")}
        description={t("page.learn.desc")}
        imageSrc={learnBanner}
        imageAlt="Structured cybersecurity lessons and quiz modules"
      />

      <Section>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="w-full max-w-sm">
            <Label htmlFor="lesson-search">Search lessons</Label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="lesson-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. passwords, privacy"
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by difficulty">
            {levels.map((l) => (
              <Button
                key={l}
                size="sm"
                variant={level === l ? "default" : "outline"}
                onClick={() => setLevel(l)}
              >
                {l}
              </Button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <p className="font-semibold">No lessons match your search</p>
            <p className="mt-2 text-sm text-muted-foreground">Try another keyword or level.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setLevel("All");
              }}
            >
              Reset
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((l) => (
              <LessonCard key={l.slug} lesson={l} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
