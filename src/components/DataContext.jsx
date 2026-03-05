import { createContext, useState } from "react";

export const DataContext = createContext();

function DataProvider({ children }) {

  // 👥 USERS
  const [users, setUsers] = useState([
    { id: 1, name: "Ali", email: "ali@email.com", status: "Active" },
    { id: 2, name: "Sara", email: "sara@email.com", status: "Active" },
    { id: 3, name: "Hamza", email: "hamza@email.com", status: "Inactive" },
  ]);

  // 📊 REPORTS
  const [reports, setReports] = useState([
    { id: 1, date: "01 Jan 2026", orders: 120, revenue: 2340, status: "Completed" },
    { id: 2, date: "05 Jan 2026", orders: 98, revenue: 1820, status: "Completed" },
    { id: 3, date: "10 Jan 2026", orders: 76, revenue: 1120, status: "Pending" },
  ]);

  // 🗑 DELETE USER
  function deleteUser(id) {
    setUsers(users.filter(user => user.id !== id));
  }

  // ✏ EDIT USER
  function editUser(id, updatedUser) {
    setUsers(users.map(user =>
      user.id === id ? { ...user, ...updatedUser } : user
    ));
  }

  return (
    <DataContext.Provider value={{ users, reports, deleteUser, editUser }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
