const Landing = () => {
  return (
    <>
      <div className="mt-24 max-w-4xl text-center">
        <p className="text-tertiary-light mb-8 text-lg font-medium uppercase tracking-wide sm:text-xl md:text-2xl">
          generate <span className="text-secondary-accent">•</span> send{" "}
          <span className="text-primary-accentHover">•</span> personalize
          <span className="text-primary-accent">•</span> track{" "}
          <span className="text-tertiary-light">•</span> impress
        </p>
        <h1 className="mb-8 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="hover:text-primary-accent pulsate inline-block transition-colors duration-300 ease-in-out">
            This
          </span>{" "}
          <span className="hover:text-secondary-accent pulsate inline-block transition-colors duration-300 ease-in-out">
            document
          </span>{" "}
          <span className="hover:text-primary-accent pulsate inline-block transition-colors duration-300 ease-in-out">
            generator
          </span>{" "}
          <span className="hover:text-secondary-accent pulsate inline-block transition-colors duration-300 ease-in-out">
            is
          </span>{" "}
          <span className="from-primary-accent to-secondary-accent hover:from-secondary-accent hover:to-primary-accent pulsate-no-hover inline-block bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ease-in-out">
            ready
          </span>{" "}
          <span className="hover:text-primary-accent pulsate inline-block transition-colors duration-300 ease-in-out">
            to
          </span>{" "}
          <span className="hover:text-secondary-accent pulsate inline-block transition-colors duration-300 ease-in-out">
            transform
          </span>{" "}
          <span className="hover:text-primary-accent pulsate inline-block transition-colors duration-300 ease-in-out">
            your
          </span>{" "}
          <span className="hover:text-secondary-accent pulsate inline-block transition-colors duration-300 ease-in-out">
            communication
          </span>
          <span className="text-primary-accent hover:text-secondary-accent pulsate inline-block transition-colors duration-300 ease-in-out">
            .
          </span>
        </h1>
        <p className="text-tertiary-muted mb-10 text-xl sm:text-2xl">
          Elevate your professional documents with our tool
          <span className="text-secondary-accent font-black">.</span>
        </p>
        <button className="from-primary-accentHover pulsate-no-hover to-secondary-accent hover:from-primary-accent hover:to-secondary-accentHover text-primary-light focus:ring-secondary-accent transform cursor-none rounded-full bg-gradient-to-r px-8 py-4 text-lg font-bold transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50">
          Get Started Now
        </button>
      </div>
      <div className="mt-10 flex space-x-6">
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-tertiary-muted ml-2">? Star Rating</span>
        </div>
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-tertiary-muted ml-2">? Users</span>
        </div>
      </div>
    </>
  );
};

export default Landing;
