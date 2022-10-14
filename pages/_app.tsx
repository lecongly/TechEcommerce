import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../context/AppContext";
import { LayoutProvider } from "../context/LayoutContext";
import Header from "../components/layout/Header";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AppProvider>
      <LayoutProvider>
        {router.pathname.includes("/sign") ? <div></div> : <Header />}
        <Component {...pageProps} />
      </LayoutProvider>
    </AppProvider>
  );
}

export default MyApp;
