// src/App.tsx
import AppLayout from "@/layouts/AppLayout";
import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Route imports
import NotFoundPage from "@/pages/error/NotFoundPage";
import { IPKGuidelineRoute } from "./routes/IPKGuidelineRoute";
import { IPKSimulatorRoute } from "./routes/IPKSimulatorRoute";

// Router setup
const router = createBrowserRouter([
  {
    path: "/", // persistent layout
    element: <AppLayout />,
    children: [
      IPKSimulatorRoute,
      IPKGuidelineRoute,
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
