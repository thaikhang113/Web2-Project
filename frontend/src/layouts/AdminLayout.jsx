import { Outlet } from "react-router-dom";

import { AdminSidebar } from "../components/admin/AdminSidebar.jsx";
import { Footer } from "../components/common/Footer.jsx";
import { Header } from "../components/common/Header.jsx";
import { Sidebar } from "../components/common/Sidebar.jsx";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Sidebar />
      <div className="flex flex-1 flex-col sm:ml-64">
        <Header />
        <div className="flex-1 p-6 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
            <AdminSidebar />
            <div className="space-y-6">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
