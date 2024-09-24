import React, { useEffect, useState } from "react";
import { Header, Loading } from "./components/index";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth";
import { login, logout } from "./slice/authSlice";
import { Outlet } from "react-router-dom";

const App = () => {
  let [loading, setLoading] = useState(true);
  let dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="w-full min-h-screen bg-whitish font-poppins text-blueish">
      <Header />
      <Outlet />
    </div>
  ) : (
    <div className="w-full min-h-screen font-poppins">
      <Loading />
    </div>
  );
};

export default App;
