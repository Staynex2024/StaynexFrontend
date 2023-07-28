import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WithoutAuth } from "./Routes/Guard/NoGuard";
import { ErrorBoundary } from "./Components/Common/ErrorBoundary/Errorboundary";
import Loader from "./Components/Common/Loader";
import MainLayout from "./Components/Common/MainLayout/MainLayout";
import Home from "./Components/Pages/Home/Home";
import Listings from "./Components/Pages/Listings/Listings";
import ResortDetails from "./Components/Pages/ResortDetails/ResortDetails";
import Club from "./Components/Pages/Club/Club";
import DemoPage from "./Components/Pages/DemoPage/DemoPage";
import AboutUs from "./Components/Pages/AboutUs/AboutUs";
import GlobalPartners from "./Components/Pages/GlobalPartners/GlobalPartners";
import ListYourProperty from "./Components/Pages/ListYourProperty/ListYourProperty";
import ProfileLogin from "./Components/Pages/CustomerProfile/ProfileLogin/ProfileLogin";
import ProfilePass from "./Components/Pages/CustomerProfile/ProfilePass/ProfilePass";

const Application: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: (
            <WithoutAuth>
              <Home />
            </WithoutAuth>
          ),
        },
        {
          path: "/listing",
          element: (
            <WithoutAuth>
              <Listings />
            </WithoutAuth>
          ),
        },
        {
          path: "resort-details",
          element: (
            <WithoutAuth>
              <ResortDetails />
            </WithoutAuth>
          ),
        },
        {
          path: "club",
          element: (
            <WithoutAuth>
              <Club />
            </WithoutAuth>
          ),
        },
        {
          path: "demo",
          element: (
            <WithoutAuth>
              <DemoPage />
            </WithoutAuth>
          ),
        },
        {
          path: "/about-us",
          element: (
            <WithoutAuth>
              <AboutUs />
            </WithoutAuth>
          ),
        },
        {
          path: "/global-partner",
          element: (
            <WithoutAuth>
              <GlobalPartners />
            </WithoutAuth>
          ),
        }, 
        {
          path: "/list-property",
          element: (
            <WithoutAuth>
              <ListYourProperty/>
            </WithoutAuth>
          ),
        },    

        {
          path: "/profile-login",
          element: (
            <WithoutAuth>
              <ProfileLogin/>
            </WithoutAuth>
          ),
        },

        {
          path: "/profile-pass",
          element: (
            <WithoutAuth>
              <ProfilePass/>
            </WithoutAuth>
          ),
        },
        // {
        //   path: "*",
        //   element: <ErrorPage />,
        // },
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
