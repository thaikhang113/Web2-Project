import { Medal } from "lucide-react";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { PaginationControls } from "../../components/common/PaginationControls.jsx";
import { rankingService } from "../../src/services/rankingService.js";
import { formatDate, formatDuration } from "../../utils/format.js";
import { GAME_META } from "../../utils/gameMeta.js";

const filters = [
  { id: "global", label: "Toan bo" },
  { id: "friends", label: "Ban be" },
  { id: "personal", label: "Ca nhan" },
];

export function RankingPage() {
  const [gameId, setGameId] = useState(1);
  const [filter, setFilter] = useState("global");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadRankings() {
      setLoading(true);
      const data = await rankingService.getRankings(gameId, {
        filter,
        page,
        limit: 8,
      });
      if (active) {
        setRows(data.rankings);
        setPagination(data.pagination);
        setLoading(false);
      }
    }

    loadRankings();
    return () => {
      active = false;
    };
  }, [filter, gameId, page]);

  return (
    <div className="space-y-6">
      <section className="hero-panel p-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
              Ranking
            </p>
            <h1 className="mt-2 font-display text-5xl text-[var(--text)]">
              Bang xep hang tung game
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(GAME_META).map(([id, meta]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setGameId(Number(id));
                  setPage(1);
                }}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  gameId === Number(id)
                    ? "bg-[var(--accent)] font-semibold text-slate-950"
                    : "surface text-[var(--text)]"
                }`}
              >
                {meta.shortcut}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setFilter(item.id);
              setPage(1);
            }}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === item.id
                ? "bg-[var(--text)] text-[var(--bg)]"
                : "surface text-[var(--text)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner label="Dang tai bang xep hang..." />
      ) : (
        <div className="surface overflow-hidden rounded-[32px]">
          <table className="min-w-full text-left">
            <thead className="border-b border-[var(--line)] bg-[var(--surface-strong)] text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              <tr>
                <th className="px-5 py-4">Hang</th>
                <th className="px-5 py-4">Nguoi choi</th>
                <th className="px-5 py-4">Diem</th>
                <th className="px-5 py-4">Thoi gian</th>
                <th className="px-5 py-4">Ngay</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-8 text-center text-[var(--muted)]"
                  >
                    Chua co du lieu cho bo loc nay.
                  </td>
                </tr>
              ) : null}
              {rows.map((row) => (
                <tr
                  key={`${row.rank}-${row.userId}`}
                  className="border-b border-[var(--line)] last:border-none"
                >
                  <td className="px-5 py-4 font-semibold text-[var(--text)]">
                    <span className="inline-flex items-center gap-2">
                      <Medal size={16} className="text-[var(--accent)]" />#
                      {row.rank}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[var(--text)]">
                    {row.user?.username}
                  </td>
                  <td className="px-5 py-4 text-[var(--text)]">{row.score}</td>
                  <td className="px-5 py-4 text-[var(--muted)]">
                    {formatDuration(row.duration)}
                  </td>
                  <td className="px-5 py-4 text-[var(--muted)]">
                    {formatDate(row.playedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PaginationControls
        pagination={pagination}
        itemLabel="hang"
        onPageChange={setPage}
      />
    </div>
  );
}
