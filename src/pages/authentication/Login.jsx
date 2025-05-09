import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import Lottie from "lottie-react";
import login from "/src/assets/login.json";
import Button from "../../components/Button";
import { useState } from "react";

const Login = () => {
  const { user, logIn } = useAuth();
  const nav = useNavigate();
  const [cred, setCred] = useState({ email: "", pass: "" });
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    logIn(data.email, data.password)
      .then((res) => {
        if (res.user.email) {
          toast.success(`Welcome back ${res.user.displayName}`);
          nav("/");
        }
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
  const handleAdmin = () => {
    setCred({ email: "hostel@mate.com", pass: "hostelmate" });
  };
  const handleStudent = () => {
    setCred({ email: "islamshimul27@gmail.com", pass: "shimul.." });
  };
  if (user) {
    nav(location.state ? location.state : "/");
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="font-[sans-serif]">
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-6 px-4">
          <div className="flex max-md:flex-col-reverse items-center gap-6 max-w-6xl w-full">
            <div className="flex-1 border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <div className="mb-3">
                <h3 className="text-gray-800 text-3xl font-bold">Log in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Log in to your account and explore a world of possibilities.
                  Your eating journey begins here.
                </p>
              </div>
              <div>
                <p className="uppercase text-sm text-center">
                  Fill form with demo credentials
                </p>
                <div className="flex gap-3 items-center justify-center py-2">
                  <span onClick={handleAdmin}>
                    <Button textSize="text-base" text="Admin"></Button>
                  </span>
                  <span onClick={handleStudent}>
                    <Button textSize="text-base" text="Student"></Button>
                  </span>
                </div>
                <p className="text-sm py-2 text-center text-red-500">NOTE: Click Log in button three times if you fill the form with above buttons.</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter email"
                      defaultValue={
                        (cred.email && cred.email)
                      }
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={10} cy={7} r={6} data-original="#000000" />
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      {...register("password", { required: true })}
                      className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter password"
                      defaultValue={
                        (cred.pass && cred.pass)
                      }
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>
                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-primary hover:bg-blue-600 transition duration-300 focus:outline-none"
                  >
                    Log in
                  </button>
                </div>
                <p className="text-sm !mt-8 text-center text-gray-500">
                  Don&apos;t have an account?
                  <Link
                    to={"/register"}
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
              </form>
              <hr className="my-3" />
              <SocialLogin></SocialLogin>
            </div>
            <div className="flex-1 w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover">
              <Lottie animationData={login}></Lottie>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
