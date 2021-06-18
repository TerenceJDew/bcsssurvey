import React, { createContext, useReducer, useState } from "react";
import Reducer from "./reducers/answersReducer";

const Store = ({ children }) => {
  const [answer, dispatch] = useReducer(Reducer, {});
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("");
  const [isNextReady, setIsNextReady] = useState(true);
  return (
    <ProgressContext.Provider value={[isNextReady, setIsNextReady]}>
    <RoutingContext.Provider value={[page, setPage]}>
      <AnswersContext.Provider value={[answer, dispatch]}>
        <QuestionsContext.Provider value={[questions, setQuestions]}>
          {children}
        </QuestionsContext.Provider>
      </AnswersContext.Provider>
    </RoutingContext.Provider>
    </ProgressContext.Provider> 
  );
};

export const QuestionsContext = createContext([]);
export const AnswersContext = createContext({});
export const RoutingContext = createContext("");
export const ProgressContext = createContext(true);
export default Store;
