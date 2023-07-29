import React from "react";
import Logo from "../assets/images/logo.png";
import LoginForm from "../components/LoginPage/LoginForm";
import Searchbuttons from "../components/LoginPage/Searchbuttons";

function LoginPage() {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center mb-8">
        <img src={Logo} className="h-9" alt="Mallang_Trip_Logo" />
      </div>
      <LoginForm />
      <Searchbuttons />
    </div>
  );
}

export default LoginPage;
