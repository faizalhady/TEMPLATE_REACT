import { useQuery } from "@tanstack/react-query";
import { historyApi } from "@/api/historyApi";
import type { HistoryResponse } from "@/api/historyApi";

/* -------------------------------------------------
   Query Keys — central reference for cache identity
---------------------------------------------------*/
export const HISTORY_KEYS = {
  all: ["history", "all"] as const,
  plant: (plant: string) => ["history", "plant", plant] as const,
  area: (areaGuid: string) => ["history", "area", areaGuid] as const,
  customerId: (customerId: number) => ["history", "customerId", customerId] as const,
  model: (model: string) => ["history", "model", model] as const,
  cratingId: (cratingId: string) => ["history", "cratingId", cratingId] as const,
  serialNumber: (serialNumber: string) => ["history", "serialNumber", serialNumber] as const,
};

/* -------------------------------------------------
   Simple development logger — only active in dev mode
---------------------------------------------------*/
const devLog = (...args: unknown[]) => {
  if (import.meta.env.MODE === "development") {
    console.log("[HistoryQuery]", ...args);
  }
};

/* -------------------------------------------------
   useHistoryAll — fetch all history records
---------------------------------------------------*/
export function useHistoryAll() {
  return useQuery<HistoryResponse, Error>({
    queryKey: HISTORY_KEYS.all,
    queryFn: async () => {
      devLog("📡 Fetching all history records...");
      const res = await historyApi.getHistoryAll();
      devLog("✅ History data:", res);
      return res;
    },
  });
}

/* -------------------------------------------------
   useHistoryByPlant — fetch history by plant
---------------------------------------------------*/
export function useHistoryByPlant(plant: string) {
  return useQuery<HistoryResponse, Error>({
    queryKey: HISTORY_KEYS.plant(plant),
    queryFn: async () => {
      devLog("📡 Fetching history for plant:", plant);
      const res = await historyApi.getHistoryByPlant(plant);
      devLog("✅ History by plant:", res);
      return res;
    },
    enabled: !!plant,
  });
}

/* -------------------------------------------------
   useHistoryByArea — fetch history by area GUID
---------------------------------------------------*/
export function useHistoryByArea(areaGuid: string) {
  return useQuery<HistoryResponse, Error>({
    queryKey: HISTORY_KEYS.area(areaGuid),
    queryFn: async () => {
      devLog("📡 Fetching history for area:", areaGuid);
      const res = await historyApi.getHistoryByArea(areaGuid);
      devLog("✅ History by area:", res);
      return res;
    },
    enabled: !!areaGuid,
  });
}

/* -------------------------------------------------
   useHistoryByCustomerId — fetch history by customer
---------------------------------------------------*/
export function useHistoryByCustomerId(customerId: number) {
  return useQuery<HistoryResponse, Error>({
    queryKey: HISTORY_KEYS.customerId(customerId),
    queryFn: async () => {
      devLog("📡 Fetching history for customerId:", customerId);
      const res = await historyApi.getHistoryByCustomerId(customerId);
      devLog("✅ History by customer:", res);
      return res;
    },
    enabled: !!customerId,
  });
}

/* -------------------------------------------------
   useHistoryByModel — fetch history by model name
---------------------------------------------------*/
export function useHistoryByModel(model: string) {
  return useQuery<HistoryResponse, Error>({
    queryKey: HISTORY_KEYS.model(model),
    queryFn: async () => {
      devLog("📡 Fetching history for model:", model);
      const res = await historyApi.getHistoryByModel(model);
      devLog("✅ History by model:", res);
      return res;
    },
    enabled: !!model,
  });
}

/* -------------------------------------------------
   useHistoryByCratingId — fetch history by crating ID
---------------------------------------------------*/
export function useHistoryByCratingId(cratingId: string) {
  return useQuery<HistoryResponse, Error>({
    queryKey: HISTORY_KEYS.cratingId(cratingId),
    queryFn: async () => {
      devLog("📡 Fetching history for cratingId:", cratingId);
      const res = await historyApi.getHistoryByCratingId(cratingId);
      devLog("✅ History by cratingId:", res);
      return res;
    },
    enabled: !!cratingId,
  });
}

/* -------------------------------------------------
   useHistoryBySerialNumber — fetch history by serial number
---------------------------------------------------*/
export function useHistoryBySerialNumber(serialNumber: string) {
  return useQuery<HistoryResponse, Error>({
    queryKey: HISTORY_KEYS.serialNumber(serialNumber),
    queryFn: async () => {
      devLog("📡 Fetching history for serial number:", serialNumber);
      const res = await historyApi.getHistoryBySerialNumber(serialNumber);
      devLog("✅ History by serial number:", res);
      return res;
    },
    enabled: !!serialNumber,
  });
}
