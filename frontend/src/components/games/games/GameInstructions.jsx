export function GameInstructions({ title, instructions, open, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/60 px-4">
      <div className="surface w-full max-w-xl rounded-[32px] p-7">
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Huong dan</p>
        <h3 className="mt-2 font-display text-4xl text-[var(--text)]">{title}</h3>
        <p className="mt-4 text-[var(--muted)]">{instructions}</p>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-slate-950"
          >
            Dong
          </button>
        </div>
      </div>
    </div>
  );
}
