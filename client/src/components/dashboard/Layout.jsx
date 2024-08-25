import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="from-primary-dark to-secondary-dark grid h-screen w-screen grid-cols-[1fr_12fr] grid-rows-[1fr_8fr] bg-gradient-to-br">
        {/* Navbar */}
        <Navbar />

        {/* Sidebar */}
        <Sidebar className="row-span-2" />

        {/* Main Content */}
        <div className="overflow-y-auto overflow-x-hidden p-6">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
