/**
 * HeroMix — hero de pantalla completa para la home (port del hero Astro).
 * Usa una sola imagen de fondo (bg-hero) y un overlay claro con
 * degradados radiales; el texto va en tinta oscura sobre el overlay.
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
// import bgHeroImg from "../../assets/hero-bg-catalogo.jpg";

// import bgHeroImg from "../../assets/bg-hero-9.jpg";

// import bgHeroImg from "../../assets/bg-alter-.jpg";
import bgHeroImg from "../../assets/hero_demo_47.png";
// import bgHeroMobileImg from "../../assets/hero_demo_47.png_41692426.jpg";
import bgHeroMobileImg from "../../assets/hero_demo_47.png_f3130e54.jpg";

// import bgHeroMobileImg from "../../assets/hero_demo_47.png_5f6c10d1_2K.png";




import GlassButton from "../GlassButton";
import "./HeroMix.css";

const contactMessage =
    "Hola, quiero más información sobre las propiedades disponibles en Costa Rica Dreams. ¿Podrían ayudarme a encontrar una propiedad para alquilar?";
const contactUrl = `https://wa.me/50663964070?text=${encodeURIComponent(contactMessage)}`;

const STATS = [
    { value: 519, label: "Propiedades vendidas" },
    { value: 325, label: "Propiedades alquiladas" },
    { value: 15, label: "Años en el mercado" },
];

function WhatsAppIcon({ size = 20 }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
            <path d="M12 2a9.8 9.8 0 0 0-8.35 14.94L2.5 22l5.2-1.1A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.29-.17-3.08.65.66-3-.19-.3A8 8 0 1 1 12 20Zm4.4-5.98c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
        </svg>
    );
}

export default function HeroMix() {
    const statsRef = useRef(null);

    // Conteo animado de las estadísticas al montar el hero
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".hero-stats__value").forEach((el) => {
                const target = Number(el.dataset.value) || 0;
                const counter = { v: 0 };
                gsap.to(counter, {
                    v: target,
                    duration: 1.8,
                    ease: "power2.out",
                    onUpdate: () => {
                        el.textContent = Math.round(counter.v);
                    },
                });
            });
        }, statsRef);
        return () => ctx.revert();
    }, []);

    return (

        <section className="hero-mix-wrapper py-4 px-4 md:py-[2em] md:px-[3em]">
            <div
                id="hero-mix"
                className="hero-mix relative flex w-full flex-col overflow-hidden rounded-3xl pb-0 pt-0 md:min-h-[calc(92.5svh-76px)] md:pb-10 md:pt-10 lg:pt-9"
            >
                {/* Imagen de fondo */}
                <div className="relative w-full md:absolute md:inset-0">
                    <picture className="block h-auto w-full md:h-full">
                        <source media="(max-width: 767px)" srcSet={bgHeroMobileImg} />
                        <img
                            src={bgHeroImg}
                            alt="Propiedad de lujo"
                            decoding="async"
                            className="hero-mix__bg h-auto w-full object-contain object-top md:h-full md:object-cover"
                        />
                    </picture>
                </div>

                <div id="overlay" className="hero-mix__overlay absolute inset-0" />

                <div
                    id="itemhero"
                    className="absolute inset-0 z-10 mx-auto flex w-full flex-col justify-start px-6 pt-8 pb-8 md:relative md:inset-auto md:max-w-7xl md:flex-1 md:items-center md:justify-center md:px-16 md:pt-0 md:pb-0 lg:flex-row lg:justify-start"
                >
                    <div className="flex w-full flex-col items-start justify-center font-sans md:max-w-2xl md:text-left lg:w-3/7 lg:max-w-none lg:px-0">
                        <span className="hero-mix__ink text-[.9em] font-light uppercase">
                            El Espacio que Siempre Soñaste
                        </span>
                        <span className="hero-mix__accent my-2 h-[2px] w-[60px]" />

                        <h1 className="hero-mix__ink mb-4 font-serif font-bold text-[2.4em] leading-10 md:text-5xl md:leading-14 lg:text-[2.7em] lg:leading-13 xl:text-[3.3em] xl:leading-16">
                            El espacio que buscas{" "}
                            <span className="hero-mix__accent-text">Existe</span>
                        </h1>

                        <p className="hero-mix__ink mb-3 font-light leading-relaxed md:text-[1em] lg:text-[.8em]">
                            Espacio, luz natural y elegancia en un solo lugar. diseño
                            moderno con comodidades de primer nivel. ¿Te imaginas viviendo
                            aquí?
                        </p>

                        <div className="flex w-full flex-row flex-wrap items-center gap-3">
                            <GlassButton variant="primary" fontSize=".7em" href={contactUrl}>
                                <WhatsAppIcon />
                                Agendar cita
                            </GlassButton>
                            <GlassButton
                                fontSize=".7em"
                                variant="secondary"
                                textColor="var(--color-ink, #0a0b0e)"
                                href="/products"
                            >
                                Ver propiedades
                            </GlassButton>
                        </div>

                        {/* Contador de estadísticas */}
                        <div ref={statsRef} className="hero-stats mt-10 flex w-full flex-row items-stretch md:mt-14">
                            {STATS.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className={`flex flex-col justify-center px-4 first:pl-0 md:px-6 ${index > 0 ? "hero-stats__item--divided" : ""
                                        }`}
                                >
                                    <div className="flex items-start gap-0.5">
                                        <span
                                            className="hero-stats__value hero-mix__ink text-[1.5rem] font-extrabold leading-none md:text-[2rem]"
                                            data-value={stat.value}
                                        >
                                            0
                                        </span>
                                        <span className="hero-mix__accent-text text-lg font-bold md:text-xl">
                                            +
                                        </span>
                                    </div>
                                    <span className="hero-stats__label mt-1 max-w-[110px] text-[.8em] font-medium leading-tight md:text-[.85em]">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
