import GlowCursor from "../components/GlowCursor";
import Navbar from "../components/Navbar";
import Landing from "../components/home/Landing";

const Home = () => {
  return (
    <>
      <Navbar />
      <GlowCursor />
      <div className="from-primary-dark to-secondary-dark text-primary-light flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br px-4 py-16">
        <Landing />
      </div>
    </>
  );
};

export default Home;
