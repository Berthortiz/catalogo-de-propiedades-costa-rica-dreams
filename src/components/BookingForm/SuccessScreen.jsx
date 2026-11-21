/**
 * SuccessScreen — pantalla final tras confirmar la reserva.
 * Check SVG dibujado con GSAP (stroke-dashoffset) + textos en stagger.
 */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { gsap } from "gsap";

/** Dibuja los trazos SVG con stroke-dasharray/dashoffset (efecto "check"). */
function drawPaths(svg) {
  svg.querySelectorAll("path").forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut", delay: 0.15 });
  });
}

export default function SuccessScreen({ config }) {
  useEffect(() => {
    const check = document.querySelector("[data-success-check]");
    if (check) drawPaths(check);
    const texts = document.querySelectorAll("[data-success-text]");
    if (texts.length) {
      gsap
        .timeline()
        .fromTo(
          texts,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.4, ease: "power2.out", delay: 0.3 }
        );
    }
  }, []);

  return (
    <section className="flex min-h-[520px] w-full max-w-md flex-col items-center justify-center gap-6 rounded-2xl bg-card px-8 py-12 text-center text-card-foreground shadow-2xl">
      <svg data-success-check width="88" height="88" viewBox="0 0 88 88" fill="none">
        <circle
          cx="44"
          cy="44"
          r="40"
          stroke="var(--color-ring)"
          strokeWidth="4"
          className="opacity-40"
        />
        <path
          d="M27 45 L39 57 L61 33"
          stroke="var(--color-success)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2 data-success-text className="text-2xl font-bold">
        {config.successTitle || "¡Reserva registrada!"}
      </h2>
      <p data-success-text className="text-sm text-muted-foreground">
        {config.successMessage || "Te esperamos en la fecha y hora elegidas."}
      </p>
    </section>
  );
}
