import React, { useReducer, createContext } from 'react';

import { SET_QUIZ, UNSET_QUIZ } from './types';

export const QuizContext = createContext();

const initialState = {
  quizName: '',
  quizData: [],
  icon: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_QUIZ:
      return {
        ...state,
        quizName: action.payload.quizName,
        quizData: action.payload.quizData,
        icon: action.payload.icon,
      };
    case UNSET_QUIZ:
      return {
        ...state,
        quizName: '',
        quizData: [],
        icon: ''
      };
    default:
      return { ...state };
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider value={[state, dispatch]}>
      {children}
    </QuizContext.Provider>
  );
};
