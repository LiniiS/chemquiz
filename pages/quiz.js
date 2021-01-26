import React from 'react';


import QuizBackground from '../src/components/QuizBackground';
import Head from 'next/head';
import db from '../db.json'
import Widget from '../src/components/Widget';
import { QuizContainer } from '.';
import QuizLogo from '../src/components/QuizLogo';

export default function QuizPage() {
    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizLogo />
            <Head>
                <title> Desafios Químicos </title>
            </Head>
            <div>
                <p>Em construção!</p>
            </div>
        </QuizBackground>
    );
}
