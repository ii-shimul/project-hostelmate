import { Link } from "react-router-dom";
import Button from "../../components/Button";
import PropTypes from "prop-types";

const MealGrid = ({ meals }) => {
  return (
    <div className="bg-white dark:bg-inherit mx-auto max-w-[1400px]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {meals.map((meal) => {
          return (
            <div
              key={meal._id}
              className="group overflow-hidden relative p-3 dark:bg-slate-700 dark:rounded-md"
            >
              <div className="bg-gray-100 w-full overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="md:aspect-[4/4] aspect-[3/4] w-full object-cover object-top hover:scale-110 transition-all duration-700"
                />
              </div>
              <div className="p-2 md:p-4 relative">
                <div className="flex flex-wrap w-full absolute px-4 pt-3 z-10 transition-all duration-500 left-0 right-0 group-hover:bottom-20 bottom-5 opacity-0 bg-white dark:bg-slate-700 group-hover:opacity-100 max-lg:bottom-20 py-3 bg-white/60">
                  <p className="text-xs md:text-sm">{meal.description}</p>
                </div>
                <div className="z-10 relative bg-white dark:bg-slate-700 flex justify-between max-md:flex-col">
                  <div>
                    <h6 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {meal.title}
                    </h6>
                    <h6 className="text-sm text-gray-600 dark:text-white dark:opacity-65 mt-2">
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
