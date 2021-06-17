import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useContext } from "react";
import { AnswersContext } from "../../../store/store";

const Registration = ({ updateEmail }) => {
  const [answers, dispatch] = useContext(AnswersContext);

  return (
    <>
      <h2>Welcome to Big Corp Scoop Shop</h2>
      <h3>We want to give you free ice cream!</h3>
      <h4>
        All we need is an email and to know how you like your frozen treats:
      </h4>
      <div>
      <TextField id="topping_other" label="Email" />
      </div>
      <Button
        onClick={() => {
          let email = "terence.dew@gmail.com";
          updateEmail();
          dispatch({ type: "ADD_ANSWER", payload: { email: email } });
        }}
        variant="outlined"
      >
        Submit
      </Button>
    </>
  );
};

export default Registration;
