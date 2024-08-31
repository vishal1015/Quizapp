import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";

const Loader = ({ message }) => {
  return (
    <>
      <div className="mt-[5%] flex flex-col justify-center items-center">
        <BeatLoader color="#2c2bb2"  />
        <h1 className=" text-xl font-semibold "> {message}</h1>
      </div>
    </>
  );
};
Loader.propTypes = {
  message: PropTypes.string
 
};
export default Loader;
