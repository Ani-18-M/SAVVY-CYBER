import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/primitives";
import policyBanner from "@/assets/threats/cyberbullying.jpg";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — CyberSafe" },
      {
        name: "description",
        content:
          "How CyberSafe handles information: no accounts, no tracking profiles, and all interactive tools running locally in your browser.",
      },
      { property: "og:title", content: "Privacy Policy — CyberSafe" },
      { property: "og:description", content: "Our data practices in plain language." },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: 2026. This awareness portal is designed to collect as little as possible."
        imageSrc={policyBanner}
        imageAlt="Privacy policy and data protection principles"
      />
      <Section>
        <div className="max-w-3xl space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">What we collect</h2>
            <p className="mt-2">
              No account is required and we do not ask for personal data to use the site. The
              password checker, privacy checklist, quizzes and safety checkup run entirely in your
              browser.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Local storage</h2>
            <p className="mt-2">
              Your checklist progress, quiz results, checkup answers, theme and language preference
              are saved in your browser's local storage on your device. Clearing site data removes
              them. They are never transmitted to us.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Passwords</h2>
            <p className="mt-2">
              The strength checker evaluates text locally and never sends, logs or stores it. Even
              so, we recommend testing a pattern rather than a real password.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Contact form</h2>
            <p className="mt-2">
              The contact form asks only for a name, email, subject and message. Please do not
              include passwords, OTPs, card numbers or identity documents.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Third parties</h2>
            <p className="mt-2">
              Web fonts are loaded from Google Fonts. We do not run advertising or cross-site
              tracking.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
