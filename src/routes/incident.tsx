import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertOctagon, PhoneCall, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { PageHero, Section } from "@/components/site/primitives";
import incidentBanner from "@/assets/threats/financial-fraud.jpg";

export const Route = createFileRoute("/incident")({
  head: () => ({
    meta: [
      { title: "What To Do If You've Been Hacked or Scammed — CyberSafe" },
      {
        name: "description",
        content:
          "A calm ten-step emergency guide for hacked accounts, fraud and infected devices, and clear guidance on when to involve professionals.",
      },
      { property: "og:title", content: "Hacked or scammed? Emergency steps — CyberSafe" },
      {
        property: "og:description",
        content: "Contain, preserve evidence, recover and report — in the right order.",
      },
    ],
  }),
  component: IncidentPage,
});

const steps: [string, string][] = [
  [
    "Stay calm",
    "Panic causes mistakes. Work through this list in order; a few minutes of care beats an hour of guessing.",
  ],
  [
    "Disconnect if needed",
    "If a device is infected or being controlled remotely, disconnect it from Wi-Fi and mobile data.",
  ],
  [
    "Change affected passwords",
    "Use a device you trust. Start with your email, then banking, then anything sharing that password.",
  ],
  [
    "Enable MFA",
    "Add multi-factor authentication while you are in the settings, and save recovery codes offline.",
  ],
  [
    "Contact the bank or service provider",
    "Use the number printed on your card or inside the official app — never a number from the message.",
  ],
  [
    "Check account activity",
    "Review recent logins, devices, forwarding rules, linked apps and payment mandates.",
  ],
  [
    "Report suspicious activity",
    "Report to the platform and to your national cybercrime authority. Early reports improve recovery chances.",
  ],
  [
    "Preserve evidence",
    "Keep unedited screenshots, transaction IDs, sender addresses and timestamps before deleting anything.",
  ],
  [
    "Scan devices",
    "Run a full scan with updated, reputable security software; remove unknown apps and extensions.",
  ],
  [
    "Monitor accounts",
    "Watch statements, credit activity and login alerts for several weeks afterwards.",
  ],
];

function IncidentPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("page.incident.eyebrow")}
        title={t("page.incident.title")}
        description={t("page.incident.desc")}
        imageSrc={incidentBanner}
        imageAlt="Cyber incident recovery and financial fraud mitigation"
      />

      <Section className="!pb-0">
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertOctagon className="size-5 text-destructive" />
          <AlertTitle>If money has moved, act within minutes</AlertTitle>
          <AlertDescription>
            Call your bank's official fraud number immediately and ask them to freeze the account
            and trace the transfer, then file a complaint with your national cybercrime portal or
            police cyber cell.
          </AlertDescription>
        </Alert>
      </Section>

      <Section>
        <ol className="grid gap-5 md:grid-cols-2">
          {steps.map(([title, text], i) => (
            <li key={title}>
              <Card className="glass-card lift h-full">
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 font-display font-bold text-primary">
                    {i + 1}
                  </span>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="General advice vs. professional help">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="border-success/40 bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-4 text-success" aria-hidden="true" /> You can usually
                handle these yourself
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Changing passwords and enabling multi-factor authentication</li>
                <li>• Signing out unknown sessions and removing linked apps</li>
                <li>• Running a security scan and removing unknown apps</li>
                <li>• Reporting a scam profile, advert or phishing message</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-destructive/40 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <PhoneCall className="size-4 text-destructive" aria-hidden="true" /> Get official or
                professional help
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • Money lost, card misuse or unauthorised loans — bank plus cybercrime report
                </li>
                <li>• Ransomware or a compromised work device — IT team or incident responders</li>
                <li>• Identity theft, SIM swap or forged documents — police and credit bureaus</li>
                <li>• Threats, blackmail or intimate image abuse — police and support helplines</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          This page is educational guidance, not legal advice. Contact details for reporting differ
          by country — always use numbers and portals published by your bank or government.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/checkup">Check your habits</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/resources">Browse resources</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
