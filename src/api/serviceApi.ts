import { axiosClient } from "@/lib/axiosClient";

/* -------------------------------------------------
   ServiceStatus — shape of service response
---------------------------------------------------*/
export interface ServiceStatus {
  status: string | null;       // e.g., "Running", "Stopped", "Error"
  displayName: string | null;  // human-readable name (optional)
}

/* -------------------------------------------------
   GET /api/service/status — get service status
---------------------------------------------------*/
export async function getServiceStatus(serviceName: string): Promise<ServiceStatus> {
  const res = await axiosClient.get<ServiceStatus>(
    `/service/status?serviceName=${serviceName}`
  );
  return res.data;
}

/* -------------------------------------------------
   Export grouped API object
---------------------------------------------------*/
export const serviceApi = {
  getServiceStatus,
};
