import { BarChart3, Gamepad2, LayoutDashboard, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Nguoi dung", icon: Users },
  { to: "/admin/games", label: "Games", icon: Gamepad2 },
];

export function AdminSidebar() {
  return (
    <aside className="surface h-fit rounded-[28px] p-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <BarChart3 size={18} />
        </div>
        <div>
          <p className="font-display text-lg text-[var(--text)]">Admin Panel</p>
          <p className="text-sm text-[var(--muted)]">Quan ly he thong game</p>
        </div>
      </div>
      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-[var(--accent)] text-slate-950"
                  : "text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
