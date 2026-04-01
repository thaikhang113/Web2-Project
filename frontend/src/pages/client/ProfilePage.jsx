import { Save } from "lucide-react";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { useAuthStore } from "../../hooks/useAuthStore.js";
import { userService } from "../../services/userService.js";

export function ProfilePage() {
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({ username: "", avatar: "", bio: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const data = await userService.getProfile();
        if (active) {
          setForm({
            username: data.user.username || "",
            avatar: data.user.avatar || "",
            bio: data.user.bio || "",
          });
        }
      } catch (err) {
        if (active) {
          setStatus(err.response?.data?.message || "Khong tai duoc profile");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, []);

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      const data = await userService.updateProfile(form);
      setUser(data.user);
      setStatus("Da cap nhat profile thanh cong");
    } catch (err) {
      setStatus(err.response?.data?.message || "Cap nhat that bai");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingSpinner label="Dang tai ho so..." />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr,1.2fr]">
      <section className="hero-panel p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <img
            src={form.avatar || "https://api.dicebear.com/9.x/shapes/svg?seed=BoardGame"}
            alt={form.username}
            className="h-32 w-32 rounded-[28px] border border-[var(--line)] object-cover"
          />
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Ho so ca nhan</p>
            <h1 className="mt-2 font-display text-4xl text-[var(--text)]">{form.username || "Nguoi choi"}</h1>
          </div>
          <p className="max-w-sm text-[var(--muted)]">
            Hoan thien avatar va bio de de dang ket noi voi nguoi choi khac.
          </p>
        </div>
      </section>

      <form onSubmit={handleSave} className="surface rounded-[32px] p-8">
        <div className="grid gap-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Username</span>
            <input
              value={form.username}
              onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
              className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Avatar URL</span>
            <input
              value={form.avatar}
              onChange={(event) => setForm((current) => ({ ...current, avatar: event.target.value }))}
              className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Bio</span>
            <textarea
              rows="6"
              value={form.bio}
              onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}
              className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            />
          </label>
        </div>

        {status ? <p className="mt-4 text-sm text-[var(--muted)]">{status}</p> : null}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Save size={16} />
          {saving ? "Dang luu..." : "Luu thay doi"}
        </button>
      </form>
    </div>
  );
}
