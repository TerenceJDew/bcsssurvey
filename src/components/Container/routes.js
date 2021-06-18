import Registration from "../Registration";
import Questions from "../Questions";
 
 const routes = {
    "/": () => (updateEmail) => <Registration updateEmail={updateEmail} />,
    "/survey*": () => () => <Questions />,
  };

  export default routes