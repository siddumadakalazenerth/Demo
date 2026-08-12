import { useEffect, useState } from "react";

export type UserSession = {
  name: string;
  email: string;
  phone?: string | undefined;
  provider: "email" | "google" | "phone";
  joinedAt: string;
};

const SESSION_KEY = "zenrth:session";

type Listener = () => void;
let listeners: Listener[] = [];

function emitChange() {
  listeners.forEach((l) => l());
}

export function getSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UserSession) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: UserSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  emitChange();
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
  emitChange();
}

/**
 * Reactive session read — updates immediately across components on sign in/out.
 * Starts at `null` (matching SSR, which has no localStorage) and only reads the
 * real value inside an effect, so the client's first render matches the server's
 * and React never hits a hydration mismatch. This means a logged-in visitor sees
 * "Sign In" for one tick before the avatar appears — the same trade-off every
 * other localStorage-backed feature in this app already makes.
 */
export function useAuth(): UserSession | null {
  const [session, setSession] = useState<UserSession | null>(null);
  useEffect(() => {
    setSession(getSession());
    const listener = () => setSession(getSession());
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);
  return session;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  return parts.map((p) => p[0]!.toUpperCase()).join("") || "?";
}
