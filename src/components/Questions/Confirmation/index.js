import { useEffect, useContext } from "react";
import { AnswersContext, RoutingContext } from "../../../store/store";

const Confirmation = ({ rerouteToHome, userDidSubmit }) => {
  const [route] = useContext(RoutingContext);
  const [answers] = useContext(AnswersContext);

  useEffect(() => {
    if (!answers.email) rerouteToHome();
  }, [rerouteToHome]);

  return (
    <>
      <h2>{userDidSubmit ?"You're All Set!":"Those were some great answers!"}</h2>
      <h3>{userDidSubmit ? "Head on over to your email to see your coupon": "Now just click sudmit to recieve your free ice cream!"}</h3>
    </>
  );
};

export default Confirmation;
