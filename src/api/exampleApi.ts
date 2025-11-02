import { axiosClient } from "@/lib/axiosClient";

/* -------------------------------------------------
   Shared model — represents a generic "Item"
---------------------------------------------------*/
export interface ExampleItem {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

/* -------------------------------------------------
   GET /api/example/items
   Retrieves list of example items
---------------------------------------------------*/
export interface ExampleItemQuery {
  limit?: number;
  search?: string;
}

export type ExampleItemListResponse = ExampleItem[];

export async function getExampleItems(
  params: ExampleItemQuery = {}
): Promise<ExampleItemListResponse> {
  const queryParams = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  const res = await axiosClient.get(`/example/items?${queryParams}`);

  // ✅ backend wraps data in { success, message, data }
  return res.data.data as ExampleItemListResponse;
}

/* -------------------------------------------------
   POST /api/example/items
   Creates a new example item
---------------------------------------------------*/
export interface CreateExampleItemRequest {
  title: string;
  body: string;
}

export type CreateExampleItemResponse = ExampleItem;

export async function postExampleItem(
  payload: CreateExampleItemRequest
): Promise<CreateExampleItemResponse> {
  const res = await axiosClient.post("/example/items", payload);
  return res.data.data as CreateExampleItemResponse;
}

/* -------------------------------------------------
   PUT /api/example/items/:id
   Updates an existing example item
---------------------------------------------------*/
export interface UpdateExampleItemRequest {
  id: number;
  title?: string;
  body?: string;
}

export type UpdateExampleItemResponse = ExampleItem;

export async function putExampleItem(
  payload: UpdateExampleItemRequest
): Promise<UpdateExampleItemResponse> {
  const res = await axiosClient.put(`/example/items/${payload.id}`, payload);
  return res.data.data as UpdateExampleItemResponse;
}

/* -------------------------------------------------
   DELETE /api/example/items/:id
   Deletes an example item
---------------------------------------------------*/
export type DeleteExampleItemResponse = string;

export async function deleteExampleItem(
  id: number
): Promise<DeleteExampleItemResponse> {
  const res = await axiosClient.delete(`/example/items/${id}`);
  return res.data.data as DeleteExampleItemResponse;
}

/* -------------------------------------------------
   Export grouped API object
---------------------------------------------------*/
export const exampleApi = {
  getExampleItems,
  postExampleItem,
  putExampleItem,
  deleteExampleItem,
};
