import Lottie from "lottie-react";
import handLottie from "/public/LoadingHand.json"
const LoadingHand = () => {

  return (
    <div className="h-full flex items-center justify-center">
      <Lottie animationData={handLottie}></Lottie>
    </div>
  );
};

export default LoadingHand;