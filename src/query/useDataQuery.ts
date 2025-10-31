import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dataApi } from "@/api/dataApi";
import type {
  DataCustomerResponse,
  DataPlantResponse,
  DataVendorResponse,
  DataUserResponse,
  DataNewUserRequest,
  DataNewUserResponse,
  DataUpdateUserRequest,
  DataUpdateUserResponse,
  DataNewAreaRequest,
  DataNewAreaResponse,
  DataUpdateAreaRequest,
  DataUpdateAreaResponse,
  DataDeleteAreaResponse,
  DataTestAreaRequest,
  DataTestAreaResponse,
} from "@/api/dataApi";

/* -------------------------------------------------
   Query Keys — central reference for cache identity
---------------------------------------------------*/
export const DATA_KEYS = {
  customer: (id?: number) => ["data", "customer", id ?? 0] as const,
  plant: ["data", "plant"] as const,
  vendor: (id?: number) => ["data", "vendor", id ?? 0] as const,
  user: (params?: Record<string, unknown>) => ["data", "user", params] as const,
  newUser: ["data", "newUser"] as const,
  updateUser: ["data", "updateUser"] as const,
  newArea: ["data", "newArea"] as const,
  updateSettingArea: ["data", "updateSettingArea"] as const,
  deleteArea: (areaGuid: string) => ["data", "deleteArea", areaGuid] as const,
  getTestArea: ["data", "getTestArea"] as const,
};

/* -------------------------------------------------
   Simple development logger — only active in dev mode
---------------------------------------------------*/
const devLog = (...args: unknown[]) => {
  if (import.meta.env.MODE === "development") {
    console.log("[DataQuery]", ...args);
  }
};

/* -------------------------------------------------
   useDataCustomer — retrieves customer list or by ID
---------------------------------------------------*/
export function useDataCustomer(id: number = 0) {
  return useQuery<DataCustomerResponse, Error>({
    queryKey: DATA_KEYS.customer(id),
    queryFn: async () => {
      devLog("📡 Fetching customer data for ID:", id);
      const res = await dataApi.getDataCustomer(id);
      devLog("✅ Customer data:", res);
      return res;
    },
  });
}

/* -------------------------------------------------
   useDataPlant — retrieves plant list
---------------------------------------------------*/
export function useDataPlant() {
  return useQuery<DataPlantResponse, Error>({
    queryKey: DATA_KEYS.plant,
    queryFn: async () => {
      devLog("📡 Fetching plant data...");
      const res = await dataApi.getDataPlant();
      devLog("✅ Plant data:", res);
      return res;
    },
  });
}

/* -------------------------------------------------
   useDataVendor — retrieves vendor data or by ID
---------------------------------------------------*/
export function useDataVendor(id: number = 0) {
  return useQuery<DataVendorResponse, Error>({
    queryKey: DATA_KEYS.vendor(id),
    queryFn: async () => {
      devLog("📡 Fetching vendor data for ID:", id);
      const res = await dataApi.getDataVendor(id);
      devLog("✅ Vendor data:", res);
      return res;
    },
  });
}

/* -------------------------------------------------
   useDataUser — fetch user list or filter by params
---------------------------------------------------*/
export function useDataUser(params?: {
  userId?: string;
  ntid?: string;
  role?: string;
}) {
  return useQuery<DataUserResponse, Error>({
    queryKey: DATA_KEYS.user(params),
    queryFn: async () => {
      devLog("📡 Fetching user data with filters:", params);
      const res = await dataApi.getDataUser(params);
      devLog("✅ User data:", res);
      return res;
    },
    enabled: !!params,
  });
}

/* -------------------------------------------------
   useDataNewUser — create new user
---------------------------------------------------*/
export function useDataNewUser() {
  const queryClient = useQueryClient();
  return useMutation<DataNewUserResponse, Error, DataNewUserRequest[]>({
    mutationFn: (payload) => {
      devLog("📝 Creating new user(s):", payload);
      return dataApi.postDataNewUser(payload);
    },
    onSuccess: (res) => {
      devLog("✅ New user created:", res);
      queryClient.invalidateQueries({ queryKey: ["data", "user"] });
    },
    onError: (err) => {
      devLog("❌ Failed to create user:", err.message);
    },
  });
}

/* -------------------------------------------------
   useDataUpdateUser — update user details
---------------------------------------------------*/
export function useDataUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation<DataUpdateUserResponse, Error, DataUpdateUserRequest>({
    mutationFn: (payload) => {
      devLog("📝 Updating user:", payload);
      return dataApi.putDataUpdateUser(payload);
    },
    onSuccess: (res) => {
      devLog("✅ User updated:", res);
      queryClient.invalidateQueries({ queryKey: ["data", "user"] });
    },
    onError: (err) => {
      devLog("❌ Failed to update user:", err.message);
    },
  });
}

/* -------------------------------------------------
   useDataNewArea — create new area
---------------------------------------------------*/
export function useDataNewArea() {
  const queryClient = useQueryClient();
  return useMutation<DataNewAreaResponse, Error, DataNewAreaRequest>({
    mutationFn: (payload) => {
      devLog("📝 Creating new area:", payload);
      return dataApi.postDataNewArea(payload);
    },
    onSuccess: (res) => {
      devLog("✅ New area created:", res);
      queryClient.invalidateQueries({ queryKey: ["data", "area"] });
    },
    onError: (err) => {
      devLog("❌ Failed to create area:", err.message);
    },
  });
}

/* -------------------------------------------------
   useDataUpdateSettingArea — update existing area
---------------------------------------------------*/
export function useDataUpdateSettingArea() {
  const queryClient = useQueryClient();
  return useMutation<DataUpdateAreaResponse, Error, DataUpdateAreaRequest>({
    mutationFn: (payload) => {
      devLog("📝 Updating area:", payload);
      return dataApi.putDataUpdateSettingArea(payload);
    },
    onSuccess: (res) => {
      devLog("✅ Area updated:", res);
      queryClient.invalidateQueries({ queryKey: ["data", "area"] });
    },
    onError: (err) => {
      devLog("❌ Failed to update area:", err.message);
    },
  });
}

/* -------------------------------------------------
   useDataDeleteArea — delete area by GUID
---------------------------------------------------*/
export function useDataDeleteArea() {
  const queryClient = useQueryClient();
  return useMutation<DataDeleteAreaResponse, Error, string>({
    mutationFn: (areaGuid) => {
      devLog("🗑️ Deleting area:", areaGuid);
      return dataApi.deleteDataArea(areaGuid);
    },
    onSuccess: (res) => {
      devLog("✅ Area deleted:", res);
      queryClient.invalidateQueries({ queryKey: ["data", "area"] });
    },
    onError: (err) => {
      devLog("❌ Failed to delete area:", err.message);
    },
  });
}

/* -------------------------------------------------
   useDataGetTestArea — test retrieval of area info
---------------------------------------------------*/
export function useDataGetTestArea() {
  return useMutation<DataTestAreaResponse, Error, DataTestAreaRequest>({
    mutationFn: (payload) => {
      devLog("📡 Testing get area:", payload);
      return dataApi.postDataGetTestArea(payload);
    },
    onSuccess: (res) => {
      devLog("✅ Test area data received:", res);
    },
    onError: (err) => {
      devLog("❌ Test area fetch failed:", err.message);
    },
  });
}
