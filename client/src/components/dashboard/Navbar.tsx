import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId =
      location.state?.userId ||
      (token ? jwtDecode<CustomJwtPayload>(token).userId : undefined);

    if (userId) {
      const fetchUserName = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setPfp(response.data.data.profilePicture.url);
        setUsername(response.data.data.username);
      };

      fetchUserName();
    }
  }, [location]);

  return (
    <div className="col-span-full flex w-full flex-wrap items-center justify-between border-b border-secondary-dark bg-primary-dark/30 p-4 backdrop-blur-md">
      <p className="text-2xl font-black tracking-wide text-primary-light sm:text-3xl">
        Admin Dashboard
      </p>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <h1 className="text-sm font-semibold text-primary-light sm:text-lg md:text-xl">
          Hi, {username}!
        </h1>

        <div className="relative">
          <img
            src={pfp ? pfp : "/profile-1.jpg"}
            className="h-8 w-8 rounded-full sm:h-10 sm:w-10"
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
