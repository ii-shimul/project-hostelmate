import SectionTitle from "../../components/SectionTitle";

const Testimonials = () => {
  return (
    <div className="mb-20 mt-6 max-w-6xl max-md:max-w-md mx-auto">
      <div className="md:mb-28 mb-12 text-center">
        <SectionTitle title="Hear from our happy clients"></SectionTitle>
      </div>
      <div className="grid md:grid-cols-3 gap-6 relative">
        <div className="bg-gradient-to-tr from-[#caf0f8] via-[#ade8f4] to-[#90e0ef] max-w-[65%] h-[145%] w-full -top-16 left-0 right-0 mx-auto rounded-3xl absolute max-md:hidden" />
        <div className="h-auto p-6 rounded-2xl mx-auto bg-white dark:bg-gray-700 relative max-md:shadow-md">
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
        </div>
        <div className="h-auto p-6 rounded-2xl mx-auto bg-white dark:bg-gray-700 relative max-md:shadow-md">
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
        </div>
        <div className="h-auto p-6 rounded-2xl mx-auto bg-white dark:bg-gray-700 relative max-md:shadow-md">
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
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
