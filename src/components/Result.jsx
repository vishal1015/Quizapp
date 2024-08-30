import  { useState } from "react";
import Stats from "./Stats";
import QNA from "./QNA";

const Result = (
//   {
//   totalQuestions,
//   correctAnswers,
//   timeTaken,
//   questionsAndAnswers,
//   replayQuiz,
//   resetQuiz,
// }
) => {
   const totalQuestions =5
   const correctAnswers=3
   const timeTaken= 2
   const questionsAndAnswers =[]
   const replayQuiz=3
   const resetQuiz= 3;
  const [activeTab, setActiveTab] = useState("Stats");

  const handleTabClick = (name) => {
    setActiveTab(name);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-around">
        <button
          className={`flex-1 text-center py-2 px-4 ${
            activeTab === "Stats"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-l-lg focus:outline-none`}
          onClick={() => handleTabClick("Stats")}
        >
          Stats
        </button>
        <button
          className={`flex-1 text-center py-2 px-4 ${
            activeTab === "QNA"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-r-lg focus:outline-none`}
          onClick={() => handleTabClick("QNA")}
        >
          QNA
        </button>
      </div>
      <div className="mt-4">
        {activeTab === "Stats" && (
          <Stats
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            timeTaken={timeTaken}
            replayQuiz={replayQuiz}
            resetQuiz={resetQuiz}
          />
        )}
        {activeTab === "QNA" && (
          <QNA questionsAndAnswers={questionsAndAnswers} />
        )}
      </div>
    </div>
  );
};


export default Result;
