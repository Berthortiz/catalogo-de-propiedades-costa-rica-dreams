/**
 * Schemas de configuración multi-nicho (JSON serializable).
 * TODO el contenido del formulario proviene de aquí: agrega un negocio
 * un negocio nuevo copiando un objeto y cambiando questions/options/times.
 *
 * Campos soportados por step:
 *  - type: "select_single" | "text_input" | "date_picker" | "summary_step"
 *  - required (default true), validate ("name"|"phone"|"email"),
 *    min/max (text), options (select), times (date_picker)
 *
 * Las reglas nombradas viven en components/BookingForm/validation/validators.js
 */

/** Barbería — flujo corto de cita */
export const barberiaConfig = {
  title: "Barbería Central",
  successTitle: "¡Cita agendada!",
  successMessage: "Te esperamos en la fecha y hora elegidas. Tu sillón ya está reservado.",
  steps: [
    {
      id: "service",
      type: "select_single",
      question: "¿Qué servicio deseas para hoy?",
      required: true,
      options: [
        { label: "Corte de cabello — ₡8.000", value: "corte" },
        { label: "Corte + arreglo de barba — ₡11.000", value: "corte-barba" },
        { label: "Solo arreglo de barba — ₡4.000", value: "barba" },
        { label: "Diseño (fade / line-up) — ₡10.000", value: "diseno" },
      ],
    },
    {
      id: "name",
      type: "text_input",
      question: "¿Cuál es tu nombre?",
      required: true,
      validate: "name",
      placeholder: "Ej: Marino Chaves",
    },
    {
      id: "phone",
      type: "text_input",
      question: "¿Teléfono de contacto para confirmar tu cita?",
      required: true,
      validate: "phone",
      inputType: "tel",
      placeholder: "8888-8888",
    },
    {
      id: "date",
      type: "date_picker",
      question: "¿Cuándo prefieres tu cita?",
      required: true,
      times: ["08:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"],
    },
    {
      id: "notes",
      type: "text_input",
      question: "¿Alguna indicación para el barbero?",
      required: false,
      placeholder: "Ej: cortar poco de la base, máquina 1 y 3…",
    },
    {
      id: "review",
      type: "summary_step",
      question: "Confirma tu cita",
    },
  ],
};

/** Restaurante — reserva de mesa */
export const restauranteConfig = {
  title: "Restaurante La Terraza",
  successTitle: "¡Mesa reservada!",
  successMessage: "Guardamos tu mesa: revisa tu teléfono para la confirmación.",
  steps: [
    {
      id: "guests",
      type: "select_single",
      question: "¿Para cuántas personas es la reserva?",
      required: true,
      options: [
        { label: "2 personas", value: "2" },
        { label: "4 personas", value: "4" },
        { label: "6 personas", value: "6" },
        { label: "8 o más (evento)", value: "8+" },
      ],
    },
    {
      id: "zone",
      type: "select_single",
      question: "¿Qué zona prefieres?",
      required: true,
      options: [
        { label: "Terraza al aire libre", value: "terraza" },
        { label: "Salón con aire acondicionado", value: "salon" },
        { label: "Zona de bar", value: "bar" },
      ],
    },
    {
      id: "name",
      type: "text_input",
      question: "¿Nombre de quien reserva?",
      required: true,
      validate: "name",
      placeholder: "Ej: Sebastián Salas",
    },
    {
      id: "phone",
      type: "text_input",
      question: "¿Teléfono para la confirmación?",
      required: true,
      validate: "phone",
      inputType: "tel",
      placeholder: "8888-8888",
    },
    {
      id: "date",
      type: "date_picker",
      question: "¿Qué día y hora te acomoda mejor?",
      required: true,
      times: ["12:00", "13:30", "15:00", "18:00", "19:30", "21:00"],
    },
    {
      id: "notes",
      type: "text_input",
      question: "¿Alergias o peticiones especiales?",
      required: false,
      placeholder: "Ej: sin gluten, mesa de cumpleaños…",
    },
    {
      id: "review",
      type: "summary_step",
      question: "Confirma tu reserva",
    },
  ],
};

export default barberiaConfig;
