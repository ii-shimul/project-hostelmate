import SectionTitle from "../../components/SectionTitle";
import useMeals from "../../hooks/useMeals";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Meals = () => {
  const [meals, loading] = useMeals();
  if (loading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <ClimbingBoxLoader color="#235784" speedMultiplier={0.6} />
      </div>
    );
  }
  console.log(meals);

  return (
    <div className="max-w-7xl w-[95%] lg:w-[90%] max-md:max-w-md mx-auto">
      <div className="font-sans p-4 mx-auto lg:max-w-7xl md:max-w-4xl max-w-xl">
        <SectionTitle
          title="Delicious Meals Just for You"
          subtitle={
            "Explore a variety of freshly prepared dishes to satisfy every craving."
          }
        ></SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
          {meals.map((meal) => {
            return (
              <div
                key={meal._id}
                className="hover:bg-secondary transition-all rounded-md duration-500 ease-in-out p-2 overflow-hidden cursor-pointer"
              >
                <div className="bg-white flex flex-col h-full border rounded-md overflow-hidden">
                  <div className="w-full">
                    <img
                      src={meal.image}
                      alt={meal.title}
                      className="aspect-[139/125] w-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-gray-800">
                      {meal.title}
                    </h4>
                    <h4 className="text-sm sm:text-base text-gray-800 font-bold mt-2">
                      ৳ {meal.price}{" "}
                      <strike className="text-gray-500 ml-1">
                        ৳{Math.ceil(meal.price * 1.09)}
                      </strike>
                    </h4>
                  </div>
                  <button
                    type="button"
                    className="bg-primary font-semibold hover:bg-gray-800 text-white text-sm px-2 py-2 w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Meals;
