import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Bounce, Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  useEffect(() => {
    // document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="">
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
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
