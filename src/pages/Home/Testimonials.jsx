import SectionTitle from "../../components/SectionTitle";
import { motion } from "framer-motion";

const Testimonials = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };
  return (
    <div className="mb-20 mt-6 max-w-6xl max-md:max-w-md mx-auto">
      <div className="md:mb-28 mb-12 text-center">
        <SectionTitle title="Hear from our happy clients"></SectionTitle>
      </div>
      <motion.div
        className="grid md:grid-cols-3 gap-6 relative"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="bg-gradient-to-tr from-[#caf0f8] via-[#ade8f4] to-[#90e0ef] max-w-[65%] h-[145%] w-full -top-16 left-0 right-0 mx-auto rounded-3xl absolute max-md:hidden" />
        <motion.div className="h-auto p-6 rounded-2xl mx-auto bg-white dark:bg-gray-700 relative max-md:shadow-md" variants={item} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
          <div>
            <img
              src="https://readymadeui.com/profile_2.webp"
              className="w-10 h-10 rounded-full"
            />
            <h4 className="text-gray-800 dark:text-gray-100 text-sm whitespace-nowrap font-bold mt-3">
              John Doe
            </h4>
            <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">Founder of Rubik</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-800 dark:text-gray-100 text-sm leading-relaxed">
              The service was amazing. I never had to wait that long for my
              food. The staff was friendly and attentive, and the delivery was
              impressively prompt.
            </p>
          </div>
        </motion.div>
        <motion.div className="h-auto p-6 rounded-2xl mx-auto bg-white dark:bg-gray-700 relative max-md:shadow-md" variants={item} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
          <div>
            <img
              src="https://readymadeui.com/profile_3.webp"
              className="w-10 h-10 rounded-full"
            />
            <h4 className="text-gray-800 dark:text-gray-100 text-sm whitespace-nowrap font-bold mt-3">
              Mark Adair
            </h4>
            <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">Founder of Alpha</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-800 dark:text-gray-100 text-sm leading-relaxed">
              The service was amazing. I never had to wait that long for my
              food. The staff was friendly and attentive, and the delivery was
              impressively prompt.
            </p>
          </div>
        </motion.div>
        <motion.div className="h-auto p-6 rounded-2xl mx-auto bg-white dark:bg-gray-700 relative max-md:shadow-md" variants={item} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
          <div>
            <img
              src="https://readymadeui.com/profile_4.webp"
              className="w-10 h-10 rounded-full"
            />
            <h4 className="text-gray-800 dark:text-gray-100 text-sm whitespace-nowrap font-bold mt-3">
              Simon Konecki
            </h4>
            <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">Founder of Labar</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-800 dark:text-gray-100 text-sm leading-relaxed">
              The service was amazing. I never had to wait that long for my
              food. The staff was friendly and attentive, and the delivery was
              impressively prompt.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Testimonials;
