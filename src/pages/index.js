import React, { useState, useContext } from 'react';
import Head from "next/head";
import Quiz from "components/Quiz";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from 'contexts/app/reducer'
import { SET_TOPICS } from 'contexts/app/types'
import SearchBar from "components/Searchbar";
import quizData from 'Data/quiz';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "4rem",
    textAlign: "center",
    marginBottom: theme.spacing(),
    textAlign: 'center'
  },

  footer: {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [, appDispatch] = useContext(AppContext)

  const [searchValue, setSearchValue] = useState('');

  const onSearchbarInputChange = (e) => {
    const val =e.target.value
    setSearchValue(val);
    const newTopics = quizData.filter(x => x.quiz_name.includes(val));
    appDispatch({
      type: SET_TOPICS,
      payload: newTopics
    })
   }
  return (
    <Container>
      <Head>
        <title>Khelo Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h1" className={classes.title}>
          Welcome to <b>Khelo Quiz!</b>
        </Typography>
        <div style={{textAlign: 'center'}}>
          <SearchBar onChangeEvent={onSearchbarInputChange} value={searchValue}/>
        </div>

        <Quiz />
      </main>
    </Container>
  );
}
