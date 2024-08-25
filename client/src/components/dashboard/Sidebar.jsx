import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUserPlus } from "react-icons/fi";
import {
  IoSearch,
  IoSettingsOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";

export default function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  const sidebarItems = [
    { icon: FiHome, text: "Home", path: "/dashboard" },
    { icon: FiUserPlus, text: "Add", path: "#" },
    { icon: IoSearch, text: "Search", path: "#" },
    { icon: IoPersonOutline, text: "Profile", path: "#" },
    { icon: IoSettingsOutline, text: "Settings", path: "#" },
    { icon: IoLogOutOutline, text: "Logout", path: "/home" },
  ];

  return (
    <div className="ml-2 mt-2 h-auto place-self-start rounded-xl border border-secondary-dark bg-primary-dark/30 p-2 text-primary-light sm:ml-4 sm:mt-4 sm:p-3 md:ml-6 md:mt-6">
      {sidebarItems.map((item, index) => {
        const isSelected = location.pathname === item.path;
        return (
          <Link
            key={index}
            to={item.path}
            className={`relative flex cursor-none items-center rounded-lg px-2 py-2 sm:px-3 sm:py-3 md:px-4 ${
              isSelected ? "bg-primary-accent/10" : ""
            } transition-colors duration-300 hover:bg-primary-accent/10`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <item.icon className="h-auto w-4 text-primary-light sm:w-5" />
            {hoveredIndex === index && (
              <span className="absolute left-full z-50 ml-2 whitespace-nowrap rounded-md bg-secondary-dark px-2 py-1 text-xs text-primary-light sm:text-sm">
                {item.text}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
