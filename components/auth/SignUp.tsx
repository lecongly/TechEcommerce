import Image from 'next/image';
import { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';

import { AppContext } from '../../context/AppContext';
import { UserContext } from '../../context/UserContext';
import { useForm } from '../../hooks/useForm';

import Input from 'components/core/input';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signUp } = useContext(UserContext);
  const { signUpModal, signInModal } = useContext(AppContext);
  const { setOpenSignUpModal } = signUpModal;
  const { setOpenSignInModal } = signInModal;

  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleSignUp = (e: any) => {
    e.preventDefault();
    signUp(values);
    if (isLoading) {
      setOpenSignUpModal(true);
    } else {
      setOpenSignUpModal(false);
    }
  };

  const handleChangeAuth = () => {
    setOpenSignUpModal(false);
    setOpenSignInModal(true);
  };

  return (
    <section className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-gray-900 bg-opacity-60 z-50 overflow-hidden backdrop-blur-md">
      <div className="bg-gray-200 w-3/5 content rounded-xl grid grid-cols-2 overflow-hidden relative">
        <button
          className="absolute top-2 right-2 h-10 w-10 flex items-center justify-center text-3xl border-2 rounded-md hover:bg-gray-200 duration-150 before:hover:cursor-pointer hover:cursor-pointer"
          onClick={() => setOpenSignUpModal(false)}
        >
          <FiX />
        </button>
        <div>
          <Image objectFit="cover" src={'/images/chip.svg'} alt="SignIn" quality={100} width={864} height={1280} />
        </div>
        <div className="flex flex-col items-center justify-center bg-white">
          <h1 className="text-2xl font-supremeMedium">Create account</h1>
          <span className="text-sm font-supremeMedium my-2">
            Already registered?
            <button onClick={() => handleChangeAuth()} className="ml-2 font-supremeMedium hover:underline text-sky-500">
              Sign In
            </button>
          </span>
          <form onSubmit={handleSignUp} className="max-w-lg w-full flex items-center justify-center flex-col p-4">
            <Input label="Name" name="name" type="text" value={values.name} onChange={handleChange} />
            <Input label="Email" name="email" type="email" value={values.email} onChange={handleChange} />
            <Input label="Password" name="password" type="password" value={values.password} onChange={handleChange} />
            <Input
              label="Confirm your password"
              name="password2"
              type="password"
              value={values.password2}
              onChange={handleChange}
            />

            <button className="py-2 rounded-lg mt-3 w-full bg-lime-300 font-supremeMedium text-base hover:bg-lime-400 duration-150">
              Create
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
