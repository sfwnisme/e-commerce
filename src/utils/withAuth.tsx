import React, { ComponentType, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/use-get-current-user";
import { ROLE, TOKEN } from "./COOKIES";
import { JSX } from "react/jsx-runtime";

// const withAuth = (Component: ComponentType) => (props) => {
//   const isAuth: boolean = true;

//   return <div>withAuth</div>;
// };

export type RolesTypes = "ADMIN" | "WRITER" | "PRODUCT_MANAGER" | "USER";
// const roles: Record<RolesTypes, string> = {
//   ADMIN: "1995",
//   WRITER: "1996",
//   PRODUCT_MANAGER: "1999",
//   USER: "2001",
// };

const roles: string[] = ["1995", "1996", "1999", "2001"];

const withAuth =
  (Component: ComponentType) => (props: JSX.IntrinsicAttributes) => {
    const { data } = useGetCurrentUser();

    console.log(ROLE);

    if (TOKEN && data?.data !== "" && roles?.includes(ROLE.toString())) {
      return <Component {...props} />;
    }

    return <Navigate to="/login" />;
  };

export default withAuth;

// const withAuthentication = <P extends any>(
//   Component: ComponentType<P>,
// ): FC<P> => (props) => {
//     const isAuthenticated = localStorage.getItem('access.token) as string;
//     if (isAuthenticated) {
//       return <Component {...props} />;
//     }
//     return (
//       <Redirect
//         to={{
//           pathname: '/login',
//         }}
//       />
//     );
//   };
