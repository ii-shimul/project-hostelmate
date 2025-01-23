import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loader = () => {

  return (
    <div className="h-[200px] flex items-center justify-center">
      <ClimbingBoxLoader color="#235784" speedMultiplier={0.6} />
    </div>
  );
};

export default Loader;