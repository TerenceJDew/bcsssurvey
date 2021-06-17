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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DipSelect = ({ rerouteToHome }) => {
  const [questions] = useContext(QuestionsContext);
  const [route] = useContext(RoutingContext);
  const [answers, dispatch] = useContext(AnswersContext);
  const [dip, setDip] = useState(answers[route]);

  useEffect(() => {
    setDip(answers[route]);
    if (!answers.email) rerouteToHome();
  }, [answers, rerouteToHome, route]);

  let classes = useStyles();

  let question = questions[route] || { choices: [] };

  let selectItems = question.choices.map((choice, idx) => (
    <MenuItem key={idx} value={choice}>
      {choice}
    </MenuItem>
  ));
  return (
    <>
      <h2>{question.prompt}</h2>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Please Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dip}
          onChange={(e) => {
            setDip(e.target.value);
            dispatch({ type: "ADD_ANSWER", payload: { dip: e.target.value } });
          }}
        >
          {selectItems}
        </Select>
      </FormControl>
    </>
  );
};

export default DipSelect;
