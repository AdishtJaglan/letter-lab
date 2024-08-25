import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
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
    { icon: IoSearch, text: "Search", path: "#" },
    { icon: IoPersonOutline, text: "Profile", path: "#" },
    { icon: IoSettingsOutline, text: "Settings", path: "#" },
    { icon: IoLogOutOutline, text: "Logout", path: "/home" },
  ];

  return (
    <div className="border-secondary-dark bg-primary-dark/30 text-primary-light ml-6 mt-6 h-auto place-self-start rounded-xl border p-3">
      {sidebarItems.map((item, index) => {
        const isSelected = location.pathname === item.path;
        return (
          <Link
            key={index}
            to={item.path}
            className={`relative flex cursor-none items-center rounded-lg px-4 py-3 ${
              isSelected ? "bg-primary-accent/10" : ""
            } hover:bg-primary-accent/10 transition-colors duration-300`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <item.icon className="text-primary-light h-auto w-5" />
            {hoveredIndex === index && (
              <span className="bg-secondary-dark text-primary-light absolute left-full z-50 ml-2 whitespace-nowrap rounded-md px-2 py-1 text-sm">
                {item.text}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
