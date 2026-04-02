import { Navigate, Route, Routes } from "react-router-dom";

import { AdminRoute } from "../components/common/AdminRoute.jsx";
import { ProtectedRoute } from "../components/common/ProtectedRoute.jsx";
import { useAuthStore } from "../hooks/useAuthStore.js";
import { AdminLayout } from "../layouts/AdminLayout.jsx";
import { ClientLayout } from "../layouts/ClientLayout.jsx";
import { AdminDashboard } from "../pages/admin/AdminDashboard.jsx";
import { AdminGamesPage } from "../pages/admin/AdminGamesPage.jsx";
import { AdminUsersPage } from "../pages/admin/AdminUsersPage.jsx";
import { LoginPage } from "../pages/auth/LoginPage.jsx";
import { RegisterPage } from "../pages/auth/RegisterPage.jsx";
import { AchievementsPage } from "../pages/client/AchievementsPage.jsx";
import { FriendsPage } from "../pages/client/FriendsPage.jsx";
import { GamePage } from "../pages/client/GamePage.jsx";
import { HomePage } from "../pages/client/HomePage.jsx";
import { MessagesPage } from "../pages/client/MessagesPage.jsx";
import { ProfilePage } from "../pages/client/ProfilePage.jsx";
import { RankingPage } from "../pages/client/RankingPage.jsx";
import { SearchPage } from "../pages/client/SearchPage.jsx";

function PublicGate({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? <Navigate to="/home" replace /> : children;
}

export function AppRoutes() {
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/home" : "/login"} replace />} />
      <Route
        path="/login"
        element={
          <PublicGate>
            <LoginPage />
          </PublicGate>
        }
      />
      <Route
        path="/register"
        element={
          <PublicGate>
            <RegisterPage />
          </PublicGate>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<ClientLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/ranking" element={<RankingPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/games" element={<AdminGamesPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
