import { BrowserRouter, Routes, Route, } from "react-router-dom"
import DashBoard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import UserPage from "./pages/UserPage"
import Reports from "./pages/Reports"
import ProviderContext from "./components/AuthContext"


function App() {

  return (
    <BrowserRouter>
        <ProviderContext>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="userpage" element={<UserPage />} />
        <Route path="reports" element={<Reports />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route path="/protected" element={<ProtectedRoute/>}/>
      </Routes>
        </ProviderContext>
    </BrowserRouter>
  )
}

export default App
