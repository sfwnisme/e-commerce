import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import WebsiteFooter from "./Footer";

const Home = () => {
  return (
    <div className="">
      <Nav />
      <div className="h-full container mx-auto mt-28 px-4 min-h-screen">
        <Outlet />
      </div>
      <WebsiteFooter />
    </div>
  );
};

export default Home;
