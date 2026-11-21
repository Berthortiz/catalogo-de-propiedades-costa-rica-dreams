/**
 * ProgressBar — indicador de progreso del formulario.
 * Barra NexUI + contador "Paso X de Y".
 */
import PropTypes from "prop-types";
import { Progress } from "../nexui/Progress";

export default function ProgressBar({ current, total }) {
  return (
    <div data-nexui="form-progress" className="flex w-full items-center gap-4 px-6 py-4">
      <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
        Paso {current} de {total}
      </span>
      <Progress value={(current / total) * 100} className="flex-1" />
    </div>
  );
}
