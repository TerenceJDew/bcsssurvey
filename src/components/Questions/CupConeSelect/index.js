import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect, useState } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import {
  QuestionsContext,
  RoutingContext,
  AnswersContext,
  ProgressContext,
} from "../../../store/store";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CupConeSelect = ({ rerouteToHome }) => {
  const [questions] = useContext(QuestionsContext);
  const [route] = useContext(RoutingContext);
  const [answers, dispatch] = useContext(AnswersContext);
  const [, setIsNextReady] = useContext(ProgressContext);
  const [cupcone, setCupCone] = useState(answers[route]);

  useEffect(() => {
    if (!answers[route]) setIsNextReady(false);
    setCupCone(answers[route]);
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
          value={cupcone}
          onChange={(e) => {
            setCupCone(e.target.value);
            setIsNextReady(true);
            dispatch({
              type: "ADD_ANSWER",
              payload: { cupcone: e.target.value },
            });
          }}
        >
          {selectItems}
        </Select>
      </FormControl>
    </>
  );
};

export default CupConeSelect;
