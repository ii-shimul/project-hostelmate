import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Headroom from "react-headroom";
import { motion } from "motion/react";

const MainLayout = () => {
  return (
    <div>
      <Headroom className="z-50">
        <NavBar />
      </Headroom>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.3 }}
        className="min-h-[calc(100vh-608px)] mt-3"
      >
        <Outlet />
      </motion.div>
      <Footer />
    </div>
  );
};

export default MainLayout;
