import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RequireAuth } from "./Routes/Guard/AuthGuard";
import { WithoutAuth } from "./Routes/Guard/NoGuard";
import { ErrorBoundary } from "./Components/Common/ErrorBoundary/Errorboundary";
import Loader from "./Components/Common/Loader";
import ErrorPage from "./Components/Pages/ErrorPage/ErrorPage";
import AuthLayout from "./Components/Common/AuthLayout/AuthLayout";
// import MainLayout from "./Components/Common/MainLayout/MainLayout";
// import AuthLogin from "./Components/Pages/AuthLogin/AuthLogin";
// import ForgotPassword from "./Components/Pages/ForgotPassword/ForgotPassword";
import Login from "./Components/Pages/Login/Login";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Hotels from "./Components/Pages/Hotels/Hotels";
import Hoteldetails from "./Components/Pages/Hotels/Hoteldetails/Hoteldetails";
import ForgotPassword from "./Components/Pages/ForgotPassword/ForgotPassword";
import LoginLayout from "./Components/Common/MainLayout/LoginLayout";
import Newproperty from "./Components/Pages/Hotels/Newproperty/Newproperty";

const Application: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: (
            <WithoutAuth>
              <Login />
            </WithoutAuth>
          ),
        },

        // No need for now
        // {
        //   path: "forgot-password",
        //   element: (
        //     <WithoutAuth>
        //       <ForgotPassword />
        //     </WithoutAuth>
        //   ),
        // },
        {
          path: "hotels",
          element: (
            <WithoutAuth>
              <Hotels />
            </WithoutAuth>
          ),
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },

    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        // {
        //   index: true,
        //   element: (
        //     <RequireAuth>
        //       <AuthLogin />
        //     </RequireAuth>
        //   ),
        // },
        {
          path: "dashboard",
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        {
          path: "hotels",
          element: (
            <RequireAuth>
              <Hotels />
            </RequireAuth>
          ),
        },
        // {
        //   path: "login",
        //   element: <AuthLogin />,
        // },
        {
          path: "new-property",
          element: (
            <RequireAuth>
              <Newproperty />
            </RequireAuth>
          ),
        },
        {
          path: "hotel-details",
          element: (
            <RequireAuth>
              <Hoteldetails />
            </RequireAuth>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} fallbackElement={<Loader />} />
    </>
  );
};

export default Application;
