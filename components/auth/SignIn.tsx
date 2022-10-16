import { useContext, useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

import { useForm } from "../../hooks/useForm";
import Input from "../core/input";
import { AppContext } from "../../context/AppContext";
import { UserContext } from "../../context/User.Context";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(UserContext);
  const { signUpModal, signInModal } = useContext(AppContext);
  const { setOpenSignUpModal } = signUpModal;
  const { setOpenSignInModal } = signInModal;

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    signIn(values);
    setIsLoading(false);
    if (isLoading) {
      setOpenSignInModal(true);
    } else {
      setOpenSignInModal(false);
    }
  };

  const handleChangeAuth = () => {
    setOpenSignInModal(false);
    setOpenSignUpModal(true);
  };
  return (
    <motion.section
      className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-gray-900 bg-opacity-60 z-50 overflow-hidden backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="bg-gray-200 w-3/5 content rounded-xl grid grid-cols-2 overflow-hidden relative">
        <button
          className="absolute top-2 right-2 h-10 w-10 flex items-center justify-center text-3xl border-2 rounded-md hover:bg-gray-200 duration-150 before:hover:cursor-pointer hover:cursor-pointer"
          onClick={() => setOpenSignInModal(false)}
        >
          <FiX />
        </button>
        <div>
          <Image
            objectFit="cover"
            src={"/images/drone.png"}
            alt="SignIn"
            quality={100}
            width={900}
            height={1100}
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-white">
          <h1 className="text-2xl font-supremeMedium">Sign In</h1>
          <span className="text-sm font-supremeMedium my-2">
            Don&apos;t have account yet?
            <button
              onClick={() => handleChangeAuth()}
              className="ml-2 font-supremeMedium hover:underline text-sky-500"
            >
              Sign Up
            </button>
          </span>
          <form
            onSubmit={handleSignIn}
            className="max-w-lg w-full flex items-center justify-center flex-col p-4"
          >
            <Input
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />

            <button className="py-2 rounded-lg mt-3 w-full bg-lime-300 font-supremeMedium text-base hover:bg-lime-400 duration-150">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default SignIn;
