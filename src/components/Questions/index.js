import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import {
  Box,
  FormControlLabel,
  Paper,
  Typography,
  Button,
  RadioGroup,
  Radio,
  makeStyles,
} from "@material-ui/core";
// import BoxLayout from 'src/layouts/ContainerLayout/Box';
import LiveHelp from "@material-ui/icons/LiveHelp";

const defaultScore = 5;

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: "95%",
    margin: "0 auto",
  }),
  button: {
    pointerEvents: "none",
    boxShadow: "none",
  },
  questionMeta: {
    marginLeft: 10,
    display: "inline",
  },
  footer: {
    marginTop: "40px",
    display: "flex",
  },
  label: {
    wordWrap: 'break-word',
    whiteSpace: 'pre-line'
  }

}));
const Questions = ({ quizData }) => {
  const classes = useStyles();
  const [current, setCurrent] = useState(quizData[0]);
  const [scores, setScores] = useState(0);
  const currentQuestionIndex = useRef(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isFinish, setIsFinish] = useState(false);

  const onNext = () => {
    currentQuestionIndex.current++;
    setIsSubmit(false);
    setAnswer("");
    setCurrent(quizData[currentQuestionIndex.current]);
  };

  const onAnswerSelect = (e) => {
    if (isSubmit) {
      return;
    }
    setAnswer(Number(e.target.value));
  };

  const revealCorrect = () => {
    if (quizData[currentQuestionIndex.current].anwserIndex === answer) {
      setScores((score) => score + defaultScore);
    }
    setIsSubmit(true);
  };

  const isLastQuestion = currentQuestionIndex.current === quizData.length - 1;

  const onFinish = () => {
    setIsFinish(true);
  };
  const onRetake = () => {
    currentQuestionIndex.current = 0;
    setCurrent(quizData[currentQuestionIndex.current]);
    setScores(0);
    setIsSubmit(false);
    setAnswer("");
    setIsFinish(false);
    setTimeout(() => {
      Prism.highlightAll();
    }, 100);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Box mt={2}>
      <Box className="non-select-element">
        {isFinish ? (
          <div>
            <p>Thanks for taking the Quiz, your score ={scores}</p>
            <Button color="primary" onClick={onRetake}>
              Retake
            </Button>

            <Button color="secondary">Take another Test</Button>
          </div>
        ) : (
          <Paper className={classes.root} elevation={4}>
            <Typography component="p">
              <Button
                variant="fab"
                color="primary"
                aria-label="add"
                className={classes.button}
              >
                <LiveHelp />
              </Button>
              <span className={classes.questionMeta}>
                {" "}
                Question # {currentQuestionIndex.current + 1} /{" "}
                {quizData.length}
              </span>
            </Typography>

            <hr style={{ marginBottom: "20px" }} />

            <pre>
              <code
                className="language-javascript"
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {current.question}
              </code>
            </pre>

            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={answer}
              onChange={onAnswerSelect}
            >
              {current.options.map((opt, index) => (
                <FormControlLabel
                  style={{
                    ...(isSubmit
                      ? {
                        color:
                          index === current.anwserIndex ? "green" : "red",
                      }
                      : {}),
                  }}
                  value={index}
                  control={<Radio />}
                  label={opt}
                  classes={{label: classes.label}}
                />
              ))}
            </RadioGroup>
            <div className={classes.footer}>
              <Button
                onClick={revealCorrect}
                disabled={answer === "" || isSubmit}
                variant="raised"
                color="secondary"
              >
                Submit
              </Button>
              {isLastQuestion ? (
                <Button
                  onClick={onFinish}
                  disabled={!isSubmit}
                  variant="raised"
                  color="primary"
                  style={{ float: "right" }}
                >
                  Finish
                </Button>
              ) : (
                <Button
                  onClick={onNext}
                  disabled={!isSubmit}
                  variant="raised"
                  color="primary"
                  style={{ float: "right" }}
                >
                  Next
                </Button>
              )}
            </div>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Questions;
