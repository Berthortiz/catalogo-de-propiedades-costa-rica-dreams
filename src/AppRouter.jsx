import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./public/Login";
import { Navigate } from "react-router-dom";
import { PrivateGuard } from "./guard/PrivateGuard";
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import { PrivateRouter } from "./private/PrivateRouter";
import RoutesWithNotFound from "./components/RoutesWithNotFound/RoutesWithNotFound";



export default function AppRouter({ children }) {
  return (
    <BrowserRouter>
      {children}

      <RoutesWithNotFound>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products/*" element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductDetailPage />} />
        <Route path="/login" element={<Login />} />
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