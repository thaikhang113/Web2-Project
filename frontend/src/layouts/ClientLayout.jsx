import { Outlet } from "react-router-dom";

import { Footer } from "../components/common/Footer.jsx";
import { Header } from "../components/common/Header.jsx";
import { Sidebar } from "../components/common/Sidebar.jsx";

export function ClientLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Sidebar />
      <div className="flex flex-1 flex-col sm:ml-64">
        <Header />
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
