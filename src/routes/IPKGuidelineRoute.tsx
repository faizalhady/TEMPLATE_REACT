import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const IPKGuidelinePage = lazy(() => import("@/pages/ipk-simulator/IPKGuidelinePage"));

export const IPKGuidelineRoute: RouteObject = {
    path: "/ipk",
    element: <IPKGuidelinePage />,
};
