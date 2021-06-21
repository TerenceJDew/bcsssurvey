import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { AnswersContext } from "../../../store/store";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";

import "./index.css";

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

//Form verification 
let loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a Valid Email")
    .required("This Field is required"),
});

const Registration = ({ updateEmail }) => {
  const [, dispatch] = useContext(AnswersContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  let classes = useStyles();

  let onEmailSubmit = (value) => {
    let email = value?.email;
    dispatch({ type: "ADD_ANSWER", payload: { email: email } });
    updateEmail();
  };

  return (
    <>
      <h2>Welcome to Big Corp Scoop Shop</h2>
      <h3>We want to give you free ice cream!</h3>
      <h4>
        All we need is an email and to know how you like your frozen treats:
      </h4>
      <form
        onSubmit={handleSubmit(onEmailSubmit)}
        className={classes.container}
      >
        <div className="email-ctr-div">
          <TextField
            id="topping_other"
            {...register("email")}
            label="Please Enter Email"
            helperText={errors.email?.message}
            error={errors?.email}
          />
        </div>
        <div className="email-ctr-div">
          <Button
            className={classes.root}
            type="submit"
            aria-label="submit"
            variant="outlined"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default Registration;
