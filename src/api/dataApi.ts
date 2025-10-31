import { axiosClient } from "@/lib/axiosClient";

/* -------------------------------------------------
   GET /api/data/customer
   Retrieves customer data by ID (optional)
---------------------------------------------------*/
export interface DataCustomer {
  customerId: number;
  customerName: string | null;
  divisionName: string | null;
  customerDivisionName: string | null;
  active: boolean;
}

export type DataCustomerResponse = DataCustomer[];

export async function getDataCustomer(
  id: number = 0
): Promise<DataCustomerResponse> {
  const res = await axiosClient.get<DataCustomerResponse>(
    `/data/customer?id=${id}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/data/plant
   Retrieves list of plants
---------------------------------------------------*/
export interface DataPlant {
  plant: string | null;
}

export type DataPlantResponse = DataPlant[];

export async function getDataPlant(): Promise<DataPlantResponse> {
  const res = await axiosClient.get<DataPlantResponse>("/data/plant");
  return res.data;
}

/* -------------------------------------------------
   GET /api/data/vendor
   Retrieves vendor data by ID (optional)
---------------------------------------------------*/
export interface DataVendor {
  vendorGuid: string;
  vendorId: number;
  vendorName: string | null;
  active: number;
}

export type DataVendorResponse = DataVendor[];

export async function getDataVendor(
  id: number = 0
): Promise<DataVendorResponse> {
  const res = await axiosClient.get<DataVendorResponse>(
    `/data/vendor?id=${id}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/data/user
   Retrieves user information based on filters
---------------------------------------------------*/
export interface DataUser {
  userId: string; // UUID
  customerId: number | null;
  userNtid: string | null;
  userName: string | null;
  userRole: string | null;
  userUniqueCode: string | null;
  userEmail: string | null;
  userAddedBy: string | null;
  userAddedWhen: string | null;
  userIsActive: boolean | null;
}

export type DataUserResponse = DataUser[];

export async function getDataUser(params?: {
  userId?: string;
  ntid?: string;
  role?: string;
}): Promise<DataUserResponse> {
  const queryParams = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const res = await axiosClient.get<DataUserResponse>(`/data/user?${queryParams}`);
  return res.data;
}

/* -------------------------------------------------
   POST /api/data/new/user
   Creates new user(s)
---------------------------------------------------*/
export interface DataNewUserRequest {
  userId: string;
  customerId: number | null;
  userNtid: string | null;
  userName: string | null;
  userRole: string | null;
  userUniqueCode: string | null;
  userEmail: string | null;
  userAddedBy: string | null;
  userAddedWhen: string | null;
  userIsActive: number | null;
}

export type DataNewUserResponse = string;

export async function postDataNewUser(
  payload: DataNewUserRequest[]
): Promise<DataNewUserResponse> {
  const res = await axiosClient.post<DataNewUserResponse>(
    "/data/new/user",
    payload
  );
  return res.data;
}

/* -------------------------------------------------
   PUT /api/data/update/user
   Updates user information
---------------------------------------------------*/
export interface DataUpdateUserRequest {
  userId: string;
  customerId: number | null;
  userNtid: string | null;
  userName: string | null;
  userRole: string | null;
  userUniqueCode: string | null;
  userEmail: string | null;
  userAddedBy: string | null;
  userAddedWhen: string | null;
  userIsActive: number | null;
}

export type DataUpdateUserResponse = string;

export async function putDataUpdateUser(
  payload: DataUpdateUserRequest
): Promise<DataUpdateUserResponse> {
  const res = await axiosClient.put<DataUpdateUserResponse>(
    "/data/update/user",
    payload
  );
  return res.data;
}

/* -------------------------------------------------
   POST /api/data/new/area
   Creates a new area record
---------------------------------------------------*/
export interface DataNewAreaRequest {
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

export type DataNewAreaResponse = string;

export async function postDataNewArea(
  payload: DataNewAreaRequest
): Promise<DataNewAreaResponse> {
  const res = await axiosClient.post<DataNewAreaResponse>(
    "/data/new/area",
    payload
  );
  return res.data;
}

/* -------------------------------------------------
   PUT /api/data/update/setting/area
   Updates area configuration
---------------------------------------------------*/
export interface DataUpdateAreaRequest {
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

export type DataUpdateAreaResponse = DataUpdateAreaRequest;

export async function putDataUpdateSettingArea(
  payload: DataUpdateAreaRequest
): Promise<DataUpdateAreaResponse> {
  const res = await axiosClient.put<DataUpdateAreaResponse>(
    "/data/update/setting/area",
    payload
  );
  return res.data;
}

/* -------------------------------------------------
   DELETE /api/data/delete/area
   Deletes an area by GUID
---------------------------------------------------*/
export type DataDeleteAreaResponse = string;

export async function deleteDataArea(
  areaGuid: string
): Promise<DataDeleteAreaResponse> {
  const res = await axiosClient.delete<DataDeleteAreaResponse>(
    `/data/delete/area?areaGuid=${areaGuid}`
  );
  return res.data;
}

/* -------------------------------------------------
   POST /api/data/getTest/area
   Retrieves test area information
---------------------------------------------------*/
export interface DataTestAreaRequest {
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

export type DataTestAreaResponse = DataTestAreaRequest;

export async function postDataGetTestArea(
  payload: DataTestAreaRequest
): Promise<DataTestAreaResponse> {
  const res = await axiosClient.post<DataTestAreaResponse>(
    "/data/getTest/area",
    payload
  );
  return res.data;
}

/* -------------------------------------------------
   Export grouped API object
---------------------------------------------------*/
export const dataApi = {
  getDataCustomer,
  getDataPlant,
  getDataVendor,
  getDataUser,
  postDataNewUser,
  putDataUpdateUser,
  postDataNewArea,
  putDataUpdateSettingArea,
  deleteDataArea,
  postDataGetTestArea,
};
