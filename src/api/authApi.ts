import { axiosClient } from "@/lib/axiosClient";

/* -------------------------------------------------
   POST /api/auth/login
   Authenticates user credentials and returns a token
---------------------------------------------------*/
export interface AuthLoginRequest {
  username: string | null;      // User NTID or login name
  password: string | null;      // Plain or hashed password
  uniqueCode: string | null;    // Optional device or area code
  type: string | null;          // Login source/type
}

export type AuthLoginResponse = string;

export async function postAuthLogin(
  payload: AuthLoginRequest
): Promise<AuthLoginResponse> {
  const res = await axiosClient.post<AuthLoginResponse>(
    "/auth/login",
    payload
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/auth/logout
   Logs out current authenticated session
---------------------------------------------------*/
export type AuthLogoutResponse = void;

export async function getAuthLogout(): Promise<AuthLogoutResponse> {
  await axiosClient.get("/auth/logout");
}

/* -------------------------------------------------
   GET /api/auth/device
   Retrieves device or area info for a given serial number
---------------------------------------------------*/
export interface AuthDeviceInfo {
  areaGuid: string;            // UUID of area
  plant: string | null;        // Plant code
  areaId: string | null;       // Internal area ID
  areaName: string | null;     // Display name of area
  cratingId: string | null;    // Related crating ID
  areaPic: string | null;      // Optional image path
  areaStatus: number | null;   // Active/inactive state
  addDatetime: string | null;  // Created timestamp
  connectionId: string | null; // Device/session link
}

export type AuthDeviceResponse = AuthDeviceInfo[];

export async function getAuthDevice(
  serialNumber: string
): Promise<AuthDeviceResponse> {
  const res = await axiosClient.get<AuthDeviceResponse>(
    `/auth/device?serialNumber=${serialNumber}`
  );
  return res.data;
}

/* -------------------------------------------------
   GET /api/auth/user
   Retrieves user info based on NTID
---------------------------------------------------*/
export interface AuthUserInfo {
  userId: string;               // Unique user ID
  customerId: string | null;    // Linked customer reference
  userNtid: string | null;      // NTID / login name
  userName: string | null;      // Full display name
  userRole: string | null;      // Role or permission level
  userUniqueCode: string | null;// Unique auth code
  userEmail: string | null;     // Contact email
  userAddedBy: string | null;   // Created by (NTID or system)
  userAddedWhen: string | null; // Timestamp added
  userIsActive: boolean | null; // Account active/inactive
}

export type AuthUserResponse = AuthUserInfo[];

export async function getAuthUser(
  ntid: string
): Promise<AuthUserResponse> {
  const res = await axiosClient.get<AuthUserResponse>(
    `/auth/user?ntid=${ntid}`
  );
  return res.data;
}

/* -------------------------------------------------
   Export grouped API object
---------------------------------------------------*/
export const authApi = {
  postAuthLogin,
  getAuthLogout,
  getAuthDevice,
  getAuthUser,
};
