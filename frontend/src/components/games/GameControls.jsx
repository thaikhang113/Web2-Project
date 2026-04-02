import { CircleHelp, CornerDownLeft, RotateCcw, StepBack, StepForward } from "lucide-react";

const controls = [
  { id: "left", label: "Left", icon: StepBack, hotkey: "<-" },
  { id: "right", label: "Right", icon: StepForward, hotkey: "->" },
  { id: "enter", label: "Enter", icon: CornerDownLeft, hotkey: "Enter" },
  { id: "back", label: "Back", icon: RotateCcw, hotkey: "Esc" },
  { id: "help", label: "Hint", icon: CircleHelp, hotkey: "H" },
];

export function GameControls({ onAction }) {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      {controls.map(({ id, label, icon: Icon, hotkey }) => (
        <button
          key={id}
          type="button"
          onClick={() => onAction(id)}
          className="surface flex items-center justify-between rounded-[22px] px-4 py-3 text-left transition hover:-translate-y-0.5"
        >
          <span className="inline-flex items-center gap-2 font-semibold text-[var(--text)]">
            <Icon size={16} />
            {label}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            {hotkey}
          </span>
        </button>
      ))}
    </div>
  );
}
