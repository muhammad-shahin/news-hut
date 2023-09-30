import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Root = () => {
  return (
    <main>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </main>
  );
};

export default Root;
