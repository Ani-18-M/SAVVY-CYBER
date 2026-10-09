import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Eye,
  EyeOff,
  Lock,
  User as UserIcon,
  Shield,
  GraduationCap,
  ClipboardCheck,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import loginBg from "@/assets/login-bg.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — CyberSafe" },
      {
        name: "description",
        content: "Sign in to your CyberSafe account. Stay Aware, Stay Secure.",
      },
    ],
  }),
  component: LoginPage,
});

/* ─────────────────────────  SVG icons  ───────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 21 21" className="size-[22px]" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px] fill-white" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

/* ─────────────────────────  Spinner  ─────────────────────────────────────── */
function Spinner() {
  return (
    <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

/* ─────────────────────────  Main component  ──────────────────────────────── */
function LoginPage() {
  const { user, loading: authLoading, loginAsDemo, signOut } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  /* If already logged in, bounce straight to the dashboard */
  React.useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: "/" });
    }
  }, [user, authLoading, navigate]);

  /* derive display values from the stored user */
  const displayName = user?.full_name || user?.email?.split("@")[0] || "User";
  const userInitial = displayName[0]?.toUpperCase() ?? "U";

  /* ── handlers ── */
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      loginAsDemo(username || undefined);
      const name = username
        ? username.includes("@")
          ? username.split("@")[0]
          : username
        : "CyberSafe Student";
      toast.success(`Welcome back, ${name}!`);
      setSubmitting(false);
      navigate({ to: "/" });
    }, 900);
  };

  const handleSocialLogin = (provider: string) => {
    setSubmitting(true);
    setTimeout(() => {
      loginAsDemo(provider + " User");
      toast.success(`Signed in with ${provider}.`);
      setSubmitting(false);
      navigate({ to: "/" });
    }, 700);
  };

  const handleSignOut = () => {
    signOut();
    setUsername("");
    setPassword("");
    toast.success("Signed out successfully.");
  };

  /* ── full-page layout ── */
  return (
    <div
      className="relative flex min-h-screen w-full overflow-hidden"
      style={{ background: "#050e1f" }}
    >
      {/* ── background image ── */}
      <img
        src={loginBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[30%_center] select-none pointer-events-none"
        style={{ filter: "brightness(0.85) contrast(1.05)" }}
      />

      {/* ── blue atmospheric glow on left ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 70% at 20% 55%, rgba(0,100,255,0.22) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 40% at 38% 75%, rgba(0,180,255,0.10) 0%, transparent 60%)",
          ].join(","),
        }}
      />

      {/* ── subtle right-side dark vignette so card stands out ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to left, rgba(2,8,20,0.65) 0%, transparent 55%)",
        }}
      />

      {/* ══════════════════  CARD PANEL  ══════════════════ */}
      <div className="relative z-10 ml-auto flex min-h-screen w-full items-center justify-center px-4 sm:max-w-[500px] sm:px-8 md:px-10">
        <div
          className="w-full rounded-2xl px-8 py-9 shadow-[0_8px_48px_rgba(0,0,0,0.7)]"
          style={{
            background: "rgba(5, 14, 35, 0.85)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* ── Logo row ── */}
          <div className="mb-7 flex items-center gap-3">
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "rgba(37,99,235,0.18)",
                border: "1px solid rgba(59,130,246,0.25)",
              }}
            >
              <img src={logo} alt="" className="h-7 w-auto object-contain" aria-hidden="true" />
            </span>
            <div className="leading-snug">
              <p className="text-[17px] font-bold tracking-tight text-white">
                Cyber<span className="text-blue-400">Safe</span>
              </p>
              <p className="text-[11px] font-medium tracking-wide text-blue-300/70">
                Stay Aware, Stay Secure
              </p>
            </div>
          </div>

          {/* ══════════  Loading state  ══════════ */}
          {authLoading ? (
            <div className="flex flex-col items-center gap-3 py-12 text-slate-400">
              <Spinner />
              <p className="text-sm">Loading session…</p>
            </div>
          ) : /* ══════════  Already signed in  ══════════ */
          user ? (
            <div className="space-y-5">
              {/* greeting */}
              <div
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{
                  background: "rgba(37,99,235,0.12)",
                  border: "1px solid rgba(59,130,246,0.18)",
                }}
              >
                <span
                  className="flex size-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white shadow"
                  style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)" }}
                >
                  {userInitial}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-base font-semibold text-white">{displayName}</p>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate-400">{user.email}</p>
                  <p className="mt-0.5 text-[11px] text-blue-400/70">Demo session · local only</p>
                </div>
              </div>

              {/* success banner */}
              <div
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm text-emerald-300"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.18)",
                }}
              >
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                <span>You're securely signed in to CyberSafe.</span>
              </div>

              {/* quick nav */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    to: "/learn",
                    icon: <GraduationCap className="size-4" />,
                    label: "Learning Hub",
                    desc: "Modules & quizzes",
                  },
                  {
                    to: "/checkup",
                    icon: <ClipboardCheck className="size-4" />,
                    label: "Security Checkup",
                    desc: "Your safety score",
                  },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex flex-col gap-1.5 rounded-xl p-3.5 transition hover:brightness-110"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span
                      className="flex size-8 items-center justify-center rounded-lg text-blue-400"
                      style={{ background: "rgba(37,99,235,0.15)" }}
                    >
                      {item.icon}
                    </span>
                    <p className="text-xs font-semibold text-white">{item.label}</p>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </Link>
                ))}
              </div>

              {/* sign-out */}
              <button
                onClick={handleSignOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-slate-300 transition hover:text-red-400"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </div>
          ) : (
            /* ══════════  Login form  ══════════ */
            <>
              {/* heading */}
              <div className="mb-6">
                <h1 className="text-[1.85rem] font-bold leading-tight tracking-tight text-white">
                  Welcome Back!
                </h1>
                <p className="mt-1.5 text-sm text-slate-400">Login to continue your account</p>
              </div>

              <form onSubmit={handleSignIn} noValidate className="space-y-[14px]">
                {/* Username / Email */}
                <div className="relative">
                  <UserIcon
                    className="pointer-events-none absolute left-4 top-1/2 size-[15px] -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    disabled={submitting}
                    className="w-full rounded-[13px] py-[13px] pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-60"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(59,130,246,0.55)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.10)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-4 top-1/2 size-[15px] -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={submitting}
                    className="w-full rounded-[13px] py-[13px] pl-11 pr-12 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-60"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(59,130,246,0.55)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.10)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="size-[15px]" />
                    ) : (
                      <Eye className="size-[15px]" />
                    )}
                  </button>
                </div>

                {/* Remember Me + Forgot Password */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex cursor-pointer select-none items-center gap-2 text-[13px] text-slate-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="size-[13px] cursor-pointer rounded accent-blue-500"
                    />
                    Remember Me
                  </label>
                  <button
                    type="button"
                    className="text-[13px] font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign In button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-[13px] py-[14px] text-[15px] font-semibold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
                  style={{
                    background: "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 45%, #0ea5e9 100%)",
                    boxShadow: "0 4px 24px rgba(59,130,246,0.35)",
                  }}
                >
                  {submitting ? (
                    <>
                      <Spinner /> Signing in…
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* ── Or continue with ── */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.09)" }} />
                <span className="text-[12px] font-medium text-slate-500">Or continue with</span>
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.09)" }} />
              </div>

              {/* ── Social buttons ── */}
              <div className="flex items-center justify-center gap-[18px]">
                {[
                  { label: "Google", icon: <GoogleIcon />, provider: "Google" },
                  { label: "Microsoft", icon: <MicrosoftIcon />, provider: "Microsoft" },
                  { label: "GitHub", icon: <GitHubIcon />, provider: "GitHub" },
                ].map(({ label, icon, provider }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={`Sign in with ${label}`}
                    disabled={submitting}
                    onClick={() => handleSocialLogin(provider)}
                    className="flex size-[52px] items-center justify-center rounded-full transition hover:brightness-125 active:scale-95 disabled:opacity-60"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              {/* ── Sign Up ── */}
              <p className="mt-6 text-center text-[13px] text-slate-400">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    loginAsDemo(username || undefined);
                    toast.success("Demo account created! Welcome to CyberSafe.");
                  }}
                  className="font-semibold text-blue-400 transition hover:text-blue-300 hover:underline disabled:opacity-60"
                >
                  Sign Up
                </button>
              </p>
            </>
          )}

          {/* ── Shield security badge (bottom of card) ── */}
          {!user && !authLoading && (
            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-600">
              <Shield className="size-3 text-blue-600/60" />
              <span>256-bit SSL encrypted · Zero data collected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
