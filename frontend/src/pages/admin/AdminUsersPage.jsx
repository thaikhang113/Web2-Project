import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { adminService } from "../../services/adminService.js";
import { formatDate } from "../../utils/format.js";
import { getInitials } from "../../utils/format.js";

export function AdminUsersPage() {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      const data = await adminService.getUsers();
      if (active) {
        setUsers(data.users);
      }
    }

    loadUsers();
    return () => {
      active = false;
    };
  }, []);

  if (!users) {
    return <LoadingSpinner label="Dang tai danh sach user..." />;
  }

  const filteredUsers = users.filter((user) => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) {
      return true;
    }

    return [user.username, user.email, user.role].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(keyword),
    );
  });

  return (
    <div className="surface overflow-hidden rounded-[32px]">
      <div className="border-b border-[var(--line)] p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Users</p>
        <h1 className="mt-2 font-display text-4xl text-[var(--text)]">Quan ly tai khoan</h1>
        <label className="mt-4 flex max-w-md items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3">
          <Search size={16} className="text-[var(--muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tim theo username, email, role..."
            className="w-full bg-transparent outline-none"
          />
        </label>
      </div>
      <table className="min-w-full text-left">
        <thead className="border-b border-[var(--line)] bg-[var(--surface-strong)] text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
          <tr>
            <th className="px-5 py-4">Username</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Role</th>
            <th className="px-5 py-4">Created</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b border-[var(--line)] last:border-none">
              <td className="px-5 py-4 text-[var(--text)]">
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-10 w-10 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent-soft)] text-sm font-semibold text-[var(--text)]">
                      {getInitials(user.username)}
                    </div>
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-[var(--muted)]">{user.email}</td>
              <td className="px-5 py-4 text-[var(--text)]">
                <span className="chip bg-[var(--surface-strong)] text-[var(--text)]">{user.role}</span>
              </td>
              <td className="px-5 py-4 text-[var(--muted)]">{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
