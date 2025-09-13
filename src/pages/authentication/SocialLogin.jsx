import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SocialLogin = () => {
  const axiosPublic = useAxios();
  const { logInGoogle } = useAuth();
  const nav = useNavigate();

  const handleGoogleLogIn = async () => {
    const res = await logInGoogle();
    const user = res.user;
    const userDb = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      role: "student",
      badge: "Bronze",
      createdAt: new Date().toISOString(),
    };
    await axiosPublic.post("/users", userDb);
    toast.success(`Welcome ${user.displayName}`);
    nav("/");
  };

  return (
    <div className="w-full space-y-3 text-center">
      <motion.button
        onClick={handleGoogleLogIn}
        type="button"
        whileHover={{scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="px-5 py-3 w-full inline-flex items-center justify-center rounded-lg text-[#333] text-base tracking-wider font-semibold border-none outline-none shadow-md bg-gray-50 hover:bg-gray-100 active:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22px"
          fill="#fff"
          className="inline mr-3"
          viewBox="0 0 512 512"
        >
          <path
            fill="#fbbd00"
            d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
            data-original="#fbbd00"
          />
          <path
            fill="#0f9d58"
            d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
            data-original="#0f9d58"
          />
          <path
            fill="#31aa52"
            d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
            data-original="#31aa52"
          />
          <path
            fill="#3c79e6"
            d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
            data-original="#3c79e6"
          />
          <path
            fill="#cf2d48"
            d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
            data-original="#cf2d48"
          />
          <path
            fill="#eb4132"
            d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
            data-original="#eb4132"
          />
        </svg>
        Continue with Google
      </motion.button>
    </div>
  );
};

export default SocialLogin;
