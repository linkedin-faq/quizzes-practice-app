import React from 'react';
import { Container} from '@material-ui/core';
import QuizList from './QuizList';

const Quiz = () => {

  return (
      <Container maxWidth={false}>
        <QuizList />
      </Container>
  );
};

export default Quiz;
