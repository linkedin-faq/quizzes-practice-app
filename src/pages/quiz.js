import React, { useEffect, useContext } from "react";
import Head from "next/head";
import Router from "next/router";
import Questions from "components/Questions";
import { QuizContext } from "contexts/quiz/reducer";
const quiz = () => {
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
      {quizData.length > 0 && <Questions quizData={quizData} />}
    </div>
  );
};

export default quiz;
