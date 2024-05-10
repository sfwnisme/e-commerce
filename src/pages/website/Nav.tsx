import { Navbar, TextInput } from "flowbite-react";
import { NavLink } from "react-router-dom";
import UserDropDown from "../../components/UserDropDown";
import NavCategories from "./website categories/NavCategories";

const Nav = () => {
  return (
    <Navbar fluid className="border">
      <NavLink to="/">
        <Navbar.Brand>
          <img
            src="https://res.cloudinary.com/daa68wahe/image/upload/v1695638124/sfwn_logo_orange_transparent_mn2vj2.png"
            className="mr-3 h-10 sm:h-12"
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>
      </NavLink>
      <div>
        <TextInput id="search" type="search" placeholder="search..." />
        <div className="flex items-center gap-6 mt-4">
          <NavCategories />
        </div>
      </div>
      <UserDropDown />
    </Navbar>
  );
};

export default Nav;
