import { useQuery } from "@tanstack/react-query";
import { serviceApi } from "@/api/serviceApi";
import type { ServiceStatus } from "@/api/serviceApi";

/* -------------------------------------------------
   Query Keys — cache reference
---------------------------------------------------*/
export const SERVICE_KEYS = {
  status: (serviceName: string) => ["service", "status", serviceName] as const,
};

/* -------------------------------------------------
   Dev logger (only in dev mode)
---------------------------------------------------*/
const devLog = (...args: unknown[]) => {
  if (import.meta.env.MODE === "development") {
    console.log("[ServiceQuery]", ...args);
  }
};

/* -------------------------------------------------
   useServiceStatus — fetch WorkerService status
---------------------------------------------------*/
export function useServiceStatus(serviceName: string) {
  return useQuery<ServiceStatus, Error>({
    queryKey: SERVICE_KEYS.status(serviceName),
    queryFn: async () => {
      devLog("📡 Checking service status for:", serviceName);
      const res = await serviceApi.getServiceStatus(serviceName);
      devLog("✅ Service status:", res);
      return res;
    },
    enabled: !!serviceName,
    refetchInterval: 5000, // auto-refresh every 5s (optional)
  });
}
