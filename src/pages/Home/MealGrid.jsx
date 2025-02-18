import { Link } from "react-router-dom";
import Button from "../../components/Button";
import PropTypes from "prop-types";

const MealGrid = ({ meals }) => {
  return (
    <div className="bg-white mx-auto max-w-[1400px]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {meals.map((meal) => {
          return (
            <div
              key={meal._id}
              className="group overflow-hidden cursor-pointer relative"
            >
              <div className="bg-gray-100 w-full overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="md:aspect-[4/4] aspect-[3/4] w-full object-cover object-top hover:scale-110 transition-all duration-700"
                />
              </div>
              <div className="p-4 relative">
                <div className="flex flex-wrap w-full absolute px-4 pt-3 z-10 transition-all duration-500 left-0 right-0 group-hover:bottom-20 lg:bottom-5 lg:opacity-0 lg:bg-white lg:group-hover:opacity-100 max-lg:bottom-20 max-lg:py-3 max-lg:bg-white/60">
                  <p className="text-xs md:text-sm">{meal.description}</p>
                </div>
                <div className="z-10 relative bg-white flex justify-between max-md:flex-col">
                  <div>
                    <h6 className="text-sm font-semibold text-gray-800 truncate">
                      {meal.title}
                    </h6>
                    <h6 className="text-sm text-gray-600 mt-2">
                      ৳ {meal.price}
                    </h6>
                  </div>
                  <Link to={`/meals/${meal._id}`}>
                    <Button
                      text="Details"
                      bgColor="bg-secondary"
                      textSize="text-sm"
                      textColor="text-primary"
                      key={meal._id}
                    ></Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

MealGrid.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MealGrid;
