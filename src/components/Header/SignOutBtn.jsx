import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const SignOutBtn = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();

  const handleLogout = () => {
    authservice.logout().then(() => {
      dipatch(logout());
      navigate("/");
    });
  };
  return (
    <>
      <div onClick={handleLogout} className=" cursor-pointer">
        Logout
      </div>
    </>
  );
};

export default SignOutBtn;
