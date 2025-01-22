import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Headroom from "react-headroom";


const MainLayout = () => {
  return (
    <div className="">
      <Headroom className="z-50">
        <NavBar />
      </Headroom>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;
