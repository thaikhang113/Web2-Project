import {
  Gamepad2,
  MessageSquare,
  Search,
  Shield,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../hooks/useAuthStore.js";

const clientLinks = [
  { to: "/home", label: "Dashboard", icon: Gamepad2 },
  { to: "/search", label: "TÌM NGƯỜI CHƠI", icon: Search },
  { to: "/friends", label: "BẠN BÈ", icon: Users },
  { to: "/messages", label: "TIN NHẮN", icon: MessageSquare },
  { to: "/ranking", label: "BXH", icon: Trophy },
  { to: "/profile", label: "HỒ SƠ", icon: UserRound },
];

export function Sidebar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-30 flex w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] shadow-[var(--shadow-card)]">
      {/* Brand / Logo Area */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="flex w-full items-center gap-3 transition hover:opacity-80"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--primary)] text-white shadow-[var(--shadow-soft)]">
            <Gamepad2 size={18} />
          </span>
          <span className="truncate text-left">
            <span className="block font-display text-lg font-bold leading-none text-[var(--text)]">
              Boardverse
            </span>
          </span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]/70">
          Menu Chính
        </div>
        <nav className="flex flex-col gap-1">
          {clientLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--text)] hover:bg-[var(--surface-strong)] hover:text-[var(--text-h)]"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
          
          {user?.role === "admin" && (
            <>
              <div className="mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]/70">
                Quản Trị
              </div>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[var(--danger-soft)] text-[var(--danger)]"
                      : "text-[var(--text)] hover:bg-[var(--surface-strong)] hover:text-[var(--text-h)]"
                  }`
                }
              >
                <Shield size={18} />
                ADMIN PANEL
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
}
