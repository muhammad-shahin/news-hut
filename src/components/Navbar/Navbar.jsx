import { NavLink } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";
import "./Navbar.css";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="bg-sky-100">
      <nav className="py-3 container mx-auto flex justify-between items-center w-[90%] lg:w-auto">
        {/* log */}
        <div>
          <h1 className="text-[2.5rem] font-bold text-sky-600">News Hut</h1>
        </div>
        {/* nav items */}
        <ul
          className={` lg:static fixed top-[85px] ${
            isOpen ? "right-0" : "right-[-100%]"
          } lg:h-auto h-screen lg:w-auto w-[50%] flex lg:flex-row flex-col lg:bg-none bg-sky-100 lg:p-0 p-4 justify-start lg:justify-center items-center lg:gap-10 gap-8 duration-700 pt-10 lg:pt-0`}
        >
          <li
            className="text-sky-600 font-medium text-[16px] hover:scale-[1.1] duration-500"
            onClick={() => {
              setOpen(false);
            }}
          >
            <NavLink to="/">Home</NavLink>
          </li>
          <li
            className="text-sky-600 font-medium text-[16px] hover:scale-[1.1] duration-500"
            onClick={() => {
              setOpen(false);
            }}
          >
            <NavLink to="/news-category">News Category</NavLink>
          </li>
          <li
            className="text-sky-600 font-medium text-[16px] hover:scale-[1.1] duration-500"
            onClick={() => {
              setOpen(false);
            }}
          >
            <NavLink to="/login">Login</NavLink>
          </li>
          <li
            className="text-sky-600 font-medium text-[16px] hover:scale-[1.1] duration-500"
            onClick={() => {
              setOpen(false);
            }}
          >
            <NavLink to="/sign-up">Sign Up</NavLink>
          </li>
        </ul>

        {/* hamburger menu */}
        <div className="lg:hidden flex justify-center items-center gap-6">
          <BsPersonCircle className="w-[32px] h-[32px] text-sky-600 cursor-pointer" />
          <Hamburger color="#0284C7" toggled={isOpen} toggle={setOpen} />
          {/* Profile Icon */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
