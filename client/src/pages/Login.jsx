import GlowCursor from "../components/GlowCursor";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";

const LoginPage = () => {
  return (
    <div className="from-primary-dark via-secondary-dark to-primary-accent flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <GlowCursor />
      <div className="bg-primary-light absolute inset-0 opacity-10 backdrop-blur-lg backdrop-filter"></div>
      <div className="bg-primary-light z-10 w-full max-w-md overflow-hidden rounded-2xl bg-opacity-20 shadow-xl backdrop-blur-xl backdrop-filter">
        <div className="p-8">
          <h2 className="text-primary-light mb-6 text-center text-3xl font-bold">
            Welcome Back
          </h2>
          <form>
            <div className="space-y-6">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 h-auto w-4 -translate-y-2 text-white/60" />
                <input
                  type="email"
                  id="email"
                  className="bg-primary-light text-primary-light placeholder-primary-light focus:ring-primary-accent w-full cursor-none rounded-lg bg-opacity-10 px-4 py-3 pl-10 placeholder-opacity-60 focus:outline-none focus:ring-2"
                  placeholder="you@example.com"
                />
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 h-auto w-4 -translate-y-2 text-white/60" />
                <input
                  type="password"
                  id="password"
                  className="bg-primary-light text-primary-light placeholder-primary-light focus:ring-primary-accent w-full cursor-none rounded-lg bg-opacity-10 px-4 py-3 pl-10 placeholder-opacity-60 focus:outline-none focus:ring-2"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex cursor-none items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="text-primary-accent focus:ring-primary-accent border-primary-light bg-primary-light h-4 w-4 cursor-none rounded bg-opacity-10"
                />
                <label
                  htmlFor="remember-me"
                  className="text-primary-light ml-2 block cursor-none text-sm"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="cursor-none font-medium text-blue-800 hover:text-blue-950"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="from-primary-accent to-secondary-accent text-primary-light hover:from-primary-accentHover hover:to-secondary-accentHover focus:ring-primary-accent w-full cursor-none rounded-lg bg-gradient-to-r px-4 py-3 font-bold transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="my-4 flex w-full items-center justify-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-white">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="border-primary-light bg-primary-light text-primary-light inline-flex w-full cursor-none justify-center rounded-md border bg-opacity-10 px-4 py-2 text-sm font-medium shadow-sm hover:bg-opacity-20"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <FcGoogle className="h-auto w-8" />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="border-primary-light bg-primary-light text-primary-light inline-flex w-full cursor-none justify-center rounded-md border bg-opacity-10 px-4 py-2 text-sm font-medium shadow-sm hover:bg-opacity-20"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <FaGithub className="h-auto w-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary-light bg-opacity-10 px-8 py-6">
          <p className="text-primary-light text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="cursor-none font-medium text-blue-800 hover:text-blue-950"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
