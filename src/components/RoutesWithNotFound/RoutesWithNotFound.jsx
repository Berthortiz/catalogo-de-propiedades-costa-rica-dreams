import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

export default function RoutesWithNotFound({ children }) {


    return (
        <Routes>
            {children}
            <Route path="/404" element={<h1>Error 404 - Pagina no encontrada</h1>} />
            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    )
}



RoutesWithNotFound.propTypes = {
    children: PropTypes.node
};

