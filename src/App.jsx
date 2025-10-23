import { useState } from "react";
import Home from "./components/Home";
import AuthContext from "./AuthContext";
import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Auths from "./components/Auth";
import "./styles/reset.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState(null);

  const login = (email) => {
    console.log(email);
    setIsLoggedIn(true);
    setEmail(email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail(null);
  };

  return (
    <AuthContext value={{ isLoggedIn, email, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<Auths />}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="log-in" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
