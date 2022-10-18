import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../context/AppContext";
import { LayoutProvider } from "../context/LayoutContext";
import Header from "../components/layout/Header";
import { UserProvider } from "../context/User.Context";
import { AdminProvider } from "../context/AdminContext";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AppProvider>
      <LayoutProvider>
        <UserProvider>
          <AdminProvider>
            {router.pathname.includes("/sign") ? <div></div> : <Header />}
            <Component {...pageProps} />
          </AdminProvider>
        </UserProvider>
      </LayoutProvider>
    </AppProvider>
  );
}

export default MyApp;
