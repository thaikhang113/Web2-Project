import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../hooks/useAuthStore.js";
import { getInitials } from "../../utils/format.js";
import { ThemeToggle } from "./ThemeToggle.jsx";

export function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-[var(--border)] bg-[color:color-mix(in_srgb,var(--bg)_70%,transparent)] px-6 backdrop-blur-md">
      {/* Mạch trái Header có thể để trống hoặc tên trang hiện tại (Breadcrumb) */}
      <div className="flex items-center gap-4">
        {/* Placeholder for Breadcrumb if needed */}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-[var(--border)]">
          <div className="flex flex-col items-end hidden sm:flex">
            <p className="text-sm font-semibold text-[var(--text-h)] leading-none mb-1">{user?.username || "Guest"}</p>
            <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-[var(--muted)] leading-none bg-[var(--surface-strong)] px-2 py-0.5 rounded-full">
              {user?.role || "user"}
            </p>
          </div>
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user?.username}
              className="h-9 w-9 rounded-full border-2 border-[var(--surface-strong)] object-cover shadow-sm"
            />
          ) : (
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent-soft)] font-semibold text-[var(--text)] shadow-sm border border-[var(--accent)]">
              {getInitials(user?.username)}
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="ml-2 grid h-9 w-9 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]"
            title="Đăng xuất"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
