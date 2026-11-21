/**
 * BookingForm — contenedor del formulario de reservas estilo Typeform.
 *
 * ══ COMPORTAMIENTO ════════════════════════════════════════════
 * - Una pregunta a la vez: solo el paso actual está en pantalla
 *   (el paso saliente se mantiene montado SOLO durante la animación).
 * - Navegación: clic en opciones → auto-avance con micro-preview;
 *   Enter / botón OK → avanzar; ↑ (flecha arriba) o botón Atrás → retroceder.
 * - Transiciones: slide vertical + fade con GSAP (useStepTransition),
 *   con stagger interno de los elementos del paso que entra.
 * - Validación: Zod por paso antes de avanzar; revalidación TOTAL
 *   en el resumen antes de confirmar.
 *
 * ══ API ══════════════════════════════════════════════════════
 * <BookingForm
 *   config={{
 *     title, successTitle?, successMessage?,
 *     steps: [ { id, type, question, required, validate?, options?, times? } ],
 *   }}
 *   onSubmit={(answers) => { ... }}  // opcional: callback al confirmar
 * />
 *
 * ══ CONEXIÓN A SUPABASE (cuando exista el proyecto) ═════════
 * Guía completa en steps/SummaryStep.jsx. Punto de enganche:
 * handleConfirm — suscribir el answers ahí vía endpoint/API.
 */
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildStepSchema } from "./validation/buildStepSchema";
import { assertConfig } from "./validation/configSchema";
import { useStepTransition } from "./hooks/useStepTransition";
import StepRenderer from "./StepRenderer";
import ProgressBar from "./ProgressBar";
import SuccessScreen from "./SuccessScreen";
import { Button } from "../nexui/Button";

const AUTO_ADVANCE_DELAY = 250; // ms para apreciar la selección antes de transitar

