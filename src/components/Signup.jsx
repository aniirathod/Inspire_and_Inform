import React, { useState } from "react";
import authservice from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Input, Btn } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../slice/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const Signup = async (data) => {
    setError("");
    try {
      const userData = await authservice.createAccount(data);

      if (userData) {
        const userData = await authservice.getUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
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
    "Join Us Today!",
    "Become part of community that shares,learns & grows together.",
    "Sign up to inspire and be empowered by the knowledge around you.",
  ];
  return (
    <div className="flex flex-col justify-between w-11/12 m-auto lg:flex-row ">
      <div className="w-full mt-5 text-5xl font-bold tracking-tight uppercase lg:w-1/2 font-markazi text-start pt-14 xs:mt-10 lg:mt-28 lg:py-28">
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
        <div className="text-base font-normal tracking-tight border-b border-gray-600 font-poppins pt-14 xs:text-lg lg:tracking-wide lg:font-semibold lg:text-xl lg:pt-14 lg:border-0">
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
        <div className={` lg:w-2/3 mx-auto`}>
          <h2 className="text-xl font-bold leading-tight tracking-wide lg:text-2xl">
            Create Account to Inspire Inform
          </h2>

          <form onSubmit={handleSubmit(Signup)} className="mt-10 lg:mt-9">
            <div className="space-y-8 font-semibold lg:space-y-10">
              <Input
                label="Full Name"
                placeholder="Enter your Name"
                labelClassName="text-lg lg:text-xl"
                classname="p-4 py-3 text-lg font-normal border rounded-2xl border-gray-400/40 focus:border-0 focus:outline-none focus:ring focus:ring-pink-400/30"
                {...register("name", { required: true })}
              />
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
              <Btn
                type="submit"
                classname="w-full py-3 transition-all duration-200 rounded-full hover:bg-blueish/80 "
                bgColor="bg-blueish"
              >
                Create Account
              </Btn>
            </div>
          </form>
          <p className="mt-2 text-base text-center text-black/60">
            Already have any account?&nbsp;
            <Link
              to="/login"
              className="font-medium transition-all duration-200 "
            >
              Login
            </Link>
          </p>
          {error && <p className="mt-8 text-center text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
