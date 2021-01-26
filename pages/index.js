import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

/*
const BackgroundImage = styled.div`
  background-image:url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
 `;
*/

const Button = styled.button`
  background-color: #001970;
  border: 2px;
  border-radius: 3px;
  box-shadow: 0px 2px 2px darkblue;
  color: white;
  display: inline-block;
  margin-top: 15px;
  outline: 0;
  padding: 5px 15px;
  width: 100%;

`;
export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and(max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  //por regra o hook fica aqui
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title> Quizmica</title>
       </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
              <h1> Tudo sobre os elementos da vida em um Quiz! </h1>
          </Widget.Header>
          <Widget.Content>
            <p> Teste seus conhecimentos! </p>
            <form onSubmit= {function(infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('testando submission via react');
              //next cuida do router das paginas
              }}
            >
              <input
                onChange={function (infosDoEvento) {
                  console.log(infosDoEvento.target.value);
                  //State a ser observado
                  //name = infosDoEvento.target.value;
                  setName(infosDoEvento.target.value);
                }}

                placeholder="digite seu nome!" />
              <Button type="submit" disabled={name.length===0}>
                Jogar
                {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h2> Periodic Table Quiz</h2>

            <p> Desafie-se agora! </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LiniiS" />
    </QuizBackground>
  );
}
