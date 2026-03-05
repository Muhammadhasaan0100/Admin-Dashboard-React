import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({children}){
    const {loginedIn} = useContext(AuthContext)

    if (!loginedIn) {
        return <NavLink to={"/login"} />
    }
    return children;
}
export default ProtectedRoute;