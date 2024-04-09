import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import DashboardSideBar from "./DashboardSideBar";
import { useState } from "react";

const Dashboard = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className="min-h-screen">
      <DashboardNav setToggle={setToggle} />
      <div className="flex items-start justify-start gap-4">
        <DashboardSideBar toggle={toggle} />
        <div className="w-full mt-4 overflow-x-auto min-h-screen py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
