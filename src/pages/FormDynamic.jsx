/**
 * FormDynamic — página de reservas.
 * Monta el componente de reservas estilo Typeform con una config
 * multi-nicho del schema (cámbiala por la de tu negocio).
 *
 * MIGRACIÓN A ASTRO (isla):
 * Este componente es autocontenido (sin contexts ni CSS externo).
 * En Astro solo requeriría:
 *   import BookingForm from "../components/BookingForm/BookingForm.jsx";
 *   <BookingForm config={barberiaConfig} client:load />
 */
import BookingForm from "../components/BookingForm";
// Segundo nicho de demostración:
// import { restauranteConfig } from "../schemas/bookingSchema";
import { barberiaConfig } from "../schemas/bookingSchema";

export default function FormDynamic() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
            {/* Cambia barberiaConfig por restauranteConfig (u otro nicho) para re-usar */}
            <BookingForm
                config={barberiaConfig}
                onSubmit={(answers) => {
                    /* eslint-disable no-console */
                    // Aquí llega el objeto completo de respuestas:
                    // { service: "corte", name: "...", phone: "...", date: {...} }
                    // Punto de conexión a backend/Supabase (ver SummaryStep.jsx):
                    console.log("Reserva confirmada:", answers);
                }}
            />
        </main>
    );
}
