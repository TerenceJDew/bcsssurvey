import React, { createContext, useReducer, useState } from "react";
import Reducer from "./answersReducer";

const Store = ({ children }) => {
  const [answer, dispatch] = useReducer(Reducer, {});
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("treattype");
  return (
    <RoutingContext.Provider value={[page, setPage]}>
      <AnswersContext.Provider value={[answer, dispatch]}>
        <QuestionsContext.Provider value={[questions, setQuestions]}>
          {children}
        </QuestionsContext.Provider>
      </AnswersContext.Provider>
    </RoutingContext.Provider>
  );
};

export const QuestionsContext = createContext([]);
export const AnswersContext = createContext({});
export const RoutingContext = createContext("treattype");
export default Store;
