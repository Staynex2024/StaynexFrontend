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
// import ForgotPassword from "./Components/Pages/ForgotPassword/ForgotPassword";
import Login from "./Components/Pages/Login/Login";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Hotels from "./Components/Pages/Hotels/Hotels";
import Hoteldetails from "./Components/Pages/Hotels/Hoteldetails/Hoteldetails";
import LoginLayout from "./Components/Common/MainLayout/LoginLayout";
import Newproperty from "./Components/Pages/Hotels/Newproperty/Newproperty";
import Members from "./Components/Pages/Members/Members";
import Management from "./Components/Pages/Management/Management";
import Settings from "./Components/Pages/Settings/Settings";
import Createpass from "./Components/Pages/Hotels/Hoteldetails/Component/Createpass";

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
          path: "hotels/new-property",
          element: (
            <RequireAuth>
              <Newproperty />
            </RequireAuth>
          ),
        },
        {
          path: "hotels/hotel-details/:id",
          element: (
            <RequireAuth>
              <Hoteldetails />
            </RequireAuth>
          ),
        },
        {
          path: "members",
          element: (
            <RequireAuth>
              <Members />
            </RequireAuth>
          ),
        },
        {
          path: "management",
          element: (
            <RequireAuth>
              <Management />
            </RequireAuth>
          ),
        },
        {
          path: "settings",
          element: (
            <RequireAuth>
              <Settings />
            </RequireAuth>
          ),
        },
        {
          path: "create-pass",
          element: (
            <RequireAuth>
              <Createpass />
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
