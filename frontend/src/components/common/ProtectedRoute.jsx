import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../../hooks/useAuthStore.js";
import { LoadingSpinner } from "./LoadingSpinner.jsx";

export function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);
  const location = useLocation();

  if (!hydrated) {
    return <LoadingSpinner label="Khoi tao phien dang nhap..." />;
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
