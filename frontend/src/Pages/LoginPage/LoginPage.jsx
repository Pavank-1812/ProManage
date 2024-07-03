import React from "react";
import Banner from "../../Components/Banner/Banner";
import LoginForm from "../../Components/Forms/LoginForm";

const LoginPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Banner />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
