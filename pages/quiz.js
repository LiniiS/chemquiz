import React from 'react';


import QuizBackground from '../src/components/QuizBackground';
import Head from 'next/head';
import db from '../db.json'
import Widget from '../src/components/Widget';
import { QuizContainer } from '.';

export default function QuizPage() {
    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title> Desafios Químicos </title>
            </Head>
            <div>
                <p>Em construção!</p>
            </div>
        </QuizBackground>
    );
}
