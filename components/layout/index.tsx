import Head from "next/head";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { LayoutContext } from "../../context/LayoutContext";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import AlertNotification from "./AlertNotification";

interface Props {
  title: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children, title }: Props) => {
  const { signInModal, signUpModal } = useContext(AppContext);
  const { alert, alertMessage, alertType } = useContext(LayoutContext);
  const { openSignInModal } = signInModal;
  const { openSignUpModal } = signUpModal;
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta
          name="description"
          content="TechEcommerce is a personal project created by @lecongly."
        />
      </Head>
      <main className="relative w-full h-full">
        <div className="w-full content py-5">{children}</div>
        {openSignInModal && <SignIn />}
        {openSignUpModal && <SignUp />}
        {alert && <AlertNotification message={alertMessage} type={alertType} />}
      </main>
    </>
  );
};

export default Layout;
