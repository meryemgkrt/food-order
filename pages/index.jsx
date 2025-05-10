import Head from "next/head";
import "../styles/globals.css";
import Home from "./home/Index";
import Header from "@/components/layout/Header";
import About from "@/components/About";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Font Awesome'un CSS'ini yükleyin
import axios from "axios";
import Categories from "@/components/admin/Categories";
config.autoAddCss = false; // Font Awesome'un CSS'ini otomatik eklemesini devre dışı bırakıyoruz

export default function App({ Component, pageProps, categoryList }) {
  return (
    <div className="scrollbar-custom">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>

      <Home categoryList={categoryList} />
    </div>
  );
}

export const getServerSideProps =async()=>{
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  return{
    props:{
      categoryList:res.data ? res.data : []
    }
  }
}
