import Head from "next/head";
import "../styles/globals.css";
import Home from "./home/Index";
import Header from "@/components/layout/Header";
import About from "@/components/About";

export default function App({ Component, pageProps }) {
  return (
    <div className="scrollbar-custom">
      <Head></Head>
      
      <Home />
      

    </div>
  );
}
