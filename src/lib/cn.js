/**
 * cn — helper de clases estilo NexUI (clsx + tailwind-merge).
 * Une clases condicionales y resuelve conflictos de utilidades
 * de Tailwind (la última gana).
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
