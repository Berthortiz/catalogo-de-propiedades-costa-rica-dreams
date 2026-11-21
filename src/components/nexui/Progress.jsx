/**
 * Progress — barra de progreso estilo NexUI.
 * Puro Tailwind; value 0-100.
 */
import PropTypes from "prop-types";
import { cn } from "../../lib/cn";

export function Progress({ value = 0, className } = {}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      data-nexui="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-border", className)}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
