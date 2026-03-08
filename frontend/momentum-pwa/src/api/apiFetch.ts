import { getAccessToken, setAccessToken, clearAccessToken } from "@/lib/tokenStore";
import { queryClient } from '@/lib/queryClient'
import { router } from "@/app/router";

type ApiOptions = RequestInit & { requireAuth?: boolean };

let refreshPromise: Promise<string | null> | null = null;

async function refresh() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include"
      });
      const data = await res.json();

      if (res.ok && data.access_token) {
        setAccessToken(data.access_token);
        return data.access_token;
      }
      return null;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Perform a global logout and redirect
 */
const handleAuthFailure = () => {
  clearAccessToken();
  queryClient.clear()
  router.navigate("/home", { replace: true });
};

export async function apiFetch(url: string, options: ApiOptions = {}) {
  const { requireAuth = false, ...rest } = options;
  let token = getAccessToken();

  // 1. Pre-fetch: If auth is needed but token is missing, refresh first
  if (requireAuth && !token) {
    token = await refresh();
    if (!token) {
      handleAuthFailure();
      throw new Error("Authentication required");
    }
  }

  const exec = (t?: string | null) => fetch(url, {
    ...rest,
    credentials: "include",
    method: rest.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...rest.headers,
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    }
  });

  // 2. Initial Request
  let res = await exec(token);

  // 3. Handle 401: Refresh and retry once
  if (res.status === 401 && requireAuth) {
    token = await refresh();
    if (token) {
      return exec(token);
    }

    // Refresh failed - session is truly dead
    handleAuthFailure();
    throw new Error("Session expired");
  }

  return res;
}