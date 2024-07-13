import PropTypes from 'prop-types';
import { IoHome } from "react-icons/io5";

const Banner = ({ imageUrl, title, activePage }) => {
  return (
    <div className="relative">
      <img
        src={imageUrl || "/Img/bannerImageCSEDU.jpg"}
        alt="Banner"
        className="w-full h-auto max-h-80"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
        <div className="flex items-center">
          <a href="/" className="text-white flex items-center ">
            {" "}
            <IoHome className="mx-2" />
            Home
          </a>
          <span className="mx-2">/</span>
          <span className="capitalize text-[#EDB516] ">{activePage}</span>
        </div>
      </div>
    </div>
  );
};

// Prop Types
Banner.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  activePage: PropTypes.string.isRequired,
};

export default Banner;
