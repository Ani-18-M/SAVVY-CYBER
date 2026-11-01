import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Eye,
  EyeOff,
  Lock,
  User as UserIcon,
  Mail,
  Shield,
  GraduationCap,
  ClipboardCheck,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowRight,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import loginBg from "@/assets/login-bg.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Authentication — CyberSafe" },
      {
        name: "description",
        content: "Sign in or create an account stored securely in site storage.",
      },
    ],
  }),
  component: LoginPage,
});

/* ─────────────────────────  Social Icons  ─────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
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
    <svg viewBox="0 0 21 21" className="size-5" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-white" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

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
  const {
    user,
    loading: authLoading,
    rememberedIdentity,
    signIn,
    signUp,
    loginAsDemo,
    loginWithSocial,
    signOut,
    getSiteStorageStats,
  } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = React.useState<"signin" | "signup">("signin");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Sign In inputs (empty by default)
  const [loginIdentifier, setLoginIdentifier] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [loginRemember, setLoginRemember] = React.useState(false);

  // Sign Up inputs (empty by default)
  const [fullName, setFullName] = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupUsername, setSignupUsername] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");
  const [signupConfirm, setSignupConfirm] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Derive stats
  const storageStats = getSiteStorageStats();
  const displayName = user?.full_name || user?.username || user?.email?.split("@")[0] || "User";
  const userInitial = displayName[0]?.toUpperCase() ?? "U";

  /* ── Sign In Handler ── */
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const res = await signIn(loginIdentifier, loginPassword, loginRemember);
      if (res.success && res.user) {
        toast.success(`Welcome back, ${res.user.full_name}!`);
        navigate({ to: "/" });
      } else {
        setErrorMessage(res.error || "Authentication failed. Please check your credentials.");
        toast.error(res.error || "Sign in failed");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Sign Up Handler ── */
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (signupPassword !== signupConfirm) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      toast.error("Passwords do not match");
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      toast.error("Password too short");
      return;
    }

    setSubmitting(true);

    try {
      const res = await signUp({
        fullName,
        email: signupEmail,
        username: signupUsername || undefined,
        password: signupPassword,
        rememberMe: true,
      });

      if (res.success && res.user) {
        toast.success(`Account created in Site Storage! Welcome, ${res.user.full_name}.`);
        navigate({ to: "/" });
      } else {
        setErrorMessage(res.error || "Failed to create account.");
        toast.error(res.error || "Sign up failed");
      }
    } catch {
      setErrorMessage("An unexpected error occurred during account creation.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Social Login ── */
  const handleSocial = async (provider: "Google" | "Microsoft" | "GitHub") => {
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await loginWithSocial(provider);
      if (res.success && res.user) {
        toast.success(`Connected via ${provider} (Stored in Site Storage)`);
        navigate({ to: "/" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Sign Out ── */
  const handleSignOut = () => {
    signOut();
    setLoginPassword("");
    toast.success("Signed out successfully. Session removed from Site Storage.");
  };

  /* ── Continue as Guest ── */
  const handleContinueAsGuest = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cybersafe_guest_browse", "true");
    }
    navigate({ to: "/" });
  };

  return (
    <div
      className="relative flex min-h-screen w-full overflow-hidden"
      style={{ background: "#050e1f" }}
    >
      {/* ── Background Cyber Image ── */}
      <img
        src={loginBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[30%_center] select-none"
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

      {/* ══════════════════  CARD PANEL (Right Docked)  ══════════════════ */}
      <div className="relative z-10 ml-auto flex min-h-screen w-full items-center justify-center px-4 py-8 sm:max-w-[500px] sm:px-8 md:px-10">
        <div
          className="w-full rounded-2xl px-8 py-9 shadow-[0_8px_48px_rgba(0,0,0,0.7)]"
          style={{
            background: "rgba(5, 14, 35, 0.85)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* ── Header / Logo row ── */}
          <div className="mb-6 flex items-center justify-between">
            <Link to="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                style={{
                  background: "rgba(37,99,235,0.22)",
                  border: "1px solid rgba(59,130,246,0.35)",
                }}
              >
                <img src={logo} alt="CyberSafe" className="h-7 w-auto object-contain" />
              </span>
              <div>
                <p className="text-[17px] font-bold tracking-tight text-white">
                  Cyber<span className="text-cyan-400">Safe</span>
                </p>
                <p className="text-[11px] font-medium tracking-wide text-blue-300/75">
                  Stay Aware, Stay Secure
                </p>
              </div>
            </Link>

            {/* Site Storage Active Pill */}
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-cyan-300"
              style={{
                background: "rgba(6, 182, 212, 0.12)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
              }}
              title="Authentication data is preserved securely in your browser's Site Storage (localStorage)"
            >
              <Database className="size-3 text-cyan-400 animate-pulse" />
              <span>Site Storage</span>
            </div>
          </div>

          {/* ══════════  Loading state  ══════════ */}
          {authLoading ? (
            <div className="flex flex-col items-center gap-3 py-14 text-slate-400">
              <Spinner />
              <p className="text-sm">Reading Site Storage session…</p>
            </div>
          ) : user ? (
            /* ══════════  Already Signed In Profile Card  ══════════ */
            <div className="space-y-6">
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "linear-gradient(145deg, rgba(37,99,235,0.15) 0%, rgba(6,182,212,0.08) 100%)",
                  border: "1px solid rgba(59,130,246,0.3)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg"
                    style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)" }}
                  >
                    {userInitial}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-lg font-bold text-white">{displayName}</p>
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Online
                      </span>
                    </div>
                    <p className="truncate text-xs text-slate-300">{user.email}</p>
                    <p className="mt-1 text-[11px] font-medium text-cyan-400 flex items-center gap-1">
                      <ShieldCheck className="size-3" />
                      {user.role || "Security Analyst"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-[11px] text-slate-400">
                  <div>
                    <span className="block text-slate-500">Storage Provider</span>
                    <span className="font-medium text-slate-200 capitalize">
                      {user.provider || "Site Storage"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Session Status</span>
                    <span className="font-medium text-emerald-400">Saved in LocalStorage</span>
                  </div>
                </div>
              </div>

              {/* Status Notice */}
              <div
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs text-emerald-300"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.22)",
                }}
              >
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                <span>You are securely authenticated. Your session persists in site storage.</span>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-xl p-3.5 transition hover:brightness-125"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                    <ArrowRight className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">Dashboard</p>
                    <p className="text-[10px] text-slate-400">Home portal</p>
                  </div>
                </Link>

                <Link
                  to="/checkup"
                  className="flex items-center gap-3 rounded-xl p-3.5 transition hover:brightness-125"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-cyan-600/20 text-cyan-400">
                    <ClipboardCheck className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">Checkup</p>
                    <p className="text-[10px] text-slate-400">Safety score</p>
                  </div>
                </Link>

                <Link
                  to="/learn"
                  className="flex items-center gap-3 rounded-xl p-3.5 transition hover:brightness-125"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400">
                    <GraduationCap className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">Learn Hub</p>
                    <p className="text-[10px] text-slate-400">Interactive guides</p>
                  </div>
                </Link>

                <Link
                  to="/incident"
                  className="flex items-center gap-3 rounded-xl p-3.5 transition hover:brightness-125"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-amber-600/20 text-amber-400">
                    <Shield className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">Incident</p>
                    <p className="text-[10px] text-slate-400">Report threats</p>
                  </div>
                </Link>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <Link
                  to="/"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                  style={{
                    background: "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #0ea5e9 100%)",
                  }}
                >
                  Continue to Site
                  <ArrowRight className="size-4" />
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <LogOut className="size-4" />
                  Sign Out from Site Storage
                </button>
              </div>
            </div>
          ) : (
            /* ══════════  Sign In / Sign Up Forms  ══════════ */
            <div>
              {/* Tab Selector: Sign In / Create Account */}
              <div
                className="mb-6 flex rounded-xl p-1"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setErrorMessage(null);
                  }}
                  className={`flex-1 rounded-lg py-2.5 text-xs font-semibold transition-all ${
                    mode === "signin"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage(null);
                  }}
                  className={`flex-1 rounded-lg py-2.5 text-xs font-semibold transition-all ${
                    mode === "signup"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Title & Description */}
              <div className="mb-5">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
                  {mode === "signin" ? "Welcome Back!" : "Join CyberSafe"}
                </h1>
                <p className="mt-1 text-xs text-slate-400">
                  {mode === "signin"
                    ? "Sign in using your credentials stored in site storage."
                    : "Create a local account saved directly in your browser's site storage."}
                </p>
              </div>

              {/* Error Notice */}
              {errorMessage && (
                <div
                  className="mb-4 flex items-start gap-2.5 rounded-xl p-3 text-xs text-red-300"
                  style={{
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                  }}
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* ────────────────── SIGN IN FORM ────────────────── */}
              {mode === "signin" && (
                <form onSubmit={handleSignIn} className="space-y-3.5">
                  {/* Email / Username */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">
                      Email or Username
                    </label>
                    <div className="relative">
                      <UserIcon
                        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        placeholder="Username or email"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        autoComplete="username"
                        disabled={submitting}
                        required
                        className="w-full rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-60"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">Password</label>
                    <div className="relative">
                      <Lock
                        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                        aria-hidden="true"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        autoComplete="current-password"
                        disabled={submitting}
                        required
                        className="w-full rounded-xl py-3 pl-10 pr-11 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-60"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-slate-400">
                      <input
                        type="checkbox"
                        checked={loginRemember}
                        onChange={(e) => setLoginRemember(e.target.checked)}
                        className="size-3.5 cursor-pointer rounded accent-blue-500"
                      />
                      Remember me in Site Storage
                    </label>
                  </div>

                  {/* Sign In button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
                    style={{
                      background: "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #0ea5e9 100%)",
                      boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
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
              )}

              {/* ────────────────── SIGN UP FORM ────────────────── */}
              {mode === "signup" && (
                <form onSubmit={handleSignUp} className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">Full Name</label>
                    <div className="relative">
                      <UserIcon
                        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="name"
                        disabled={submitting}
                        required
                        className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-60"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                        aria-hidden="true"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        autoComplete="email"
                        disabled={submitting}
                        required
                        className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-60"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Username (Optional) */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">
                      Username <span className="text-slate-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <KeyRound
                        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        placeholder="Username"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)}
                        autoComplete="username"
                        disabled={submitting}
                        className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-60"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                          aria-hidden="true"
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          autoComplete="new-password"
                          disabled={submitting}
                          required
                          className="w-full rounded-xl py-2.5 pl-10 pr-9 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-60"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.12)",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                          aria-hidden="true"
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          value={signupConfirm}
                          onChange={(e) => setSignupConfirm(e.target.value)}
                          autoComplete="new-password"
                          disabled={submitting}
                          required
                          className="w-full rounded-xl py-2.5 pl-10 pr-9 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-60"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.12)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Toggle Show Password */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      {showPassword ? "Hide password characters" : "Show password characters"}
                    </button>
                    <span className="text-[11px] text-slate-500">Stored via SHA-256</span>
                  </div>

                  {/* Sign Up button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
                    style={{
                      background: "linear-gradient(90deg, #059669 0%, #10b981 50%, #06b6d4 100%)",
                      boxShadow: "0 4px 20px rgba(16,185,129,0.3)",
                    }}
                  >
                    {submitting ? (
                      <>
                        <Spinner /> Creating Account…
                      </>
                    ) : (
                      "Create Site Storage Account"
                    )}
                  </button>
                </form>
              )}

              {/* ── Social Login ── */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[11px] font-medium text-slate-500">Or connect with</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="flex items-center justify-center gap-3">
                {[
                  { label: "Google", icon: <GoogleIcon />, provider: "Google" as const },
                  { label: "Microsoft", icon: <MicrosoftIcon />, provider: "Microsoft" as const },
                  { label: "GitHub", icon: <GitHubIcon />, provider: "GitHub" as const },
                ].map(({ label, icon, provider }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={`Sign in with ${label}`}
                    disabled={submitting}
                    onClick={() => handleSocial(provider)}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-xs font-medium text-slate-200 transition hover:bg-white/10 hover:border-white/20 active:scale-95 disabled:opacity-60"
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* ── Mode switch bottom row ── */}
              <p className="mt-5 text-center text-xs text-slate-400">
                {mode === "signin" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => {
                        setMode("signup");
                        setErrorMessage(null);
                      }}
                      className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      Sign Up Free
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => {
                        setMode("signin");
                        setErrorMessage(null);
                      }}
                      className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      Sign In Here
                    </button>
                  </>
                )}
              </p>

              {/* ── Continue as Guest ── */}
              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <button
                  type="button"
                  onClick={handleContinueAsGuest}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Just exploring? Continue as Guest</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ── Security & Site Storage Footer ── */}
          <div className="mt-6 flex flex-col items-center justify-center gap-1 border-t border-white/10 pt-4 text-center text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Shield className="size-3 text-cyan-400" />
              <span>Client-Side Site Storage Architecture</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Accounts and sessions are stored in your browser's local storage. Zero external server
              tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
