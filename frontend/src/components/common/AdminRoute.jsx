import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../../hooks/useAuthStore.js";
import { LoadingSpinner } from "./LoadingSpinner.jsx";

export function AdminRoute() {
  const hydrated = useAuthStore((state) => state.hydrated);
  const user = useAuthStore((state) => state.user);

  if (!hydrated) {
    return <LoadingSpinner label="Dang xac thuc quyen truy cap..." />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
