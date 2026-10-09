import * as React from "react";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import type { Lesson } from "@/lib/site-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cybersafe-quiz-scores";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = React.useState(false);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [passed, setPassed] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPassed(Boolean((JSON.parse(raw) as Record<string, boolean>)[lesson.slug]));
    } catch {
      /* ignore */
    }
  }, [lesson.slug]);

  function answer(index: number) {
    setPicked(index);
    if (index === lesson.quiz.answer) {
      setPassed(true);
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const map = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
        map[lesson.slug] = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
      } catch {
        /* ignore */
      }
      toast.success(`Correct — "${lesson.title}" quiz passed`);
    }
  }

  return (
    <Card className="glass-card lift flex min-h-[17rem] h-full flex-col overflow-hidden border-border/80 shadow-sm">
      <div className="h-1 w-full bg-primary/70" aria-hidden="true" />
      <CardHeader className="space-y-4 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{lesson.level}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" /> {lesson.minutes} min read
          </span>
          {passed ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
              <CheckCircle2 className="size-3.5" aria-hidden="true" /> Quiz passed
            </span>
          ) : null}
        </div>
        <CardTitle className="text-lg leading-snug">{lesson.title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto space-y-4">
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {lesson.summary}
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/25 hover:border-primary/50"
            >
              <BookOpen className="mr-2 size-4" /> Open lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{lesson.title}</DialogTitle>
              <DialogDescription>
                {lesson.level} · {lesson.minutes} minute read
              </DialogDescription>
            </DialogHeader>

            <p className="text-sm leading-relaxed">{lesson.summary}</p>

            <div>
              <h4 className="text-sm font-semibold">Key points</h4>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {lesson.keyPoints.map((k) => (
                  <li key={k} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Safety checklist</h4>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {lesson.checklist.map((k) => (
                  <li key={k} className="flex gap-2">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border bg-secondary/40 p-4">
              <h4 className="text-sm font-semibold">Quick quiz</h4>
              <p className="mt-1 text-sm">{lesson.quiz.question}</p>
              <div className="mt-3 grid gap-2">
                {lesson.quiz.options.map((opt, i) => {
                  const isAnswer = i === lesson.quiz.answer;
                  const chosen = picked === i;
                  return (
                    <Button
                      key={opt}
                      type="button"
                      onClick={() => answer(i)}
                      variant="outline"
                      className={cn(
                        "h-auto w-full justify-start whitespace-normal rounded-md px-3 py-2 text-left text-sm",
                        picked !== null && isAnswer && "border-success bg-success/10",
                        chosen && !isAnswer && "border-destructive bg-destructive/10",
                      )}
                    >
                      {opt}
                    </Button>
                  );
                })}
              </div>
              {picked !== null ? (
                <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
                  {picked === lesson.quiz.answer ? "Correct. " : "Not quite. "}
                  {lesson.quiz.explain}
                </p>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
