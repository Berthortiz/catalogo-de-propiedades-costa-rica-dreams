import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"

export const PrivateGuard = () => {

    const token = true
    return token ?
        <Outlet></Outlet>
        :
        <Navigate to="/login" replace />

}