import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlay } from "react-icons/fa";
import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  QUESTIONS_TYPE,
  COUNTDOWN_TIME,
} from "../constants";
import { shuffle } from "../utils";

const Main = ({ startMain }) => {
  console.log( typeof(startMain));
  const [category, setCategory] = useState("0");
  const [numOfQuestions, setNumOfQuestions] = useState(3);
  const [difficulty, setDifficulty] = useState("easy");
  const [questionsType, setQuestionsType] = useState("0");
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 60,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  // const [offline, setOffline] = useState(false);

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setCountdownTime({ ...countdownTime, [name]: parseInt(value) });
  };

  let allFieldsSelected =
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds);

  const fetchData = () => {
    console.log("i'm running");
    setProcessing(true);

    if (error) setError(null);

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    fetch(API)
      .then((response) => response.json())
      .then((data) =>
        setTimeout(() => {
          console.log(data);
          const { response_code, results } = data;

          if (response_code === 1) {
            const message = (
              <p>
                The API does not  have enough questions for your query. (Ex.
                Asking for 50 Questions in a Category that only has 20.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{" "}
                <strong>Difficulty Level</strong>, or{" "}
                <strong>Type of Questions</strong>.
              </p>
            );

            setProcessing(false);
            setError({ message });

            return;
          }

          results.forEach((element) => {
            element.options = shuffle([
              element.correct_answer,
              ...element.incorrect_answers,
            ]);
          });

          setProcessing(false);
          console.log(startMain);
          startMain(
            results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch((error) =>
        setTimeout(() => {
            setProcessing(false);
            setError(error);
        }, 1000)
      );
  };


  return (
    <div className="container mx-auto px-[20%] py-[2%] bg-slate-200">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-2xl font-bold">Are You Ready for Quiz?</h1>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error.message}</span>
            <button
              onClick={() => setError(null)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="text-red-500">×</span>
            </button>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="block w-full mt-1 p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={processing}
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number of Questions</label>
          <select
            className="block w-full mt-1 p-2 border rounded"
            value={numOfQuestions}
            onChange={(e) => setNumOfQuestions(e.target.value)}
            disabled={processing}
          >
            {NUM_OF_QUESTIONS.map((num) => (
              <option key={num.value} value={num.value}>
                {num.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Difficulty Level</label>
          <select
            className="block w-full mt-1 p-2 border rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={processing}
          >
            {DIFFICULTY.map((level) => (
              <option key={level.value} value={level.value}>
                {level.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Questions Type</label>
          <select
            className="block w-full mt-1 p-2 border rounded"
            value={questionsType}
            onChange={(e) => setQuestionsType(e.target.value)}
            disabled={processing}
          >
            {QUESTIONS_TYPE.map((type) => (
              <option key={type.value} value={type.value}>
                {type.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Countdown Time</label>
          <div className="flex">
            <select
              name="hours"
              className="w-1/3 mr-2 p-2 border rounded"
              value={countdownTime.hours}
              onChange={handleTimeChange}
              disabled={processing}
            >
              {COUNTDOWN_TIME.hours.map((hour) => (
                <option key={hour.value} value={hour.value}>
                  {hour.text}
                </option>
              ))}
            </select>
            <select
              name="minutes"
              className="w-1/3 mr-2 p-2 border rounded"
              value={countdownTime.minutes}
              onChange={handleTimeChange}
              disabled={processing}
            >
              {COUNTDOWN_TIME.minutes.map((minute) => (
                <option key={minute.value} value={minute.value}>
                  {minute.text}
                </option>
              ))}
            </select>
            <select
              name="seconds"
              className="w-1/3 p-2 border rounded"
              value={countdownTime.seconds}
              onChange={handleTimeChange}
              disabled={processing}
            >
              {COUNTDOWN_TIME.seconds.map((second) => (
                <option key={second.value} value={second.value}>
                  {second.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={fetchData}
          disabled={!allFieldsSelected || processing}
          className={`w-full py-2 px-4 rounded ${
            processing
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          <div className=" flex  justify-center items-center gap-2 ">
            <FaPlay />
            {processing ? "Processing..." : "Play Now"}
          </div>
        </button>   
      </div>
    </div>
  );
};

Main.propTypes = {
  startMain: PropTypes.func.isRequired,
};

export default Main;
