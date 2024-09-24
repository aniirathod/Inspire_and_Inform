import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../slice/authSlice";
import { Btn, Input } from "./index";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const seassion = await authservice.login(data);
      if (seassion) {
        const userData = await authservice.getUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //tagline
  const tagLine = [
    "Inspiring Stories",
    "Growing Together",
    "Empowering Knowledge",
  ];
  //end tagline
  const endTagline = [
    "Welcome back!",
    "Join our community of thinkers, creators, & learners.",
    "Log in to share your insights and be inspired by others.",
  ];

  return (
    <>
      <div className="flex flex-col justify-between w-11/12 mx-auto lg:flex-row ">
        <div className="w-full mt-20 text-5xl font-bold tracking-tight uppercase lg:w-1/2 pt-14 bg font-markazi text-start xs:mt-24 lg:py-28">
          {tagLine.map((tags, index) => (
            <div
              key={index}
              className={`${index == 1 && "pl-24 text-5xl"} ${
                index == 2 && "text-5xl"
              } py-2 relative hidden lg:block`}
            >
              {index == 1 && (
                <div className="absolute left-0 w-24 h-10 bg-gray-600 top-3"></div>
              )}
              {tags}
            </div>
          ))}
          <div className="text-base font-normal tracking-tight border-b border-gray-600 xs:text-lg lg:tracking-wide lg:font-semibold lg:text-xl font-poppins lg:pt-14 lg:border-0">
            {endTagline.map((tags, index) => (
              <div
                key={index}
                className={`py-1 ${index == 1 && "hidden lg:block text-lg"} ${
                  index == 2 && "text-base  lg:text-lg"
                }`}
              >
                {tags}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full pt-10 lg:w-1/2 lg:mt-28 ">
          <div className={` w-full `}>
            <div className="mx-auto lg:w-8/12 ">
              <h2 className="text-xl font-bold leading-tight tracking-wide lg:text-2xl ">
                Sign in to Inspire Inform
              </h2>

              <form onSubmit={handleSubmit(login)} className="mt-10 lg:mt-16">
                <div className="font-semibold space-y-7 lg:space-y-12">
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    textColor="text-black"
                    labelClassName="text-lg lg:text-xl"
                    classname="p-4 py-3 text-lg font-normal border rounded-2xl border-gray-400/40 focus:border-0 focus:outline-none focus:ring focus:ring-pink-400/30"
                    {...register("email", {
                      required: true,
                      validate: {
                        matchPattern: () =>
                          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g ||
                          "Enter valid email address",
                      },
                    })}
                  />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    label="Password"
                    labelClassName="text-lg lg:text-xl"
                    classname="p-4 py-3 text-lg font-normal border rounded-2xl border-gray-400/40 focus:border-0 focus:outline-none focus:ring focus:ring-pink-400/30"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <div className="">
                    <Btn
                      type="submit"
                      classname="w-full py-3 transition-all duration-200 rounded-full mt-9 hover:bg-blueish/80"
                      bgColor="bg-blueish"
                    >
                      Sign In
                    </Btn>
                  </div>
                </div>
              </form>
              <p className="mt-5 text-base text-center text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                  to="/signup"
                  className="font-medium transition-all duration-200 "
                >
                  Sign Up
                </Link>
              </p>
              {error && (
                <p className="mt-8 text-center text-red-600">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
