import { axiosClient } from "@/lib/axiosClient";

/* -------------------------------------------------
   Shared model — represents a Crating "Area"
---------------------------------------------------*/
export interface CrateAreaInfo {
  areaGuid: string;              // Unique area identifier (UUID)
  plant: string | null;          // Plant name or code
  areaId: string | null;         // Area numeric/string ID
  areaName: string | null;       // Area display name
  cratingId: string | null;      // Crating reference
  areaPic: string | null;        // Optional image/asset path
  areaStatus: number | null;     // Area state (active/inactive/etc)
  addDatetime: string | null;    // Record creation timestamp
  connectionId: string | null;   // Device/session link ID
}

/* -------------------------------------------------
   POST /api/crate/que
   Queues a serial number for processing
---------------------------------------------------*/
export type CrateQueueResponse = string;

export async function postCrateQueue(
  serialNumber: string
): Promise<CrateQueueResponse> {
  const res = await axiosClient.post<CrateQueueResponse>(
    `/crate/que?serialNumber=${serialNumber}`
  );
  return res.data;
}

/* -------------------------------------------------
   POST /api/crate/staging
   Marks a serial number as staged
---------------------------------------------------*/
export type CrateStagingResponse = string;

export async function postCrateStaging(
  serialNumber: string
): Promise<CrateStagingResponse> {
  const res = await axiosClient.post<CrateStagingResponse>(
    `/crate/staging?serialNumber=${serialNumber}`
  );
  return res.data;
}

/* -------------------------------------------------
   POST /api/crate/crating
   Creates a crating record
---------------------------------------------------*/
export interface CrateCratingRequest {
  areaGuid: string;
  plant: string | null;
  areaId: string | null;
  areaName: string | null;
  cratingId: string | null;
  areaPic: string | null;
  areaStatus: number | null;
  addDatetime: string | null;
  connectionId: string | null;
}

export type CrateCratingResponse = string;

export async function postCrateCrating(
  serialNumber: string,
  payload: CrateCratingRequest
): Promise<CrateCratingResponse> {
  const res = await axiosClient.post<CrateCratingResponse>(
    `/crate/crating?serialNumber=${serialNumber}`,
    payload
  );
  return res.data;
}

/* -------------------------------------------------
   POST /api/crate/cancel
   Cancels an active crating operation
---------------------------------------------------*/
export interface CrateCancelRequest {
  logId: string;
  plant: string | null;
  cratingId: string | null;
  serialNumber: string | null;
  customerId: number;
  model: string | null;
  ntid: string | null;
  name: string | null;
  customer: string | null;
  division: string | null;
  status: string | null;
  area: string | null;
  logDatetime: string;
}

export type CrateCancelResponse = string;

export async function postCrateCancel(
  payload: CrateCancelRequest
): Promise<CrateCancelResponse> {
  const res = await axiosClient.post<CrateCancelResponse>(
    "/crate/cancel",
    payload
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/crate/area
   Retrieves list of available areas
---------------------------------------------------*/
export interface CrateAreaQuery {
  plant?: string;
  type?: string;
  serialNumber?: string;
  areaGuid?: string;
}

export type CrateAreaResponse = CrateAreaInfo[];

export async function getCrateArea(
  params: CrateAreaQuery = {}
): Promise<CrateAreaResponse> {
  const queryParams = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const res = await axiosClient.get<CrateAreaResponse>(
    `/crate/area?${queryParams}`
  );
  return res.data;
}

/* -------------------------------------------------
   PUT /api/crate/update/area
   Updates information for an existing area
---------------------------------------------------*/
export interface CrateUpdateAreaRequest {
  areaGuid: string;
  plant: string | null;
  areaId: string | null;
  areaName: string | null;
  cratingId: string | null;
  areaPic: string | null;
  areaStatus: number | null;
  addDatetime: string | null;
  connectionId: string | null;
}

export type CrateUpdateAreaResponse = CrateAreaInfo[];

export async function putCrateUpdateArea(
  type: string,
  payload: CrateUpdateAreaRequest
): Promise<CrateUpdateAreaResponse> {
  const res = await axiosClient.put<CrateUpdateAreaResponse>(
    `/crate/update/area?type=${type}`,
    payload
  );
  return res.data;
}

/* -------------------------------------------------
   Export grouped API object
---------------------------------------------------*/
export const crateApi = {
  postCrateQueue,
  postCrateStaging,
  postCrateCrating,
  postCrateCancel,
  getCrateArea,
  putCrateUpdateArea,
};
