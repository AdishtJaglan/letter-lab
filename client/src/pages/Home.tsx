import GlowCursor from "../components/GlowCursor";
import Navbar from "../components/Navbar";
import Landing from "../components/home/Landing";

const Home = () => {
  return (
    <>
      <Navbar />
      <GlowCursor />
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-primary-dark to-secondary-dark px-4 py-16 text-primary-light">
        <Landing />
      </div>
    </>
  );
};

export default Home;
