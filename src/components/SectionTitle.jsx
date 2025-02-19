import PropTypes from "prop-types";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="py-3 max-w-lg mx-auto text-center bg-secondary dark:bg-primary  rounded-md mb-3">
      <h1 className="text-3xl md:text-4xl font-semibold text-primary dark:text-secondary">
        {title}
      </h1>
      <p className="mt-2 max-sm:text-sm md:mt-3 px-1 md:px-5 text-primary opacity-70 dark:text-secondary">
        {subtitle}
      </p>
    </div>
  );
};
SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionTitle;
