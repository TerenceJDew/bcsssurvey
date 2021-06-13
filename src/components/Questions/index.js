import SurveyInformation from "./SurveyInformation";
import TreatTypeSelect from "./TreatTypeSelect";
import ToppingSelect from "./ToppingSelect";
import FlavorSelect from "./FlavorSelect";
import CupConeSelect from "./CupConeSelect";
import DipSelect from "./DipSelect";
import Confirmation from "./Confirmation";
import NotFound from "../NotFound";
import { useRoutes } from "hookrouter";

const Questions = () => {
  const routes = {
    "/": () => <SurveyInformation />,
    "/treattype": () => <TreatTypeSelect />,
    "/topping": () => <ToppingSelect />,
    "/flavor": () => <FlavorSelect />,
    "/cuporcone": () => <CupConeSelect />,
    "/dip": () => <DipSelect />,
    "/confirmation": () => <Confirmation />,
  };
 
  const routeResult = useRoutes(routes);

  return <div>{routeResult || <NotFound></NotFound>}</div>;
};

export default Questions;
