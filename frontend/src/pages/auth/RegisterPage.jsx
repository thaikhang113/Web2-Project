import { AlertCircle, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../../services/authService.js";

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.password.length < 6) {
      setError("Mat khau phai co it nhat 6 ky tu");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Mat khau xac nhan chua khop");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authService.register(form.username, form.email, form.password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Dang ky that bai");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell grid min-h-screen items-center py-10 lg:grid-cols-[0.95fr,1.05fr]">
      <section className="mx-auto w-full max-w-xl p-6 lg:order-2 lg:p-10">
        <form onSubmit={handleSubmit} className="surface rounded-[32px] p-8">
          <div className="mb-8 space-y-3">
            <div className="chip w-fit">Tao tai khoan</div>
            <h2 className="font-display text-4xl text-[var(--text)]">Bat dau voi san dau mini</h2>
            <p className="text-[var(--muted)]">
              Tao tai khoan de choi game PvE, luu diem va tham gia bang xep hang.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Username</span>
              <input
                value={form.username}
                onChange={(event) =>
                  setForm((current) => ({ ...current, username: event.target.value }))
                }
                className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
                required
              />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
                required
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
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Xac nhan</span>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
                required
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
            <UserPlus size={18} />
            {loading ? "Dang tao..." : "Tao tai khoan"}
          </button>

          <p className="mt-6 text-sm text-[var(--muted)]">
            Da co tai khoan?{" "}
            <Link to="/login" className="font-semibold text-[var(--text)] underline decoration-[var(--accent)]">
              Dang nhap
            </Link>
          </p>
        </form>
      </section>

      <section className="hero-panel hidden min-h-[620px] p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="chip w-fit bg-[var(--accent-soft)] text-[var(--text)]">System Features</div>
        <div className="grid gap-4">
          {[
            "7 game mini co save/load state",
            "Ho tro friend, message, ranking va achievements",
            "Admin panel de bat/tat game va chinh board size",
          ].map((item) => (
            <div key={item} className="surface rounded-[24px] px-5 py-4 text-[var(--text)]">
              {item}
            </div>
          ))}
        </div>
        <div className="space-y-5">
          <h1 className="max-w-lg font-display text-5xl leading-none text-[var(--text)]">
            Demo tron bo frontend theo bo note cua do an.
          </h1>
          <p className="max-w-lg text-lg text-[var(--muted)]">
            Theme sang toi, route bao ve, lobby game, trang user va admin cung nam trong mot SPA.
          </p>
        </div>
      </section>
    </div>
  );
}
