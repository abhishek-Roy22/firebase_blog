import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/FirebaseConfig';
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      login(cred.user);
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return setError('email-already-in-use');
      } else {
        setError(error.message);
      }
    }
  };

  setTimeout(() => {
    setError(null);
  }, 5000);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="peer/email block w-full py-1.5 px-2 focus:outline-none text-gray-900 bg-transparent invalid:border-red-600 invalid:text-red-500 rounded-md border border-indigo-500 invalid:ring-1 ring-red-600 transition-all focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm sm:leading-6"
              />
              <p className="invisible peer-invalid/email:visible text-rose-500 text-sm transition-all mt-1">
                Please provide a valid email!
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md focus:outline-none py-1.5 px-2 text-gray-900 border border-indigo-500 shadow-sm  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {error && (
              <p className="text-rose-500 text-sm mt-1 text-center">{error}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
