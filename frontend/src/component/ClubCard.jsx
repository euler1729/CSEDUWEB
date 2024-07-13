import PropTypes from "prop-types";

const ClubCard = ({ title, image, description, colorCode }) => {
  return (
    <div className="max-w-sm mx-auto shadow-md rounded-2xl overflow-hidden">
      <div>
        <img src={image} alt={title} className="w-full h-48" />
      </div>
      <div
        className="p-6 rounded-b-2xl text-gray-200"
        style={{ backgroundColor: colorCode }}
      >
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-4">{description}</p>
        <div className="flex justify-end">
          <button className="px-4 py-2 text-white bg-[#14264c] rounded-lg">
            See Details
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

ClubCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  colorCode: PropTypes.string,
};

ClubCard.defaultProps = {
  colorCode: "#ffffff",
};

export default ClubCard;
