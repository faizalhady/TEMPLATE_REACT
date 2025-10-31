import { useQuery } from "@tanstack/react-query";
import { logApi } from "@/api/logApi";
import type { LogResponse } from "@/api/logApi";

/* -------------------------------------------------
   Query Keys — central reference for cache identity
---------------------------------------------------*/
export const LOG_KEYS = {
  all: ["log", "all"] as const,
  plant: (plant: string) => ["log", "plant", plant] as const,
  status: (status: string) => ["log", "status", status] as const,
  cancelStatus: (serialNumber: string) => ["log", "cancel", serialNumber] as const,
  customerId: (customerId: number) => ["log", "customerId", customerId] as const,
  crateId: (crateId: string) => ["log", "crateId", crateId] as const,
  serialNumber: (serialNumber: string) => ["log", "serialNumber", serialNumber] as const,
  queue: ["log", "queue"] as const,
};

/* -------------------------------------------------
   Simple development logger — only active in dev mode
---------------------------------------------------*/
const devLog = (...args: unknown[]) => {
  if (import.meta.env.MODE === "development") {
    console.log("[LogQuery]", ...args);
  }
};

/* -------------------------------------------------
   useLogAll — fetch all logs
---------------------------------------------------*/
export function useLogAll() {
  return useQuery<LogResponse, Error>({
    queryKey: LOG_KEYS.all,
    queryFn: async () => {
      devLog("📡 Fetching all logs...");
      const res = await logApi.getLogAll();
      devLog("✅ Logs:", res);
      return res;
    },
  });
}

/* -------------------------------------------------
   useLogByPlant — fetch logs filtered by plant
---------------------------------------------------*/
export function useLogByPlant(plant: string) {
  return useQuery<LogResponse, Error>({
    queryKey: LOG_KEYS.plant(plant),
    queryFn: async () => {
      devLog("📡 Fetching logs for plant:", plant);
      const res = await logApi.getLogByPlant(plant);
      devLog("✅ Logs by plant:", res);
      return res;
    },
    enabled: !!plant,
  });
}

/* -------------------------------------------------
   useLogByStatus — fetch logs by status
---------------------------------------------------*/
export function useLogByStatus(status: string) {
  return useQuery<LogResponse, Error>({
    queryKey: LOG_KEYS.status(status),
    queryFn: async () => {
      devLog("📡 Fetching logs for status:", status);
      const res = await logApi.getLogByStatus(status);
      devLog("✅ Logs by status:", res);
      return res;
    },
    enabled: !!status,
  });
}

/* -------------------------------------------------
   useLogCancelStatus — cancel crate by serial number
---------------------------------------------------*/
export function useLogCancelStatus(serialNumber: string) {
  return useQuery<LogResponse, Error>({
    queryKey: LOG_KEYS.cancelStatus(serialNumber),
    queryFn: async () => {
      devLog("📡 Canceling crate with serial number:", serialNumber);
      const res = await logApi.getLogCancelStatus(serialNumber);
      devLog("✅ Cancel status result:", res);
      return res;
    },
    enabled: !!serialNumber,
  });
}

/* -------------------------------------------------
   useLogByCustomerId — fetch logs by customer ID
---------------------------------------------------*/
export function useLogByCustomerId(customerId: number) {
  return useQuery<LogResponse, Error>({
    queryKey: LOG_KEYS.customerId(customerId),
    queryFn: async () => {
      devLog("📡 Fetching logs for customerId:", customerId);
      const res = await logApi.getLogByCustomerId(customerId);
      devLog("✅ Logs by customer:", res);
      return res;
    },
    enabled: !!customerId,
  });
}

/* -------------------------------------------------
   useLogByCrateId — fetch logs by crateId
---------------------------------------------------*/
export function useLogByCrateId(crateId: string) {
  return useQuery<LogResponse, Error>({
    queryKey: LOG_KEYS.crateId(crateId),
    queryFn: async () => {
      devLog("📡 Fetching logs for crateId:", crateId);
      const res = await logApi.getLogByCrateId(crateId);
      devLog("✅ Logs by crateId:", res);
      return res;
    },
    enabled: !!crateId,
  });
}

/* -------------------------------------------------
   useLogBySerialNumber — fetch logs by serial number
---------------------------------------------------*/
export function useLogBySerialNumber(serialNumber: string) {
  return useQuery<LogResponse, Error>({
    queryKey: LOG_KEYS.serialNumber(serialNumber),
    queryFn: async () => {
      devLog("📡 Fetching logs for serialNumber:", serialNumber);
      const res = await logApi.getLogBySerialNumber(serialNumber);
      devLog("✅ Logs by serial number:", res);
      return res;
    },
    enabled: !!serialNumber,
  });
}

/* -------------------------------------------------
   useLogQueue — fetch queued logs
---------------------------------------------------*/
export function useLogQueue() {
  return useQuery<LogResponse, Error>({
    queryKey: LOG_KEYS.queue,
    queryFn: async () => {
      devLog("📡 Fetching queued logs...");
      const res = await logApi.getLogQueue();
      devLog("✅ Queued logs:", res);
      return res;
    },
  });
}
