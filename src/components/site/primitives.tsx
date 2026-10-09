import type { ReactNode } from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import type { Risk } from "@/lib/site-data";
import cyberBanner from "@/assets/login-bg.jpg";

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt = "CyberSafe security banner",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  const activeImage = imageSrc || cyberBanner;
  const isDefaultBanner = !imageSrc || imageSrc === cyberBanner;

  return (
    <section className="relative isolate min-h-[22rem] overflow-hidden border-b border-border/40 bg-navy sm:min-h-[26rem]">
      <img
        src={activeImage}
        alt={imageAlt}
        width={1600}
        height={900}
        loading="eager"
        className={cn(
          "absolute inset-0 -z-20 size-full object-cover",
          isDefaultBanner ? "object-[70%_center] scale-x-[-1]" : "object-[62%_center]"
        )}
        style={{
          filter: "brightness(0.68) contrast(1.12) saturate(1.15)",
        }}
      />
      <div className="hero-gradient absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto flex min-h-[22rem] w-full max-w-7xl items-end px-4 py-12 sm:min-h-[26rem] sm:px-6 sm:py-16">
        <div>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/75 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function Section({
  title,
  description,
  id,
  children,
  className,
}: {
  title?: string;
  description?: string;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16", className)}
    >
      {title ? (
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {description ? <p className="mt-3 text-muted-foreground">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

const riskStyles: Record<Risk, string> = {
  Low: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  High: "bg-destructive/12 text-destructive border-destructive/30",
  Critical: "bg-destructive text-destructive-foreground border-destructive",
};

export function RiskBadge({ risk }: { risk: Risk }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        riskStyles[risk],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {risk} risk
    </span>
  );
}

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const set = Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const Cmp = set[name] ?? Icons.ShieldAlert;
  return <Cmp className={className ?? ""} />;
}
