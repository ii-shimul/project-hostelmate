import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Headroom from "react-headroom";

const MainLayout = () => {
  return (
    <div>
      <Headroom className="z-50">
        <NavBar />
      </Headroom>
      <div className="min-h-[calc(100vh-608px)] mt-3">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
