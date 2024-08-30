// src/context/QuizContext.js
import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({
    questions: [],
    currentQuestion: 0,
    score: 0,
    // other state variables
  });

  return (
    <QuizContext.Provider value={{ quizState, setQuizState }}>
      {children}
    </QuizContext.Provider>
  );
};
