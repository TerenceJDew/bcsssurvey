import SurveyInformation from "./SurveyInformation";
import TreatTypeSelect from "./TreatTypeSelect";
import ToppingSelect from "./ToppingSelect";
import FlavorSelect from "./FlavorSelect";
import ScoopFlavorSelect from "./ScoopFlavorSelect";
import CupConeSelect from "./CupConeSelect";
import DipSelect from "./DipSelect";
import Confirmation from "./Confirmation";
import NotFound from "../NotFound";
import {
  AnswersContext,
  QuestionsContext,
  RoutingContext,
} from "../../store/store";

import axios from "axios";
import { Button } from "@material-ui/core";

import { useRoutes, navigate, usePath } from "hookrouter";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useContext, useEffect } from "react";

const routes = {
  "/": () => (selectNextPage) => <SurveyInformation />,
  "/treattype": () => (currentQuestion, rerouteToHome) =>
    (
      <TreatTypeSelect
        question={currentQuestion}
        rerouteToHome={rerouteToHome}
      />
    ),
  "/topping": () => (currentQuestion, rerouteToHome) =>
    <ToppingSelect question={currentQuestion} rerouteToHome={rerouteToHome} />,
  "/flavor": () => (currentQuestion, rerouteToHome) =>
    <FlavorSelect question={currentQuestion} rerouteToHome={rerouteToHome} />,
  "/scoopflavor": () => (currentQuestion, rerouteToHome) =>
    (
      <ScoopFlavorSelect
        question={currentQuestion}
        rerouteToHome={rerouteToHome}
      />
    ),
  "/cupcone": () => (currentQuestion, rerouteToHome) =>
    <CupConeSelect question={currentQuestion} rerouteToHome={rerouteToHome} />,
  "/dip": () => (currentQuestion, rerouteToHome) =>
    <DipSelect question={currentQuestion} rerouteToHome={rerouteToHome} />,
  "/confirmation": () => () => <Confirmation />,
};

const navigateFromURI = (uri) => {
  navigate(`/survey/${uri}`);
};
const Questions = () => {
  const routeResult = useRoutes(routes);
  const [questions, setQuestions] = useContext(QuestionsContext);
  const [page, setPage] = useContext(RoutingContext);
  const [answers, dispatch] = useContext(AnswersContext);
  const [storedQuestions, setStoredQuestions] = useLocalStorage(
    "questions",
    null
  );
  const [, setStoredAnswers] = useLocalStorage("answers", null);
  const path = usePath(false);

  let currentQuestion = questions[page] || {};

  const selectNextPage = (selection) => {
    let uriLookup = {
      treattype:
        answers.treattype === "Hard(Scooped)" ? "scoopflavor" : "flavor",
      scoopflavor: "cupcone",
      flavor: "cupcone",
      cupcone: "topping",
      topping: answers.topping === "Dip" ? "dip" : "confirmation",
      dip: "confirmation",
    };
    let uri = uriLookup[page];
    navigateFromURI(uri);
    setPage(uri);
  };

  useEffect(() => {
    let uri = path.split("/")[2];
    console.log(uri);
    if (uri === undefined || uri === "") uri = "treattype";
    setPage(uri);
  }, [setPage, path]);

  useEffect(() => {
    let updateLocalStorage = (questionList) => {
      setStoredQuestions(questionList);
      let answerList = questionList.answers;
      delete answerList.email;
      console.log(answerList);
      setStoredAnswers(questionList.answers);
    };

    let updateQuestionStore = (questionList) => {
      setQuestions(questionList);
      if (questionList.answers) {
        let answerList = questionList.answers;
        delete answerList.email;
        console.log(answerList);
        dispatch({ type: "ADD_ANSWER", payload: answerList });
      }
    };

    const emailQuery = answers.email;
    if (emailQuery)
      axios
        .get(`http://localhost:5000/questions?email=${emailQuery}`)
        .then((response) => response.data)
        .then((questionList) => {
          updateQuestionStore(questionList);
          updateLocalStorage(questionList);
        });
  }, []);

  const progressPage = () => {
    selectNextPage();
  };

  const rerouteToHome = () => {
    navigate("/");
  };

  const sendData = () => {
    console.log(answers);
    axios
      .post("http://localhost:5000/submissions", answers)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  return (
    <>
      {routeResult(currentQuestion, rerouteToHome) || <NotFound></NotFound>}
      {page !== "confirmation" && (
        <Button onClick={progressPage} variant="outlined">
          {" "}
          Next
        </Button>
      )}

      {page === "confirmation" && (
        <Button onClick={sendData} variant="outlined">
          Submit
        </Button>
      )}
    </>
  );
};

export default Questions;
