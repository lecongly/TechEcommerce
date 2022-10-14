import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../context/AppContext";
import { LayoutProvider } from "../context/LayoutContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <LayoutProvider>
        <Component {...pageProps} />
      </LayoutProvider>
    </AppProvider>
  );
}

export default MyApp;
