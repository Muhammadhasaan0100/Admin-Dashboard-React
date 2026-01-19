import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashBoard() {
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }

        const savedReports = localStorage.getItem("reports");
        if (savedReports) {
            setReports(JSON.parse(savedReports));
        }
    }, []);

    // Calculate totals
    const totalUsers = users.length;
    const totalRevenue = reports.reduce((sum, report) => {
    const revenue = typeof report.revenue === 'string' 
        ? parseFloat(report.revenue.replace(/[$,]/g, '')) || 0 
        : report.revenue;
    return sum + revenue;
}, 0);
    const totalOrders = reports.reduce((sum, report) => {
    const orders = typeof report.orders === 'string' ? parseInt(report.orders) || 0 : report.orders;
    return sum + orders;
}, 0);

    // Get recent users (last 3 for example)
    const recentUsers = users.slice(-3);

    return (
        <div className="min-h-screen bg-[#050816] text-white flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <main className="flex-1 p-8">
                {/* Header */}
                <Header 
                    title="Dashboard"
                    subtitle="Welcome back, Hasaan"
                />

                {/* Cards */}
                <div className="grid grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                        [transform:perspective(1200px)_rotateX(6deg)_rotateY(-6deg)]">
                        <h3 className="text-lg text-white/80">Total Users</h3>
                        <p className="text-4xl font-bold text-blue-400 mt-2">{totalUsers.toLocaleString()}</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                        [transform:perspective(1200px)_rotateX(6deg)_rotateY(-6deg)]">
                        <h3 className="text-lg text-white/80">Revenue</h3>
                        <p className="text-4xl font-bold text-purple-400 mt-2">${totalRevenue.toLocaleString()}</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                        [transform:perspective(1200px)_rotateX(6deg)_rotateY(-6deg)]">
                        <h3 className="text-lg text-white/80">Orders</h3>
                        <p className="text-4xl font-bold text-pink-400 mt-2">{totalOrders.toLocaleString()}</p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="mt-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                    shadow-[0_25px_80px_rgba(0,0,0,0.6)]
                    [transform:perspective(1200px)_rotateX(4deg)]">
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Users</h2>

                    <table className="w-full text-white/80">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="py-2 text-left">Name</th>
                                <th className="py-2 text-left">Email</th>
                                <th className="py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user) => (
                                <tr key={user.id} className="border-b border-white/10">
                                    <td className="py-2">{user.name}</td>
                                    <td className="py-2">{user.email}</td>
                                    <td className={`py-2 ${user.status === "Active" ? "text-green-400" : "text-red-400"}`}>
                                        {user.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default DashBoard;