import { makeStyles } from "@material-ui/core/styles";
import { useContext, useState, useEffect } from "react";
import {
  QuestionsContext,
  RoutingContext,
  AnswersContext,
} from "../../../store/store";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TreatTypeSelect = ({ rerouteToHome }) => {
  const [questions] = useContext(QuestionsContext);
  const [route] = useContext(RoutingContext);
  const [answers, dispatch] = useContext(AnswersContext);
  const [topping, setTopping] = useState(answers[route]);
  const [isOther, setIsOther] = useState(false);

  useEffect(() => {
    setTopping(answers[route]);
    if (!answers.email) rerouteToHome();
  }, [answers, rerouteToHome, route]);

  let classes = useStyles();

  let question = questions[route] || { choices: [] };

  let selectItems = question.choices.map((choice, idx) => (
    <MenuItem key={idx} value={choice}>
      {choice}
    </MenuItem>
  ));
  selectItems.push(<MenuItem value="Other">Other</MenuItem>);

  return (
    <>
      <h2>{question.prompt}</h2>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Please Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={topping}
          onChange={(e) => {
            setTopping(e.target.value);
            if (e.target.value === "Other") setIsOther(true);
            else setIsOther(false);
            dispatch({
              type: "ADD_ANSWER",
              payload: { topping: e.target.value },
            });
          }}
        >
          {selectItems}
        </Select>
      </FormControl>
      {isOther && (
        <form noValidate autoComplete="off">
          <TextField
            id="topping_other"
            label="Other"
            onChange={(e) => {
              dispatch({
                type: "ADD_ANSWER",
                payload: { topping: e.target.value },
              });
            }}
          />
        </form>
      )}
    </>
  );
};

export default TreatTypeSelect;
