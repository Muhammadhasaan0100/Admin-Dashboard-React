import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Reports() {
    function handleLogout() {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login";
    }

    const [reports, setReports] = useState(() => {
        const savedReports = localStorage.getItem("reports");
        return savedReports ? JSON.parse(savedReports) : [
            { id: 1, date: "2026-01-01", orders: 120, revenue: 2340, status: "Completed" },
            { id: 2, date: "2026-01-05", orders: 98, revenue: 1820, status: "Completed" },
            { id: 3, date: "2026-01-10", orders: 76, revenue: 1120, status: "Pending" },
        ];
    });

    const [filteredReports, setFilteredReports] = useState(reports);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [showAddForm, setShowAddForm] = useState(false);
    const [newReport, setNewReport] = useState({ date: '', orders: '', revenue: '', status: 'Completed' });
    const [editingId, setEditingId] = useState(null);
    const [editReport, setEditReport] = useState({ date: '', orders: '', revenue: '', status: '' });

    // Save reports to localStorage whenever reports change
    useEffect(() => {
        localStorage.setItem("reports", JSON.stringify(reports));
    }, [reports]);

    // Update filteredReports when reports change
    useEffect(() => {
        setFilteredReports(reports);
    }, [reports]);

    // Total Sales, New Orders aur Pending nikalna
    const totalSales = reports.reduce((sum, report) => {
        const revenue = typeof report.revenue === 'string'
            ? parseFloat(report.revenue.replace(/[$,]/g, '')) || 0
            : report.revenue;
        return sum + revenue;
    }, 0);

    const newOrders = reports.reduce((sum, report) => {
        const orders = typeof report.orders === 'string' ? parseInt(report.orders) || 0 : report.orders;
        return sum + orders;
    }, 0);

    const pending = reports.filter(report => report.status === "Pending").length;


    const deleteReport = (id) => {
        setReports(reports.filter(report => report.id !== id));
    };

    const handleAddReport = () => {
        if (newReport.date && newReport.orders && newReport.revenue) {
            const parsedRevenue = parseFloat(newReport.revenue.replace(/[$,]/g, '')) || 0;
            const newId = reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1;
            setReports([...reports, { id: newId, orders: parseInt(newReport.orders) || 0, revenue: parsedRevenue, ...newReport }]);
            setNewReport({ date: '', orders: '', revenue: '', status: 'Completed' });
            setShowAddForm(false);
        }
    };

    const handleEdit = (report) => {
        setEditingId(report.id);
        setEditReport({ date: report.date, orders: report.orders, revenue: `$${report.revenue}`, status: report.status });
    };

    const handleUpdate = () => {
        const parsedRevenue = parseFloat(editReport.revenue.replace(/[$,]/g, '')) || 0;
        setReports(reports.map(report =>
            report.id === editingId ? { ...report, orders: parseInt(editReport.orders) || 0, revenue: parsedRevenue, ...editReport } : report
        ));
        setEditingId(null);
        setEditReport({ date: '', orders: '', revenue: '', status: '' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditReport({ date: '', orders: '', revenue: '', status: '' });
    };

    const handleGenerate = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const filtered = reports.filter(report => {
                const reportDate = new Date(report.date);
                return reportDate >= start && reportDate <= end;
            });
            setFilteredReports(filtered);
        } else {
            setFilteredReports(reports);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <main className="flex-1 p-8">
                {/* Header */}
                <Header
                    title="Reports"
                    subtitle="Manage all registered users"
                />

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                        [transform:perspective(1200px)_rotateX(6deg)_rotateY(-6deg)]">
                        <h3 className="text-lg text-white/80">Total Sales</h3>
                        <p className="text-4xl font-bold text-blue-400 mt-2">${totalSales.toLocaleString()}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                        [transform:perspective(1200px)_rotateX(6deg)_rotateY(-6deg)]">
                        <h3 className="text-lg text-white/80">New Orders</h3>
                        <p className="text-4xl font-bold text-purple-400 mt-2">{newOrders.toLocaleString()}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                        [transform:perspective(1200px)_rotateX(6deg)_rotateY(-6deg)]">
                        <h3 className="text-lg text-white/80">Pending</h3>
                        <p className="text-4xl font-bold text-pink-400 mt-2">{pending}</p>
                    </div>
                </div>

                {/* Filters / Controls */}
                <div className="mb-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                    shadow-[0_15px_50px_rgba(0,0,0,0.5)]
                    [transform:perspective(1200px)_rotateX(4deg)]">
                    <h2 className="text-lg font-semibold text-white mb-4">Filter Reports</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white outline-none"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white outline-none"
                        />
                        <button
                            onClick={handleGenerate}
                            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500
                            text-white font-semibold shadow-lg hover:scale-105 transition">
                            Generate
                        </button>
                    </div>
                </div>

                {/* Add Report Button */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500
                        text-white font-semibold shadow-lg hover:scale-105 transition">
                        + Add New Report
                    </button>
                </div>

                {/* Add Report Form */}
                {showAddForm && (
                    <div className="mb-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                        shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
                        <h3 className="text-lg font-semibold text-white mb-4">Add New Report</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <input
                                type="date"
                                value={newReport.date}
                                onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
                                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                            />
                            <input
                                type="number"
                                placeholder="Orders"
                                value={newReport.orders}
                                onChange={(e) => setNewReport({ ...newReport, orders: e.target.value })}
                                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
                            />
                            <input
                                type="text"
                                placeholder="Revenue (e.g., $1,000 or 1)"
                                value={newReport.revenue}
                                onChange={(e) => setNewReport({ ...newReport, revenue: e.target.value })}
                                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
                            />
                            <select
                                value={newReport.status}
                                onChange={(e) => setNewReport({ ...newReport, status: e.target.value })}
                                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                            >
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddReport}
                                className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                                Add Report
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="px-6 py-2 rounded-xl bg-gray-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Reports Table */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                    shadow-[0_25px_80px_rgba(0,0,0,0.6)]
                    [transform:perspective(1200px)_rotateX(4deg)]">
                    <h2 className="text-xl font-semibold text-white mb-4">Monthly Report</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-white/80 text-sm md:text-base">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="py-3 text-left">Date</th>
                                    <th className="py-3 text-left">Orders</th>
                                    <th className="py-3 text-left">Revenue</th>
                                    <th className="py-3 text-left">Status</th>
                                    <th className="py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.map((report) => (
                                    <tr key={report.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                        {editingId === report.id ? (
                                            <>
                                                <td className="py-3">
                                                    <input
                                                        type="date"
                                                        value={editReport.date}
                                                        onChange={(e) => setEditReport({ ...editReport, date: e.target.value })}
                                                        className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white w-full"
                                                    />
                                                </td>
                                                <td className="py-3">
                                                    <input
                                                        type="number"
                                                        value={editReport.orders}
                                                        onChange={(e) => setEditReport({ ...editReport, orders: e.target.value })}
                                                        className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white w-full"
                                                    />
                                                </td>
                                                <td className="py-3">
                                                    <input
                                                        type="text"
                                                        value={editReport.revenue}
                                                        onChange={(e) => setEditReport({ ...editReport, revenue: e.target.value })}
                                                        className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white w-full"
                                                    />
                                                </td>
                                                <td className="py-3">
                                                    <select
                                                        value={editReport.status}
                                                        onChange={(e) => setEditReport({ ...editReport, status: e.target.value })}
                                                        className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white w-full"
                                                    >
                                                        <option value="Completed">Completed</option>
                                                        <option value="Pending">Pending</option>
                                                    </select>
                                                </td>
                                                <td className="py-3 flex gap-3">
                                                    <button
                                                        onClick={handleUpdate}
                                                        className="px-4 py-1 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/40 transition">
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="px-4 py-1 rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/40 transition">
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="py-3">{formatDate(report.date)}</td>
                                                <td className="py-3">{report.orders}</td>
                                                <td className="py-3">${report.revenue.toLocaleString()}</td>
                                                <td className={`py-3 ${report.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>
                                                    {report.status}
                                                </td>
                                                <td className="py-3 flex gap-3">
                                                    <button
                                                        onClick={() => handleEdit(report)}
                                                        className="px-4 py-1 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition">
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteReport(report.id)}
                                                        className="px-4 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition">
                                                        Delete
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Reports;