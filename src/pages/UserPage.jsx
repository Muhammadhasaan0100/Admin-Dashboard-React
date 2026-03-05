import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function UserPage() {

    function handleLogout() {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login";
    }

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem("users");
        return savedUsers ? JSON.parse(savedUsers) : [
            { id: 1, name: "Ali", email: "ali@email.com", status: "Active" },
            { id: 2, name: "Sara", email: "sara@email.com", status: "Active" },
            { id: 3, name: "Hamza", email: "hamza@email.com", status: "Inactive" },
        ];
    });

    // Save users to localStorage whenever users change
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', status: 'Active' });
    const [editingId, setEditingId] = useState(null);
    const [editUser, setEditUser] = useState({ name: '', email: '', status: '' });

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleAddUser = () => {
        if (newUser.name && newUser.email) {
            const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            setUsers([...users, { id: newId, ...newUser }]);
            setNewUser({ name: '', email: '', status: 'Active' });
            setShowAddForm(false);
        }
    };

    const handleEdit = (user) => {
        setEditingId(user.id);
        setEditUser({ name: user.name, email: user.email, status: user.status });
    };

    const handleUpdate = () => {
        setUsers(users.map(user => 
            user.id === editingId ? { ...user, ...editUser } : user
        ));
        setEditingId(null);
        setEditUser({ name: '', email: '', status: '' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditUser({ name: '', email: '', status: '' });
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <main className="flex-1 p-8">

                {/* Header */}
                <Header 
                title="Users Management"
                subtitle="Manage all registered users"
                />
  

                {/* Add User Button */}
                <div className="mb-6">
                    <button 
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500
                        text-white font-semibold shadow-lg hover:scale-105 transition">
                        + Add New User
                    </button>
                </div>

                {/* Add User Form */}
                {showAddForm && (
                    <div className="mb-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                        shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
                        <h3 className="text-lg font-semibold text-white mb-4">Add New User</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
                            />
                            <select
                                value={newUser.status}
                                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={handleAddUser}
                                className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                                Add User
                            </button>
                            <button 
                                onClick={() => setShowAddForm(false)}
                                className="px-6 py-2 rounded-xl bg-gray-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Users Table */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6
                    shadow-[0_25px_80px_rgba(0,0,0,0.6)]
                    [transform:perspective(1200px)_rotateX(4deg)]">

                    <h2 className="text-xl font-semibold text-white mb-4">All Users</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-white/80 text-sm md:text-base">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="py-3 text-left">Name</th>
                                    <th className="py-3 text-left">Email</th>
                                    <th className="py-3 text-left">Status</th>
                                    <th className="py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                        {editingId === user.id ? (
                                            <>
                                                <td className="py-3">
                                                    <input
                                                        type="text"
                                                        value={editUser.name}
                                                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                                        className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white w-full"
                                                    />
                                                </td>
                                                <td className="py-3">
                                                    <input
                                                        type="email"
                                                        value={editUser.email}
                                                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                                        className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white w-full"
                                                    />
                                                </td>
                                                <td className="py-3">
                                                    <select
                                                        value={editUser.status}
                                                        onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                                                        className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white w-full"
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
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
                                                <td className="py-3">{user.name}</td>
                                                <td className="py-3">{user.email}</td>
                                                <td className={`py-3 ${user.status === "Active" ? "text-green-400" : "text-red-400"}`}>
                                                    {user.status}
                                                </td>
                                                <td className="py-3 flex gap-3">
                                                    <button 
                                                        onClick={() => handleEdit(user)}
                                                        className="px-4 py-1 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition">
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteUser(user.id)}
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

export default UserPage;