import React, { useReducer, createContext } from 'react';

import quizData from 'Data/quiz';
import { SET_TOPICS } from './types';

export const AppContext = createContext();

const initialState = {
  topics: quizData
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    default:
      return { ...state };
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
