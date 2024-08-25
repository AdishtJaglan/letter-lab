import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/dashboard/Layout";
import GlowCursor from "../components/GlowCursor";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.isLoggedIn) {
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        navigate(".", {
          state: { ...location.state, isLoggedIn: false },
          replace: true,
        });
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <>
      <GlowCursor />
      <Layout>
        <ToastContainer />
        <h1 className="text-primary-light">hello there</h1>
      </Layout>
    </>
  );
};

export default Dashboard;
