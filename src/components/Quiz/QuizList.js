import React, { useState, useContext, useEffect } from 'react';
import {
  Box, Paper, Grid
} from '@material-ui/core';
import Router from 'next/router';
import { QuizContext } from 'contexts/quiz/reducer';
import { SET_QUIZ } from 'contexts/quiz/types';
import { makeStyles } from '@material-ui/core/styles';
import {AppContext} from 'contexts/app/reducer'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'rgb(234, 234, 234) 0px 0px 18px 1px',
    borderRadius: '30px',
    cursor: 'pointer'
  },
  text: {
    textTransform: 'capitalize',
    marginTop: '10px',
    fontSize: 'large'
  }
}));
const QuizList = () => {
  const classes = useStyles();
  const [{topics}] = useContext(AppContext)
  const [, quizDispatch] = useContext(QuizContext);

  const onQuizClick = (x, icon) => {
    const json = require(`./topics/${x.file}`);
    quizDispatch({
      type: SET_QUIZ,
      payload: {
        quizName: x.quiz_name,
        quizData: json,
        icon
      }
    });
    Router.push('/quiz');
  };

  


  return (
    <>
      <Box mt={3}>
        <Grid container spacing={3}>
          {topics.map((x) => {
            const img = `/assets/img/logo/${x.img}`;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}  key={x.id}>
                <Paper className={classes.paper} onClick={() => onQuizClick(x, img)}>
                  <div style={{
                    height: 100,
                    textAlign: "center"
                  }}>
                    <img
                      className="topic-logo"
                      src={img}
                      alt={x.quiz_name}
                      style={{
                        maxHeight: 100, 
                        maxWidth: 120,

                        position: "relative", 
                        top: "50%", 
                        transform: "translateY(-50%)"
                      }}
                    />
                  </div>
                  <p className={classes.text}>{x.quiz_name}</p>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default QuizList;
