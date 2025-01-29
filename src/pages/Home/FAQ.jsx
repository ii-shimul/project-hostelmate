document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion").forEach((elm) => {
    const button = elm.querySelector(".toggle-button");
    const content = elm.querySelector(".content");
    const plusIcon = button.querySelector(".plus");

    button.addEventListener("click", () => {
      const isHidden = content.classList.toggle("invisible");
      content.style.maxHeight = isHidden
        ? "0px"
        : `${content.scrollHeight + 100}px`;
      button.classList.toggle("text-blue-600", !isHidden);
      button.classList.toggle("text-gray-800", isHidden);
      content.classList.toggle("pb-6", !isHidden);
      plusIcon.classList.toggle("hidden", !isHidden);
      plusIcon.classList.toggle("block", isHidden);
    });
  });
});

const FAQ = () => {
  return (
    <div className="font-sans divide-y rounded-lg max-w-5xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Frequently asked questions
        </h2>
      </div>
      <div className="accordion" role="accordion">
        <button
          type="button"
          className="toggle-button w-full text-base outline-none text-left font-semibold py-6 text-blue-600 hover:text-blue-600 flex items-center"
        >
          <span className="mr-4">How does this platform work?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42 42"
            className="w-3 fill-current ml-auto shrink-0"
          >
            <path
              className="plus hidden"
              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
            />
            <path d="M37.059 16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5h32.118C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
          </svg>
        </button>
        <div className="content pb-6 max-h-[1000px] overflow-hidden transition-all duration-300">
          <p className="text-sm text-gray-600">
            Our platform connects you with local cooks who share homemade meals.
            Simply browse, order, and enjoy!
          </p>
        </div>
      </div>
      <div className="accordion" role="accordion">
        <button
          type="button"
          className="toggle-button w-full text-base outline-none text-left font-semibold py-6 text-gray-800 hover:text-blue-600 flex items-center"
        >
          <span className="mr-4">Is the food prepared safely?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42 42"
            className="w-3 fill-current ml-auto shrink-0"
          >
            <path
              className="plus"
              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
            />
            <path d="M37.059 16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5h32.118C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
          </svg>
        </button>
        <div className="content invisible max-h-0 overflow-hidden transition-all duration-300">
          <p className="text-sm text-gray-600">
            All cooks are vetted, and they follow strict hygiene standards to
            ensure safe and healthy meals.
          </p>
        </div>
      </div>
      <div className="accordion" role="accordion">
        <button
          type="button"
          className="toggle-button w-full text-base outline-none text-left font-semibold py-6 text-gray-800 hover:text-blue-600 flex items-center"
        >
          <span className="mr-4">Can I customize my order?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42 42"
            className="w-3 fill-current ml-auto shrink-0"
          >
            <path
              className="plus"
              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
            />
            <path d="M37.059 16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5h32.118C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
          </svg>
        </button>
        <div className="content invisible max-h-0 overflow-hidden transition-all duration-300">
          <p className="text-sm text-gray-600">
            Yes, many meals come with customization options. Check the meal
            description for details.
          </p>
        </div>
      </div>
      <div className="accordion" role="accordion">
        <button
          type="button"
          className="toggle-button w-full text-base outline-none text-left font-semibold py-6 text-gray-800 hover:text-blue-600 flex items-center"
        >
          <span className="mr-4">How do I pay for my order?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42 42"
            className="w-3 fill-current ml-auto shrink-0"
          >
            <path
              className="plus"
              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
            />
            <path d="M37.059 16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5h32.118C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
          </svg>
        </button>
        <div className="content invisible max-h-0 overflow-hidden transition-all duration-300">
          <p className="text-sm text-gray-600">
            You can pay securely online using our integrated payment system,
            including card options.
          </p>
        </div>
      </div>
      <div className="accordion" role="accordion">
        <button
          type="button"
          className="toggle-button w-full text-base outline-none text-left font-semibold py-6 text-gray-800 hover:text-blue-600 flex items-center"
        >
          <span className="mr-4">What if I need to cancel my order?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42 42"
            className="w-3 fill-current ml-auto shrink-0"
          >
            <path
              className="plus"
              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
            />
            <path d="M37.059 16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5h32.118C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
          </svg>
        </button>
        <div className="content invisible max-h-0 overflow-hidden transition-all duration-300">
          <p className="text-sm text-gray-600">
            You can cancel your order before it's prepared. Refunds depend on
            the cancellation time.
          </p>
        </div>
      </div>
      <div className="accordion" role="accordion">
        <button
          type="button"
          className="toggle-button w-full text-base outline-none text-left font-semibold py-6 text-gray-800 hover:text-blue-600 flex items-center"
        >
          <span className="mr-4">How can I contact the cook or support?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42 42"
            className="w-3 fill-current ml-auto shrink-0"
          >
            <path
              className="plus"
              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
            />
            <path d="M37.059 16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5h32.118C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
          </svg>
        </button>
        <div className="content invisible max-h-0 overflow-hidden transition-all duration-300">
          <p className="text-sm text-gray-600">
            Use our in-app messaging feature to contact cooks or reach our
            support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
