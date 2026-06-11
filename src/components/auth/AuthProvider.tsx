"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  defaultPortalMessages,
  defaultPortalPayments,
  roleHomePaths,
} from "@/data/mock-portal";
import type {
  PortalMessage,
  PortalPayment,
  PortalProfile,
  PortalRegistrationInput,
  PortalRole,
  PortalSnapshot,
} from "@/types/portal";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isReady: boolean;
  portalRole: PortalRole | null;
  portalUser: PortalProfile | null;
  portalSnapshot: PortalSnapshot | null;
  login: (email: string, password: string) => boolean;
  registerPortalUser: (input: PortalRegistrationInput) => boolean;
  updatePortalProfile: (profile: PortalProfile) => void;
  addPortalMessage: (message: Omit<PortalMessage, "id" | "createdAt">) => void;
  addPortalPayment: (payment: Omit<PortalPayment, "id" | "createdAt" | "status">) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_KEY = "muldhon-admin-auth";
const AUTH_EVENT = "muldhon-auth-change";
const PORTAL_SESSION_KEY = "muldhon-portal-session";
const PORTAL_STORAGE_PREFIX = "muldhon-portal";

function getAuthSnapshot() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "true";
}

function getPortalStorageKey(role: PortalRole) {
  return `${PORTAL_STORAGE_PREFIX}-${role}`;
}

function isPortalRole(value: string | null): value is PortalRole {
  return value === "investor" || value === "entrepreneur";
}

function readPortalSnapshot(role: PortalRole): PortalSnapshot | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(getPortalStorageKey(role));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PortalSnapshot;
  } catch {
    return null;
  }
}

function writePortalSnapshot(role: PortalRole, snapshot: PortalSnapshot) {
  window.localStorage.setItem(getPortalStorageKey(role), JSON.stringify(snapshot));
}

function getPortalSnapshotString() {
  if (typeof window === "undefined") return "";

  const role = window.localStorage.getItem(PORTAL_SESSION_KEY);
  if (!isPortalRole(role)) return "";

  return JSON.stringify({
    role,
    snapshot: readPortalSnapshot(role),
  });
}

function parsePortalSnapshot(value: string) {
  if (!value) return { role: null as PortalRole | null, snapshot: null as PortalSnapshot | null };

  try {
    const parsed = JSON.parse(value) as {
      role: PortalRole;
      snapshot: PortalSnapshot | null;
    };

    return {
      role: isPortalRole(parsed.role) ? parsed.role : null,
      snapshot: parsed.snapshot,
    };
  } catch {
    return { role: null as PortalRole | null, snapshot: null as PortalSnapshot | null };
  }
}

function subscribeAuth(callback: () => void) {
  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function emitAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    () => false
  );
  const portalSnapshotString = useSyncExternalStore(
    subscribeAuth,
    getPortalSnapshotString,
    () => ""
  );
  const router = useRouter();
  const pathname = usePathname();
  const { role: portalRole, snapshot: portalSnapshot } = useMemo(
    () => parsePortalSnapshot(portalSnapshotString),
    [portalSnapshotString]
  );
  const portalUser = portalSnapshot?.profile ?? null;

  const login = useCallback(
    (email: string, password: string) => {
      const valid = email.trim().length > 0 && password.trim().length >= 4;

      if (!valid) return false;

      window.localStorage.setItem(AUTH_KEY, "true");
      window.localStorage.removeItem(PORTAL_SESSION_KEY);
      emitAuthChange();
      router.replace("/");
      return true;
    },
    [router]
  );

  const registerPortalUser = useCallback(
    (input: PortalRegistrationInput) => {
      const valid =
        input.fullName.trim().length > 1 &&
        input.email.trim().includes("@") &&
        input.phone.trim().length > 5 &&
        input.organization.trim().length > 1;

      if (!valid) return false;

      const profile: PortalProfile = {
        ...input,
        fullName: input.fullName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        organization: input.organization.trim(),
        location: input.location.trim() || "Dhaka, Bangladesh",
        focus: input.focus.trim(),
        bio: input.bio.trim(),
        joinedAt: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      writePortalSnapshot(input.role, {
        profile,
        messages: defaultPortalMessages[input.role],
        payments: defaultPortalPayments[input.role],
      });
      window.localStorage.removeItem(AUTH_KEY);
      window.localStorage.setItem(PORTAL_SESSION_KEY, input.role);
      emitAuthChange();
      router.replace(roleHomePaths[input.role]);
      return true;
    },
    [router]
  );

  const updatePortalProfile = useCallback(
    (profile: PortalProfile) => {
      if (!portalRole || !portalSnapshot) return;

      writePortalSnapshot(portalRole, { ...portalSnapshot, profile });
      emitAuthChange();
    },
    [portalRole, portalSnapshot]
  );

  const addPortalMessage = useCallback(
    (message: Omit<PortalMessage, "id" | "createdAt">) => {
      if (!portalRole || !portalSnapshot) return;

      const nextMessage: PortalMessage = {
        ...message,
        id: `${portalRole}-message-${Date.now()}`,
        createdAt: "Just now",
      };
      writePortalSnapshot(portalRole, {
        ...portalSnapshot,
        messages: [nextMessage, ...portalSnapshot.messages],
      });
      emitAuthChange();
    },
    [portalRole, portalSnapshot]
  );

  const addPortalPayment = useCallback(
    (payment: Omit<PortalPayment, "id" | "createdAt" | "status">) => {
      if (!portalRole || !portalSnapshot) return;

      const nextPayment: PortalPayment = {
        ...payment,
        id: `${portalRole}-payment-${Date.now()}`,
        createdAt: "Just now",
        status: "Pending",
      };
      writePortalSnapshot(portalRole, {
        ...portalSnapshot,
        payments: [nextPayment, ...portalSnapshot.payments],
      });
      emitAuthChange();
    },
    [portalRole, portalSnapshot]
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_KEY);
    window.localStorage.removeItem(PORTAL_SESSION_KEY);
    emitAuthChange();
    router.replace("/login");
  }, [router]);

  useEffect(() => {
    if (pathname !== "/login" || !isAuthenticated) return;
    router.replace("/");
  }, [isAuthenticated, pathname, router]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isReady: true,
      portalRole,
      portalUser,
      portalSnapshot,
      login,
      registerPortalUser,
      updatePortalProfile,
      addPortalMessage,
      addPortalPayment,
      logout,
    }),
    [
      isAuthenticated,
      portalRole,
      portalUser,
      portalSnapshot,
      login,
      registerPortalUser,
      updatePortalProfile,
      addPortalMessage,
      addPortalPayment,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
