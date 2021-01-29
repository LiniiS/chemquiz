import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import Button from '../src/components/Button';
import db from '../db.json';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Link from '../src/components/Link';
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
        <title>Quizmica</title>
       </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{delay: 0.2, duration: 0.7 }}
          variants={{
            show:{opacity: 0.85, x:'0' },
            hidden: {opacity: 0, x: '-100%'},  
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
              <h1> Tudo sobre os elementos da vida em um Quiz! </h1>
          </Widget.Header>
          <Widget.Content>
            <p> Teste seus conhecimentos! </p>
            <form onSubmit= {function(infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            //  console.log('testando submission via react');
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
        <Widget
          as={motion.section}
          transition={{delay: 0.5, duration: 0.5 }}
          variants={{
            show:{opacity: 0.85},
            hidden: {opacity: 0},  
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1> Quizes da Galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.')
                return (
                  <li key={linkExterno}>
                    <Widget.Topic 
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName} `}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer 
        as={motion.section}
        transition={{delay: 0.8, duration: 0.7 }}
        variants={{
          show:{opacity: 0.85},
          hidden: {opacity: 0},  
        }}
        initial="hidden"
        animate="show" 
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LiniiS" />
    </QuizBackground>
  );
}
