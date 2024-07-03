import React from "react";
import RegisterForm from "../../Components/Forms/RegisterForm";
import Banner from "../../Components/Banner/Banner";

const RegisterPage = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Banner />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
