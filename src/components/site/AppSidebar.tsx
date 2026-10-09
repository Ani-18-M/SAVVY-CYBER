import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  ShieldAlert,
  Lock,
  Eye,
  AlertTriangle,
  GraduationCap,
  FolderOpen,
  Info,
  LifeBuoy,
  LogIn,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useI18n } from "@/lib/i18n";
import logo from "@/assets/logo.png";
import sidebarBg from "@/assets/login-bg.jpg";

const items = [
  { key: "nav.home", to: "/", icon: Home, exact: true },
  { key: "nav.threats", to: "/threats", icon: ShieldAlert },
  { key: "nav.safety", to: "/safety", icon: Lock },
  { key: "nav.privacy", to: "/privacy", icon: Eye },
  { key: "nav.scams", to: "/scams", icon: AlertTriangle },
  { key: "nav.learn", to: "/learn", icon: GraduationCap },
  { key: "nav.resources", to: "/resources", icon: FolderOpen },
  { key: "nav.about", to: "/about", icon: Info },
  { key: "nav.incident", to: "/incident", icon: LifeBuoy },
] as const;

export function AppSidebar() {
  const { t } = useI18n();
  const { user, signOut } = useAuth();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed" && !isMobile;
  const currentPath = useRouterState({
    select: (router) => router.location.pathname,
  });

  const userName = user?.full_name || (user?.email ? user.email.split("@")[0] : null);
  const userInitial = (userName?.[0] || user?.email?.[0] || "G").toUpperCase();

  const handleSignOut = () => {
    signOut();
    toast.success("Signed out successfully");
    if (isMobile) setOpenMobile(false);
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? currentPath === to : currentPath === to || currentPath.startsWith(`${to}/`);

  return (
    <Sidebar collapsible="icon" className="border-r border-white/10">
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        {/* ── Cyber Background Image Layer ── */}
        <div
          className="pointer-events-none absolute inset-0 -z-0 select-none overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={sidebarBg}
            alt=""
            className="h-full w-full object-cover object-[24%_center]"
            style={{
              filter: "brightness(0.65) saturate(1.2) contrast(1.1)",
            }}
          />
          {/* Deep cyber navy gradient overlay to keep text & active states 100% readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(6, 15, 36, 0.90) 0%, rgba(4, 11, 28, 0.84) 45%, rgba(2, 6, 18, 0.94) 100%)",
            }}
          />
          {/* Subtle neon cyan right-edge border glow */}
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-blue-500/20 via-cyan-400/35 to-blue-500/20" />
        </div>

        {/* ── Header ── */}
        <SidebarHeader className="relative z-10 border-b border-white/10 bg-transparent">
          <Link
            to="/"
            aria-label="CyberSafe home"
            className="group flex items-center gap-3 px-3 py-2.5"
            onClick={() => isMobile && setOpenMobile(false)}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/95 p-1 shadow-md shadow-blue-950/40 ring-1 ring-white/20 transition-transform group-hover:scale-105">
              <img
                src={logo}
                alt="CyberSafe"
                className="size-full object-contain"
                loading="eager"
              />
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  Cyber<span className="text-cyan">Safe</span>
                </span>
                <span className="block text-[11px] font-medium text-blue-200/70 tracking-wide">
                  Stay Aware, Stay Secure
                </span>
              </div>
            )}
          </Link>
        </SidebarHeader>

        {/* ── Content ── */}
        <SidebarContent className="relative z-10 bg-transparent">
          <SidebarGroup className="px-3 py-4">
            <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold tracking-wider uppercase text-blue-300/60">
              {t("common.menu")}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.to, "exact" in item && item.exact)}
                      tooltip={t(item.key)}
                      size="lg"
                      className="sidebar-gradient-button h-12 rounded-xl text-base text-slate-200 hover:text-white data-[active=true]:font-semibold data-[active=true]:text-white"
                    >
                      <Link
                        to={item.to}
                        onClick={() => isMobile && setOpenMobile(false)}
                        className="flex items-center gap-3 px-3"
                      >
                        <item.icon className="size-[1.15rem] text-cyan-400 group-hover:text-cyan-300" />
                        <span>{t(item.key)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* ── Footer ── */}
        <SidebarFooter className="relative z-10 border-t border-white/10 bg-transparent p-3">
          {!collapsed && (
            <Link
              to="/login"
              onClick={() => isMobile && setOpenMobile(false)}
              className="mx-2 mb-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-colors hover:border-cyan-500/30 hover:bg-white/10"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow">
                {userInitial}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-white">
                  {user ? userName : "Guest User"}
                </span>
                <span className="block truncate text-xs text-blue-200/70">
                  {user?.email || t("nav.login")}
                </span>
              </span>
            </Link>
          )}
          <SidebarMenu>
            <SidebarMenuItem>
              {user ? (
                <SidebarMenuButton
                  onClick={handleSignOut}
                  tooltip="Sign out"
                  size="lg"
                  className="sidebar-gradient-button h-11 rounded-xl text-base text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <div className="flex items-center gap-3 px-3">
                    <LogOut className="size-[1.15rem]" />
                    <span>Sign out</span>
                  </div>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/login")}
                  tooltip={t("nav.login")}
                  size="lg"
                  className="sidebar-gradient-button h-11 rounded-xl text-base text-slate-200 hover:text-white data-[active=true]:font-semibold data-[active=true]:text-white"
                >
                  <Link
                    to="/login"
                    onClick={() => isMobile && setOpenMobile(false)}
                    className="flex items-center gap-3 px-3"
                  >
                    <LogIn className="size-[1.15rem] text-cyan-400" />
                    <span>{t("nav.login")}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
