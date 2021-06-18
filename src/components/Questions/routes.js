import SurveyInformation from "./SurveyInformation";
import TreatTypeSelect from "./TreatTypeSelect";
import ToppingSelect from "./ToppingSelect";
import FlavorSelect from "./FlavorSelect";
import ScoopFlavorSelect from "./ScoopFlavorSelect";
import CupConeSelect from "./CupConeSelect";
import DipSelect from "./DipSelect";
import Confirmation from "./Confirmation";
 
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

  export default routes