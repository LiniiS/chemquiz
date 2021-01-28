import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Button from '../src/components/Button';
import db from '../db.json';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

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
              <Input
                name="nomeDoJogador"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="digite seu nome para jogar"
                value={name}
              />
              <Button type="submit" disabled={name.length===0}>
                {`Jogar ${name}`}              
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
