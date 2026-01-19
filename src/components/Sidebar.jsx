import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
function Sidebar() {
   const {logOut} = useContext(AuthContext)
    return (
        <aside className="w-[260px] bg-white/10 backdrop-blur-2xl border-r border-white/20
                    shadow-[0_25px_80px_rgba(0,0,0,0.6)]
                    [transform:perspective(1200px)_rotateY(6deg)]">

            <div className="p-6 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Panel
            </div>

            <ul className="space-y-4 px-6 mt-6">
                <li className="text-white/80 hover:text-white " >
                    <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="text-white/80 hover:text-white ">
                    <Link to={"/userpage"}>Users</Link>
                </li>
                <li className="text-white/80 hover:text-white ">
                    <Link to={"/reports"}>Reports</Link>
                </li>
                <li onClick={logOut} className="text-red-500 hover:text-red-600 cursor-pointer">
                    LogOut
                </li>
            </ul>
        </aside>
    )
}
export default Sidebar;