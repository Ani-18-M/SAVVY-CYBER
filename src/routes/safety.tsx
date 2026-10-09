import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Laptop, Globe, Mail, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { PageHero, Section } from "@/components/site/primitives";
import { PasswordChecker } from "@/components/site/PasswordChecker";
import safetyBanner from "@/assets/threats/password-attacks.jpg";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Digital Safety Dashboard — CyberSafe" },
      {
        name: "description",
        content:
          "Practical password, device, internet, email and social media safety guidance, plus a private password strength checker.",
      },
      { property: "og:title", content: "Digital Safety Dashboard — CyberSafe" },
      {
        property: "og:description",
        content:
          "Passwords, devices, browsing, email and social media — safety habits that actually work.",
      },
    ],
  }),
  component: SafetyPage,
});

const areas = [
  {
    id: "password",
    label: "Password safety",
    icon: KeyRound,
    intro:
      "Passwords are the front door of your digital life. Length, uniqueness and a second factor matter far more than symbols.",
    tips: [
      [
        "Strong passwords",
        "Use 14+ characters. Four unrelated words are easy to remember and hard to guess.",
      ],
      [
        "Unique passwords",
        "One password per account, so a single leak cannot open everything else.",
      ],
      [
        "Password managers",
        "A reputable manager generates and stores credentials so you only remember one passphrase.",
      ],
      [
        "Multi-factor authentication",
        "Prefer an authenticator app or security key over SMS codes.",
      ],
      [
        "No reuse",
        "Never recycle old passwords with a number added — attackers test those variations first.",
      ],
    ],
  },
  {
    id: "device",
    label: "Device safety",
    icon: Laptop,
    intro:
      "A well-maintained device blocks most attacks by default. These five habits cover phones, tablets and computers.",
    tips: [
      [
        "Keep software updated",
        "Enable automatic updates — patches close the exact holes attackers use.",
      ],
      [
        "Use screen locks",
        "A PIN, biometric or password stops casual access if the device is lost.",
      ],
      [
        "Install trusted applications",
        "Official stores and vendor sites only; check the developer name.",
      ],
      ["Enable device encryption", "Encryption protects data even if the device is stolen."],
      [
        "Avoid unknown USB devices",
        "Never plug in found drives or use untrusted public charging ports.",
      ],
    ],
  },
  {
    id: "internet",
    label: "Internet safety",
    icon: Globe,
    intro: "Your browser is where most risk arrives. A few settings and habits remove most of it.",
    tips: [
      ["Safe browsing", "Type addresses or use bookmarks for banking and government services."],
      ["HTTPS awareness", "The padlock means encrypted, not honest — always read the domain too."],
      [
        "Avoid suspicious downloads",
        "Cracked software and 'codec' downloads are the most common malware source.",
      ],
      ["Public Wi-Fi precautions", "Use mobile data or a trusted VPN for anything sensitive."],
      [
        "Secure browser settings",
        "Block pop-ups and trackers, and remove extensions you no longer use.",
      ],
    ],
  },
  {
    id: "email",
    label: "Email safety",
    icon: Mail,
    intro:
      "Email is the most common delivery route for phishing and malware. Slow down before clicking.",
    tips: [
      [
        "Identifying phishing emails",
        "Urgency, threats or unexpected rewards are the strongest signals.",
      ],
      [
        "Suspicious attachments",
        "Do not open unexpected archives, documents asking to enable macros or scripts.",
      ],
      ["Fake links", "Hover or long-press to reveal the real destination before tapping."],
      [
        "Spoofed senders",
        "Display names are easy to fake — read the full address after the @ symbol.",
      ],
      [
        "Report, don't just delete",
        "Reporting helps your provider protect others from the same campaign.",
      ],
    ],
  },
  {
    id: "social",
    label: "Social media safety",
    icon: Users,
    intro:
      "Social profiles are the research material for targeted attacks. Share less, verify more.",
    tips: [
      [
        "Privacy settings",
        "Review who can see posts, friend lists and tagged photos every few months.",
      ],
      ["Oversharing", "Boarding passes, ID cards, addresses and school names help impersonators."],
      ["Fake profiles", "Check account age, mutual contacts and reverse-search profile photos."],
      ["Location sharing", "Turn off live location and post travel photos after returning home."],
      ["Social engineering", "Verify money or code requests by calling the person directly."],
    ],
  },
];

function SafetyPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("page.safety.eyebrow")}
        title={t("page.safety.title")}
        description={t("page.safety.desc")}
        imageSrc={safetyBanner}
        imageAlt="Digital password protection and account defense"
      />

      <Section>
        <Tabs defaultValue="password">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
            {areas.map((a) => (
              <TabsTrigger key={a.id} value={a.id} className="gap-2">
                <a.icon className="size-4" aria-hidden="true" />
                {a.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {areas.map((a) => (
            <TabsContent key={a.id} value={a.id} className="mt-8">
              <p className="max-w-2xl text-muted-foreground">{a.intro}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {a.tips.map(([title, text]) => (
                  <Card key={title} className="glass-card lift h-full">
                    <CardHeader>
                      <CardTitle className="text-base">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      <Section
        id="password-checker"
        title="Test a password pattern"
        description="This checker never transmits or stores anything. Use a variation, not your real password."
      >
        <div className="max-w-2xl">
          <PasswordChecker />
        </div>
      </Section>
    </>
  );
}
