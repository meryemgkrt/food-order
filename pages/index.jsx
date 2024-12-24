import Head from 'next/head';
import '../styles/globals.css';
import Home from './home/Index';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Electrolize&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Home/>
    </>
  );
}
