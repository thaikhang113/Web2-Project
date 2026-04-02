import { useEffect, useState } from "react";

import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { adminService } from "../../services/adminService.js";

export function AdminGamesPage() {
  const [games, setGames] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const data = await adminService.getGames();
    setGames(data.games);
  }

  async function saveGame(game) {
    await adminService.updateGame(game.id, {
      boardSize: Number(game.boardSize),
      isEnabled: game.isEnabled,
      accent: game.accent,
      description: game.description,
    });
    setStatus(`Da cap nhat ${game.name}`);
    await loadGames();
  }

  if (!games) {
    return <LoadingSpinner label="Dang tai cau hinh games..." />;
  }

  return (
    <div className="space-y-4">
      <div className="surface rounded-[28px] p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Games Config</p>
        <h1 className="mt-2 font-display text-4xl text-[var(--text)]">Bat tat game va doi board size</h1>
        {status ? <p className="mt-3 text-sm text-[var(--muted)]">{status}</p> : null}
      </div>

      {games.map((game, index) => (
        <article key={game.id} className="surface rounded-[30px] p-6">
          <div className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr] xl:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Game {index + 1}</p>
              <h2 className="mt-2 font-display text-3xl text-[var(--text)]">{game.name}</h2>
              <textarea
                rows="3"
                value={game.description}
                onChange={(event) =>
                  setGames((current) =>
                    current.map((item) =>
                      item.id === game.id ? { ...item, description: event.target.value } : item,
                    ),
                  )
                }
                className="mt-4 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">Board size</span>
                <input
                  type="number"
                  min="3"
                  value={game.boardSize}
                  onChange={(event) =>
                    setGames((current) =>
                      current.map((item) =>
                        item.id === game.id ? { ...item, boardSize: event.target.value } : item,
                      ),
                    )
                  }
                  className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">Accent</span>
                <input
                  value={game.accent}
                  onChange={(event) =>
                    setGames((current) =>
                      current.map((item) =>
                        item.id === game.id ? { ...item, accent: event.target.value } : item,
                      ),
                    )
                  }
                  className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none"
                />
              </label>
              <label className="flex items-center gap-3 self-end rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3">
                <input
                  type="checkbox"
                  checked={game.isEnabled}
                  onChange={(event) =>
                    setGames((current) =>
                      current.map((item) =>
                        item.id === game.id ? { ...item, isEnabled: event.target.checked } : item,
                      ),
                    )
                  }
                />
                Dang bat
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={() => saveGame(game)}
            className="mt-5 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-slate-950"
          >
            Luu cau hinh
          </button>
        </article>
      ))}
    </div>
  );
}
