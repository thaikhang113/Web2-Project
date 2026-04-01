import { Save, Send, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { GameControls } from "../../components/games/GameControls.jsx";
import { GameInstructions } from "../../components/games/GameInstructions.jsx";
import { GameTimer } from "../../components/games/GameTimer.jsx";
import { ScoreDisplay } from "../../components/games/ScoreDisplay.jsx";
import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { Caro4 } from "../../components/games/games/Caro4.jsx";
import { Caro5 } from "../../components/games/games/Caro5.jsx";
import { FreeDraw } from "../../components/games/games/FreeDraw.jsx";
import { Match3 } from "../../components/games/games/Match3.jsx";
import { Memory } from "../../components/games/games/Memory.jsx";
import { Snake } from "../../components/games/games/Snake.jsx";
import { TicTacToe } from "../../components/games/games/TicTacToe.jsx";
import { gameService } from "../../services/gameService.js";
import { scoreService } from "../../services/scoreService.js";
import { formatDate } from "../../utils/format.js";
import { GAME_META } from "../../utils/gameMeta.js";

const engines = {
  1: Caro5,
  2: Caro4,
  3: TicTacToe,
  4: Snake,
  5: Match3,
  6: Memory,
  7: FreeDraw,
};

export function GamePage() {
  const { gameId } = useParams();
  const numericGameId = Number(gameId);
  const GameEngine = engines[numericGameId] || TicTacToe;

  const [game, setGame] = useState(null);
  const [savedState, setSavedState] = useState(null);
  const [snapshot, setSnapshot] = useState(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("Khoi tao van moi...");
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [toast, setToast] = useState("");
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [controls, setControls] = useState({});
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      try {
        const [catalogData, reviewData] = await Promise.all([
          gameService.getCatalog(),
          gameService.getReviews(numericGameId).catch(() => ({ reviews: [] })),
        ]);

        const foundGame = catalogData.games.find(
          (item) => item.id === numericGameId,
        ) ||
          catalogData.games[0] || {
            id: numericGameId,
            name: GAME_META[numericGameId]?.title || "Mini Game",
            description: GAME_META[numericGameId]?.instructions,
          };

        if (!active) {
          return;
        }

        setGame(foundGame);
        setReviews(reviewData.reviews || []);

        try {
          const stateData = await gameService.loadState(numericGameId);
          if (active) {
            setSavedState(stateData.state);
            setScore(stateData.state?.metadata?.score || 0);
            setSeconds(stateData.state?.timeLeft || 0);
            setStatus("Da tai save gan nhat.");
          }
        } catch (err) {
          if (active && err.response?.status !== 404) {
            setToast(err.response?.data?.message || "Khong tai duoc save");
          }
        }
      } catch (err) {
        if (active) {
          setToast(err.response?.data?.message || "Khong tai duoc game");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    bootstrap();
    return () => {
      active = false;
    };
  }, [numericGameId]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleKey(event) {
      if (event.key === "ArrowLeft") controls.left?.();
      if (event.key === "ArrowRight") controls.right?.();
      if (event.key === "Enter") controls.enter?.();
      if (event.key === "Escape") controls.back?.();
      if (event.key.toLowerCase() === "h") setHelpOpen(true);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [controls]);

  async function saveProgress() {
    try {
      await gameService.saveState({
        gameId: numericGameId,
        board: snapshot?.board,
        timeLeft: seconds,
        currentTurn: snapshot?.currentTurn || "player",
        metadata: snapshot?.metadata || {},
      });
      setToast("Da luu game thanh cong");
    } catch (err) {
      setToast(err.response?.data?.message || "Luu game that bai");
    }
  }

  async function submitScore() {
    try {
      await scoreService.submitScore(numericGameId, score, seconds);
      setToast("Da nop diem len bang xep hang");
    } catch (err) {
      setToast(err.response?.data?.message || "Nop diem that bai");
    }
  }

  async function submitReview(event) {
    event.preventDefault();
    try {
      const data = await gameService.postReview(numericGameId, reviewForm);
      setReviews((current) => [data.review, ...current]);
      setReviewForm({ rating: 5, comment: "" });
      setToast("Cam on ban da danh gia");
    } catch (err) {
      setToast(err.response?.data?.message || "Khong gui duoc review");
    }
  }

  if (loading || !game) {
    return <LoadingSpinner label="Dang tai game..." />;
  }

  if (!game.isEnabled) {
    return (
      <section className="hero-panel space-y-5 p-8">
        <div className="chip w-fit bg-[var(--surface)] text-[var(--text)]">
          Game tam tat
        </div>
        <div>
          <h1 className="font-display text-5xl text-[var(--text)]">
            {game.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Game nay hien dang duoc admin tam khoa hoac bao tri. Ban co the quay
            lai lobby de chon tro khac.
          </p>
        </div>
        <Link
          to="/home"
          className="inline-flex rounded-full bg-[var(--text)] px-5 py-3 font-semibold text-[var(--bg)]"
        >
          Quay lai lobby
        </Link>
      </section>
    );
  }

  const instructions =
    GAME_META[numericGameId]?.instructions || game.description;

  return (
    <div className="space-y-6">
      <section className="hero-panel p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="chip w-fit bg-[var(--accent-soft)] text-[var(--text)]">
              {GAME_META[numericGameId]?.shortcut || "GAME"}
            </div>
            <h1 className="mt-4 font-display text-5xl text-[var(--text)]">
              {game.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[var(--muted)]">
              {game.description}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <GameTimer seconds={seconds} />
            <ScoreDisplay score={score} status={status} />
          </div>
        </div>
      </section>

      {toast ? (
        <div className="surface rounded-[24px] px-5 py-4 text-sm text-[var(--muted)]">
          {toast}
        </div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1.4fr,0.6fr]">
        <div className="surface rounded-[32px] p-6">
          <GameEngine
            config={game}
            savedState={savedState}
            onStateChange={setSnapshot}
            onScoreChange={setScore}
            onStatusChange={setStatus}
            registerControls={setControls}
          />
        </div>

        <aside className="space-y-4">
          <GameControls
            onAction={(action) => {
              if (action === "help") {
                setHelpOpen(true);
                return;
              }

              controls[action]?.();
            }}
          />
          <div className="surface rounded-[28px] p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
              Progress
            </p>
            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={saveProgress}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--line)] px-4 py-3 font-semibold text-[var(--text)]"
              >
                <Save size={16} />
                Luu game
              </button>
              <button
                type="button"
                onClick={submitScore}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 font-semibold text-slate-950"
              >
                <Send size={16} />
                Nop diem
              </button>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <form onSubmit={submitReview} className="surface rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
            Review
          </p>
          <h2 className="mt-2 font-display text-3xl text-[var(--text)]">
            Danh gia game
          </h2>
          <div className="mt-5 flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setReviewForm((current) => ({ ...current, rating: value }))
                }
                className={`rounded-full p-2 ${reviewForm.rating >= value ? "text-[var(--warning)]" : "text-[var(--muted)]"}`}
              >
                <Star size={22} fill="currentColor" />
              </button>
            ))}
          </div>
          <textarea
            rows="5"
            value={reviewForm.comment}
            onChange={(event) =>
              setReviewForm((current) => ({
                ...current,
                comment: event.target.value,
              }))
            }
            placeholder="Comment ngan cho game..."
            className="mt-4 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 outline-none"
          />
          <button
            type="submit"
            className="mt-4 rounded-full bg-[var(--text)] px-5 py-3 font-semibold text-[var(--bg)]"
          >
            Gui review
          </button>
        </form>

        <div className="surface rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
            Reviews moi
          </p>
          <h2 className="mt-2 font-display text-3xl text-[var(--text)]">
            Phan hoi nguoi choi
          </h2>
          <div className="mt-5 space-y-4">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-[22px] border border-[var(--line)] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[var(--text)]">
                      {review.user?.username}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--warning)]">
                    {review.rating}/5
                  </p>
                </div>
                <p className="mt-3 text-[var(--muted)]">
                  {review.comment || "Khong co noi dung."}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GameInstructions
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title={game.name}
        instructions={instructions}
      />
    </div>
  );
}
