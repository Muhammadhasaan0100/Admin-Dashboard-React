import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {login} = useContext(AuthContext)

    function handleLogin(e) {
        e.preventDefault();
        
        const success = login(email,password);
         
        if (success) {
            setError("")
            navigate("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    }
    return (
<div className="min-h-screen flex items-center justify-center bg-[#050816] relative overflow-hidden">

    {/* Animated Gradient Orbs */}
    <div className="absolute w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-3xl animate-pulse -top-40 -left-40"></div>
    <div className="absolute w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-3xl animate-pulse bottom-0 -right-20"></div>

    {/* 3D Perspective Wrapper */}
    <div className="relative [perspective:1200px]">

        {/* 3D Card */}
        <div className="w-[420px] h-[580px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10
                    shadow-[0_0_60px_rgba(99,102,241,0.35)]
                    transform transition duration-700 ease-out
                    hover:[transform:scale(1.02)]">

            <form onSubmit={handleLogin} className="h-full flex flex-col justify-center space-y-6">

                <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Login
                </h2>

                {/* Email */}
                <div className="relative group">
                    <label className="text-white/70 text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 mt-1 text-white 
                       placeholder-white/40 outline-none
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50
                       transition duration-300"
                    />
                    <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left"></span>
                </div>

                {/* Password */}
                <div className="relative group">
                    <label className="text-white/70 text-sm">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 mt-1 text-white 
                       placeholder-white/40 outline-none
                       focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50
                       transition duration-300"
                    />
                    <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left"></span>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                {/* 3D Button */}
                <button
                    type="submit"
                    className="mt-6 relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl
                     shadow-[0_10px_30px_rgba(99,102,241,0.5)]
                     transform transition duration-300
                     hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(99,102,241,0.8)]
                     active:translate-y-0"
                     
                >
                    Login
                </button>

                <p className="text-white/70 text-sm text-center mt-4">
                    Don't have an account?
                    <Link to="/register" className="text-blue-400 hover:underline ml-1">
                        Register
                    </Link>
                </p>

            </form>
        </div>
    </div>
</div>
    )
}
export default Login;