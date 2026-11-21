/**
 * Reglas de validación nombradas (Zod), reutilizables entre nichos.
 * El JSON del schema referencía estas reglas con `validate: "name"`, etc.
 * Cada mensaje ya viene localizado en español — incluye el error de TIPO
 * (campo vacío/undefined) para que nunca aparezca el texto en inglés de default.
 */
import { z } from "zod";

export const RULES = {
  /** Nombre de persona: 2+ letras (permite tildes, ñ, espacios, apóstrofes) */
  name: z
    .string({ message: "Este campo es obligatorio" })
    .min(2, "Ingresa tu nombre completo")
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1' .-]{2,60}$/, "El nombre solo puede contener letras y espacios"),

  /** Teléfono: + opcional, 8 a 15 dígitos con separadores */
  phone: z
    .string({ message: "Este campo es obligatorio" })
    .min(1, "Este campo es obligatorio")
    .regex(/^\+?[0-9 ()-]{8,15}$/, "Ingresa un teléfono válido (ej: 8888-8888)"),

  /** Email */
  email: z
    .string({ message: "Este campo es obligatorio" })
    .min(1, "Este campo es obligatorio")
    .pipe(z.email({ message: "Ingresa un correo válido" })),

  /** Texto corto obligatorio genérico */
  text: z
    .string({ message: "Este campo es obligatorio" })
    .min(1, "Este campo es obligatorio"),

  /**
   * Texto opcional genérico (sin tope de longitud).
   * El "required" se decide en buildStepSchema.
   */
  free: z.string({ message: "Este campo es obligatorio" }),
};
