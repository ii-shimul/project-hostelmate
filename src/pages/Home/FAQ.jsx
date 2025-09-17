import SectionTitle from "../../components/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

const FAQ = () => {
  const faqs = useMemo(
    () => [
      {
        q: "How does this platform work?",
        a: "Our platform connects you with local cooks who share homemade meals. Simply browse, order, and enjoy!",
      },
      {
        q: "Is the food prepared safely?",
        a: "All cooks are vetted, and they follow strict hygiene standards to ensure safe and healthy meals.",
      },
      {
        q: "Can I customize my order?",
        a: "Yes, many meals come with customization options. Check the meal description for details.",
      },
      {
        q: "How do I pay for my order?",
        a: "You can pay securely online using our integrated payment system, including card options.",
      },
      {
        q: "What if I need to cancel my order?",
        a: "You can cancel your order before it's prepared. Refunds depend on the cancellation time.",
      },
      {
        q: "How can I contact the cook or support?",
        a: "Use our in-app messaging feature to contact cooks or reach our support team for assistance.",
      },
    ],
    []
  );

  const [openIndices, setOpenIndices] = useState([0]);
  const isOpen = (i) => openIndices.includes(i);
  const toggle = (i) => {
    setOpenIndices((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <motion.div
      className="divide-y rounded-lg max-w-5xl mx-auto px-4 mt-4 lg:mt-10 mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionTitle title="Frequently Asked Questions" />
      {faqs.map((item, i) => {
        const open = isOpen(i);
        const contentId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div className="accordion" role="accordion" key={i}>
            <button
              id={buttonId}
              aria-controls={contentId}
              aria-expanded={open}
              type="button"
              onClick={() => toggle(i)}
              className={
                `toggle-button w-full text-base outline-none text-left font-semibold py-6 flex items-center ` +
                (open ? "text-blue-600 hover:text-blue-600" : "text-gray-800 dark:text-gray-100 hover:text-blue-600")
              }
            >
              <span className="mr-4">{item.q}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 42 42"
                className="w-3 fill-current ml-auto shrink-0"
              >
                <path
                  className={open ? "hidden" : "block"}
                  d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                />
                <path d="M37.059 16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5h32.118C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="content overflow-hidden"
                >
                  <div className="pb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.div>
  );
};

export default FAQ;

