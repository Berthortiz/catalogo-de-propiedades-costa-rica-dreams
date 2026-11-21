# Contexto de proyecto — Formulario de reservas estilo Typeform

> **Documento de contexto**: entrégalo a un agente/chat nuevo para que conozca
> el estado completo de este feature sin leer el histórico de la conversación.
> Última actualización: 2026-10-22.

---

## 1. Qué es

Componente de reservas multi-nicho (barberías, restaurantes, dentistas…) estilo
**Typeform**: una pregunta a la vez, navegación por teclado, transiciones
animadas y validación por esquema declarativo (JSON).

- **Proyecto actual (implementado y funcionando):** Vite + React 18.3 + JSX (sin TypeScript)
  en `C:\Berth - GitHub\tienda-clone-xiaomi-master\tienda-clone-xiaomi-master`
- **Estado:** build de producción ✅, dev server ✅, ruta `/reservas` ✅
- **Plan de migración:** llevarlo a **Astro como isla** (`client:load`) — see §6
- **Pendiente:** conexión a Supabase en el submit — see §7

## 2. Decisiones técnicas (no renegociar sin motivo)

| Tema | Decisión | Motivo |
|---|---|---|
| Lenguaje | JavaScript (JSX) + `prop-types` | Consistente con el repo (no TS) |
| Componentes UI | `src/components/nexui/` **código propio** en estilo NexUI (helper `cn()`, tokens semánticos) | El registry de NexUI.dev estaba vacío (0 componentes en su API) |
| Animaciones | **GSAP 3.15** + `@gsap/react` (`useGSAP`/timelines) | Elección del usuario sobre Framer Motion |
| Validación | **Zod 4.6** — reglas nombradas derivadas del JSON config | Multi-nicho sin hardcodeo; reutilizable client/server |
| Gestor paquetes | **pnpm** en este repo (consejo del dueño: convivir con npm) | `pnpm-workspace.yaml` con `onlyBuiltDependencies` corregido |
| Ruta web | `/reservas` → `src/pages/FormDynamic.jsx` | Registrada en `src/AppRouter.jsx` |
| Migración Astro | Componente **100% autocontenido** (sin contexts, sin CSS externo, config serializable) | Facilitar copiar carpeta como isla |

## 3. Estructura de archivos (proyecto actual)

```
src/
├── components/
│   ├── nexui/                 # Componentes base estilo NexUI (JS + prop-types)
│   │   ├── Button.jsx         # variantes: solid / outline / ghost
│   │   ├── Input.jsx          # forwardRef (foco automático en pasos)
│   │   ├── Radio.jsx          # RadioGroup accesible (role=radiogroup)
│   │   ├── Calendar.jsx       # grid mensual, minDate=hoy, weeks lunes-start
│   │   └── Progress.jsx       # barra de progreso simple
│   ├── BookingForm/
│   │   ├── BookingForm.jsx    # CONTENEDOR: estado {answers, currentIndex,
│   │   │                      #   direction, error}, teclado, validación,
│   │   │                      #   auto-avance (250ms), handleConfirm
│   │   ├── StepRenderer.jsx   # switch step.type → sub-componente
│   │   ├── ProgressBar.jsx    # "Paso X de Y" + barra
│   │   ├── SuccessScreen.jsx  # check SVG dibujado con GSAP
│   │   ├── hooks/
│   │   │   └── useStepTransition.js  # GSAP: 2 slots (prev sale / curr entra),
│   │   │                             #   slide±56px + fade + stagger interno
│   │   │                             #   (data-stagger en el contenido)
│   │   ├── steps/
│   │   │   ├── SelectSingleStep.jsx  # radio grande; onChange avanza solo
│   │   │   ├── TextInputStep.jsx     # foco automático; Enter/OK ✓ avanza
│   │   │   ├── DatePickerStep.jsx    # Calendar + grid de horas (step.times)
│   │   │   └── SummaryStep.jsx       # resumen + Editar por fila + Confirmar
│   │   │                             #   ( aquí está la guía SUPABASE )
│   │   ├── validation/
│   │   │   ├── validators.js      # RULES: name, phone, email, text, free (Zod)
│   │   │   ├── buildStepSchema.js # JSON config → schema Zod dinámico
│   │   │   └── configSchema.js    # guard de la config completa (solo dev)
│   │   └── index.js           # barrel export
│   └── … (resto del repo intacto: tienda, propiedades, header…)
├── schemas/
│   └── bookingSchema.js       # barberiaConfig + restauranteConfig (multi-nicho)
├── lib/
│   └── cn.js                  # clsx + tailwind-merge
├── pages/
│   └── FormDynamic.jsx        # página /reservas con barberiaConfig
└── …
```

## 4. API del componente

