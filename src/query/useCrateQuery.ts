import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { crateApi } from "@/api/crateApi";
import type {
  CrateAreaQuery,
  CrateAreaResponse,
  CrateQueueResponse,
  CrateStagingResponse,
  CrateCratingRequest,
  CrateCratingResponse,
  CrateCancelRequest,
  CrateCancelResponse,
  CrateUpdateAreaRequest,
  CrateUpdateAreaResponse,
} from "@/api/crateApi";

/* -------------------------------------------------
   Query Keys — cache identity system for Crate data
---------------------------------------------------*/
export const CRATE_KEYS = {
  area: (query?: CrateAreaQuery) => ["crate", "area", query] as const,
  queue: ["crate", "queue"] as const,
  staging: ["crate", "staging"] as const,
  crating: ["crate", "crating"] as const,
  cancel: ["crate", "cancel"] as const,
  updateArea: ["crate", "updateArea"] as const,
};

/* -------------------------------------------------
   Dev logger — only runs in development mode
---------------------------------------------------*/
const devLog = (...args: unknown[]) => {
  if (import.meta.env.MODE === "development") {
    console.log("[CrateQuery]", ...args);
  }
};

/* -------------------------------------------------
   useCrateArea — fetches crate area info
---------------------------------------------------*/
export function useCrateArea(query?: CrateAreaQuery) {
  return useQuery<CrateAreaResponse, Error>({
    queryKey: CRATE_KEYS.area(query),
    queryFn: async () => {
      devLog("📡 Fetching Crate Area data with params:", query);
      const res = await crateApi.getCrateArea(query);
      devLog("✅ Area data received:", res);
      return res;
    },
    enabled: !!query, // prevents running with undefined params
  });
}

/* -------------------------------------------------
   useCrateQueue — queues serial number
---------------------------------------------------*/
export function useCrateQueue() {
  return useMutation<CrateQueueResponse, Error, string>({
    mutationFn: async (serialNumber) => {
      devLog("🔹 Queueing crate serial:", serialNumber);
      const res = await crateApi.postCrateQueue(serialNumber);
      devLog("✅ Queue success:", res);
      return res;
    },
    onError: (err) => {
      devLog("❌ Queue failed:", err.message);
    },
  });
}

/* -------------------------------------------------
   useCrateStaging — marks serial number as staged
---------------------------------------------------*/
export function useCrateStaging() {
  return useMutation<CrateStagingResponse, Error, string>({
    mutationFn: async (serialNumber) => {
      devLog("🔹 Staging crate serial:", serialNumber);
      const res = await crateApi.postCrateStaging(serialNumber);
      devLog("✅ Staging success:", res);
      return res;
    },
    onError: (err) => {
      devLog("❌ Staging failed:", err.message);
    },
  });
}

/* -------------------------------------------------
   useCrateCrating — creates a crating record
---------------------------------------------------*/
export function useCrateCrating() {
  return useMutation<
    CrateCratingResponse,
    Error,
    { serialNumber: string; payload: CrateCratingRequest }
  >({
    mutationFn: async ({ serialNumber, payload }) => {
      devLog("🔹 Creating Crating record:", serialNumber, payload);
      const res = await crateApi.postCrateCrating(serialNumber, payload);
      devLog("✅ Crating record created:", res);
      return res;
    },
    onError: (err) => {
      devLog("❌ Crating failed:", err.message);
    },
  });
}

/* -------------------------------------------------
   useCrateCancel — cancels an active crating operation
---------------------------------------------------*/
export function useCrateCancel() {
  return useMutation<CrateCancelResponse, Error, CrateCancelRequest>({
    mutationFn: async (payload) => {
      devLog("🔹 Cancelling Crating operation:", payload.cratingId);
      const res = await crateApi.postCrateCancel(payload);
      devLog("✅ Crating Cancelled:", res);
      return res;
    },
    onError: (err) => {
      devLog("❌ Cancel operation failed:", err.message);
    },
  });
}

/* -------------------------------------------------
   useCrateUpdateArea — updates existing area record
---------------------------------------------------*/
export function useCrateUpdateArea() {
  const queryClient = useQueryClient();
  return useMutation<
    CrateUpdateAreaResponse,
    Error,
    { type: string; payload: CrateUpdateAreaRequest }
  >({
    mutationFn: async ({ type, payload }) => {
      devLog("🔹 Updating area type:", type);
      const res = await crateApi.putCrateUpdateArea(type, payload);
      devLog("✅ Area updated:", res);
      return res;
    },
    onSuccess: () => {
      devLog("♻️ Invalidating Crate Area cache...");
      queryClient.invalidateQueries({ queryKey: CRATE_KEYS.area() });
    },
    onError: (err) => {
      devLog("❌ Update area failed:", err.message);
    },
  });
}
