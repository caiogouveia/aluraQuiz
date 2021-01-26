import React from 'react';
import {useRouter} from 'next/router';
import db from '../src/db.json';
import Head from 'next/head';
import QuizBackground from '../src/Components/QuizBackground';
import QuizContainer from '../src/Components/QuizContainer';
import QuizLogo from '../src/Components/QuizLogo';
import Widget from '../src/Components/Widget';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';

export default function Home() {
  const router = useRouter();
  const [nome, setNome] = React.useState('');
  return (
    <>
      <Head>
        <title>{db.title}</title>
        <meta name="title" content={db.title} />
        <meta name="description" content={db.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:title" content={db.title} />
        <meta property="og:description" content={db.description} />
        <meta property="og:image" content={db.bg} />

      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>

            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <form
                onSubmit={(event)=>{
                  event.preventDefault();
                  router.push(`/quiz?nome=${nome}`);
                }}
              >
                <input 
                  onChange={(event)=>{
                    console.log(event.target.value);
                    setNome(event.target.value);
                  }}
                  placeholder='Qual seu nome?'
                />
                <button type='submit' disabled={nome.lenght === 0}>Jogar {nome}</button>
                  </form>
            </Widget.Content>
          </Widget>
          <Footer />
          <GitHubCorner projectUrl='' />
        </QuizContainer>
      </QuizBackground>
    </>
  );
}
