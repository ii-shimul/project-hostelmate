import { useState } from "react";

const Footer = () => {
  const [submit, setSubmit] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit("You will hear from us soon.");
    e.target.reset();
  };
  return (
    <footer className="bg-white dark:bg-slate-800 py-10 px-10 font-sans tracking-wide">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <a
              href="#start"
              className="text-primary flex gap-3 items-center justify-start"
            >
              <span className="bg-secondary p-2 rounded-sm">
                <svg
                  id="brandHeader"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.03198 3.80281V7.07652L3.86083 9.75137L0.689673 12.4263L0.667474 6.56503C0.655304 3.34138 0.663875 0.654206 0.686587 0.593579C0.71907 0.506918 1.4043 0.488223 3.87994 0.506219L7.03198 0.529106V3.80281ZM21.645 4.36419V5.88433L17.0383 9.76316C14.5046 11.8966 11.2263 14.6552 9.75318 15.8934L7.07484 18.145V20.3225V22.5H3.85988H0.64502L0.667303 18.768L0.689673 15.036L2.56785 13.4609C3.60088 12.5946 6.85989 9.85244 9.81009 7.36726L15.1741 2.84867L18.4096 2.8464L21.645 2.84413V4.36419ZM21.645 15.5549V22.5H18.431H15.217V18.2638V14.0274L15.4805 13.7882C15.8061 13.4924 21.5939 8.61606 21.6236 8.61248C21.6353 8.61099 21.645 11.7351 21.645 15.5549Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span className="text-3xl font-semibold dark:text-secondary">
                HostelMate
              </span>
            </a>
            <p className="text-sm mt-6 text-gray-500 leading-relaxed">
              We promise the best meal service in the country. Once you start
              using our service, there is no going back!
            </p>
            <ul className="mt-10 space-y-6">
              <li className="flex items-center">
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="#007bff"
                    viewBox="0 0 482.6 482.6"
                  >
                    <path
                      d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.9-62.4-86.7-79-131.5-10.3-27.5-14.2-49.6-12.6-69.7z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                <a href="" className="text-gray-500 text-sm ml-3">
                  <small className="block">Tel</small>
                  <strong>180-548-2588</strong>
                </a>
              </li>
              <li className="flex items-center">
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="#007bff"
                    viewBox="0 0 479.058 479.058"
                  >
                    <path
                      d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                <a href="" className="text-gray-500 text-sm ml-3">
                  <small className="block">Mail</small>
                  <strong>hostel@mate.com</strong>
                </a>
              </li>
              <li className="flex items-center">
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="#007bff"
                    viewBox="0 0 368.16 368.16"
                  >
                    <path
                      d="M184.08 0c-74.992 0-136 61.008-136 136 0 24.688 11.072 51.24 11.536 52.36 3.576 8.488 10.632 21.672 15.72 29.4l93.248 141.288c3.816 5.792 9.464 9.112 15.496 9.112s11.68-3.32 15.496-9.104l93.256-141.296c5.096-7.728 12.144-20.912 15.72-29.4.464-1.112 11.528-27.664 11.528-52.36 0-74.992-61.008-136-136-136zM293.8 182.152c-3.192 7.608-9.76 19.872-14.328 26.8l-93.256 141.296c-1.84 2.792-2.424 2.792-4.264 0L88.696 208.952c-4.568-6.928-11.136-19.2-14.328-26.808-.136-.328-10.288-24.768-10.288-46.144 0-66.168 53.832-120 120-120s120 53.832 120 120c0 21.408-10.176 45.912-10.28 46.152z"
                      data-original="#000000"
                    />
                    <path
                      d="M184.08 64.008c-39.704 0-72 32.304-72 72s32.296 72 72 72 72-32.304 72-72-32.296-72-72-72zm0 128c-30.872 0-56-25.12-56-56s25.128-56 56-56 56 25.12 56 56-25.128 56-56 56z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                <a href="" className="text-gray-500 text-sm ml-3">
                  <small className="block">Address</small>
                  <strong>123 Main Street City, Hostelia</strong>
                </a>
              </li>
              <li className="flex items-center">
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="#007bff"
                    viewBox="0 0 100 100"
                  >
                    <path
                      d="M83 23h-3V11c0-3.309-2.692-6-6-6H26c-3.308 0-6 2.691-6 6v12h-3C8.729 23 2 29.729 2 38v30c0 4.963 4.037 9 9 9h9v12c0 3.309 2.692 6 6 6h48c3.308 0 6-2.691 6-6V77h9c4.963 0 9-4.037 9-9V38c0-8.271-6.729-15-15-15zM26 11h48v12H26zm0 78V59h48v30zm66-21c0 1.654-1.345 3-3 3h-9V59h3a3 3 0 1 0 0-6H17a3 3 0 1 0 0 6h3v12h-9c-1.655 0-3-1.346-3-3V38c0-4.963 4.037-9 9-9h66c4.963 0 9 4.037 9 9zm-27 0a3 3 0 0 1-3 3H38a3 3 0 1 1 0-6h24a3 3 0 0 1 3 3zm0 12a3 3 0 0 1-3 3H38a3 3 0 1 1 0-6h24a3 3 0 0 1 3 3zm21-42a3 3 0 0 1-3 3h-6a3 3 0 1 1 0-6h6a3 3 0 0 1 3 3z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                <a href="" className="text-gray-500 text-sm ml-3">
                  <small className="block">Fax</small>
                  <strong>+1-548-2588</strong>
                </a>
              </li>
            </ul>
          </div>
          <div className="max-w-md md:ml-auto">
            <h4 className="text-gray-800 font-bold text-lg">Contact Us</h4>
            <p className="text-sm text-gray-500 mt-2">
              We usually respond before 24 hours.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-2">
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full rounded-md outline-none h-10 px-4 bg-gray-100 text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-md outline-none h-10 px-4 bg-gray-100 text-sm"
              />
              <textarea
                placeholder="Message"
                required
                rows={6}
                className="w-full rounded-md outline-none px-4 bg-gray-100 text-sm pt-3 min-h-[100px]"
              />
            <p className="text-green-500 text-center">{submit}</p>
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 font-semibold rounded-md text-sm px-4 h-10 block w-full mt-4"
            >
              Submit
            </button>
            </form>
          </div>
        </div>
        <div className>
          <hr className="my-8 border-blue-300" />
          <div className="lg:flex lg:item-center">
            <ul className="flex flex-wrap gap-4">
              <li>
                <a href="" className="text-gray-500 text-sm hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="" className="text-gray-500 text-sm hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="" className="text-gray-500 text-sm hover:underline">
                  Security
                </a>
              </li>
            </ul>
            <p className="text-sm text-gray-500 ml-auto max-lg:mt-4">
              © HostelMate. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
