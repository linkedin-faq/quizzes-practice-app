import React, { useEffect, useContext } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from 'next/link'
import { Typography, makeStyles, Box, Button } from "@material-ui/core";
import Questions from "components/Questions";
import { QuizContext } from "contexts/quiz/reducer";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(),
    textTransform: 'capitalize',
    marginTop: theme.spacing()
  },
}));

const quiz = () => {
  const classes = useStyles();
  const [{ quizData, quizName, icon }] = useContext(QuizContext);
  useEffect(() => {
    if (!quizName) {
      Router.push("/");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>{quizName}</title>
        {icon && <link rel="icon" href={icon} />}
      </Head>
      <Box style={{display: 'flex', justifyContent: 'space-around'}}>
        <Typography variant="h3" className={classes.title} >
          {quizName}
        </Typography>
        
        <Link href="/">
          <Button color="secondary">
            All Quiz
        </Button>
        </Link>
      </Box>
      
      {quizData.length > 0 && <Questions quizData={quizData} />}
    </div>
  );
};

export default quiz;
