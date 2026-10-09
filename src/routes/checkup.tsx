import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { PageHero, Section } from "@/components/site/primitives";
import { ScoreRing } from "@/components/site/ScoreRing";
import checkupBanner from "@/assets/threats/account-hacking.jpg";

export const Route = createFileRoute("/checkup")({
  head: () => ({
    meta: [
      { title: "Cyber Safety Checkup — Score your habits | CyberSafe" },
      {
        name: "description",
        content:
          "Answer seven questions to get a 0–100 digital safety score with your strong areas, weak areas and recommended actions.",
      },
      { property: "og:title", content: "Cyber Safety Checkup — CyberSafe" },
      {
        property: "og:description",
        content: "A quick self-assessment of your passwords, devices, privacy and browsing habits.",
      },
    ],
  }),
  component: CheckupPage,
});

type Q = {
  id: string;
  text: string;
  good: "yes" | "no";
  strong: string;
  weak: string;
  action: string;
};

const questions: Q[] = [
  {
    id: "unique",
    text: "Do you use a unique password for every important account?",
    good: "yes",
    strong: "Unique passwords — one leak cannot spread",
    weak: "Password reuse",
    action:
      "Set up a password manager and replace reused passwords, starting with email and banking.",
  },
  {
    id: "mfa",
    text: "Do you use multi-factor authentication (MFA) on your main accounts?",
    good: "yes",
    strong: "MFA enabled",
    weak: "No second factor",
    action:
      "Turn on app-based MFA for email, banking and social accounts, and store recovery codes offline.",
  },
  {
    id: "updates",
    text: "Are your devices and apps set to update automatically?",
    good: "yes",
    strong: "Devices kept up to date",
    weak: "Delayed updates",
    action: "Enable automatic updates on your phone, computer and browser today.",
  },
  {
    id: "privacy",
    text: "Do you review privacy settings and app permissions at least twice a year?",
    good: "yes",
    strong: "Regular privacy reviews",
    weak: "Permissions never reviewed",
    action: "Work through the privacy checklist and set location to 'while using the app'.",
  },
  {
    id: "wifi",
    text: "Do you use public Wi-Fi for banking or shopping?",
    good: "no",
    strong: "Sensitive tasks kept off public Wi-Fi",
    weak: "Sensitive use of public Wi-Fi",
    action: "Use mobile data or a trusted VPN for payments and account logins.",
  },
  {
    id: "links",
    text: "Do you click links in unexpected messages to check what they are?",
    good: "no",
    strong: "Careful with unexpected links",
    weak: "Clicking unknown links",
    action: "Open services from bookmarks or official apps instead of message links.",
  },
  {
    id: "apps",
    text: "Do you install apps or software from unofficial sources?",
    good: "no",
    strong: "Apps from official sources only",
    weak: "Unofficial downloads",
    action: "Uninstall software from unofficial sources and run a full device scan.",
  },
];

const STORAGE_KEY = "cybersafe-checkup";

function CheckupPage() {
  const { t } = useI18n();
  const [answers, setAnswers] = React.useState<Record<string, "yes" | "no">>({});
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, "yes" | "no">;
        setAnswers(saved);
        if (Object.keys(saved).length === questions.length) setSubmitted(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const answered = Object.keys(answers).length;
  const correct = questions.filter((q) => answers[q.id] === q.good);
  const wrong = questions.filter((q) => answers[q.id] && answers[q.id] !== q.good);
  const score = Math.round((correct.length / questions.length) * 100);

  function setAnswer(id: string, value: "yes" | "no") {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function submit() {
    if (answered < questions.length) {
      toast.error("Please answer all seven questions first.");
      return;
    }
    setSubmitted(true);
    toast.success("Your digital safety score is ready");
  }

  return (
    <>
      <PageHero
        eyebrow={t("page.checkup.eyebrow")}
        title={t("page.checkup.title")}
        description={t("page.checkup.desc")}
        imageSrc={checkupBanner}
        imageAlt="Interactive cybersecurity audit and security checkup"
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Self-assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {questions.map((q, i) => (
                <fieldset key={q.id} className="rounded-xl border p-4">
                  <legend className="px-1 text-sm font-medium">
                    {i + 1}. {q.text}
                  </legend>
                  <div className="mt-3 flex gap-2">
                    {(["yes", "no"] as const).map((v) => (
                      <Button
                        key={v}
                        size="sm"
                        variant={answers[q.id] === v ? "default" : "outline"}
                        onClick={() => setAnswer(q.id, v)}
                        aria-pressed={answers[q.id] === v}
                      >
                        {v === "yes" ? "Yes" : "No"}
                      </Button>
                    ))}
                  </div>
                </fieldset>
              ))}
              <div className="flex flex-wrap gap-3">
                <Button onClick={submit}>Calculate my score</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                    localStorage.removeItem(STORAGE_KEY);
                    toast("Checkup reset");
                  }}
                >
                  <RotateCcw className="mr-2 size-4" /> Reset
                </Button>
                <span className="self-center text-sm text-muted-foreground">
                  {answered}/{questions.length} answered
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card h-fit">
            <CardHeader>
              <CardTitle>Your result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {!submitted ? (
                <p className="text-sm text-muted-foreground">
                  Answer all seven questions and your score, strong areas and recommended actions
                  will appear here.
                </p>
              ) : (
                <>
                  <div className="flex flex-col items-center gap-3">
                    <ScoreRing score={score} />
                    <p className="font-display text-lg font-semibold" aria-live="polite">
                      Your Digital Safety Score: {score}/100
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-success">Strong areas</h3>
                    {correct.length === 0 ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Nothing here yet — every habit below is a quick win.
                      </p>
                    ) : (
                      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                        {correct.map((q) => (
                          <li key={q.id}>• {q.strong}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-destructive">Weak areas</h3>
                    {wrong.length === 0 ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        No weak areas found — keep reviewing every few months.
                      </p>
                    ) : (
                      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                        {wrong.map((q) => (
                          <li key={q.id}>• {q.weak}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {wrong.length > 0 ? (
                    <div>
                      <h3 className="text-sm font-semibold">Recommended actions</h3>
                      <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                        {wrong.map((q, i) => (
                          <li key={q.id} className="flex gap-2">
                            <span className="font-semibold text-primary">{i + 1}.</span>
                            {q.action}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}

                  <Button asChild variant="outline" className="w-full">
                    <Link to="/learn">Start a matching lesson</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
