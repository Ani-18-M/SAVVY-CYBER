import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider, LANGS, useI18n } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import { AppSidebar } from "@/components/site/AppSidebar";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { User, LogIn, LogOut, ShieldCheck, Database } from "lucide-react";
import { toast } from "sonner";

function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    toast.success("Signed out successfully");
  };

  const displayName = user?.full_name || user?.username || user?.email?.split("@")[0] || "User";
  const userInitial = displayName[0]?.toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center gap-2 border-b border-border/60 bg-background/90 px-3 backdrop-blur-xl">
      <SidebarTrigger aria-label={t("common.menu")} />

      <div className="ml-auto flex items-center gap-2">
        {/* Language selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={t("common.language")}>
              <Languages className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("common.language")}</DropdownMenuLabel>
            {LANGS.map((l) => (
              <DropdownMenuItem
                key={l.code}
                onClick={() => setLang(l.code)}
                className={cn(lang === l.code && "font-semibold text-primary")}
              >
                {l.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Account / Site Storage menu in Header */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full p-1 pl-2 pr-2.5 transition hover:bg-accent focus:outline-none"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-sm">
                  {userInitial}
                </span>
                <span className="hidden sm:inline-block max-w-[100px] truncate text-xs font-medium text-foreground">
                  {displayName}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-foreground">{displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                  <div className="pt-1 flex items-center gap-1 text-[10px] text-cyan-400">
                    <Database className="size-3" />
                    <span>Site Storage Active</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                  <User className="size-4" />
                  <span>Account & Storage</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/checkup" className="flex items-center gap-2 cursor-pointer">
                  <ShieldCheck className="size-4" />
                  <span>Security Checkup</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="size-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="default" size="sm" asChild className="gap-1.5 h-8 text-xs font-semibold">
            <Link to="/login">
              <LogIn className="size-3.5" />
              <span>Sign In</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CyberSafe — Cyber Awareness & Digital Safety" },
      {
        name: "description",
        content:
          "Learn to spot cyber threats, scams and privacy risks, and build safer digital habits with free guides, checklists and a security checkup.",
      },
      { name: "author", content: "CyberSafe" },
      { property: "og:title", content: "CyberSafe — Cyber Awareness & Digital Safety" },
      {
        property: "og:description",
        content:
          "Free cyber awareness portal: threats, scams, privacy, learning and a safety score.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },

      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLoginPage = pathname === "/login";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            {isLoginPage ? (
              /* ── Login page: full-screen, no chrome ── */
              <>
                <Outlet />
                <Toaster position="top-center" richColors />
              </>
            ) : (
              /* ── All other pages: sidebar + header + footer ── */
              <>
                <a
                  href="#main"
                  className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
                >
                  Skip to content
                </a>
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <SiteHeader />
                      <main id="main" className="flex-1">
                        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
                        <Outlet />
                      </main>
                      <Footer />
                    </div>
                  </div>
                  <Toaster position="top-center" richColors />
                </SidebarProvider>
              </>
            )}
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
