import { clearAccessToken, getAccessToken, setAccessToken } from "@/lib/tokenStore"

type apiFetchOptions = RequestInit & {
  requireAuth?: boolean
}

// Module-level variable to store the "in-flight" refresh
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  // If a refresh is already happening, return the existing promise
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) return null;

      const data = await res.json();
      const token = data?.access_token;
      
      if (token) {
        setAccessToken(token);
        return token;
      }
      return null;
    } finally {
      // Clear the promise so the next expiry can trigger a new refresh
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiFetch(
  input: RequestInfo | URL,
  options: apiFetchOptions = {},
) {
  const { requireAuth = false, headers, ...restOptions } = options;
  
  // Use a helper to build headers dynamically
  const getHeaders = (token?: string | null) => {
    const h = new Headers(headers);
    if (requireAuth && token) {
      h.set("Authorization", `Bearer ${token}`);
    }
    return h;
  };

  // 1. First Attempt
  let res = await fetch(input, {
    ...restOptions,
    headers: getHeaders(getAccessToken()),
    credentials: "include",
  });

  // 2. If not 401 or auth not required, just return
  if (res.status !== 401 || !requireAuth) {
    return res;
  }

  // 3. Handle 401 - Attempt Refresh (Concurrent-safe)
  const newToken = await refreshAccessToken();

  if (!newToken) {
    clearAccessToken();
    if (typeof window !== "undefined") window.location.assign("/home");
    throw new Error("Session expired");
  }

  // 4. Retry with the new token
  return fetch(input, {
    ...restOptions,
    headers: getHeaders(newToken),
    credentials: "include",
  });
}