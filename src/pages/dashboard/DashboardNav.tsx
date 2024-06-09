import { Navbar } from "flowbite-react";
import UserDropDown from "../../components/UserDropDown";

interface DashboardSideBarProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNav = ({ setToggle }: DashboardSideBarProps) => {
  return (
    <Navbar fluid className="border ">
      <Navbar.Toggle
        className="h-9 w-9 md:hidden"
        onClick={() => setToggle((prev) => !prev)}
      />
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Dashboard
        </span>
      </Navbar.Brand>
      <UserDropDown />
    </Navbar>
  );
};

export default DashboardNav;
