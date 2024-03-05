import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="h-full container mx-auto mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
