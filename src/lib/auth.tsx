import * as React from "react";

// ---------------------------------------------------------------------------
// Minimal local auth — no Supabase dependency.
// Users are stored in localStorage only (demo session).
// ---------------------------------------------------------------------------

export interface LocalUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  last_sign_in_at: string;
}

const STORAGE_KEY = "cybersafe_demo_auth";

interface AuthContextType {
  user: LocalUser | null;
  loading: boolean;
  loginAsDemo: (nameOrEmail?: string) => void;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<LocalUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Restore session from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }
    setLoading(false);
  }, []);

  /**
   * Log in as a demo user.
   * @param nameOrEmail  Optional — the value the user typed in the login field.
   *   If it looks like an email (contains "@"), we derive a display name from the
   *   local-part; otherwise we use it directly as the display name.
   */
  const loginAsDemo = (nameOrEmail?: string) => {
    let full_name = "CyberSafe Student";
    let email = "demo.student@cybersafe.org";

    if (nameOrEmail && nameOrEmail.trim()) {
      const trimmed = nameOrEmail.trim();
      if (trimmed.includes("@")) {
        // It's an email — extract the local part and capitalise it
        email = trimmed;
        const local = trimmed.split("@")[0] || "";
        full_name = local.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      } else {
        // Treat as a display name
        full_name = trimmed.replace(/\b\w/g, (c) => c.toUpperCase());
        email = `${trimmed.toLowerCase().replace(/\s+/g, ".")}@cybersafe.org`;
      }
    }

    const demoUser: LocalUser = {
      id: "demo-analyst-001",
      email,
      full_name,
      created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
      last_sign_in_at: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    }
    setUser(demoUser);
  };

  const signOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAsDemo, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
