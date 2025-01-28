import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.css";
import Layout from "@/layout/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // FontAwesome CSS'i yükleyin
config.autoAddCss = false;
import { Provider } from "react-redux";
import store from "../redux/store";
export default function App({ Component, pageProps }) {
  return(
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
  )
  
}
