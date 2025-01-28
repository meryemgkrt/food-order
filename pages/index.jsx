import Head from "next/head";
import "../styles/globals.css";
import Home from "./home/Index";
import Header from "@/components/layout/Header";
import About from "@/components/About";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Font Awesome'un CSS'ini yükleyin
config.autoAddCss = false; // Font Awesome'un CSS'ini otomatik eklemesini devre dışı bırakıyoruz

export default function App({ Component, pageProps }) {
  return (
    <div className="scrollbar-custom">
      <Head></Head>
      
      <Home />
      

    </div>
  );
}
