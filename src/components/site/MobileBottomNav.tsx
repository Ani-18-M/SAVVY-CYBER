import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  ShieldAlert,
  GraduationCap,
  ClipboardCheck,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const { t } = useI18n();
  const { user } = useAuth();
  const currentPath = useRouterState({
    select: (router) => router.location.pathname,
  });

  const isActive = (to: string, exact?: boolean) =>
    exact ? currentPath === to : currentPath === to || currentPath.startsWith(`${to}/`);

  const navItems = [
    {
      to: "/",
      label: t("nav.home"),
      icon: Home,
      exact: true,
    },
    {
      to: "/threats",
      label: t("nav.threats"),
      icon: ShieldAlert,
    },
    {
      to: "/checkup",
      label: t("nav.checkup"),
      icon: ClipboardCheck,
    },
    {
      to: "/learn",
      label: t("nav.learn"),
      icon: GraduationCap,
    },
    {
      to: "/login",
      label: user ? (user.full_name?.split(" ")[0] || "Account") : t("nav.login"),
      icon: UserIcon,
      isAccount: true,
    },
  ];

  const userInitial = (user?.full_name?.[0] || user?.email?.[0] || "U").toUpperCase();

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
      style={{
        background: "rgba(5, 14, 31, 0.92)",
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 6px)",
      }}
    >
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const active = isActive(item.to, item.exact);
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200 active:scale-95",
                active ? "text-cyan-400 font-medium" : "text-slate-400 hover:text-slate-200"
              )}
            >
              {/* Active top glowing indicator pill */}
              {active && (
                <span className="absolute -top-[9px] h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}

              <div
                className={cn(
                  "relative flex size-9 items-center justify-center rounded-xl transition-all",
                  active
                    ? "bg-gradient-to-br from-blue-600/25 to-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40"
                    : "text-slate-400 group-hover:text-slate-200"
                )}
              >
                {item.isAccount && user ? (
                  <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-[11px] font-bold text-white shadow-sm">
                    {userInitial}
                  </span>
                ) : (
                  <Icon className={cn("size-5 transition-transform", active && "scale-110")} />
                )}
              </div>

              <span className="mt-1 text-[10px] tracking-tight truncate max-w-[56px] text-center leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
