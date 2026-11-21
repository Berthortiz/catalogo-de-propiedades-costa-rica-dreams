/**
 * RadioGroup — grupo de opciones estilo NexUI.
 * Lista accesible (role=radiogroup); selección con click.
 * Pensado para flujos Typeform: cada fila es un radio amplio.
 */
import PropTypes from "prop-types";
import { cn } from "../../lib/cn";

export function RadioGroup({ value, onChange, options, className }) {
  return (
    <div
      role="radiogroup"
      data-nexui="radio-group"
      className={cn("flex flex-col gap-3", className)}
    >
      {options.map((option) => {
        const optionValue = typeof option === "string" ? option : option.value;
        const optionLabel = typeof option === "string" ? option : option.label;
        const isChecked = value === optionValue;
        return (
          <button
            key={optionValue}
            type="button"
            role="radio"
            aria-checked={isChecked}
            onClick={() => onChange(optionValue)}
            className={cn(
              "group flex w-full cursor-pointer items-center gap-4 rounded-[var(--radius)] border px-5 py-4 text-left",
              "text-base font-medium transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isChecked
                ? "border-ring bg-primary/15 text-foreground"
                : "border-border bg-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-secondary"
            )}
          >
            <span
              data-nexui="radio-indicator"
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                isChecked ? "border-primary bg-primary" : "border-border group-hover:border-primary/60"
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full bg-primary-foreground transition-transform duration-150",
                  isChecked ? "scale-100" : "scale-0"
                )}
              />
            </span>
            {optionLabel}
          </button>
        );
      })}
    </div>
  );
}
