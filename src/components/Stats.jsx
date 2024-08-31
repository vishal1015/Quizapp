import { FaHome } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import PropTypes from "prop-types";
import { calculateScore, calculateGrade, timeConverter } from "../utils";

const Stats = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  replayQuiz,
  resetQuiz,
}) => {
  const score = calculateScore(totalQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">{remarks}</h1>
      <h2 className="text-xl font-semibold text-center mt-4">Grade: {grade}</h2>
      <h3 className="text-lg text-center mt-2">
        Total Questions: {totalQuestions}
      </h3>
      <h3 className="text-lg text-center mt-2">
        Correct Answers: {correctAnswers}
      </h3>
      <h3 className="text-lg text-center mt-2">Your Score: {score}%</h3>
      <h3 className="text-lg text-center mt-2">Passing Score: 60%</h3>
      <h3 className="text-lg text-center mt-2">
        Time Taken:{" "}
        {`${Number(hours)}h ${Number(minutes)}m ${Number(seconds)}s`}
      </h3>
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4 flex items-center"
          onClick={replayQuiz}
        >
          <div className=" mr-2 flex justify-center items-center gap-2 ">
            <FaRedo />
            <h1>Play Again</h1>
          </div>
        </button>
        <button
          className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center"
          onClick={resetQuiz}
        >
          <div className=" mr-2 flex justify-center items-center gap-2 ">
            <FaHome />
            <h1>Back to Home</h1>
          </div>
        </button>
      </div>
    </div>
  );
};

Stats.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
};

export default Stats;
