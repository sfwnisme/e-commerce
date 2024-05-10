import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import LandingPage from "./LandingPage";

const Home = () => {
  return (
    <div className="">
      <Nav />
      <div className="h-full container mx-auto mt-4 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
