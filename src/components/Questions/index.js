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
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import { useRoutes, navigate, usePath } from "hookrouter";
import { useContext, useEffect, useState } from "react";

const routes = {
  "/": () => (currentQuestion,rerouteToHome, userDidSubmit) =>
    <SurveyInformation rerouteToHome={rerouteToHome}/>,
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
  "/confirmation": () => (currentQuestion, rerouteToHome, userDidSubmit) =>
    <Confirmation rerouteToHome={rerouteToHome} userDidSubmit={userDidSubmit} />,
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    minHeight: 42,
    padding: "0 30px",
    marginTop: "20px",
    "&:hover, &:focus": {
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .5)",
    },
  },
}));

const navigateFromURI = (uri) => {
  navigate(`/survey/${uri}`);
};
const Questions = () => {
  const routeResult = useRoutes(routes);
  const [questions, setQuestions] = useContext(QuestionsContext);
  const [page, setPage] = useContext(RoutingContext);
  const [answers, dispatch] = useContext(AnswersContext);
  const [userDidSubmit, setUserDidSubmit] = useState(false);
  const path = usePath(false);

  let classes = useStyles();
  let currentQuestion = questions[page] || {};

  const selectNextPage = (selection) => {
    let uriLookup = {
      index: "treattype",
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
    if (uri === undefined || uri === "") uri = "index";
    setPage(uri);
  }, []);

  useEffect(() => {
    let updateQuestionStore = (questionList) => {
      setQuestions(questionList);
      if (questionList.answers && !answers.treattype) {
        let answerList = questionList.answers;
        delete answerList.email;
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
        });
  }, []);

  const progressPage = () => {
    selectNextPage();
  };

  const rerouteToHome = () => {
    navigate("/");
  };

  const sendData = () => {
    axios
      .post("http://localhost:5000/submissions", answers)
      .then((response) => {
        setUserDidSubmit(true)
        return response.data
      })
      .catch((error) => alert("There was an issue sending your request. Please try again later"));
  };

  return (
    <>
      {routeResult(currentQuestion, rerouteToHome, userDidSubmit) || <NotFound></NotFound>}
      {page !== "confirmation" && (
        <Button
          onClick={progressPage}
          className={classes.root}
          variant="outlined"
        >
          {" "}
          {page === "index" ? "Begin Survey" : "Next"}
        </Button>
      )}

      {page === "confirmation" && (
        <Button disabled={userDidSubmit} onClick={sendData} className={classes.root} variant="outlined">
          Submit
        </Button>
      )}
    </>
  );
};

export default Questions;