export default function BookingForm({ config, onSubmit }) {
  // Guard de config en desarrollo (errores legibles en consola)
  const steps = useMemo(() => config.steps ?? [], [config]);

  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  /** prevStepIndex != null → hay un paso saliente en pantalla (durante la animación). */
  const [prevStepIndex, setPrevStepIndex] = useState(null);
  /** Bloquea la navegación mientras la animación corre. */
  const animatingRef = useRef(false);

  const containerRef = useStepTransition(
    currentIndex,
    prevStepIndex != null,
    direction,
    useCallback(() => {
      setPrevStepIndex(null);
      animatingRef.current = false;
    }, [])
  );

  const currentStep = steps[currentIndex];
  const totalSteps = steps.length;
  const isSummary = currentStep?.type === "summary_step";

  /* ── Navegación ─────────────────────────────────────────── */

  const goTo = useCallback(
    (targetIndex) => {
      if (animatingRef.current || targetIndex === currentIndex) return;
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setPrevStepIndex(currentIndex);
      animatingRef.current = true;
      setCurrentIndex(targetIndex);
    },
    [currentIndex]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  /* ── Validación Zod ─────────────────────────────────────── */

  /** Mensaje del primer error del schema del paso dado. */
  const validateStep = useCallback((step, value) => {
    const result = buildStepSchema(step).safeParse(value);
    if (result.success) return { ok: true, message: null };
    return { ok: false, message: result.error.issues[0]?.message ?? "Respuesta no válida" };
  }, []);

  /** Valida el paso EN PANTALLA antes de avanzar. */
  const handleAdvance = useCallback(
    (currentAnswers = answers) => {
      if (animatingRef.current || !currentStep) return;
      if (currentStep.type === "summary_step") return;
      const { ok, message } = validateStep(currentStep, currentAnswers[currentStep.id]);
      if (!ok) {
        setError(message);
        return;
      }
      setError(null);
      if (currentIndex + 1 < totalSteps) goTo(currentIndex + 1);
    },
    [answers, currentStep, currentIndex, goTo, totalSteps, validateStep]
  );

  /* ── Mutación de respuestas ─────────────────────────────── */

  /**
   * onChange(value, { advance }) — actualiza la respuesta del paso actual.
   * Con advance=true (select_single) registra la selección y agenda el
   * auto-avance fuera del updater (side-effect seguro con StrictMode).
   */
  const handleChange = useCallback(
    (value, { advance = false } = {}) => {
      if (!currentStep) return;
      const next = { ...answers, [currentStep.id]: value };
      setAnswers(next);
      setError(null);
      if (advance) {
        window.setTimeout(() => handleAdvance(next), AUTO_ADVANCE_DELAY);
      }
    },
    [answers, currentStep, handleAdvance]
  );

  /** Confirmar: revalida TODO el formulario; salta al paso inválido si hay fallos. */
  const handleConfirm = useCallback(() => {
    if (submitted) return;
    for (const step of steps) {
      if (step.type === "summary_step") continue;
      const { ok } = validateStep(step, answers[step.id]);
      if (!ok) {
        goTo(steps.indexOf(step));
        return;
      }
    }
    // ── PUNTO DE CONEXIÓN A BACKEND / SUPABASE ──
    // Guía completa con tabla SQL y patrones (endpoint server u
    // supabase-js) en steps/SummaryStep.jsx.
    if (onSubmit) onSubmit(answers);
    setSubmitted(true);
  }, [answers, goTo, onSubmit, steps, submitted, validateStep]);

  /** El botón Confirmar solo se habilita con todas las respuestas válidas. */
  const canSubmit = useMemo(() => {
    return steps.every((step) => {
      if (step.type === "summary_step") return true;
      return buildStepSchema(step).safeParse(answers[step.id]).success;
    });
  }, [answers, steps]);

  /* ── Teclado global: Enter avanza · ArrowUp retrocede ────── */
  useEffect(() => {
    function onKeyDown(e) {
      if (submitted || animatingRef.current) return;
      const tag = e.target?.tagName;
      if (e.key === "Enter") {
        // Enter sobre un botón debe disparar su propio click, no doble-navegar
        if (tag === "BUTTON") return;
        e.preventDefault();
        handleAdvance();
      } else if (e.key === "ArrowUp" && tag !== "INPUT" && tag !== "TEXTAREA") {
        // Excepción: dentro del calendario, ↑ es navegación nativa de botones
        if (e.target?.closest?.('[data-nexui="calendar"]')) return;
        handleBack();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleAdvance, handleBack, submitted]);

  /* ── Render ─────────────────────────────────────────────── */

  if (submitted) return <SuccessScreen config={config} />;

  return (
    <section
      data-nexui="booking-form"
      className="flex min-h-[640px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card text-card-foreground shadow-2xl"
    >
      <ProgressBar current={currentIndex + 1} total={totalSteps} />

      {/* Cabecera: título del negocio + volver */}
      <div className="flex items-center justify-between px-6 pb-2">
        <h1 className="text-sm font-semibold tracking-wide text-muted-foreground">{config.title}</h1>
        {currentIndex > 0 && (
          <Button variant="ghost" aria-label="Paso anterior" className="px-3 py-1.5 text-xs" onClick={handleBack}>
            ← Atrás
          </Button>
        )}
      </div>

      {/* Área de transición (GSAP anima vía containerRef los dos slots) */}
      <div ref={containerRef} className="relative flex-1 px-6 pb-8 pt-4">
        {/* Slot del paso saliente — solo vivo durante la animación */}
        {prevStepIndex != null && (
          <div
            data-slot="prev"
            className="pointer-events-none absolute inset-x-6 bottom-8 top-4"
            aria-hidden="true"
          >
            <StepRenderer
              step={steps[prevStepIndex]}
              stepList={steps}
              answers={answers}
              value={answers[steps[prevStepIndex].id]}
              error={null}
              onChange={() => {}}
              onSelect={() => {}}
              onAdvance={() => {}}
              onEdit={() => {}}
              onConfirm={() => {}}
              canSubmit={false}
            />
          </div>
        )}

        {/* Slot del paso activo — key garantiza remount por paso (animación + foco) */}
        <div data-slot="curr" key={currentIndex} className="flex min-h-[420px] items-start">
          <StepRenderer
            step={currentStep}
            stepList={steps}
            answers={answers}
            value={answers[currentStep.id]}
            error={error}
            onChange={handleChange}
            onSelect={(value) => handleChange(value, { advance: true })}
            onAdvance={() => handleAdvance()}
            onEdit={(stepId) => {
              const idx = steps.findIndex((s) => s.id === stepId);
              if (idx >= 0) goTo(idx);
            }}
            onConfirm={handleConfirm}
            canSubmit={canSubmit}
          />
        </div>
      </div>
    </section>
  );
}
