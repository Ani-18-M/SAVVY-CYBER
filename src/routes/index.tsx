import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Fingerprint,
  GraduationCap,
  Lock,
  ShieldCheck,
  Siren,
  Smartphone,
  Eye,
} from "lucide-react";
import heroImage from "@/assets/hero-shield.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, RiskBadge, DynamicIcon } from "@/components/site/primitives";
import { stats, threats } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n";
import { threatImage } from "@/lib/threat-images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberSafe — Stay Safe. Stay Smart. Stay Secure." },
      {
        name: "description",
        content:
          "Free cyber awareness portal for students, families and employees: threat guides, scam red flags, privacy tools and an interactive safety score.",
      },
      { property: "og:title", content: "CyberSafe — Cyber Awareness & Digital Safety" },
      {
        property: "og:description",
        content:
          "Build digital safety skills and protect yourself from cyber threats, scams, data theft and online attacks.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    icon: Lock,
    title: "Password & account security",
    text: "Passphrases, managers and multi-factor authentication explained simply.",
    to: "/safety",
  },
  {
    icon: Eye,
    title: "Scam recognition",
    text: "Ten common scams with red flags and realistic sample messages.",
    to: "/scams",
  },
  {
    icon: Fingerprint,
    title: "Digital privacy",
    text: "Cookies, tracking, permissions and a checklist that saves your progress.",
    to: "/privacy",
  },
  {
    icon: Smartphone,
    title: "Device & network safety",
    text: "Updates, encryption, public Wi-Fi and safe browsing habits.",
    to: "/safety",
  },
  {
    icon: GraduationCap,
    title: "Structured learning",
    text: "Beginner to advanced lessons, each with key points and a quiz.",
    to: "/learn",
  },
  {
    icon: Siren,
    title: "Incident response",
    text: "A calm, step-by-step guide for anyone who has been hacked or scammed.",
    to: "/incident",
  },
];

function Home() {
  const { t } = useI18n();
  const featured = threats.slice(0, 6);

  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-navy">
        <img
          src={heroImage}
          width={1280}
          height={960}
          alt="Digital shield protecting a laptop, smartphone, cloud storage and personal data records"
          className="absolute inset-0 -z-20 size-full object-cover object-[62%_center]"
        />
        <div className="hero-gradient absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-7xl items-center px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-navy/55 px-3 py-1 text-xs font-semibold text-cyan backdrop-blur-md">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              {t("hero.badge")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-primary-foreground sm:text-5xl lg:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
              {t("hero.sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link to="/learn">
                  {t("cta.start")} <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section className="!py-10">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-card lift rounded-lg border-l-2 border-l-primary p-6"
            >
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 font-display text-3xl font-bold text-gradient">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <div className="section-tint">
        <Section
          title="Awareness → Prevention → Detection → Safe response"
          description="Six practical areas that cover almost every risk an individual faces online."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <Link key={p.title} to={p.to} className="group">
                <Card className="glass-card lift h-full border-border/80">
                  <CardHeader>
                    <span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary">
                      <p.icon className="size-5" aria-hidden="true" />
                    </span>
                    <CardTitle className="mt-3 text-lg">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{p.text}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                      Explore
                      <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      <Section
        title="Threats people meet most often"
        description="Every threat page explains how it works, its warning signs, prevention and what to do if you are affected."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((th) => (
            <Card key={th.slug} className="glass-card lift h-full overflow-hidden pt-0">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={threatImage(th.slug)}
                  alt={`${th.name} cyber threat illustration`}
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                  <span className="grid size-10 place-items-center rounded-md bg-background/85 text-primary backdrop-blur">
                    <DynamicIcon name={th.icon} className="size-5" />
                  </span>
                  <RiskBadge risk={th.risk} />
                </div>
              </div>
              <CardHeader className="space-y-3 pb-3">
                <CardTitle className="text-lg">{th.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{th.short}</p>
                <Button asChild variant="link" className="mt-3 px-0">
                  <Link to="/threats/$slug" params={{ slug: th.slug }}>
                    Learn more <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/threats">See all 12 threats</Link>
          </Button>
        </div>
      </Section>

      <Section>
        <div className="relative isolate overflow-hidden rounded-lg border border-warning/30 bg-navy p-8 text-primary-foreground sm:p-12">
          <div className="hero-gradient -z-10" aria-hidden="true" />
          <h2 className="max-w-2xl text-2xl font-bold sm:text-3xl">
            Never share your OTP, PIN, CVV, password, or authentication code with anyone.
          </h2>
          <p className="mt-4 max-w-2xl text-primary-foreground/70">
            No bank, employer, delivery service or government office will ever ask for them. If
            someone does, the request itself is the fraud.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/scams">Spot the scam</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/incident">I've been hacked or scammed</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
