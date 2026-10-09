import * as React from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Check = { label: string; ok: boolean };

function evaluate(value: string) {
  const checks: Check[] = [
    { label: "At least 12 characters", ok: value.length >= 12 },
    { label: "Mixes upper and lower case", ok: /[a-z]/.test(value) && /[A-Z]/.test(value) },
    { label: "Contains a number", ok: /\d/.test(value) },
    { label: "Contains a symbol", ok: /[^A-Za-z0-9]/.test(value) },
    {
      label: "No obvious words or repeats",
      ok: !/(password|1234|qwerty|admin|(.)\2{2,})/i.test(value),
    },
    {
      label: "Four or more words (passphrase)",
      ok:
        value
          .trim()
          .split(/[\s\-_.]+/)
          .filter(Boolean).length >= 4,
    },
  ];
  const passed = checks.filter((c) => c.ok).length;
  const score = value ? Math.round((passed / checks.length) * 100) : 0;
  const label =
    score >= 85
      ? "Excellent"
      : score >= 65
        ? "Strong"
        : score >= 40
          ? "Fair"
          : score > 0
            ? "Weak"
            : "Empty";
  return { checks, score, label };
}

export function PasswordChecker() {
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(false);
  const { checks, score, label } = evaluate(value);

  const tone =
    score >= 85
      ? "text-success"
      : score >= 65
        ? "text-primary"
        : score >= 40
          ? "text-warning"
          : "text-destructive";

  return (
    <Card className="glass-card lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
          Password strength checker
        </CardTitle>
        <CardDescription>
          Runs entirely in your browser — nothing is sent or stored. Test a pattern, not your real
          password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="pw-test">Sample password or passphrase</Label>
          <div className="flex gap-2">
            <Input
              id="pw-test"
              type={show ? "text" : "password"}
              value={value}
              autoComplete="off"
              placeholder="try: quiet-harbour-lamp-42"
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide text" : "Show text"}
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Strength</span>
            <span className={cn("font-semibold", tone)} aria-live="polite">
              {label} · {score}/100
            </span>
          </div>
          <Progress value={score} aria-label="Password strength" />
        </div>

        <ul className="grid gap-2 sm:grid-cols-2">
          {checks.map((c) => (
            <li key={c.label} className="flex items-start gap-2 text-sm">
              <span
                className={cn(
                  "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                  c.ok ? "bg-success/20 text-success" : "bg-muted text-muted-foreground",
                )}
                aria-hidden="true"
              >
                {c.ok ? "✓" : "–"}
              </span>
              <span className={c.ok ? "" : "text-muted-foreground"}>{c.label}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
