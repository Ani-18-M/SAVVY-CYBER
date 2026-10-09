import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const explore = [
  { to: "/", key: "nav.home" },
  { to: "/threats", key: "nav.threats" },
  { to: "/safety", key: "nav.safety" },
  { to: "/privacy", key: "nav.privacy" },
  { to: "/scams", key: "nav.scams" },
] as const;

const more = [
  { to: "/learn", key: "nav.learn" },
  { to: "/checkup", key: "nav.checkup" },
  { to: "/incident", key: "nav.incident" },
  { to: "/resources", key: "nav.resources" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-20 border-t bg-navy text-primary-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid size-9 place-items-center rounded-md bg-cyan/15 text-cyan">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            CyberSafe
          </div>
          <p className="mt-3 max-w-sm text-sm text-primary-foreground/65">{t("footer.tagline")}</p>
          <p className="mt-4 max-w-sm text-xs text-primary-foreground/55">
            Educational content only. For an active crime, contact your bank's official fraud desk
            and your national cybercrime authority.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-semibold">{t("footer.explore")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {explore.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/60 hover:text-cyan">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="More pages">
          <h2 className="text-sm font-semibold">{t("footer.legal")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {more.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/60 hover:text-cyan">
                  {t(l.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/privacy-policy" className="text-primary-foreground/60 hover:text-cyan">
                {t("footer.privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-primary-foreground/60 hover:text-cyan">
                {t("footer.terms")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-primary-foreground/10 px-4 py-6 text-center text-xs text-primary-foreground/55 sm:px-6">
        {t("footer.rights")}
      </div>
    </footer>
  );
}
