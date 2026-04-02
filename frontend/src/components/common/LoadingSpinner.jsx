export function LoadingSpinner({ label = "Dang tai..." }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center">
      <div className="surface flex items-center gap-3 px-5 py-4 text-sm text-[var(--muted)]">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" />
        {label}
      </div>
    </div>
  );
}
