import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage";

export default function RoutesWithNotFound({ children }) {


    return (
        <Routes>
            {children}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    )
}



RoutesWithNotFound.propTypes = {
    children: PropTypes.node
};

