import { AlertCircle, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../hooks/useAuthStore.js";
import { authService } from "../../services/authService.js";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({ email: "admin@boardgame.dev", password: "password123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.login(form.email, form.password);
      login(data);
      navigate(location.state?.from?.pathname || "/home", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Dang nhap that bai");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell grid min-h-screen items-center py-10 lg:grid-cols-[1.1fr,0.9fr]">
      <section className="hero-panel hidden min-h-[620px] p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="chip w-fit bg-[var(--accent-soft)] text-[var(--text)]">Board Game Hub</div>
        <div className="space-y-6">
          <h1 className="max-w-xl font-display text-6xl leading-none text-[var(--text)]">
            Chon game bang mot giao dien vui, nhanh va de demo.
          </h1>
          <p className="max-w-xl text-lg text-[var(--muted)]">
            Du an duoc dung tu note cua ban, co san auth, hub game, social va admin panel.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="surface rounded-[24px] p-5">
            <p className="text-sm text-[var(--muted)]">Tai khoan admin demo</p>
            <p className="mt-2 font-semibold text-[var(--text)]">admin@boardgame.dev</p>
            <p className="text-sm text-[var(--muted)]">password123</p>
          </div>
          <div className="surface rounded-[24px] p-5">
            <p className="text-sm text-[var(--muted)]">Tai khoan client demo</p>
            <p className="mt-2 font-semibold text-[var(--text)]">lan@example.com</p>
            <p className="text-sm text-[var(--muted)]">password123</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-xl p-6 lg:p-10">
        <form onSubmit={handleSubmit} className="surface rounded-[32px] p-8">
          <div className="mb-8 space-y-3">
            <div className="chip w-fit">Dang nhap</div>
            <h2 className="font-display text-4xl text-[var(--text)]">Quay lai san choi</h2>
            <p className="text-[var(--muted)]">
              Dang nhap de tiep tuc tran dang do, nhan tin va xem bang xep hang.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Email</span>
              <input
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Mat khau</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({ ...current, password: event.target.value }))
                }
                className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              />
            </label>
          </div>

          {error ? (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[color:color-mix(in_srgb,var(--danger)_30%,transparent)] bg-[color:color-mix(in_srgb,var(--danger)_10%,transparent)] px-4 py-3 text-sm text-[var(--danger)]">
              <AlertCircle size={16} />
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn size={18} />
            {loading ? "Dang vao..." : "Dang nhap"}
          </button>

          <p className="mt-6 text-sm text-[var(--muted)]">
            Chua co tai khoan?{" "}
            <Link to="/register" className="font-semibold text-[var(--text)] underline decoration-[var(--accent)]">
              Dang ky ngay
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
