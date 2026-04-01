import { ArrowRight, Lock, Puzzle, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { gameService } from "../../services/gameService.js";
import { GAME_META } from "../../utils/gameMeta.js";

function buildFallbackGames() {
  return Object.entries(GAME_META).map(([id, meta], index) => ({
    id: Number(id),
    name: meta.title,
    description: meta.instructions,
    boardSize: [15, 7, 3, 14, 8, 4, 12][index],
    isEnabled: true,
    accent: ["#ef4444", "#f97316", "#22c55e", "#06b6d4", "#8b5cf6", "#eab308", "#ec4899"][index],
  }));
}

export function HomePage() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadGames() {
      try {
        const data = await gameService.getCatalog();
        if (active) {
          setGames(data.games);
        }
      } catch (err) {
        if (active) {
          setError(err.response?.data?.message || "Khong tai duoc danh sach game");
          setGames(buildFallbackGames());
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadGames();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner label="Dang nap game hub..." />;
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Greeting */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 items-center rounded-full bg-[var(--accent-soft)] px-2.5 text-xs font-semibold text-[var(--accent)]">
                <Sparkles size={12} className="mr-1" />
                Lobby Trung Tâm
              </span>
              <span className="flex h-6 items-center rounded-full bg-[var(--surface-strong)] px-2.5 text-xs font-medium text-[var(--muted)]">
                <ShieldCheck size={12} className="mr-1" />
                Đã xác thực
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--text-h)] lg:text-4xl">
              Chào mừng đến với Boardverse
            </h1>
            <p className="mt-2 text-[var(--muted)] lg:text-lg">
              Khu vực tổng hợp các trò chơi giải trí và tính năng tương tác người dùng. Chọn ngay một tựa game để bắt đầu!
            </p>
          </div>
          
          <div className="flex shrink-0 items-center justify-center rounded-xl bg-[var(--bg)] p-4 shadow-inner border border-[var(--border)]">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-[var(--muted)]">Trạng thái Game</p>
              <div className="mt-1 flex items-center justify-center gap-2 text-2xl font-bold text-[var(--text)]">
                <Puzzle size={24} className="text-[var(--primary)]" />
                {games.filter((g) => g.isEnabled).length} <span className="text-[var(--muted)]">/ {games.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {error ? (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--danger-soft)] bg-[var(--danger-soft)] px-5 py-4 text-sm font-medium text-[var(--danger)]">
          <Lock size={16} />
          {error}
        </div>
      ) : null}

      {/* Game Catalog */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase tracking-wider text-[var(--text-h)]">Danh Mục Trò Chơi</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game, index) => (
            <article
              key={game.id}
              className={`group flex flex-col overflow-hidden rounded-2xl border bg-[var(--surface)] transition-all duration-300 ${
                game.isEnabled
                  ? "border-[var(--border)] hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card)]"
                  : "border-[var(--border)] opacity-60 saturate-50"
              }`}
            >
              {/* Card Header */}
              <div 
                className="flex items-center justify-between border-b border-[var(--border)] p-5"
                style={{
                  background: game.isEnabled ? `linear-gradient(135deg, color-mix(in srgb, ${game.accent} 15%, transparent), transparent)` : "transparent",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--bg)] text-xl font-bold text-[var(--text-h)] shadow-sm border border-[var(--border)]">
                    {GAME_META[game.id]?.emoji || "🎮"}
                  </div>
                  <div>
                    <h3 className="line-clamp-1 text-lg font-bold text-[var(--text-h)]">
                      {game.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Slot {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
                  {game.description}
                </p>
                
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-6 items-center rounded-md bg-[var(--surface-strong)] px-2.5 text-xs font-medium text-[var(--text)]">
                    Grid: {game.boardSize}x{game.boardSize}
                  </span>
                  <span className={`inline-flex h-6 items-center rounded-md px-2.5 text-xs font-bold ${
                    game.isEnabled 
                      ? "bg-[var(--accent-soft)] text-[var(--accent)]" 
                      : "bg-[var(--surface-strong)] text-[var(--muted)]"
                  }`}>
                    {game.isEnabled ? "Đang mở" : "Bảo trì"}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!game.isEnabled}
                  onClick={() => navigate(`/game/${game.id}`)}
                  className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                    game.isEnabled
                      ? "bg-[var(--primary)] text-white hover:bg-[var(--accent)] hover:shadow-md"
                      : "cursor-not-allowed bg-[var(--surface-strong)] text-[var(--muted)]"
                  }`}
                >
                  {game.isEnabled ? "Vào chơi ngay" : "Tạm khóa"}
                  {game.isEnabled ? <ArrowRight size={16} /> : <Lock size={16} />}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
