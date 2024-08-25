import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId =
      location.state?.userId || (token ? jwtDecode(token).userId : undefined);
    console.log(location.state);
    console.log(jwtDecode(token));
    console.log(userId);

    if (userId) {
      const fetchUserName = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUsername(response.data.data.username);
      };

      fetchUserName();
    }
  }, [location]);

  return (
    <div className="col-span-2 flex w-full items-center justify-between border-b border-secondary-dark bg-primary-dark/30 p-4 backdrop-blur-md">
      <p className="text-3xl font-black tracking-wide text-primary-light">
        Admin Dashboard
      </p>

      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-3 space-x-2">
          <h1 className="text-lg font-semibold text-primary-light sm:text-xl md:text-2xl">
            Hi, {username}!
          </h1>
        </div>

        <div className="relative">
          <div className="flex items-center space-x-2">
            <img
              src={"/profile-1.jpg"}
              className="h-8 w-8 rounded-full sm:h-10 sm:w-10 md:h-12 md:w-12"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
