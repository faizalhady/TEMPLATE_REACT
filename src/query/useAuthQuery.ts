import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/authApi";
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthLogoutResponse,
  AuthDeviceResponse,
  AuthUserResponse,
} from "@/api/authApi";

/* -------------------------------------------------
   Query Keys — central reference for cache identity
---------------------------------------------------*/
export const AUTH_KEYS = {
  user: (ntid: string) => ["auth", "user", ntid] as const,
  device: (serialNumber: string) => ["auth", "device", serialNumber] as const,
  login: ["auth", "login"] as const,
  logout: ["auth", "logout"] as const,
};

/* -------------------------------------------------
   Simple development logger — only active in dev mode
---------------------------------------------------*/
const devLog = (...args: unknown[]) => {
  if (import.meta.env.MODE === "development") {
    console.log("[AuthQuery]", ...args);
  }
};

/* -------------------------------------------------
   useAuthLogin — handles login mutation
---------------------------------------------------*/
export function useAuthLogin() {
  return useMutation<AuthLoginResponse, Error, AuthLoginRequest>({
    mutationFn: (payload) => {
      devLog("🔹 Login attempt:", payload.username);
      return authApi.postAuthLogin(payload);
    },
    onSuccess: (token) => {
      devLog("✅ Login success. Token length:", token?.length ?? 0);
      localStorage.setItem("auth_token", token);
    },
    onError: (error) => {
      devLog("❌ Login failed:", error.message);
    },
  });
}

/* -------------------------------------------------
   useAuthLogout — clears cache and token
---------------------------------------------------*/
export function useAuthLogout() {
  const queryClient = useQueryClient();
  return useMutation<AuthLogoutResponse, Error, void>({
    mutationFn: () => {
      devLog("🔹 Logging out user...");
      return authApi.getAuthLogout();
    },
    onSuccess: () => {
      devLog("✅ Logout success. Clearing cache & token.");
      queryClient.clear();
      localStorage.removeItem("auth_token");
    },
    onError: (err) => {
      devLog("❌ Logout failed:", err.message);
    },
  });
}

/* -------------------------------------------------
   useAuthDevice — fetches device/area info
---------------------------------------------------*/
export function useAuthDevice(serialNumber: string) {
  return useQuery<AuthDeviceResponse, Error>({
    queryKey: AUTH_KEYS.device(serialNumber),
    queryFn: async () => {
      devLog("📡 Fetching device info for:", serialNumber);
      const res = await authApi.getAuthDevice(serialNumber);
      devLog("✅ Device data:", res);
      return res;
    },
    enabled: !!serialNumber, // avoids running when parameter empty
  });
}

/* -------------------------------------------------
   useAuthUser — fetches user info by NTID
---------------------------------------------------*/
export function useAuthUser(ntid: string) {
  return useQuery<AuthUserResponse, Error>({
    queryKey: AUTH_KEYS.user(ntid),
    queryFn: async () => {
      devLog("📡 Fetching user info for:", ntid);
      const res = await authApi.getAuthUser(ntid);
      devLog("✅ User data:", res);
      return res;
    },
    enabled: !!ntid,
  });
}