```jsx
<BookingForm
  config={{
    title: "Barbería Central",
    successTitle?: "¡Cita agendada!",
    successMessage?: "…",
    steps: [
      { id, type: "select_single", question, required, options: [{label,value}] },
      { id, type: "text_input",    question, required, validate: "name"|"phone"|"email", placeholder?, min?, max? },
      { id, type: "date_picker",   question, required, times?: ["09:00"…] },
      { id, type: "summary_step",  question },
    ],
  }}
  onSubmit={(answers) => { … }}   // respuestas acumuladas al confirmar
/>
```

- Respuestas acumuladas: `answers = { [step.id]: value }` — `date_picker` guarda `{date:"YYYY-MM-DD", time:"HH:mm"}`.
- Validación: Zod por paso al avanzar; revalidación total en Confirmar (salta al paso fallido).
- Teclado: `Enter` avanza · `↑` retrocede (excepto dentro del calendario y de inputs).

## 5. Comandos del proyecto actual

```bat
cd "C:\Berth - GitHub\tienda-clone-xiaomi-master\tienda-clone-xiaomi-master"
pnpm dev                  → http://localhost:5173/reservas  (form) y / (tienda)
pnpm build                → dist/
```

- El proyecto REAL está en la carpeta interna; la carpeta `C:\Berth - GitHub\tienda-clone-xiaomi-master` (externa) no tiene package.json.
- Deps instaladas: `gsap @gsap/react zod clsx tailwind-merge` (además de las existentes del repo).
- `pnpm-workspace.yaml` corregido a `onlyBuiltDependencies` (swc, oxide, esbuild).
- Nota: `pnpm lint` del repo está roto de fábrica (ESLint 9 sin flat config) — preexistente, no del feature.
- Tokens de diseño: bloque `@theme` al final de `src/index.css` (`--color-primary: #ff6700`, superficies dark, `--radius`).

## 6. PENDIENTE: migración a Astro (isla)

El componente ya es migrable tal cual. Guía acordada (npm o pnpm):

```bat
cd C:\Berth - GitHub
npm create astro@latest mi-web-astro        # template "Empty", sin TS
cd mi-web-astro
npx astro add react
npx astro add tailwind
npm install gsap @gsap/react zod clsx tailwind-merge
robocopy "%ORIG%\components\nexui"      "%DEST%\components\nexui" /E
robocopy "%ORIG%\components\BookingForm" "%DEST%\components\BookingForm" /E
robocopy "%ORIG%\schemas"               "%DEST%\schemas" /E
robocopy "%ORIG%\lib"                   "%DEST%\lib" /E
```

Después:
1. Copiar el bloque `@theme` (tokens §5) a `src/styles/global.css` de Astro.
2. Crear `src/layouts/Layout.astro` (importa global.css, font Poppins).
3. Crear `src/pages/reservas.astro`:

```astro
---
import Layout from "../layouts/Layout.astro";
import BookingForm from "../components/BookingForm/BookingForm.jsx";
import { barberiaConfig } from "../schemas/bookingSchema";
---
<Layout>
  <BookingForm config={barberiaConfig} client:load />
</Layout>
```

- **`client:load` obligatorio** (teclado global debe funcionar al instante).
- Multi-nicho: páginas dinámicas `[slug].astro` mapeando config por negocio.
- Paridad garantizada: GSAP, Zod, teclado y NexUI corren 100% dentro de la isla.

## 7. PENDIENTE: conexión a Supabase

Guía completa comentada en `src/components/BookingForm/steps/SummaryStep.jsx`
(también en el header de `BookingForm.jsx`). Resumen:

1. Tabla sugerida:

```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  niche_slug text not null,
  answers jsonb not null,
  booking_date date,
  booking_time text,
  status text not null default 'pending'
);
```

2. **Patrón recomendado (Astro):** endpoint `src/pages/api/bookings.ts` del lado
   server con `SUPABASE_SERVICE_ROLE_KEY` en `.env` (nunca en el cliente),
   revalidando con el MISMO schema Zod (`validation/`) antes de insertar.
   Punto de enganche: `handleConfirm` en `BookingForm.jsx`.
3. Alternativa: directo con `supabase-js` desde la isla si hay RLS policies.
4. En el repo Vite actual, el `onSubmit` ya recibe `answers` en
   `src/pages/FormDynamic.jsx` (solo hace `console.log`).

## 8. Consideraciones para agentes (leer antes de tocar)

- No reescribir a TypeScript unless el dueño lo pida; mantener JSX + prop-types.
- No introducir contexts/CSS global en BookingForm (rompe la migración a isla).
- Los mensajes de validación deben quedar en español (incluye errores de tipo Zod).
- Los steps no deben conocer GSAP: solo usan atributos `data-stagger` / `data-slot`.
- `useStepTransition` anima SIEMPRE la entrada del paso que se monta y los steps
  bloquean navegación vía `animatingRef` mientras corre el timeline.
- En el submit del resumen existe un comentario guía para conectar backend — no borrarlo.
- CSS del proyecto: Tailwind v4 con `@import "tailwindcss"` en `src/index.css`;
  hay `tailwind.config.js` heredado que en v4 no aplica (doc legacy, ignorable).
