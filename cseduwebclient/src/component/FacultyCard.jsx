import PropTypes from 'prop-types';

const FacultyCard = ({faculty}) => {
    return (
        <div>
            <div>
                <img src={faculty.}></img>
            </div>
            <div></div>
        </div>
    );
};
FacultyCard.propTypes = {
    faculty: PropTypes.shape({
      photo: PropTypes.string,
      date: PropTypes.string,
      news_title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  };
  
export default FacultyCard;