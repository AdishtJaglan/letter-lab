const Landing = () => {
  return (
    <>
      <div className="mx-auto mt-12 max-w-4xl px-4 text-center md:mt-24">
        <p className="mb-6 text-sm font-medium uppercase tracking-wide text-tertiary-light sm:text-base md:mb-8 md:text-lg lg:text-xl">
          generate <span className="text-secondary-accent">•</span> send{" "}
          <span className="text-primary-accentHover">•</span> personalize
          <span className="text-primary-accent">•</span> track{" "}
          <span className="text-tertiary-light">•</span> impress
        </p>
        <h1 className="mb-6 text-2xl font-extrabold leading-tight sm:text-3xl md:mb-8 md:text-4xl lg:text-5xl xl:text-6xl">
          <span className="pulsate inline-block bg-clip-text transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-primary-accent hover:to-secondary-accent hover:text-transparent">
            This
          </span>{" "}
          <span className="pulsate inline-block bg-clip-text transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-secondary-accent hover:to-primary-accent hover:text-transparent">
            document
          </span>{" "}
          <span className="pulsate inline-block bg-clip-text transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-primary-accent hover:to-secondary-accent hover:text-transparent">
            generator
          </span>{" "}
          <span className="pulsate inline-block bg-clip-text transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-secondary-accent hover:to-primary-accent hover:text-transparent">
            is
          </span>{" "}
          <span className="pulsate-no-hover inline-block bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent transition-all duration-300 ease-in-out hover:from-secondary-accent hover:to-primary-accent">
            ready
          </span>{" "}
          <span className="pulsate inline-block bg-clip-text transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-primary-accent hover:to-secondary-accent hover:text-transparent">
            to
          </span>{" "}
          <span className="pulsate inline-block bg-clip-text transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-secondary-accent hover:to-primary-accent hover:text-transparent">
            transform
          </span>{" "}
          <span className="pulsate inline-block bg-clip-text transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-primary-accent hover:to-secondary-accent hover:text-transparent">
            your
          </span>{" "}
          <span className="pulsate inline-block bg-clip-text transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-secondary-accent hover:to-primary-accent hover:text-transparent">
            communication
          </span>
          <span className="pulsate inline-block bg-clip-text text-primary-accent transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-primary-accent hover:to-secondary-accent hover:text-transparent">
            .
          </span>
        </h1>
        <p className="mb-8 text-lg text-tertiary-muted sm:text-xl md:mb-10 md:text-2xl">
          Elevate your professional documents with our tool
          <span className="font-black text-secondary-accent">.</span>
        </p>
        <button className="pulsate-no-hover transform cursor-none rounded-full bg-gradient-to-r from-primary-accentHover to-secondary-accent px-6 py-3 text-base font-bold text-primary-light transition duration-300 hover:scale-105 hover:from-primary-accent hover:to-secondary-accentHover hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:ring-opacity-50 sm:px-8 sm:py-4 sm:text-lg">
          Get Started Now
        </button>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center space-y-4 px-4 sm:flex-row sm:space-x-6 sm:space-y-0 md:mt-10">
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-2 text-tertiary-muted">? Star Rating</span>
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
          <span className="ml-2 text-tertiary-muted">? Users</span>
        </div>
      </div>
    </>
  );
};

export default Landing;
