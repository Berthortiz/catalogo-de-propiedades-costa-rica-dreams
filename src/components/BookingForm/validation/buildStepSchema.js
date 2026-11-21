/**
 * buildStepSchema — convierte la configuración JSON de un paso
 * en su schema Zod correspondiente. Es el puente entre la config
 * serializable (migrable a Astro) y la validación runtime.
 */
import { z } from "zod";
import { RULES } from "./validators";

/** Devuelve la fecha local de hoy como "YYYY-MM-DD" (para comparar fechas de reserva). */
export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * @param {object} step — objeto del schema de configuración.
 * @returns {z.ZodType} schema validador para el valor de ese paso.
 */
export function buildStepSchema(step) {
  switch (step.type) {
    case "text_input": {
      // Regla nombrada del config; "free" para sin regla declarada
      let schema = (step.validate && RULES[step.validate]) || RULES.free;
      if (step.min != null) {
        schema = schema.min(step.min, `Mínimo ${step.min} caracteres`);
      }
      if (step.max != null) {
        schema = schema.max(step.max, `Máximo ${step.max} caracteres`);
      }
      // Campo opcional: vacío ("" o undefined) es válido; con contenido se valida
      return step.required === false ? schema.optional().or(z.literal("")) : schema;
    }

    case "select_single": {
      const options = (step.options || []).map((o) => (typeof o === "string" ? o : o.value));
      const schema = z
        .string({ message: "Selecciona una opción" })
        .refine((v) => options.includes(v), "Selecciona una opción válida");
      return step.required === false ? schema.optional() : schema;
    }

    case "date_picker": {
      const schema = z
        .object(
          {
            date: z
              .string({ message: "Selecciona una fecha" })
              .refine(
                (v) => !Number.isNaN(new Date(`${v}T00:00:00`).getTime()),
                "Selecciona una fecha"
              )
              .refine((v) => v >= todayISO(), "No puedes reservar en fechas pasadas"),
            time: z.string({ message: "Selecciona una hora" }).min(1, "Selecciona una hora"),
          },
          { message: "Selecciona fecha y hora" }
        )
        .refine((v) => Boolean(v?.date && v?.time), "Completa fecha y hora");
      return step.required === false ? schema.optional() : schema;
    }

    case "summary_step":
    default:
      // Los pasos no validables (resumen) siempre pasan.
      return z.any().optional();
  }
}
