import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { friendService } from "../../services/friendService.js";
import { userService } from "../../services/userService.js";
import { getInitials } from "../../utils/format.js";

export function SearchPage() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [status, setStatus] = useState("");
	const [sentRequests, setSentRequests] = useState({});

	useEffect(() => {
		let active = true;

		async function runSearch() {
			try {
				const data = await userService.searchUsers(query);
				if (active) {
					setResults(data.users);
				}
			} catch (err) {
				if (active) {
					setStatus(
						err.response?.data?.message ||
							"Khong tim duoc nguoi dung",
					);
				}
			}
		}

		runSearch();
		return () => {
			active = false;
		};
	}, [query]);

	async function sendRequest(friendId) {
		try {
			await friendService.sendRequest(friendId);
			setStatus("Da gui loi moi ket ban");
			setSentRequests((current) => ({ ...current, [friendId]: true }));
		} catch (err) {
			setStatus(err.response?.data?.message || "Khong gui duoc loi moi");
		}
	}

	return (
		<div className="space-y-6">
			<section className="hero-panel p-8">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
							Search Player
						</p>
						<h1 className="mt-2 font-display text-5xl text-[var(--text)]">
							Tim nguoi choi moi
						</h1>
					</div>
					<label className="surface flex w-full items-center gap-3 rounded-full px-4 py-3 lg:max-w-md">
						<Search size={18} className="text-[var(--muted)]" />
						<input
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Nhap username hoac email..."
							className="w-full bg-transparent outline-none"
						/>
					</label>
				</div>
			</section>

			{status ? (
				<div className="surface rounded-[24px] px-5 py-4 text-sm text-[var(--muted)]">
					{status}
				</div>
			) : null}

			<section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{results.map((user) => (
					<article
						key={user.id}
						className="surface rounded-[28px] p-5"
					>
						<div className="flex items-center gap-4">
							{user.avatar ? (
								<img
									src={user.avatar}
									alt={user.username}
									className="h-14 w-14 rounded-2xl object-cover"
								/>
							) : (
								<div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--accent-soft)] font-semibold text-[var(--text)]">
									{getInitials(user.username)}
								</div>
							)}
							<div>
								<p className="font-display text-2xl text-[var(--text)]">
									{user.username}
								</p>
								<p className="text-sm text-[var(--muted)]">
									{user.email}
								</p>
							</div>
						</div>
						<p className="mt-4 min-h-12 text-sm text-[var(--muted)]">
							{user.bio || "Chua cap nhat bio."}
						</p>
						<button
							type="button"
							disabled={Boolean(sentRequests[user.id])}
							onClick={() => sendRequest(user.id)}
							className={`mt-4 rounded-full border px-4 py-2 text-sm font-semibold transition ${
								sentRequests[user.id]
									? "cursor-not-allowed border-[var(--line)] bg-[var(--surface-strong)] text-[var(--muted)]"
									: "border-[var(--line)] text-[var(--text)] hover:border-[var(--accent)]"
							}`}
						>
							{sentRequests[user.id] ? "Da gui" : "Gui loi moi"}
						</button>
					</article>
				))}
			</section>
		</div>
	);
}
