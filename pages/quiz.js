/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';

import AlternativesForm from '../src/components/AlternativesForm'
import Button from '../src/components/Button';
import db from '../db.json';
import GitHubCorner from '../src/components/GitHubCorner';
import LoadingSpinner from '../src/components/LoadingSpinner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';

function LoadingWidget() {
    return (
      <Widget>
          <Widget.Content>
            <LoadingSpinner />
          </Widget.Content>
      </Widget>
    );
  }

  function ResultWidget( {results} ) {
    return (
      <Widget>
        <Widget.Header>
          Parabéns! Você completou o Quiz!
        </Widget.Header>
  
        <Widget.Content>
          <p> Você acertou
            {' '}
            { results.reduce((somatoriaAtual, resultAtual) => {
              const isAcerto = resultAtual === true;
              if(isAcerto) {
                return somatoriaAtual +1;
              }
              return somatoriaAtual;
            },0)}
            {/* outro método:
            {results.filter((x) => x).lenght}
            */}
            {' '}
            questões!
          </p>
          <ul>
            {results.map((result, index) => (
              <li key={`result__${result}`}>
                #{' '}{index+1}{' '}
                Resultado: {result == true ? 'Acertou' : 'Errou'}
              </li>
            ))}
          </ul>
          <div>
            Estamos contando seus pontos! Volte mais tarde!
          </div>
          <LoadingSpinner/>
        </Widget.Content>
      </Widget>      
      
    );
  }
  
  function QuestionWidget({
    question,
    questionIndex,
    totalQuestions,
    onSubmit,
    addResult,
  }) {
    //começa com undefined mas opta-se por deixar explicito
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false); 
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;


    return (
      <Widget>
        <Widget.Header>
          {/* <BackLinkArrow href="/" /> */}
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h3>
        </Widget.Header>
  
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>
  
          <AlternativesForm
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              setIsQuestionSubmitted(true);
              setTimeout(()=> {
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmitted(false);
                setSelectedAlternative(undefined);
              }, 2 * 1000);
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;
              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmitted && alternativeStatus}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                    type="radio"
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </Button>
            {/* poderia tbm usar op ternário para simplificar */}
            {isQuestionSubmitted && isCorrect && <p>Você acertou!</p>}
            {isQuestionSubmitted && !isCorrect && <p>Você errou!</p>}
          </AlternativesForm>
        </Widget.Content>
      </Widget>
    );
  }
  
  const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
  };
  export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function addResult(result){
      //push de forma "imutável"
      setResults([
        ...results,
        result,
      ]);
    }
  
    React.useEffect(() => {
      setTimeout(() => {
        setScreenState(screenStates.QUIZ);
      }, 1 * 1000);
    }, []);
  
    function handleSubmitQuiz() {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < totalQuestions) {
        setCurrentQuestion(nextQuestion);
      } else {
        setScreenState(screenStates.RESULT);
      }
    }
  
    return (
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )}
  
          {screenState === screenStates.LOADING && <LoadingWidget />}
  
          {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/LiniiS" />
      </QuizBackground>
    );
}