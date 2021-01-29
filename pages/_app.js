import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import db from '../db.json';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    color: ${({ theme }) => theme.colors.contrastText};
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    margin: 0;
    padding: 0;
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
`

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
      <title> Quizmica </title>
      <link rel="shortcut icon" href="/favicon.png" />
      
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}