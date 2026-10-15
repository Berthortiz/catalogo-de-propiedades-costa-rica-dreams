import useProductDetails from "../../hooks/useProductDetails";
import "./GalleryProduct.css"
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GalleryProduct() {

    const { product } = useProductDetails();
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!product) {
        return null;
    }

    const images = product.images ?? [];

    return (
        <section className="galleryProducts">
            {images.length > 0 ? (
                <>
                    <Swiper
                        className="galleryProducts__slider"
                        modules={[A11y, Navigation, Pagination]}
                        navigation={images.length > 1}
                        pagination={images.length > 1 ? { clickable: true } : false}
                        onSwiper={(swiper) => { swiperRef.current = swiper; }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={images.length > 1}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={`${image}-${index}`}>
                                <div className="galleryProducts__slide">
                                    <img
                                        src={image}
                                        alt={`${product.title}, imagen ${index + 1}`}
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {images.length > 1 && (
                        <div className="galleryProducts__thumbnails" role="group" aria-label="Miniaturas de la propiedad">
                            {images.map((image, index) => (
                                <button
                                    type="button"
                                    key={`${image}-${index}`}
                                    className={`galleryProducts__thumbnail${activeIndex === index ? " is-active" : ""}`}
                                    aria-label={`Mostrar imagen ${index + 1} de ${images.length}`}
                                    aria-pressed={activeIndex === index}
                                    onClick={() => swiperRef.current?.slideToLoop(index)}
                                >
                                    <img src={image} alt="" loading="lazy" />
                                </button>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="galleryProducts__placeholder" role="img" aria-label={`Fotografías pendientes para ${product.title}`}>
                    <span>Fotografías próximamente</span>
                </div>
            )}
        </section>
    );
}