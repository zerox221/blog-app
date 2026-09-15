import { Button } from "@base-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="h-screen w-full bg-violet-200">
      <Button onClick={()=> navigate("/login")} className="bg-green-700">click</Button>
    </div>
  );
};

export default LandingPage;
