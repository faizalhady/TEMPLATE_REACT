import { useState } from "react";
import {
  useExampleAll,
  useExampleById,
  useCreateExampleItem,
  useUpdateExampleItem,
  useDeleteExampleItem,
} from "@/query/useExampleQuery";
import { devLog } from "@/lib/devLog";

/* -------------------------------------------------
   🧩 Full CRUD Example API Tester Page
---------------------------------------------------*/
export default function ExampleApiTester() {
  /* -------------------------------------------------
     🔹 Local state
  ---------------------------------------------------*/
  const [params, setParams] = useState({ limit: "", search: "" });
  const [searchId, setSearchId] = useState<number | "">("");
  const [form, setForm] = useState({ id: 0, title: "", body: "" });
  const [isEditing, setIsEditing] = useState(false);

  /* -------------------------------------------------
     🔹 Query Hooks
  ---------------------------------------------------*/
  const { data: allItems, isLoading, refetch } = useExampleAll({
    limit: params.limit ? Number(params.limit) : undefined,
    search: params.search || undefined,
  });
  const { data: singleItem, refetch: refetchById } = useExampleById(
    typeof searchId === "number" ? searchId : 0
  );

  /* -------------------------------------------------
     🔹 Mutation Hooks
  ---------------------------------------------------*/
  const create = useCreateExampleItem();
  const update = useUpdateExampleItem();
  const remove = useDeleteExampleItem();

  /* -------------------------------------------------
     🔹 Handlers
  ---------------------------------------------------*/
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      update.mutate(
        { id: form.id, title: form.title, body: form.body },
        {
          onSuccess: () => {
            devLog("ExampleApiTester", "✅ Updated item successfully");
            setForm({ id: 0, title: "", body: "" });
            setIsEditing(false);
          },
        }
      );
    } else {
      create.mutate(
        { title: form.title, body: form.body },
        {
          onSuccess: () => {
            devLog("ExampleApiTester", "✅ Created item successfully");
            setForm({ id: 0, title: "", body: "" });
          },
        }
      );
    }
  };

  const handleEdit = (item: { id: number; title: string; body: string }) => {
    setForm(item);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    remove.mutate(id);
  };

  const handleSearchById = () => {
    if (!searchId) return;
    devLog("ExampleApiTester", "🔍 Fetching item by ID:", searchId);
    refetchById();
  };

  /* -------------------------------------------------
     🔹 Render
  ---------------------------------------------------*/
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">🧪 Full CRUD Example API Tester</h1>

      {/* -------------------------------------------------
          🔍 GET /api/example/items — with limit/search
      ---------------------------------------------------*/}
      <section className="border rounded-lg p-4 bg-muted/20 space-y-3">
        <h2 className="text-lg font-semibold">🔍 Fetch All Items</h2>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            placeholder="Limit"
            className="border px-2 py-1 rounded text-sm w-24"
            value={params.limit}
            onChange={(e) => setParams({ ...params, limit: e.target.value })}
          />
          <input
            type="text"
            placeholder="Search title"
            className="border px-2 py-1 rounded text-sm"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value })}
          />
          <button
            onClick={() => refetch()}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
          >
            Fetch
          </button>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : allItems?.length ? (
          <ul className="divide-y border rounded-md mt-2">
            {allItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-3 hover:bg-muted/10"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.body}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-2 py-1 text-xs bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 text-xs bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No items found.</p>
        )}
      </section>

      {/* -------------------------------------------------
          📦 POST + PUT — create or update form
      ---------------------------------------------------*/}
      <section className="border rounded-lg p-4 bg-muted/30 space-y-4">
        <h2 className="text-lg font-semibold">
          {isEditing ? "✏️ Update Item" : "➕ Create Item"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Body"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            required
            rows={3}
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white text-sm rounded"
            >
              {isEditing ? "Update Item" : "Create Item"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setForm({ id: 0, title: "", body: "" });
                  setIsEditing(false);
                }}
                className="px-4 py-2 bg-gray-500 text-white text-sm rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* -------------------------------------------------
          🔎 GET /api/example/items/:id — fetch single
      ---------------------------------------------------*/}
      <section className="border rounded-lg p-4 bg-muted/10 space-y-4">
        <h2 className="text-lg font-semibold">🔎 Fetch Single Item by ID</h2>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            value={searchId}
            onChange={(e) =>
              setSearchId(e.target.value ? Number(e.target.value) : "")
            }
            className="border rounded px-2 py-1 text-sm w-32"
            placeholder="Enter ID"
          />
          <button
            onClick={handleSearchById}
            disabled={!searchId}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded disabled:opacity-50"
          >
            Fetch
          </button>
        </div>

        {singleItem ? (
          <div className="p-3 border rounded bg-white">
            <p>
              <strong>ID:</strong> {singleItem.id}
            </p>
            <p>
              <strong>Title:</strong> {singleItem.title}
            </p>
            <p>
              <strong>Body:</strong> {singleItem.body}
            </p>
            <p>
              <strong>Created At:</strong> {singleItem.createdAt}
            </p>
          </div>
        ) : (
          searchId && <p className="text-sm text-muted-foreground">No item found.</p>
        )}
      </section>
    </div>
  );
}
