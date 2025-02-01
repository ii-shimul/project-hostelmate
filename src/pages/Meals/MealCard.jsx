import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MealCard = ({ meals }) => {
  return (
    <>
      {meals.map((meal, index) => (
        <div
          key={index}
          className="hover:bg-secondary transition-all rounded-md duration-500 ease-in-out p-2 overflow-hidden"
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
            <Link
              to={`/meals/${meal._id}`}
              type="button"
              className="bg-primary text-center font-semibold hover:bg-gray-800 text-white text-sm px-2 py-2 w-full"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

MealCard.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MealCard;
