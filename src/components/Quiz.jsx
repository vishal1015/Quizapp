import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import he from "he";
import Countdown from "./Countdown"
import { getLetter } from "../utils";
import { FaArrowRight } from "react-icons/fa";

const Quiz = (
  { data, countdownTime, endQuiz }
) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSelectedAns, setUserSelectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (questionIndex > 0) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [questionIndex]);

  const handleItemClick = (option) => {
    setUserSelectedAns(option);
  };

  const handleNext = () => {
    let point = 0;
    if (userSelectedAns === he.decode(data[questionIndex].correct_answer)) {
      point = 1;
    }

    const qna = [...questionsAndAnswers];
    qna.push({
      question: he.decode(data[questionIndex].question),
      user_answer: userSelectedAns,
      correct_answer: he.decode(data[questionIndex].correct_answer),
      point,
    });

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSelectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = (timeTaken) => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            {`Question No.${questionIndex + 1} of ${data.length}`}
          </h1>
          <Countdown
            countdownTime={countdownTime}
            timeOver={timeOver}
            setTimeTaken={setTimeTaken}
          />
        </div>
        <div className="mt-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-lg font-semibold">{`Q. ${he.decode(
              data[questionIndex].question
            )}`}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-md font-medium">
              Please choose one of the following answers:
            </h3>
            <div className="mt-2">
              {data[questionIndex].options.map((option, i) => {
                const letter = getLetter(i);
                const decodedOption = he.decode(option);

                return (
                  <div
                    key={decodedOption}
                    className={`p-4 my-2 border rounded-lg cursor-pointer ${
                      userSelectedAns === decodedOption
                        ? "bg-blue-200"
                        : "bg-white"
                    }`}
                    onClick={() => handleItemClick(decodedOption)}
                  >
                    <span className="font-bold mr-2">{letter}</span>
                    {decodedOption}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
            onClick={handleNext}
            disabled={!userSelectedAns}
          >
            <div className=" flex gap-2 justify-center items-center text-black font-semibold">
              <h1>Next</h1>
              <FaArrowRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
