import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useRoutes, navigate, usePath } from "hookrouter";
import { useContext, useEffect, useState } from "react";
import pageLookup from "../../utils/pagelookup";
import routes from "./routes";

import NotFound from "../NotFound";
import {
  AnswersContext,
  QuestionsContext,
  RoutingContext,
  ProgressContext,
} from "../../store/store";

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
  const [isNextReady] = useContext(ProgressContext);
  const [userDidSubmit, setUserDidSubmit] = useState(false);
  const path = usePath(false);

  let classes = useStyles();
  let currentQuestion = questions[page] || {};

  useEffect(() => {
    // Initial route loading
    let uri = path.split("/")[2];
    if (uri === undefined || uri === "") uri = "index";
    setPage(uri);
  }, []);

  useEffect(() => {
    // Get questions from the api and if there are answers populate the state hook with them.
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
      // Ran out of time but wanted to build an adapter
      // for axios third party instead of in component dependency
      axios
        .get(`http://localhost:5000/questions?email=${emailQuery}`)
        .then((response) => response.data)
        .then((questionList) => {
          updateQuestionStore(questionList);
        });
  }, []);

  const progressPage = () => {
    let uri = pageLookup(page, answers);
    navigateFromURI(uri);
    setPage(uri);
  };

  const rerouteToHome = () => {
    navigate("/");
  };

  const sendData = () => {
    axios
      .post("http://localhost:5000/submissions", answers)
      .then((response) => {
        setUserDidSubmit(true);
        return response.data;
      })
      .catch((error) =>
        alert("There was an issue sending your request. Please try again later")
      );
  };

  return (
    <>
      {routeResult(currentQuestion, rerouteToHome, userDidSubmit) || (
        <NotFound></NotFound>
      )}
      {page !== "confirmation" && (
        <Button
          onClick={progressPage}
          className={classes.root}
          variant="outlined"
          disabled={!isNextReady}
        >
          {" "}
          {page === "index" ? "Begin Survey" : "Next"}
        </Button>
      )}

      {page === "confirmation" && (
        <Button
          disabled={userDidSubmit}
          onClick={sendData}
          className={classes.root}
          variant="outlined"
        >
          Submit
        </Button>
      )}
    </>
  );
};

export default Questions;
