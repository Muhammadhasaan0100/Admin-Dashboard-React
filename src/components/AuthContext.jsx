import { createContext, useState } from "react";

export const AuthContext = createContext();

function ProviderContext({ children }) {

  const [loginedIn, setLoagin] = useState(
    localStorage.getItem("loginedIn") === "true"
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // 🔐 LOGIN FUNCTION (CHECKING ADDED)
  function login(email, password) {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      return false; // koi user hi register nahi
    }

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loginedIn", "true");
      setUser(storedUser);
      setLoagin(true);
      return true; // login success
    } 
    else {
      return false; // wrong credentials
    }
  }

  // 📝 REGISTER FUNCTION
  function register(userData){
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginedIn", "true");
    setUser(userData);
    setLoagin(true);
  }

  function logOut(){
    localStorage.removeItem("loginedIn");
    setUser(null);
    setLoagin(false);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ loginedIn, user, login, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default ProviderContext;
