import Head from 'next/head';
import '../styles/globals.css';
import Home from './home/Index';
import Header from '@/components/layout/Header';



export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
       
      </Head>
      <Header/>
    
      <Home/>
    </>
  );
}
