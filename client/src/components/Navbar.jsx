const Navbar = () => {
  return (
    <nav className="fixed left-1/2 top-5 flex w-4/5 -translate-x-1/2 transform items-center justify-between rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-10 px-4 shadow-lg backdrop-blur-md">
      <div>
        <h2 className="p-3 text-3xl font-black text-white">
          Letter Lab
          <span className="text-primary-accent text-3xl font-black">.</span>
        </h2>
      </div>
      <div>
        <p className="group relative p-3 text-lg font-bold text-white">
          <span className="text-lg font-bold">Login</span>
          <span className="bg-primary-accent absolute bottom-3 left-3 h-0.5 w-0 transition-all duration-300 ease-out group-hover:w-[calc(100%-1.3rem)]"></span>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
