import db from '../src/db.json';
import QuizBackground from '../src/Components/QuizBackground';
import QuizContainer from '../src/Components/QuizContainer';
import QuizLogo from '../src/Components/QuizLogo';
import Widget from '../src/Components/Widget';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import Head from 'next/head'

export default function Quiz() {
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
                <h1>Página de quiz !</h1>
              </Widget.Header>
              <Widget.Content>
              </Widget.Content>
            </Widget>
            <Footer />
            <GitHubCorner projectUrl='' />
          </QuizContainer>
        </QuizBackground>
      </>
    );
  }