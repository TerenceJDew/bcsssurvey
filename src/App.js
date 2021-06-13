import { useRoutes } from "hookrouter";

import Registration from "./components/Registration";
import Questions from "./components/Questions";
import NotFound from "./components/NotFound";

import "./App.css";

const routes = {
  "/": () => <Registration />,
  "/survey*": () => <Questions />,
};

function App() {
  const routeResult = useRoutes(routes);

  return <div className="App">{routeResult || <NotFound></NotFound>}</div>;
}

export default App;
