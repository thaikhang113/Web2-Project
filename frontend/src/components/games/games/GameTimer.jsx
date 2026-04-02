import { Clock3 } from "lucide-react";

import { formatDuration } from "../../utils/format.js";

export function GameTimer({ seconds }) {
  return (
    <div className="surface rounded-[24px] px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Timer</p>
      <div className="mt-2 flex items-center gap-2 text-2xl font-semibold text-[var(--text)]">
        <Clock3 size={18} />
        {formatDuration(seconds)}
      </div>
    </div>
  );
}
