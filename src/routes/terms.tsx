import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/primitives";
import termsBanner from "@/assets/threats/ransomware.jpg";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — CyberSafe" },
      {
        name: "description",
        content:
          "Terms for using the CyberSafe cyber awareness portal: educational purpose, no warranty, and acceptable use.",
      },
      { property: "og:title", content: "Terms of Use — CyberSafe" },
      { property: "og:description", content: "Educational use terms for the CyberSafe portal." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="Last updated: 2026. By using this site you agree to the terms below."
        imageSrc={termsBanner}
        imageAlt="Terms of use and acceptable digital policy"
      />
      <Section>
        <div className="max-w-3xl space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Educational purpose</h2>
            <p className="mt-2">
              All content is provided for general cyber awareness education. It is not legal,
              financial or professional security advice, and it may not reflect the rules or
              reporting channels of every country.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">No warranty</h2>
            <p className="mt-2">
              The material is offered "as is". Following it reduces risk but cannot guarantee
              protection from every attack. Verify critical steps with your bank, employer or the
              relevant authority.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Acceptable use</h2>
            <p className="mt-2">
              You may share and reuse this material for non-commercial awareness and education with
              attribution. You may not use the site to promote fraud, harassment or attacks on
              systems.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Examples and scenarios</h2>
            <p className="mt-2">
              Sample scam messages and case examples are fictional illustrations created for
              awareness training. Any resemblance to real people or organisations is unintended.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
