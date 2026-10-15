import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Navigate } from "react-router-dom";
import RoutesWithNotFound from "../components/RoutesWithNotFound/RoutesWithNotFound";

export function PrivateRouter() {
    return (
        <RoutesWithNotFound>
            <Route path="/dashboard" element={<Dashboard></Dashboard>} />
            <Route path="/" element={<Navigate to="dashboard " />}  ></Route>
        </RoutesWithNotFound>
    )
}