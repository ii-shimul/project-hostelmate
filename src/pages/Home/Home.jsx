import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Meals from "./Meals";
import Membership from "./Membership";
import Features from "./Features";
import FAQ from "./FAQ";
import Stats from "./Stats";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";
import { motion } from "framer-motion";

const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const sectionItem = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      <Helmet>
        <title>Home | HostelMate</title>
      </Helmet>
      <motion.section variants={sectionItem}>
        <Banner />
      </motion.section>
      <motion.section variants={sectionItem}>
        <Meals />
      </motion.section>
      <motion.section variants={sectionItem}>
        <Features/>
      </motion.section>
      <motion.section variants={sectionItem}>
        <Stats/>
      </motion.section>
      <motion.section variants={sectionItem}>
        <Membership/>
      </motion.section>
      <motion.section variants={sectionItem}>
        <Testimonials/>
      </motion.section>
      <motion.section variants={sectionItem}>
        <Newsletter/>
      </motion.section>
      <motion.section variants={sectionItem}>
        <FAQ/>
      </motion.section>
    </motion.div>
  );
};

export default Home;
