import PropTypes from "prop-types";

const Button = ({
  text,
  bgColor = "bg-secondary",
  textColor = "text-primary",
}) => {
  return (
    <button
      className={`text-lg ${bgColor} ${textColor} font-semibold px-3 py-1 rounded-md hover:scale-110 transition duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Button;
