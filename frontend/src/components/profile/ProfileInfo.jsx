import React from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileInfo = ({ privateArticles, publicArticles, totalArticles ,rating}) => {
    const {user} = useSelector((state)=> state.user)
    const navigate = useNavigate();
  const information = [
    {
      name: "Articles",
      count: totalArticles,
    },
    {
      name: "Private",
      count: privateArticles?.length || 0,
    },
    {
      name: "Public",
      count: publicArticles?.length || 0,
    },
    {
      name: "Rating",
      count: rating || 3.4,
    },
  ];
  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 py-2">
      <div className="flex gap-2 items-center md:justify-between">
        <div className="flex gap-2 items-center ">
          <div className="h-15 shrink-0 w-15 md:h-25 md:w-25 rounded-md overflow-hidden bg-gray-200">
            <img
              className="h-full w-full object-cover"
              src={user?.profile?.url || `https://api.dicebear.com/10.x/initials/svg?initialsVariant=alt&lettersVariant=single:1&backgroundColor=000000&seed=balam`}
              alt="profile"
            />
          </div>
          <div className="text-sm leading-4 ">
            <h2 className="text-xl font-semibold md:text-2xl">{user?.name}</h2>
            <span className="text-[#706C63]">
              Senior system developer and writer
            </span>
          </div>
        </div>
        <div className="gap hidden md:flex gap-3">
          <Button className="rounded-none" variant="outline">
            Edit Profile
          </Button>
          <Button 
             onClick={()=> navigate("/dashboard/create/article")}
          className="rounded-none">New Article</Button>
        </div>
      </div>

      <div className=" flex justify-between flex-wrap bg-white py-2 border-[#DEDBD3] ">
        {information.map((info, idx) => {
          return (
            <div
              key={idx}
              className={`flex text-xs flex-col items-center ${idx + 1 < 4 ? "border-r" : ""}  border-[#F6F5F1]  w-[25%]`}
            >
              <span className="font-semibold text-sm md:text-xl">
                {info.count}
              </span>
              <span className="uppercase font-medium">{info.name}</span>
            </div>
          );
        })}
      </div>
      <div className="flex md:hidden w-full">
        <Button
           onClick={()=> navigate("/dashboard/create/article")}
        className='w-full rounded-none py-5'>+ Write an Article</Button>
      </div>
    </div>
  );
};
export default ProfileInfo;
