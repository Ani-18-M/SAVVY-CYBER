import * as React from "react";

// ---------------------------------------------------------------------------
// Robust Site-Storage Authentication System
// All accounts and active sessions are stored locally in the browser's
// Site Storage (localStorage). No external database is needed.
// ---------------------------------------------------------------------------

export interface LocalUser {
  id: string;
  email: string;
  username: string;
  full_name: string;
  role: string;
  avatar_url?: string | undefined;
  created_at: string;
  last_sign_in_at: string;
  provider?: "local" | "google" | "microsoft" | "github" | "demo" | undefined;
}

export interface StoredUserAccount extends LocalUser {
  password_hash: string;
}

const STORAGE_KEY_SESSION = "cybersafe_user_session";
const STORAGE_KEY_ACCOUNTS = "cybersafe_accounts_db";
const STORAGE_KEY_REMEMBER = "cybersafe_remembered_identity";

/**
 * Hash a password using SHA-256 via Web Crypto API with fallback.
 */
async function hashPassword(password: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    try {
      const msgUint8 = new TextEncoder().encode(password + "_cybersafe_salt");
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      // Fallback
    }
  }
  // Simple deterministic fallback hashing for environments without subtle crypto
  let hash = 0;
  const str = password + "_cybersafe_salt";
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "h_" + Math.abs(hash).toString(16);
}

/**
 * Load accounts from Site Storage (localStorage).
 */
function getStoredAccounts(): StoredUserAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read accounts from site storage:", err);
    return [];
  }
}

/**
 * Save accounts to Site Storage.
 */
function saveStoredAccounts(accounts: StoredUserAccount[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  } catch (err) {
    console.error("Failed to save accounts to site storage:", err);
  }
}

export interface SignInResult {
  success: boolean;
  error?: string;
  user?: LocalUser;
}

export interface SignUpResult {
  success: boolean;
  error?: string;
  user?: LocalUser;
}

interface AuthContextType {
  user: LocalUser | null;
  loading: boolean;
  rememberedIdentity: string;
  signIn: (emailOrUsername: string, password: string, rememberMe?: boolean) => Promise<SignInResult>;
  signUp: (params: {
    fullName: string;
    email: string;
    username?: string | undefined;
    password: string;
    rememberMe?: boolean | undefined;
  }) => Promise<SignUpResult>;
  loginAsDemo: (nameOrEmail?: string) => Promise<SignInResult>;
  loginWithSocial: (provider: "Google" | "Microsoft" | "GitHub") => Promise<SignInResult>;
  updateProfile: (updates: Partial<LocalUser>) => Promise<void>;
  signOut: () => void;
  getSiteStorageStats: () => { totalAccounts: number; storageUsedKB: number };
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<LocalUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [rememberedIdentity, setRememberedIdentity] = React.useState<string>("");

  // Initialize Site Storage on mount
  React.useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const initStorage = async () => {
      try {
        // Read remembered identity
        const remembered = localStorage.getItem(STORAGE_KEY_REMEMBER);
        if (remembered) {
          setRememberedIdentity(remembered);
        }

        // Restore active user session from site storage
        const storedSession = localStorage.getItem(STORAGE_KEY_SESSION);
        if (storedSession) {
          try {
            const parsedUser: LocalUser = JSON.parse(storedSession);
            setUser(parsedUser);
          } catch {
            localStorage.removeItem(STORAGE_KEY_SESSION);
          }
        }
      } catch (err) {
        console.error("Error initializing auth site storage:", err);
      } finally {
        setLoading(false);
      }
    };

    initStorage();

