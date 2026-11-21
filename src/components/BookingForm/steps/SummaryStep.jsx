/**
 * SummaryStep — resumen final de revisión (paso "summary_step").
 * Lista TODAS las respuestas acumuladas con su label del schema;
 * cada fila tiene botón "Editar" para saltar a ese paso.
 * Al Confirmar, el contenedor re-valida TODO el formulario (Zod),
 * dispara onSubmit y muestra la pantalla de éxito.
 *
 * VOLCADO A SUPABASE (cuando exista el proyecto):
 *   1. `npx pnpm add @supabase/supabase-js` (o npm install).
 *   2. Crear la tabla en el SQL editor de Supabase:
 *
 *      create table bookings (
 *        id uuid primary key default gen_random_uuid(),
 *        created_at timestamptz default now(),
 *        niche_slug text not null,          -- "barberia-central", "dentalia"...
 *        answers jsonb not null,            -- todas las respuestas del formulario
 *        booking_date date,                 -- si el schema tiene date_picker
 *        booking_time text,
 *        status text not null default 'pending'
 *      );
 *
 *   3. RECOMENDADO (formularios públicos): el submit no va directo
 *      al cliente. Se publica un endpoint server-side con la clave
 *      service_role SECRETA (en Astro sería /src/pages/api/bookings.ts)
 *      que revalida con el MISMO schema Zod y luego inserta.
 *      El punto de conexión está en BookingForm.jsx → handleConfirm.
 */
import PropTypes from "prop-types";
import { Button } from "../../nexui/Button";

/** Formatea el valor acumulado de un paso para lectura humana. */
function formatAnswer(step, value) {
  if (value == null || value === "") return null;
  switch (step.type) {
    case "select_single": {
      const option = (step.options || []).find((o) => (typeof o === "string" ? o : o.value) === value);
      return typeof option === "string" ? option : option?.label ?? String(value);
    }
    case "date_picker":
      return value.date
        ? `${new Date(`${value.date}T00:00:00`).toLocaleDateString("es-CR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}${value.time ? ` · ${value.time}` : ""}`
        : null;
    default:
      return String(value);
  }
}

export default function SummaryStep({ steps, answers, onEdit, canSubmit, onConfirm }) {
  const answeredSteps = steps.filter((s) => s.type !== "summary_step");

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <div data-stagger className="divide-y divide-border overflow-hidden rounded-[var(--radius)] border border-border bg-card">
        {answeredSteps.map((step) => {
          const text = formatAnswer(step, answers[step.id]);
          return (
            <div key={step.id} className="flex items-start gap-4 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {step.question}
                </p>
                <p className={`mt-1 truncate text-base ${text ? "text-foreground" : "text-muted-foreground"}`}>
                  {text || (step.required === false ? "—" : "Sin responder")}
                </p>
              </div>
              {step.type !== "summary_step" && (
                <Button variant="ghost" className="shrink-0 px-2 py-1 text-xs" onClick={() => onEdit(step.id)}>
                  Editar
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <div data-stagger>
        <Button onClick={onConfirm} disabled={!canSubmit} className="w-full py-3.5 text-base">
          Confirmar reserva ✓
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Al confirmar, tus datos se registrarán para gestionar tu cita.
        </p>
      </div>
    </div>
  );
}
