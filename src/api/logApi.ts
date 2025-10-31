import { axiosClient } from "@/lib/axiosClient";

/* -------------------------------------------------
   LogRecord — shared data model
---------------------------------------------------*/
export interface LogRecord {
  logId: string;
  plant: string | null;
  cratingId: string | null;
  serialNumber: string | null;
  customerId: number | null;
  model: string | null;
  ntid: string | null;
  name: string | null;
  customer: string | null;
  division: string | null;
  status: string | null;
  area: string | null;
  logDatetime: string | null;
}

export type LogResponse = LogRecord[];

/* -------------------------------------------------
   GET /api/log/all — fetch all log records
---------------------------------------------------*/
export async function getLogAll(): Promise<LogResponse> {
  const res = await axiosClient.get<LogResponse>("/log/all");
  return res.data;
}

/* -------------------------------------------------
   GET /api/log/plant — fetch logs by plant
---------------------------------------------------*/
export async function getLogByPlant(plant: string): Promise<LogResponse> {
  const res = await axiosClient.get<LogResponse>(`/log/plant?plant=${plant}`);
  return res.data;
}

/* -------------------------------------------------
   GET /api/log/status — fetch logs by status
---------------------------------------------------*/
export async function getLogByStatus(status: string): Promise<LogResponse> {
  const res = await axiosClient.get<LogResponse>(`/log/status?status=${status}`);
  return res.data;
}

/* -------------------------------------------------
   GET /api/log/status/cancel — cancel crate by serialNumber
---------------------------------------------------*/
export async function getLogCancelStatus(serialNumber: string): Promise<LogResponse> {
  const res = await axiosClient.get<LogResponse>(
    `/log/status/cancel?serialNumber=${serialNumber}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/log/customerId — fetch logs by customerId
---------------------------------------------------*/
export async function getLogByCustomerId(customerId: number): Promise<LogResponse> {
  const res = await axiosClient.get<LogResponse>(
    `/log/customerId?customerId=${customerId}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/log/crateId — fetch logs by crateId
---------------------------------------------------*/
export async function getLogByCrateId(crateId: string): Promise<LogResponse> {
  const res = await axiosClient.get<LogResponse>(`/log/crateId?crateId=${crateId}`);
  return res.data;
}

/* -------------------------------------------------
   GET /api/log/serialNumber — fetch logs by serial number
---------------------------------------------------*/
export async function getLogBySerialNumber(serialNumber: string): Promise<LogResponse> {
  const res = await axiosClient.get<LogResponse>(
    `/log/serialNumber?serialNumber=${serialNumber}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/log/que — fetch current queue logs
---------------------------------------------------*/
export async function getLogQueue(): Promise<LogResponse> {
  const res = await axiosClient.get<LogResponse>("/log/que");
  return res.data;
}

/* -------------------------------------------------
   Export grouped API object
---------------------------------------------------*/
export const logApi = {
  getLogAll,
  getLogByPlant,
  getLogByStatus,
  getLogCancelStatus,
  getLogByCustomerId,
  getLogByCrateId,
  getLogBySerialNumber,
  getLogQueue,
};
