import * as React from "react";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const items = [
  "Review app permissions",
  "Enable two-factor authentication",
  "Review social media privacy settings",
  "Disable unnecessary location access",
  "Use secure, unique passwords",
  "Update devices and apps",
  "Review connected accounts and sessions",
];

const STORAGE_KEY = "cybersafe-privacy-checklist";

export function PrivacyChecklist() {
  const [done, setDone] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw) as string[]);
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done, ready]);

  const percent = Math.round((done.length / items.length) * 100);

  function toggle(item: string) {
    setDone((prev) => {
      const next = prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item];
      if (next.length === items.length) toast.success("Privacy checklist complete — well done!");
      return next;
    });
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Interactive privacy checklist</CardTitle>
        <CardDescription>
          Your progress is saved on this device only. Tick items as you complete them.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-primary" aria-live="polite">
              {percent}% complete ({done.length}/{items.length})
            </span>
          </div>
          <Progress value={percent} aria-label="Checklist progress" />
        </div>

        {!ready ? (
          <p className="text-sm text-muted-foreground">Loading your saved progress…</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => {
              const id = `chk-${item.replace(/\W+/g, "-").toLowerCase()}`;
              return (
                <li key={item} className="flex items-center gap-3 rounded-lg border p-3">
                  <Checkbox
                    id={id}
                    checked={done.includes(item)}
                    onCheckedChange={() => toggle(item)}
                  />
                  <label
                    htmlFor={id}
                    className={
                      done.includes(item)
                        ? "text-sm text-muted-foreground line-through"
                        : "text-sm font-medium"
                    }
                  >
                    {item}
                  </label>
                </li>
              );
            })}
          </ul>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setDone([]);
            toast("Checklist reset");
          }}
        >
          <RotateCcw className="mr-2 size-4" /> Reset checklist
        </Button>
      </CardContent>
    </Card>
  );
}
