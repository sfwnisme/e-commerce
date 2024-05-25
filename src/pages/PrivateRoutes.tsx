import React from "react";
import { useGetCurrentUser } from "../hooks/use-get-current-user";
import { Navigate, Outlet } from "react-router-dom";
import { TOKEN } from "../utils/COOKIES";
import UnauthorizedRoute from "./UnauthorizedRoute";

type PrivateRoutesProps = { roles: string[] };

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ roles }) => {
  const { data } = useGetCurrentUser();
  const userRole = data?.data.role;

  if (TOKEN && roles?.includes(userRole)) {
    return <Outlet />;
  }

  if (TOKEN && !roles?.includes(userRole)) {
    return <UnauthorizedRoute />;
  }

  return <Navigate to="/login" replace />;
  // return <div>kjdfjkjkjdfkj</div>;
};

export default PrivateRoutes;
