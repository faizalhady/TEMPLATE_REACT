import { axiosClient } from "@/lib/axiosClient";

/* -------------------------------------------------
   GET /api/history/all
   Retrieves all crate history records
---------------------------------------------------*/
export interface HistoryRecord {
  historyId: string;           // UUID
  cratingId: string | null;
  plant: string | null;
  customerId: number | null;
  model: string | null;
  serialNumber: string | null;
  ntid: string | null;
  status: string | null;
  startDatetime: string | null;
  endDatetime: string | null;
  revision: string | null;
}

export type HistoryResponse = HistoryRecord[];

export async function getHistoryAll(): Promise<HistoryResponse> {
  const res = await axiosClient.get<HistoryResponse>("/history/all");
  return res.data;
}

/* -------------------------------------------------
   GET /api/history/plant
   Retrieves history filtered by plant
---------------------------------------------------*/
export async function getHistoryByPlant(plant: string): Promise<HistoryResponse> {
  const res = await axiosClient.get<HistoryResponse>(
    `/history/plant?plant=${plant}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/history/area
   Retrieves history filtered by area GUID
---------------------------------------------------*/
export async function getHistoryByArea(areaGuid: string): Promise<HistoryResponse> {
  const res = await axiosClient.get<HistoryResponse>(
    `/history/area?areaGuid=${areaGuid}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/history/customerId
   Retrieves history filtered by customer ID
---------------------------------------------------*/
export async function getHistoryByCustomerId(
  customerId: number
): Promise<HistoryResponse> {
  const res = await axiosClient.get<HistoryResponse>(
    `/history/customerId?customerId=${customerId}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/history/model
   Retrieves history filtered by model name
---------------------------------------------------*/
export async function getHistoryByModel(model: string): Promise<HistoryResponse> {
  const res = await axiosClient.get<HistoryResponse>(
    `/history/model?model=${model}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/history/cratingId
   Retrieves history filtered by crating ID
---------------------------------------------------*/
export async function getHistoryByCratingId(
  cratingId: string
): Promise<HistoryResponse> {
  const res = await axiosClient.get<HistoryResponse>(
    `/history/cratingId?cratingId=${cratingId}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/history/serialNumber
   Retrieves history filtered by serial number
---------------------------------------------------*/
export async function getHistoryBySerialNumber(
  serialNumber: string
): Promise<HistoryResponse> {
  const res = await axiosClient.get<HistoryResponse>(
    `/history/serialNumber?serialNumber=${serialNumber}`
  );
  return res.data;
}

/* -------------------------------------------------
   Export grouped API object
---------------------------------------------------*/
export const historyApi = {
  getHistoryAll,
  getHistoryByPlant,
  getHistoryByArea,
  getHistoryByCustomerId,
  getHistoryByModel,
  getHistoryByCratingId,
  getHistoryBySerialNumber,
};
