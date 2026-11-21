/**
 * configSchema — guard de la configuración completa del formulario.
 * En desarrollo valida la `config` que recibe <BookingForm /> y
 * imprime en consola los errores de forma legible, para detectar
 * temprano cuando se escribe un JSON multi-nicho a mano.
 */
import { z } from "zod";

const STEP_TYPES = ["select_single", "text_input", "date_picker", "summary_step"];

const stepSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum(STEP_TYPES),
    question: z.string().min(1),
    required: z.boolean().optional(),
    validate: z.string().optional(),
    options: z.array(z.union([z.string(), z.object({ label: z.string(), value: z.string() })])).optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    times: z.array(z.string()).optional(),
  })

export const configSchema = z.object({
  title: z.string().min(1),
  successTitle: z.string().optional(),
  successMessage: z.string().optional(),
  steps: z
    .array(stepSchema)
    .min(2, "Debe haber al menos una pregunta y un resumen")
    .superRefine((steps, ctx) => {
      // IDs únicos
      const seen = new Set();
      steps.forEach((s, i) => {
        if (seen.has(s.id)) {
          ctx.addIssue({ code: "custom", message: `ID duplicado "${s.id}" en step ${i}`, path: ["steps", i, "id"] });
        }
        seen.add(s.id);
      });
      // Un único summary_step, y debe ser el último
      const summaries = steps.filter((s) => s.type === "summary_step");
      if (summaries.length !== 1) {
        ctx.addIssue({ code: "custom", message: "Debe existir exactamente un summary_step", path: ["steps"] });
      }
      if (steps[steps.length - 1]?.type !== "summary_step") {
        ctx.addIssue({ code: "custom", message: "El summary_step debe ser el último paso", path: ["steps"] });
      }
      // select_single exige opciones; text_input exige regla conocida (si declara validate)
      steps.forEach((s, i) => {
        if (s.type === "select_single" && (!s.options || s.options.length < 2)) {
          ctx.addIssue({ code: "custom", message: `select_single "${s.id}" necesita al menos 2 opciones`, path: ["steps", i, "options"] });
        }
        if (s.type === "date_picker" && s.times && s.times.length === 0) {
          ctx.addIssue({ code: "custom", message: `date_picker "${s.id}" no puede tener times vacíos`, path: ["steps", i, "times"] });
        }
      });
    }),
});

/** Valida en dev; devuelve true si la config es usable. */
export function assertConfig(config) {
  if (import.meta.env?.DEV !== true) return true;
  const result = configSchema.safeParse(config);
  if (result.success) return true;
  console.warn(
    "[BookingForm] La config contiene errores:\n" +
      result.error.issues.map((i) => ` - ${i.path.join(".")}: ${i.message}`).join("\n")
  );
  return false;
}
