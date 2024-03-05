import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import UserDropDown from "../../components/UserDropDown";

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
      <Navbar.Collapse>
        <NavLink to="/">
          <Navbar.Link active>Home</Navbar.Link>
        </NavLink>
      </Navbar.Collapse>
      <UserDropDown />
    </Navbar>
  );
};

export default Nav;
