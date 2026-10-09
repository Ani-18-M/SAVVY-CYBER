import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { PageHero, Section } from "@/components/site/primitives";
import contactBanner from "@/assets/threats/social-engineering.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Feedback — CyberSafe" },
      {
        name: "description",
        content:
          "Send questions, feedback or suggestions about the CyberSafe awareness portal, and read answers to frequently asked questions.",
      },
      { property: "og:title", content: "Contact & Feedback — CyberSafe" },
      {
        property: "og:description",
        content: "Questions, feedback and FAQs about the cyber awareness portal.",
      },
    ],
  }),
  component: ContactPage,
});

const faqs: [string, string][] = [
  [
    "Is this website free to use?",
    "Yes. Every guide, lesson, checklist and tool is free and needs no account.",
  ],
  [
    "Do you store my answers or passwords?",
    "No. The password checker, checklist and safety checkup all run in your browser and save only on your own device.",
  ],
  [
    "Can I use this material for a class or workshop?",
    "Yes, for non-commercial awareness and educational use. Please credit CyberSafe.",
  ],
  [
    "I have been scammed — can you recover my money?",
    "We cannot. Contact your bank's official fraud desk immediately and file a report with your national cybercrime authority; our incident page explains the order of steps.",
  ],
  [
    "Do you teach hacking?",
    "No. This is an awareness platform focused on prevention, detection and safe response only.",
  ],
];

function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [sending, setSending] = React.useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next["name"] = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      next["email"] = "Enter a valid email address.";
    if (form.subject.trim().length < 3) next["subject"] = "Please add a short subject.";
    if (form.message.trim().length < 10) next["message"] = "Please write at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success("Thanks! Your message has been recorded on this device.");
  }

  return (
    <>
      <PageHero
        eyebrow={t("page.contact.eyebrow")}
        title={t("page.contact.title")}
        description={t("page.contact.desc")}
        imageSrc={contactBanner}
        imageAlt="Contact CyberSafe community and support team"
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>
                We only ask for a name, email and message — nothing sensitive.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                {(
                  [
                    ["name", "Name", "Your name"],
                    ["email", "Email", "you@example.com"],
                    ["subject", "Subject", "What is this about?"],
                  ] as const
                ).map(([field, label, placeholder]) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{label}</Label>
                    <Input
                      id={field}
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                      placeholder={placeholder}
                      aria-invalid={Boolean(errors[field])}
                      aria-describedby={errors[field] ? `${field}-error` : undefined}
                      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    />
                    {errors[field] ? (
                      <p id={`${field}-error`} className="text-sm text-destructive">
                        {errors[field]}
                      </p>
                    ) : null}
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    placeholder="Your question, feedback or suggestion"
                    aria-invalid={Boolean(errors["message"])}
                    aria-describedby={errors["message"] ? "message-error" : undefined}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                  {errors["message"] ? (
                    <p id="message-error" className="text-sm text-destructive">
                      {errors["message"]}
                    </p>
                  ) : null}
                </div>

                <Button type="submit" disabled={sending} className="w-full">
                  {sending ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 size-4" /> Submit
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  This demo form does not send email yet — messages are not stored on a server.
                </p>
              </form>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Frequently asked questions</CardTitle>
              <CardDescription>Quick answers about the portal and its tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {faqs.map(([q, a], i) => (
                  <AccordionItem key={q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-sm">{q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
