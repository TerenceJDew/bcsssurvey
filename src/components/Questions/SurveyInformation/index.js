import { useEffect, useContext } from "react";
import { AnswersContext, RoutingContext } from "../../../store/store";

const SurveyInformation = ({ rerouteToHome }) => {

  const [route] = useContext(RoutingContext);
  const [answers, dispatch] = useContext(AnswersContext);

  useEffect(() => {
    if (!answers.email) rerouteToHome();
  }, [rerouteToHome]);

  return (
    <>
      <h2>Its Smooth Sailing to Free Scoop Land</h2>
      <h3>We'll just ask you a few questions about your sweet tooth </h3>
    </>
  );
};

export default SurveyInformation;
