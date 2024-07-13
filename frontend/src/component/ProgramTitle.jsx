import PropTypes from "prop-types";
import { IoIosTime } from "react-icons/io";
const ProgramTitle = ({ degreeName, duration }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold pb-8 pt-2 ">
        {degreeName} in Computer Science and Engineering
      </h2>
      <div className="flex border shadow-lg rounded-lg w-[600px] px-10 py-5">
        <div className="">
          <div className="font-bold mb-2">FACULTY</div>
          <div >Engineering and Technology</div>
        </div>
        <div className="h-auto min-h-5 w-px bg-gray-400 mx-4"></div>
        <div>
          <div className="font-bold mb-2">DURATION</div>
          <div className="flex items-center"> <IoIosTime className="text-[#EDB516] text-2xl mr-2" />
          {duration}</div>
        </div>
      </div>
    </div>
  );
};

// Props validation
ProgramTitle.propTypes = {
  degreeName: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

export default ProgramTitle;
