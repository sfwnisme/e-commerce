import { Alert } from "flowbite-react";
import { useGetCurrentUser } from "../hooks/use-get-current-user";
import { NavLink } from "react-router-dom";
import { userRoutesByRole } from "../utils/utils";

const UnauthorizedRoute = () => {
  const { data } = useGetCurrentUser();
  const userRole = data?.data?.role;

  return (
    <Alert color="warning" rounded>
      <span className="font-medium">Info alert!</span> You are not authorized to
      access this page, return to your{" "}
      {
        <NavLink
          to={`${userRoutesByRole(userRole)}`}
          className="text-blue-500 underline"
        >
          page
        </NavLink>
      }
      .
    </Alert>
  );
};

export default UnauthorizedRoute;
