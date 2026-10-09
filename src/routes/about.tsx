import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, GraduationCap, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { PageHero, Section } from "@/components/site/primitives";
import aboutBanner from "@/assets/login-bg.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CyberSafe — Cyber Awareness & Digital Safety" },
      {
        name: "description",
        content:
          "CyberSafe is an educational platform helping students, families and employees build safer digital habits and understand common cyber threats.",
      },
      { property: "og:title", content: "About CyberSafe" },
      {
        property: "og:description",
        content: "Our mission, vision, objectives and audience for public cyber awareness.",
      },
    ],
  }),
  component: AboutPage,
});

const blocks = [
  {
    icon: Target,
    title: "Mission",
    text: "Make practical cyber safety knowledge free, clear and available to everyone — regardless of technical background.",
  },
  {
    icon: Compass,
    title: "Vision",
    text: "A public where recognising a scam, protecting an account and responding to an incident are ordinary everyday skills.",
  },
  {
    icon: GraduationCap,
    title: "Objectives",
    text: "Explain threats plainly, provide checklists people actually use, and encourage safe reporting instead of silence.",
  },
  {
    icon: Users,
    title: "Target audience",
    text: "School and college students, parents and families, employees and small teams, and first-time internet users.",
  },
];

function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("page.about.eyebrow")}
        title={t("page.about.title")}
        description={t("page.about.desc")}
        imageSrc={aboutBanner}
        imageAlt="CyberSafe mission and team working to protect users online"
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {blocks.map((b) => (
            <Card key={b.title} className="glass-card lift h-full min-h-44 border-border/80">
              <CardHeader className="pb-3">
                <span className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
                  <b.icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="mt-3 text-base">{b.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <div className="section-tint">
        <Section title="Why cyber awareness matters">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-muted-foreground">
              <p>
                Most successful attacks do not defeat technology — they persuade a person. A message
                that creates urgency, a password reused from years ago, or an app permission granted
                without thought is usually enough.
              </p>
              <p>
                Awareness closes that gap. When people recognise the pattern behind a scam, know how
                to protect an account, and understand what to do in the first hour after an
                incident, the harm drops dramatically.
              </p>
              <p>
                Everything here follows one sequence: awareness, prevention, detection and safe
                response. Nothing on this site teaches how to attack systems.
              </p>
            </div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-base">Use it in your classroom or team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  The threat library, scam handbook and lessons work well as awareness sessions. The
                  safety checkup makes a good before-and-after exercise.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="sm">
                    <Link to="/learn">Open the learning center</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/contact">Send feedback</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      </div>
    </>
  );
}
