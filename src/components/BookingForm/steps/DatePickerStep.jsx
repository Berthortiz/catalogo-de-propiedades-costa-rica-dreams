/**
 * DatePickerStep — selección de fecha + hora para la reserva.
 * Usa el Calendar de nexui y una grilla de horas provista por
 * la config (step.times) o un horario base por defecto.
 * El valor se acumula como { date: "YYYY-MM-DD", time: "HH:mm" }.
 */
import PropTypes from "prop-types";
import { Calendar } from "../../nexui/Calendar";
import { Button } from "../../nexui/Button";
import { cn } from "../../../lib/cn";

const DEFAULT_TIMES = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

export default function DatePickerStep({ step, value, onChange, onAdvance, error }) {
  const times = step.times?.length ? step.times : DEFAULT_TIMES;
  const selected = value || {};

  return (
    <div className="flex w-full max-w-2xl flex-col gap-5">
      <div data-stagger className="grid gap-6 sm:grid-cols-2">
        <Calendar
          value={selected.date}
          onChange={(date) => onChange({ ...selected, date, time: selected.time })}
          aria-label="Calendario de reservas"
        />
        {/* Grid de horas */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Hora de la cita
          </span>
          <div role="radiogroup" aria-label="Horas disponibles" className="grid grid-cols-3 gap-2">
            {times.map((time) => {
              const isActive = selected.time === time;
              return (
                <button
                  key={time}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  disabled={!selected.date}
                  onClick={() => onChange({ ...selected, time })}
                  className={cn(
                    "cursor-pointer rounded-lg border px-2 py-2 text-sm font-medium tabular-nums transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "disabled:pointer-events-none disabled:opacity-30",
                    isActive
                      ? "border-ring bg-primary/15 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {time}
                </button>
              );
            })}
          </div>
          {!selected.date && (
            <span className="text-xs text-muted-foreground">Elige primero un día en el calendario</span>
          )}
        </div>
      </div>

      {error && (
        <p data-stagger role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <div data-stagger className="flex items-center gap-3">
        <Button onClick={onAdvance} disabled={!selected.date || !selected.time}>
          Siguiente →
        </Button>
        <span className="text-xs text-muted-foreground">
          o presiona <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">Enter ↵</kbd>
        </span>
      </div>
    </div>
  );
}
