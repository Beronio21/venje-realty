"use client";
import Link from "next/link";
import { useState } from "react";
import SocialSignIn from "../social-button/SocialSignIn";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Logo from "../../layout/header/logo";


const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
  });

  // form handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = { username: "", password: "" };
    if (!loginData.username) errors.username = "Username is required.";
    if (!loginData.password) errors.password = "Password is required.";
    if (errors.username || errors.password) {
      setValidationErrors(errors);
      return;
    }

    const validUsers = [
      { username: "admin", password: "admin123" },
      { username: "user", password: "user" },
    ];
    const match = validUsers.find(
      (u) => u.username === loginData.username && u.password === loginData.password
    );
    if (!match) {
      setValidationErrors({ username: "Invalid credentials. Check the demo credentials below.", password: "" });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify({ user: loginData.username }));
      }
      if (loginData.username === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="pt-40 pb-32 bg-light dark:bg-darkmode">
      <div className="pt-9 flex justify-center items-center text-center ">
        <div className="max-w-lg w-full bg-white dark:bg-semidark px-8 py-14 sm:px-12 md:px-16 rounded-lg">
          <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
            <Logo />
          </div>



          <SocialSignIn />

          <span className="z-1 relative my-8 block text-center">
            <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border"></span>
            <span className="text-primary/40 dark:text-border relative z-10 inline-block bg-white px-3 text-base dark:bg-semidark">
              OR
            </span>
            <Toaster />
          </span>

          <form onSubmit={handleSubmit}>
            <div className="mb-[22px]">
              <input
                required
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                className="w-full rounded-md border placeholder:text-gray-400  border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition  focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
              />
              {validationErrors.username && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.username}</p>
              )}
            </div>
            <div className="mb-[22px]">
              <input
                required
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition  focus:border-primary focus-visible:shadow-none dark:border-border_color dark:text-white dark:focus:border-primary"
              />
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary hover:bg-primary/80 dark:hover:!bg-darkprimary px-5 py-3 text-base text-white transition duration-300 ease-in-out "
              >
                Sign In
              </button>
            </div>

            <div className="mb-9 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-sm text-gray dark:text-gray-300">
              <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Demo Credentials</p>
              <p className="mb-1">👤 User &nbsp;&nbsp; <span className="font-mono font-bold text-midnight_text dark:text-white">user</span> / <span className="font-mono font-bold text-midnight_text dark:text-white">user</span></p>
              <p>🔑 Admin &nbsp; <span className="font-mono font-bold text-midnight_text dark:text-white">admin</span> / <span className="font-mono font-bold text-midnight_text dark:text-white">admin123</span></p>
            </div>
          </form>

          <Link
            href="/forgot-password"
            className="mb-2 inline-block text-base text-dark hover:text-primary dark:text-white dark:hover:text-primary"
          >
            Forget Password?
          </Link>
          <p className="text-body-secondary text-base">
            Not a member yet?{" "}
            <Link href="/signup" className="text-body-secondary hover:text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;