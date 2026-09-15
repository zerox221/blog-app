import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "@/Store/User.slice";

const Verify = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const {email} = useSelector((state) => state.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  async function verifyHandler(data) {
    console.log("function calling ... ");
    console.log(data);
    data.email = email;
    try {
      const response = await api.post("/api/v1/auth/verify", data);
      console.log(response.data.user);
      if(response.data.success){
        console.log("navigating to dashboard");
        dispatch(setUser(response.data.user));
        navigate("/dashboard")
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit(verifyHandler)}
      className="min-h-60  py-3  w-full md:w-90 border border-[#DEDBD3] rounded-md"
    >
      <div className="h-10 w-full border-b flex items-center px-3 border-[#DEDBD3] md:px-4 ">
        <h2 className="text-xl font-semibold font-sans ">Consise</h2>
      </div>
      <div className="mt-5 px-3 flex flex-col gap-6 md:px-4">
        <div className="flex flex-col leading-5">
          <h2 className="text-xl font-extralight">Verify Email</h2>
          <span className="text-xs text-[#706C63]">
            Enter the 6-digit code we sent to{" "}
            <span className="text-black">jordan@gmail.com</span>.
          </span>
        </div>
        <div className="flex justify-center ">
          <InputOTP {...register("otp")} maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && (
          <div className="w-full ">
            <span className="text-xs text-red-600">Invalid otp</span>
          </div>
        )}
        <div>
          <Button type="submit" className="w-full  rounded-none">
            Verify
          </Button>
        </div>
        <div className="w-full flex gap-2 flex-col items-center  justify-center">
          <span className="text-[#706C63] text-xs">
            Didn't get a code? <span className="text-black">Resend</span>
          </span>
          <NavLink className="text-black underline text-xs" to={"/login"}>
            go to login
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default Verify;
