import React from "react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/Schema/AuthSchema";
import api from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "@/Store/EmailSlice";

const Signup = () => {

  const email = useSelector((state)=> state.email.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  async function signupHandler(data) {
    console.log("calling...");
    console.log(data);
    try {
      const response = await api.post("/api/v1/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(response.data.success);
      if(response.data.success){
        dispatch(setEmail(data.email))
        navigate("/verify");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(signupHandler)}
      className="min-h-80 py-3  w-full md:w-110 border border-[#DEDBD3] rounded-md"
    >
      <div className="h-10 w-full border-b flex items-center px-3 border-[#DEDBD3] md:px-4 ">
        <h2 className="text-xl font-semibold font-sans ">Consise</h2>
      </div>
      <div className="mt-5 px-3 flex flex-col gap-4 md:px-4">
        <div className="flex flex-col leading-5">
          <h2 className="text-xl font-extralight">Create your account</h2>
          <span className="text-[10px] text-[#706C63]">
            join us to create blogs and learn.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {/* name */}
          <div className="flex flex-col gap-1">
            <label className="text-[#706C63] text-sm" htmlFor="name">
              Name
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              className="w-full p-2 border px-3 border-[#B9B5AA] placeholder:text-[#9b9992]"
              placeholder="alex cary"
            />
            {errors.name && (
              <span className="text-xs text-red-600 ">
                {errors.name.message}
              </span>
            )}
          </div>

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
              <span className="text-xs text-red-600 ">
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
              <span className="text-xs text-red-600 ">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* confirm password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-[#706C63] text-sm">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              className="w-full p-2 px-2 border border-[#B9B5AA] placeholder:text-[#9b9992]"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-600 ">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <Button type="submit" className="w-full  rounded-none">
            Create account
          </Button>
        </div>
        <div className="flex justify-center">
          <span className="text-[10px] md:text-xs text-[#706C63] text-wrap ">
            Already have an account?{" "}
            <NavLink to={"/login"} className="text-black underline">
              Sign in
            </NavLink>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Signup;