    // Listen for storage events (multi-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_SESSION) {
        if (!e.newValue) {
          setUser(null);
        } else {
          try {
            setUser(JSON.parse(e.newValue));
          } catch {
            setUser(null);
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /**
   * Persist user session to site storage
   */
  const persistSession = (userData: LocalUser, rememberMe: boolean = true) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(userData));
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY_REMEMBER, userData.email);
        setRememberedIdentity(userData.email);
      } else {
        localStorage.removeItem(STORAGE_KEY_REMEMBER);
        setRememberedIdentity("");
      }
    }
  };

  /**
   * Sign In with email or username and password
   */
  const signIn = async (
    emailOrUsername: string,
    password: string,
    rememberMe: boolean = true
  ): Promise<SignInResult> => {
    if (!emailOrUsername.trim()) {
      return { success: false, error: "Please enter your email or username." };
    }
    if (!password) {
      return { success: false, error: "Please enter your password." };
    }

    const accounts = getStoredAccounts();
    const query = emailOrUsername.trim().toLowerCase();

    // Find account by email or username
    const account = accounts.find(
      (a) => a.email.toLowerCase() === query || a.username.toLowerCase() === query
    );

    if (!account) {
      return {
        success: false,
        error: "No account found with this email or username. Please check your credentials or sign up.",
      };
    }

    const inputHash = await hashPassword(password);
    if (account.password_hash !== inputHash) {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    // Update last sign in timestamp
    const updatedUser: LocalUser = {
      id: account.id,
      email: account.email,
      username: account.username,
      full_name: account.full_name,
      role: account.role,
      avatar_url: account.avatar_url,
      created_at: account.created_at,
      last_sign_in_at: new Date().toISOString(),
      provider: account.provider || "local",
    };

    // Update account in accounts DB
    const updatedAccounts = accounts.map((acc) =>
      acc.id === account.id ? { ...acc, last_sign_in_at: updatedUser.last_sign_in_at } : acc
    );
    saveStoredAccounts(updatedAccounts);

    persistSession(updatedUser, rememberMe);
    return { success: true, user: updatedUser };
  };

  /**
   * Sign Up: Register a new account in Site Storage
   */
  const signUp = async ({
    fullName,
    email,
    username,
    password,
    rememberMe = true,
  }: {
    fullName: string;
    email: string;
    username?: string | undefined;
    password: string;
    rememberMe?: boolean | undefined;
  }): Promise<SignUpResult> => {
    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = (username?.trim() || cleanEmail.split("@")[0] || "user").toLowerCase();

    if (!cleanFullName) {
      return { success: false, error: "Please enter your full name." };
    }
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return { success: false, error: "Please provide a valid email address." };
    }
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    const accounts = getStoredAccounts();

    // Check if email already exists
    if (accounts.some((a) => a.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        error: "An account with this email already exists. Please sign in instead.",
      };
    }

    const passwordHash = await hashPassword(password);
    const newUserId = "user-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 7);

    const newUserAccount: StoredUserAccount = {
      id: newUserId,
      email: cleanEmail,
      username: cleanUsername,
      full_name: cleanFullName,
      role: "Security Explorer",
      provider: "local",
      created_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      password_hash: passwordHash,
    };

    accounts.push(newUserAccount);
    saveStoredAccounts(accounts);

    const { password_hash: _, ...safeUser } = newUserAccount;
    persistSession(safeUser, rememberMe);

    return { success: true, user: safeUser };
  };

  /**
   * Quick 1-Click Demo Login
   */
  const loginAsDemo = async (nameOrEmail?: string): Promise<SignInResult> => {
    let full_name = "CyberSafe Student";
    let email = "demo.student@cybersafe.org";
    let username = "demo_student";

    if (nameOrEmail && nameOrEmail.trim()) {
      const trimmed = nameOrEmail.trim();
      if (trimmed.includes("@")) {
        email = trimmed.toLowerCase();
        const local = trimmed.split("@")[0] || "";
        full_name = local.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        username = local.toLowerCase();
      } else {
        full_name = trimmed.replace(/\b\w/g, (c) => c.toUpperCase());
        username = trimmed.toLowerCase().replace(/\s+/g, "_");
        email = `${username}@cybersafe.org`;
      }
    }

    const demoUser: LocalUser = {
      id: "demo-user-" + (username || "guest"),
      email,
      username,
      full_name,
      role: "CyberSafe Student",
      provider: "demo",
      created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
      last_sign_in_at: new Date().toISOString(),
    };

    persistSession(demoUser, true);
    return { success: true, user: demoUser };
  };

  /**
   * Social Authentication (Google, Microsoft, GitHub) simulated via Site Storage
   */
  const loginWithSocial = async (
    provider: "Google" | "Microsoft" | "GitHub"
  ): Promise<SignInResult> => {
    const slug = provider.toLowerCase();
    const socialUser: LocalUser = {
      id: `oauth-${slug}-${Date.now().toString(36)}`,
      email: `user.${slug}@cybersafe.org`,
      username: `${slug}_user`,
      full_name: `${provider} Certified Analyst`,
      role: `${provider} Verified User`,
      provider: slug as "google" | "microsoft" | "github",
      created_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
    };

    // Save into stored accounts if not already there
    const accounts = getStoredAccounts();
    const existing = accounts.find((a) => a.email === socialUser.email);
    if (!existing) {
      accounts.push({
        ...socialUser,
        password_hash: "oauth_federated_auth",
      });
      saveStoredAccounts(accounts);
    }

    persistSession(socialUser, true);
    return { success: true, user: socialUser };
  };

  /**
   * Update Profile Data in Site Storage
   */
  const updateProfile = async (updates: Partial<LocalUser>) => {
    if (!user) return;
    const updated: LocalUser = { ...user, ...updates };
    setUser(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(updated));

      const accounts = getStoredAccounts();
      const nextAccounts = accounts.map((acc) =>
        acc.id === user.id ? { ...acc, ...updates } : acc
      );
      saveStoredAccounts(nextAccounts);
    }
  };

  /**
   * Sign Out: Clears current session from Site Storage
   */
  const signOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
    setUser(null);
  };

  /**
   * Helper to inspect Site Storage usage
   */
  const getSiteStorageStats = () => {
    if (typeof window === "undefined") {
      return { totalAccounts: 0, storageUsedKB: 0 };
    }
    const accounts = getStoredAccounts();
    let totalBytes = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("cybersafe")) {
          const val = localStorage.getItem(key) || "";
          totalBytes += key.length + val.length;
        }
      }
    } catch {
      // ignore
    }
    return {
      totalAccounts: accounts.length,
      storageUsedKB: Math.round((totalBytes / 1024) * 10) / 10,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        rememberedIdentity,
        signIn,
        signUp,
        loginAsDemo,
        loginWithSocial,
        updateProfile,
        signOut,
        getSiteStorageStats,
      }}
    >
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
