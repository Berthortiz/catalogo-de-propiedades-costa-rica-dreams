import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { slider } from '../../services/sliderPropiedades.json';

const formatPrice = (price) =>
    new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 0,
    }).format(price);

const SliderPropiedades = () => {
    return (
        <Swiper
            className="flex flex-col"
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop
            spaceBetween={0}
            slidesPerView={1}
            style={{ width: '100%', height: '580px' }}
        >
            {slider.map((property) => (
                <SwiperSlide key={property.id} className="relative">
                    <picture className="absolute inset-0">
                        <source media="(max-width: 768px)" srcSet={property.img.image_mobile} />
                        <img
                            src={property.img.image_pc}
                            alt={property.img.alt}
                            className="h-full w-full object-cover"
                        />
                    </picture>
                    <div className="absolute inset-0 bg-black/40" />

                    <section className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-6 text-white md:px-16">
                        <div className="flex max-w-2xl flex-col gap-3">
                            <p className="text-sm font-semibold md:text-base">{property.location}</p>
                            <h2 className="text-3xl font-semibold md:text-5xl">{property.title}</h2>
                            <p className="text-base md:text-xl">{property.description}</p>
                            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm md:text-base">
                                {property.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                            <p className="mt-2 text-xl md:text-2xl">
                                Desde <strong className="font-semibold">{formatPrice(property.price)}</strong>
                            </p>
                            <div className="mt-2">
                                <a
                                    className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
                                    href={property.url}
                                >
                                    Solicitar información
                                </a>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderPropiedades;