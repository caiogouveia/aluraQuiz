import { useState, React, useEffect } from 'react';
import Link from 'next/router'
import QuizBackground from '../src/Components/QuizBackground';
import QuizContainer from '../src/Components/QuizContainer';
import QuizLogo from '../src/Components/QuizLogo';
import Widget from '../src/Components/Widget';
import Button from '../src/Components/Button';
import db from '../src/db.json';

function ResultWidget() {
  return (
    <Widget>
      <Widget.Header>
        Você acertou X questões.
      </Widget.Header>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        Desafio do loading?
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit
}) {
  return (
    <Widget>
      <Widget.Header>
        {/* Backlink? */}
        <Link href='/'>Voltar</Link>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img scr={question.image} />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
          <form 
            onSubmit={(event)=>{
              event.preventDefault();
              onSubmit();
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex)=>{
              const alternativeId = `alternative__${alternativeIndex}`;
              return(
                <Widget.Topic 
                  as="label"
                  htmlFor={alternativeId}
                >
                    <input 
                      id={alternativeId}
                      name={questionId}
                      type="radio"
                    />
                        {alternative}
                </Widget.Topic>
              );
            })}
                  <Button type="submit">
                    Confirmar
                    </Button>
            </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
};

export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  useEffect(()=>{
    setTimeout(()=>{
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex +1;
    if(nextQuestion < totalQuestions){
      setCurrentQuestion(nextQuestion);
    }else{
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ &&
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
          />
        }
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget />}
      </QuizContainer>
    </QuizBackground>
  );
}
