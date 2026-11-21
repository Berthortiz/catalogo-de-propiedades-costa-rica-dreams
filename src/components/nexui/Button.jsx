/**
 * Button — componente base estilo NexUI.
 * Variantes solid / outline / ghost, con token primario de marca.
 */
import PropTypes from "prop-types";
import { cn } from "../../lib/cn";

const VARIANTS = {
  solid:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-secondary",
  ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
};

export function Button({ as = "button", variant = "solid", className, ...props }) {
  const Component = as;
  return (
    <Component
      data-nexui="button"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius)]",
        "px-4 py-2.5 text-sm font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        "disabled:pointer-events-none disabled:opacity-40",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
