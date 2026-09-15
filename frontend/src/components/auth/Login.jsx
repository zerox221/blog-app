import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logInSchema } from "@/Schema/AuthSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/Store/User.slice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(logInSchema),
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state)=> state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  async function logInHnadler(data) {
    if (loading) {
      return;
    }
    console.log(data);
    try {
      setLoading(true);
      const response = await api.post("/api/v1/auth/login", data);
      console.log(response.data.message);
      dispatch(setUser(response.data.user));
      navigate("/dashboard");
      console.log(user);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(logInHnadler)}
      className="min-h-80 py-3  w-full md:w-90 border border-[#DEDBD3] rounded-md"
    >
      <div className="h-10 w-full border-b flex items-center px-3 border-[#DEDBD3] md:px-4 ">
        <h2 className="text-xl font-semibold font-sans ">Consise</h2>
      </div>
      <div className="mt-5 px-3 flex flex-col gap-4 md:px-4">
        <div className="flex flex-col leading-5">
          <h2 className="text-xl font-extralight">Welcome Back</h2>
          <span className="text-[10px] text-[#706C63]">
            Sign in to write,read, and pick up where you left off.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {/* email */}
          <div className="flex flex-col gap-1">
            <label className="text-[#706C63] text-sm" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full p-2 border px-3 border-[#B9B5AA] placeholder:text-[#9b9992]"
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <span className="text-xs text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-[#706C63] text-sm">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full p-2 px-2 border border-[#B9B5AA] placeholder:text-[#9b9992]"
              placeholder="password"
            />
            {errors.password && (
              <span className="text-xs text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        {error && <div className="text-xs text-red-600">{error}</div>}
        <div className="w-full flex justify-end">
          <span className="text-[10px]  underline text-[#706C63]">
            FORGOT PASSWORD
          </span>
        </div>
        <div>
          <Button type="submit" className="w-full  rounded-none">
            Sign in
          </Button>
        </div>
        <div className="flex justify-center">
          <span className="text-[10px] md:text-xs text-[#706C63] text-wrap ">
            New to Consise?{" "}
            <NavLink to={"/signup"} className="text-black">
              Create an account
            </NavLink>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
