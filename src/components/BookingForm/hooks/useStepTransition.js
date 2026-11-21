/**
 * useStepTransition — orquesta la animación de cambio de pasos con GSAP.
 *
 * Estrategia (equivalente a un "AnimatePresence" manual):
 * El contenedor mantiene DOS slots durante la transición:
 *   - `prev`: el paso que sale (renderizado con data-slot="prev")
 *   - `curr`: el paso que entra (data-slot="curr")
 * El hook se activa cuando existe un paso saliente y corre un timeline:
 *   1. El prev se desliza y desvanece hacia el lado opuesto.
 *   2. El curr entra en espejo.
 *   3. Los elementos internos [data-stagger] del curr aparecen
 *      secuencialmente (~80ms entre sí) — la sensación "Typeform".
 *
 * Al terminar llama a `onComplete()` (el contenedor limpia el prev).
 * Los steps NO conocen GSAP: solo marcan su contenido con data-stagger.
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * @param {number} currentIndex  — índice del paso activo.
 * @param {boolean} hasPrev      — true mientras exista un paso saliente en pantalla.
 * @param {number} direction     — +1 avanzando, -1 retrocediendo.
 * @param {() => void} onComplete — se dispara al terminar la transición.
 */
export function useStepTransition(currentIndex, hasPrev, direction, onComplete) {
  const containerRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const q = gsap.utils.selector(container);
    const prevEl = q('[data-slot="prev"]');
    const currEl = q('[data-slot="curr"]');
    if (!currEl.length) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.35, ease: "power2.out" },
      // Al completar la transición completa prev->curr se limpia el paso saliente
      onComplete: () => onCompleteRef.current?.(),
    });

    if (hasPrev && prevEl.length) {
      // Transición completa: el paso saliente se desliza hacia su lado.
      tl.to(prevEl, {
        yPercent: 0,
        y: direction >= 0 ? -56 : 56,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      }).fromTo(
        currEl,
        { y: direction >= 0 ? 56 : -56, opacity: 0 },
        { y: 0, opacity: 1 },
        "<"
      );
    } else {
      // Entrada inicial (primer render o paso revisitado): solo el curr.
      tl.fromTo(currEl, { y: 24, opacity: 0 }, { y: 0, opacity: 1 }, 0);
    }

    // Stagger interno del contenido del paso que entra
    const staggerItems = currEl.length ? currEl[0].querySelectorAll("[data-stagger]") : [];
    if (staggerItems.length) {
      tl.fromTo(
        staggerItems,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );
    }

    return () => {
      // Revert limpia estilos inline del timeline sin flash
      tl.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return containerRef;
}
