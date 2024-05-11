import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/website/Home.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Users from "./pages/dashboard/users/Users.tsx";
import AddUser from "./pages/dashboard/users/AddUser.tsx";
import UpdateUser from "./pages/dashboard/users/UpdateUser.tsx";
import AddProduct from "./pages/dashboard/products/AddProduct.tsx";
import Products from "./pages/dashboard/products/Products.tsx";
import UpdateProducts from "./pages/dashboard/products/UpdateProducts.tsx";
import Categories from "./pages/dashboard/categories/Categories.tsx";
import AddCategory from "./pages/dashboard/categories/AddCategory.tsx";
import UpdateCategory from "./pages/dashboard/categories/UpdateCategory.tsx";
import Register from "./pages/dashboard/auth/Register.tsx";
import Login from "./pages/dashboard/auth/Login.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import User from "./pages/dashboard/users/User.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import PrivateRoutes from "./pages/PrivateRoutes.tsx";
import { userRoles } from "./utils/utils.tsx";
import Hero from "./pages/website/Hero.tsx";
import LandingPage from "./pages/website/LandingPage.tsx";
import WebsiteProducts from "./pages/website/website products/WebsiteProducts.tsx";
import WebsiteCategories from "./pages/website/website categories/WebsiteCategories.tsx";
import WebsiteProductPage from "./pages/website/website products/WebsiteProductPage.tsx";
import { PRODUCTS } from "./utils/AXIOS.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         // index: true,
//         path: "/",
//         element: <Home />,
//         children: [
//           {
//             path: "/register",
//             element: <Register />,
//           },
//           {
//             path: "/login",
//             element: <Login />,
//           },
//           {
//             path: "user",
//             element: <User />,
//           },
//         ],
//       },

//       {
//         path: "dashboard",
//         element: <Dashboard />,
//         children: [
//           {
//             path: "users",
//             element: <Users />,
//           },
//           {
//             path: "users/add",
//             element: <AddUser />,
//           },
//           {
//             path: "users/edit/:id",
//             element: <UpdateUser />,
//           },
//           {
//             path: "categories",
//             element: <Categories />,
//           },
//           {
//             path: "categories/add",
//             element: <AddCategory />,
//           },
//           {
//             path: "categories/edit/:id",
//             element: <UpdateCategory />,
//           },
//           {
//             path: "products",
//             element: <Products />,
//           },
//           {
//             path: "products/add",
//             element: <AddProduct />,
//           },
//           {
//             path: "products/edit/:id",
//             element: <UpdateProducts />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        // index: true,
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/user",
            element: <User />,
          },
          {
            path: "products",
            element: <WebsiteProducts productsType={PRODUCTS} />,
          },
          { path: "products/:id", element: <WebsiteProductPage /> },
          {
            path: "categories/:id",
            element: <WebsiteProducts productsType={PRODUCTS} />,
          },
          { path: "categories", element: <WebsiteCategories /> },
        ],
      },
      {
        element: (
          <PrivateRoutes
            roles={[
              userRoles?.admin,
              userRoles?.writer,
              userRoles?.productManager,
            ]}
          />
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              {
                element: <PrivateRoutes roles={[userRoles?.admin]} />,
                children: [
                  {
                    path: "users",
                    element: <Users />,
                  },
                  {
                    path: "users/add",
                    element: <AddUser />,
                  },
                  {
                    path: "users/edit/:id",
                    element: <UpdateUser />,
                  },
                ],
              },
              {
                element: (
                  <PrivateRoutes
                    roles={[userRoles?.admin, userRoles?.productManager]}
                  />
                ),
                children: [
                  {
                    path: "categories",
                    element: <Categories />,
                  },
                  {
                    path: "categories/add",
                    element: <AddCategory />,
                  },
                  {
                    path: "categories/edit/:id",
                    element: <UpdateCategory />,
                  },
                  {
                    path: "products",
                    element: <Products />,
                  },
                  {
                    path: "products/add",
                    element: <AddProduct />,
                  },
                  {
                    path: "products/edit/:id",
                    element: <UpdateProducts />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
