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

const ScoopFlavorSelect = ({ rerouteToHome }) => {
  const [questions] = useContext(QuestionsContext);
  const [route] = useContext(RoutingContext);
  const [answers, dispatch] = useContext(AnswersContext);
  const [scoopflavor, setScoopFlavor] = useState(answers[route]);
 

  useEffect(() => {
    setScoopFlavor(answers[route]);
    if (!answers.email) rerouteToHome();
  }, [answers, rerouteToHome, route]);

  let classes = useStyles();

  let question = questions[route] || { choices: [] };

  let selectItems = question.choices.map((choice) => (
    <MenuItem value={choice}>{choice}</MenuItem>
  ));
  selectItems.push(<MenuItem value="Other">Other</MenuItem>);
  return (
    <>
      <pre>{question.prompt}</pre>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Please Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={scoopflavor}
          onChange={(e) => {
            setScoopFlavor(e.target.value);
            dispatch({
              type: "ADD_ANSWER",
              payload: { scoopflavor: e.target.value },
            });
          }}
        >
          {selectItems}
        </Select>
      </FormControl>
      {scoopflavor === "Other" && <form noValidate autoComplete="off">
        <TextField id="topping_other" label="Other" />
      </form>}
    </>
  );
};

export default ScoopFlavorSelect;
