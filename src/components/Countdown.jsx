import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { timeConverter } from "../utils";

const Countdown = ({ countdownTime, timeOver, setTimeTaken }) => {
  const totalTime = countdownTime * 1000;
  const [timerTime, setTimerTime] = useState(totalTime);
  const { hours, minutes, seconds } = timeConverter(timerTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timerTime - 1000;

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);

        Swal.fire({
          icon: "info",
          title: `Oops! Time's up.`,
          text: "See how you did!",
          confirmButtonText: "Check Results",
          timer: 5000,
          willClose: () => timeOver(totalTime - timerTime),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      setTimeTaken(totalTime - timerTime + 1000);
    };
  }, [timerTime, timeOver, totalTime, setTimeTaken]);

  return (
    <div className="flex justify-end space-x-2">
      <div className="relative group">
        <button className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none">
          {hours}
        </button>
        <div className="absolute bottom-0 left-0 mb-10 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-sm rounded">
          Hours
        </div>
      </div>
      <div className="relative group">
        <button className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none">
          {minutes}
        </button>
        <div className="absolute bottom-0 left-0 mb-10 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-sm rounded">
          Minutes
        </div>
      </div>
      <div className="relative group">
        <button className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none">
          {seconds}
        </button>
        <div className="absolute bottom-0 left-0 mb-10 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-sm rounded">
          Seconds
        </div>
      </div>
    </div>
  );
};

Countdown.propTypes = {
  countdownTime: PropTypes.number.isRequired,
  timeOver: PropTypes.func.isRequired,
  setTimeTaken: PropTypes.func.isRequired,
};

export default Countdown;
