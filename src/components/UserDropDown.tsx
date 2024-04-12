import { Avatar, Button, Dropdown } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/use-log-out";
import { TOKEN } from "../utils/COOKIES";
import { useGetCurrentUser } from "../hooks/use-get-current-user";
import { getTheRole } from "../utils/utils";
import { LoadingAndError } from "../utils/HandleLoadingAndError";

const UserDropDown = () => {
  const logout = useLogout();
  const { data, isLoading, isError } = useGetCurrentUser();
  const currentUser = data?.data;
  const imageUrl = "https://avatars.githubusercontent.com/u/92028514?v=4";
  return (
    <div>
      {TOKEN ? (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={imageUrl} rounded />}
          >
            <Dropdown.Header>
              <div className="flex items-center gap-2">
                <span className="block text-sm">
                  {LoadingAndError(currentUser?.name, isLoading, isError)}
                </span>
                <span className="block text-xs font-medium text-white bg-red-400 py-1 px-2 rounded">
                  {getTheRole(currentUser?.role)}
                </span>
              </div>
              <span className="block truncate text-sm font-medium">
                {LoadingAndError(currentUser?.email, isLoading, isError)}
              </span>
            </Dropdown.Header>
            {currentUser?.role !== "2001" ? (
              <NavLink to="/dashboard">
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </NavLink>
            ) : null}
            <NavLink to="/user">
              <Dropdown.Item>Profile</Dropdown.Item>
            </NavLink>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      ) : (
        <Button.Group>
          {!TOKEN ? (
            <>
              <NavLink to="/register">
                <Button color="gray">Register</Button>
              </NavLink>
              <NavLink to="/login">
                <Button color="gray">login</Button>
              </NavLink>
            </>
          ) : (
            <NavLink to="logout">
              <Button color="gray">logout</Button>
            </NavLink>
          )}
        </Button.Group>
      )}
    </div>
  );
};

export default UserDropDown;
