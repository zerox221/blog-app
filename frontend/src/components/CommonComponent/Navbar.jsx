import {
  CircleUserRound,
  Home,
  Menu,
  Settings,
  Shapes,
  SquareText,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const links = [
    {
      link: "/dashboard",
      name: "Home",
      icon: Home,
    },
    {
      link: "explore/article",
      name: "Article",
      icon: SquareText,
    },
    {
      link: "/dashboard/profile",
      name: "Profile",
      icon: CircleUserRound,
    },
    {
      link: "/settings",
      name: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="h-15 relative w-full justify-between flex items-center md:px-4 px-2 border-b border-[#DEDBD3]">
      <div>
        <h2 className="text-xl">Consise</h2>
      </div>
      <div className="hidden md:flex  md:gap-5">
        <NavLink
          to="/dashboard"
          className="flex gap-2 items-center text-xs text-[#706C63] hover:bg-gray-300 p-2 rounded-md"
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard/explore/article"
          className="flex gap-2 items-center text-xs text-[#706C63] hover:bg-gray-300 p-2 rounded-md"
        >
          Articles
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          className="flex gap-2 items-center text-xs text-[#706C63] hover:bg-gray-300 p-2 rounded-md"
        >
          Profile
        </NavLink>
        <NavLink
          to="/settings"
          className="flex gap-2 items-center text-xs text-[#706C63] hover:bg-gray-300 p-2 rounded-md"
        >
          Settings
        </NavLink>
      </div>
      <div className="md:hidden ">
        <Menu size={20} onClick={() => setShow(!show)} />
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{
              x: 300,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: 300,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="h-screen absolute top-0 right-0 w-[60%] z-100 bg-white border border-[#F6F5F1] flex flex-col gap-2"
          >
            <div className="flex justify-end items-center py-4 px-2 ">
              <X onClick={() => setShow(!show)} />
            </div>
            <div className="flex flex-col gap-5 px-6 font-semibold py-5">
              {links.map((ele, idx) => {
                return (
                  <NavLink
                    key={idx}
                    to={ele.link}
                    onClick={() => setShow(!show)}
                    className="flex gap-2 p-2 items-center text-xs text-[#706C63] hover:bg-gray-300"
                  >
                    <ele.icon size={18} />
                    <span className="uppercase">{ele.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
