import { useLayoutEffect } from "react";
import { BrowserRouter, Route, useLocation, useNavigationType } from "react-router-dom";
import PropTypes from "prop-types";
import HomePage from "./pages/HomePage/HomePage";
import FormDynamic from "./pages/FormDynamic";
import Login from "./public/Login";
import { Navigate } from "react-router-dom";
import { PrivateGuard } from "./guard/PrivateGuard";
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CitiesIndexPage from "./pages/CitiesIndexPage"
import CityPropertiesPage from "./pages/CityPropertiesPage"
import { PrivateRouter } from "./private/PrivateRouter";
import RoutesWithNotFound from "./components/RoutesWithNotFound/RoutesWithNotFound";

function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { pathname, hash } = location;

  useLayoutEffect(() => {
    // Con ancla en la URL (ej. /products#resultados, desde el filtro de la
    // home): desplazar la vista hasta el elemento y no al tope de la página.
    // El rAF da un tick para que el catálogo haya pintado la grilla.
    if (hash) {
      requestAnimationFrame(() => {
        const target = document.getElementById(hash.slice(1));
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType, hash]);

  return null;
}



export default function AppRouter({ children }) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {children}

      <RoutesWithNotFound>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/products/*" element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductDetailPage />} />
        <Route path="/ciudades" element={<CitiesIndexPage />} />
        <Route path="/ciudades/:ciudad" element={<CityPropertiesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservas" element={<FormDynamic />} />
        <Route element={<PrivateGuard />} >
          <Route path="/private/*" element={<PrivateRouter />} ></Route>
        </Route>

      </RoutesWithNotFound>

    </BrowserRouter>
  )
}


AppRouter.propTypes = {
  children: PropTypes.node
};