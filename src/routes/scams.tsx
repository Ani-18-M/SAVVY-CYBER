import { createFileRoute } from "@tanstack/react-router";
import { AlertOctagon, Flag, MessageSquare, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useI18n } from "@/lib/i18n";
import { PageHero, Section } from "@/components/site/primitives";
import { scams } from "@/lib/site-data";
import scamsBanner from "@/assets/threats/online-scams.jpg";

export const Route = createFileRoute("/scams")({
  head: () => ({
    meta: [
      { title: "Spot the Scam — Scam Awareness Center | CyberSafe" },
      {
        name: "description",
        content:
          "Ten common scams — OTP, bank, payment, job, investment, shopping, lottery, fake support, romance and social media — with red flags and safe responses.",
      },
      { property: "og:title", content: "Spot the Scam — CyberSafe" },
      {
        property: "og:description",
        content:
          "Red flag, what the attacker does, how to stay safe — for the ten scams people meet most.",
      },
    ],
  }),
  component: ScamsPage,
});

function ScamsPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("page.scams.eyebrow")}
        title={t("page.scams.title")}
        description={t("page.scams.desc")}
        imageSrc={scamsBanner}
        imageAlt="Online scams awareness and fraudulent alerts"
      />

      <Section className="!pb-0">
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertOctagon className="size-5 text-destructive" />
          <AlertTitle className="font-display text-base">
            Never share your OTP, PIN, CVV, password, or authentication code with anyone.
          </AlertTitle>
          <AlertDescription>
            Not with bank staff, not with support agents, not with delivery partners. The request
            itself is the fraud.
          </AlertDescription>
        </Alert>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {scams.map((s) => (
            <Card key={s.name} className="glass-card lift flex h-full flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{s.name}</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-destructive">
                    <Flag className="size-3.5" aria-hidden="true" /> Red flag
                  </p>
                  <p className="mt-1 text-sm">{s.redFlag}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    What the attacker does
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.attacker}</p>
                </div>
                <div className="rounded-xl border border-success/30 bg-success/5 p-3">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-success">
                    <ShieldCheck className="size-3.5" aria-hidden="true" /> How to stay safe
                  </p>
                  <p className="mt-1 text-sm">{s.stayySafe}</p>
                </div>
                <figure className="rounded-xl border bg-secondary/40 p-3">
                  <figcaption className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <MessageSquare className="size-3.5" aria-hidden="true" /> Sample message
                    (fictional)
                  </figcaption>
                  <blockquote className="mt-1 text-sm italic">{s.sample}</blockquote>
                </figure>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
