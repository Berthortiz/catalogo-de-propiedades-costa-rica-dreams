import useProductDetails from "../../hooks/useProductDetails";
import "./GalleryProduct.css"
import { useState } from "react";

export default function GalleryProduct() {

    const { product } = useProductDetails();

    const [imageProduct, setImageProduct] = useState()


    const handleClickProductItem = (urlImage) => {

        setImageProduct(urlImage)



    }

    if (!product) {
        return null;
    }


    // Dar por echo que los estados que dependan de una funcion asyncrona
    // simpre daran error o cuando el componenete intenta leer algo que todabia no tiene
    // cuando in tuya que los datos aun no esta cargados hacer comprovaciones  

    return (
        <section className="galleryProducts">
            <div className="galleryProducts__main-image"> { /*no da error porque se renderiza cuando ya esta cargado el componente*/}
                {product.images?.length > 0
                    ? <img src={!imageProduct ? product.images[0] : imageProduct} alt={product.title} />
                    : <div className="galleryProducts__placeholder" role="img" aria-label={`Fotografías pendientes para ${product.title}`}>
                        <span>Fotografías próximamente</span>
                    </div>}
            </div>

            {
                product?.images?.map((item, i) => {
                    return (
                        <button type="button" key={i} onClick={() => handleClickProductItem(item)} className="galleryProducts__container-image" aria-label={`Ver imagen ${i + 1}`}>

                            <img src={item} alt="" />

                        </button>
                    )


                }
                )
            }

        </section>
    );
}