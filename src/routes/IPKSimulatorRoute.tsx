import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const IPKSimulatorPage = lazy(() => import("@/pages/ipk/IPKSimulatorPage"));

export const IPKSimulatorRoute: RouteObject = {
    path: "/sim",
    element: <IPKSimulatorPage />,
};
