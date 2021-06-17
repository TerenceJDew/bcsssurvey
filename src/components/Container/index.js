import { useRoutes, navigate } from "hookrouter";
import Registration from "../Registration";
import Questions from "../Questions";
import NotFound from "../NotFound";

import "./index.css";

const routes = {
  "/": () => (updateEmail) => <Registration updateEmail={updateEmail} />,
  "/survey*": () => () => <Questions />,
};

const Container = () => {
  const Match = useRoutes(routes);

  const updateEmail = (userEmail) => {
    navigate("/survey/");
  };

  return (
    <>
      <div className="container">
        <div className="grid">
          <img
            style={{ height: "50px", width: "50px" }}
            alt="Home icon"
            src="https://image.flaticon.com/icons/png/512/686/686407.png"
          ></img>
        </div>
        <div className="question-container">
          {Match(updateEmail) || <NotFound></NotFound>}
        </div>
        <div className="bottom-bg-div"></div>
      </div>
    </>
  );
};

export default Container;
