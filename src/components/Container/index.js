import { useRoutes, navigate } from "hookrouter";
import NotFound from "../NotFound";
import routes from "./routes"
import "./index.css";



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
            style={{ height: "100px", width: "180px" }}
            alt="Home icon"
            src="https://drive.google.com/uc?id=1Z4_EoZe9BSxjx5twtY2W5lMrpnODMY-5"
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
