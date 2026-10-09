import { createFileRoute } from "@tanstack/react-router";
import {
  Cookie,
  Database,
  MapPin,
  ScanFace,
  Settings2,
  Share2,
  ShieldQuestion,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { PageHero, Section } from "@/components/site/primitives";
import { PrivacyChecklist } from "@/components/site/PrivacyChecklist";
import privacyBanner from "@/assets/threats/identity-theft.jpg";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Digital Privacy Center — CyberSafe" },
      {
        name: "description",
        content:
          "Understand personal data, cookies, tracking, location and app permissions, then work through an interactive privacy checklist.",
      },
      { property: "og:title", content: "Digital Privacy Center — CyberSafe" },
      {
        property: "og:description",
        content:
          "What your data reveals, who collects it, and the seven actions that reduce exposure.",
      },
    ],
  }),
  component: PrivacyPage,
});

const topics = [
  {
    icon: Database,
    title: "What personal data is",
    text: "Anything that identifies you directly or in combination: name, phone, ID numbers, location history, device identifiers, even your typing patterns.",
  },
  {
    icon: ShieldQuestion,
    title: "Why privacy matters",
    text: "Data collected for convenience can be leaked, resold or used to target you with convincing fraud. Less exposure means less risk.",
  },
  {
    icon: Cookie,
    title: "Cookies",
    text: "Cookies keep you logged in, but third-party cookies also follow you across sites. Reject non-essential cookies and clear them periodically.",
  },
  {
    icon: Share2,
    title: "Tracking",
    text: "Pixels, fingerprinting and ad identifiers build a profile of your interests. Tracker blocking and limited ad personalisation reduce it.",
  },
  {
    icon: MapPin,
    title: "Location data",
    text: "Continuous location reveals your home, workplace and routine. Set apps to 'while using' and disable precise location where it isn't needed.",
  },
  {
    icon: Settings2,
    title: "App permissions",
    text: "Ask why an app needs contacts, microphone or storage. Revoke anything unrelated to its core function.",
  },
  {
    icon: ScanFace,
    title: "Social media privacy",
    text: "Audit visibility of posts, friend lists and tags. Old public posts are the easiest research material for attackers.",
  },
  {
    icon: Database,
    title: "Data collection",
    text: "Prefer services that explain what they collect and let you export or delete it. Delete accounts you no longer use.",
  },
];

function PrivacyPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("page.privacy.eyebrow")}
        title={t("page.privacy.title")}
        description={t("page.privacy.desc")}
        imageSrc={privacyBanner}
        imageAlt="Digital privacy and personal identity protection"
      />

      <Section title="Privacy essentials">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <Card key={t.title} className="glass-card lift h-full">
              <CardHeader>
                <span className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary">
                  <t.icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="mt-3 text-base">{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Take action"
        description="Tick each item as you complete it — progress is saved on this device."
      >
        <div className="max-w-2xl">
          <PrivacyChecklist />
        </div>
      </Section>
    </>
  );
}
