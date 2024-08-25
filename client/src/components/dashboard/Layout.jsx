import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="grid h-screen w-screen grid-cols-[auto_5fr] grid-rows-[auto_1fr] bg-gradient-to-br from-primary-dark to-secondary-dark md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr]">
        {/* Navbar */}
        <Navbar />

        {/* Sidebar */}
        <Sidebar className="hidden md:block" />

        {/* Main Content */}
        <div className="overflow-y-auto overflow-x-hidden p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
