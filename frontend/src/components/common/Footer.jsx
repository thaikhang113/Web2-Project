import { Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] py-6 text-center text-sm text-[var(--muted)]">
      <div className="flex items-center justify-center gap-2">
        <Gamepad2 size={16} className="text-[var(--primary)]" />
        <span>&copy; {new Date().getFullYear()} Boardverse. Đồ án xây dựng Web App Game Hub.</span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-4 text-xs">
        <a href="#" className="transition-colors hover:text-[var(--text-h)]">Tài liệu API</a>
        <a href="#" className="transition-colors hover:text-[var(--text-h)]">Quy định</a>
        <a href="#" className="transition-colors hover:text-[var(--text-h)]">Về chúng tôi</a>
      </div>
    </footer>
  );
}
