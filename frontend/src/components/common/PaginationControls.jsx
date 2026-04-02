import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationControls({
  pagination,
  onPageChange,
  itemLabel = "muc",
  className = "",
}) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { page, totalPages, total } = pagination;

  return (
    <div
      className={`flex flex-col gap-3 rounded-[24px] border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${className}`.trim()}
    >
      <p className="text-sm text-[var(--muted)]">
        Trang {page}/{totalPages} · {total} {itemLabel}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          Truoc
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-4 py-2 text-sm font-semibold text-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sau
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
