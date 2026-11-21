/**
 * Input — campo de texto base estilo NexUI.
 * Superficie sobre token --color-input, foco con ring de marca.
 * forwardRef para permitir foco programático (flujo Typeform).
 */
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      data-nexui="input"
      className={cn(
        "w-full rounded-[var(--radius)] border border-input bg-input/40 px-4 py-3",
        "text-base text-foreground placeholder:text-muted-foreground",
        "transition-colors duration-150",
        "focus-visible:bg-input/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  );
});

Input.propTypes = { className: PropTypes.string };
