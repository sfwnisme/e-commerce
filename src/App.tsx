import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    // document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="">
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        style={{
          fontSize: "12px",
          backdropFilter: "blur(21px)",
          backgroundColor: "red !important",
        }}
      />
    </div>
  );
};

export default App;
