import { Award, Flag } from "lucide-react";

export function ScoreDisplay({ score, status }) {
  return (
    <div className="surface rounded-[24px] px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Score</p>
      <div className="mt-2 flex items-center gap-2 text-2xl font-semibold text-[var(--text)]">
        <Award size={18} />
        {score}
      </div>
      <p className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
        <Flag size={14} />
        {status}
      </p>
    </div>
  );
}
