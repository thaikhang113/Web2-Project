import { Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { achievementService } from "../../services/achievementService.js";
import { formatDate } from "../../utils/format.js";

export function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadAchievements() {
      const data = await achievementService.getMyAchievements();
      if (active) {
        setAchievements(data.achievements);
        setLoading(false);
      }
    }

    loadAchievements();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner label="Dang tai achievement..." />;
  }

  return (
    <div className="space-y-6">
      <section className="hero-panel p-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-3xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <Sparkles />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Achievements</p>
            <h1 className="font-display text-5xl text-[var(--text)]">Tu huy hieu dau tien den bang vang</h1>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {achievements.length === 0 ? (
          <article className="surface rounded-[30px] p-6 md:col-span-2 xl:col-span-3">
            <h2 className="font-display text-3xl text-[var(--text)]">Chua co thanh tuu nao</h2>
            <p className="mt-3 text-[var(--muted)]">
              Hay choi them game, ghi diem va ket noi ban be de mo khoa bo huy hieu dau tien.
            </p>
          </article>
        ) : null}
        {achievements.map((item) => (
          <article key={item.userAchievementId} className="surface rounded-[30px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Trophy size={20} />
              </div>
              <span className="chip bg-[var(--surface-strong)] text-[var(--text)]">{item.conditionType}</span>
            </div>
            <h2 className="font-display text-3xl text-[var(--text)]">{item.name}</h2>
            <p className="mt-3 text-[var(--muted)]">{item.description}</p>
            <p className="mt-6 text-sm text-[var(--muted)]">Mo khoa luc {formatDate(item.earnedAt)}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
