import { useEffect, useState } from "react";

import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { adminService } from "../../services/adminService.js";

export function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      const data = await adminService.getStats();
      if (active) {
        setStats(data);
      }
    }

    loadStats();
    return () => {
      active = false;
    };
  }, []);

  if (!stats) {
    return <LoadingSpinner label="Dang tai thong ke admin..." />;
  }

  const cards = [
    { label: "Tong tai khoan", value: stats.totalAccounts },
    { label: "So tran da luu diem", value: stats.totalScores },
    { label: "So review", value: stats.totalReviews },
    { label: "Game dang bat", value: stats.enabledGames },
  ];

  return (
    <div className="space-y-6">
      <section className="hero-panel p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Admin Dashboard</p>
        <h1 className="mt-2 font-display text-5xl text-[var(--text)]">Tong quan he thong Board Game Hub</h1>
        <p className="mt-4 text-[var(--muted)]">
          Game duoc choi nhieu nhat: <span className="font-semibold text-[var(--text)]">{stats.mostPlayedGame?.name || "--"}</span>
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="surface rounded-[28px] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">{card.label}</p>
            <p className="mt-4 font-display text-5xl text-[var(--text)]">{card.value}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
