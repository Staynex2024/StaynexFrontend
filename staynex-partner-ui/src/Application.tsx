import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RequireAuth } from './Routes/Guard/AuthGuard'
import { WithoutAuth } from './Routes/Guard/NoGuard'
import { ErrorBoundary } from './Components/Common/ErrorBoundary/Errorboundary'
import Loader from './Components/Common/Loader'
import ErrorPage from './Components/Pages/ErrorPage/ErrorPage'
import AuthLayout from './Components/Common/AuthLayout/AuthLayout'
// import MainLayout from "./Components/Common/MainLayout/MainLayout";
// import AuthLogin from "./Components/Pages/AuthLogin/AuthLogin";
// import ForgotPassword from "./Components/Pages/ForgotPassword/ForgotPassword";
import Login from './Components/Pages/Login/Login'
import Dashboard from './Components/Pages/Dashboard/Dashboard'
import ForgotPassword from './Components/Pages/ForgotPassword/ForgotPassword'
import LoginLayout from './Components/Common/MainLayout/LoginLayout'
import Newproperty from './Components/Pages/Management/Hoteldetails/Newproperty/Newproperty'
import Booking from './Components/Pages/Booking/Booking'
import BookingDetail from './Components/Pages/Booking/BookingDetail/BookingDetail'
import Customers from './Components/Pages/Customers/Customers'
import CustomersDetail from './Components/Pages/Customers/CustomersDetail/CustomersDetail'
import Passes from './Components/Pages/Management/Passes/Passes'
import Createpass from './Components/Pages/Management/Passes/Createpass'
import Hoteldetails from './Components/Pages/Management/Hoteldetails/Hoteldetails'
import Settings from './Components/Pages/Settings/Settings'
import Support from './Components/Pages/Support/Support'
import SignUp from './Components/Pages/SignUp/SignUp'
import ForgotPasswordForm from './Components/Pages/ForgotPassword/ForgotPasswordForm'
import ResetPassword from './Components/Pages/ForgotPassword/resetPassowrdPage'
import Hotels from './Components/Pages/Hotels/Hotels'
import UpdateProperty from './Components/Pages/Management/UpdateProperty/UpdateProperty'
import UpdatePass from './Components/Pages/Management/Passes/UpdatePass/UpdatePass'
const Application: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '/',
          element: (
            <WithoutAuth>
              <Login />
            </WithoutAuth>
          ),
        },

        {
          path: '/signup',
          element: (
            <WithoutAuth>
              <SignUp />
            </WithoutAuth>
          ),
        },
          // {
          //   path: "/signup-almost",
          //   element: (
          //     <WithoutAuth>
          //       <SignUp />
          //     </WithoutAuth>
          //   ),
          // },
        {
          path: 'forgot-password',
          element: (
            <WithoutAuth>
              <ForgotPassword />
            </WithoutAuth>
          ),
        },
        {
          path: 'forgot-password-form',
          element: (
            <WithoutAuth>
              <ForgotPasswordForm />
            </WithoutAuth>
          ),
        },

        {
          path: 'reset-password-page/:id',
          element: (
            <WithoutAuth>
              <ResetPassword />
            </WithoutAuth>
          ),
        },

        {
          path: '*',
          element: <ErrorPage />,
        },
      ],
    },

    {
      path: '/auth',
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
          path: 'dashboard',
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        {
          path: 'booking',
          element: (
            <RequireAuth>
              <Booking />
            </RequireAuth>
          ),
        },
        {
          path: 'new-property',
          element: (
            <RequireAuth>
              <Newproperty />
            </RequireAuth>
          ),
        },
        {
          path: 'update-property',
          element: (
            <RequireAuth>
              <UpdateProperty />
            </RequireAuth>
          ),
        },
        {
          path: 'booking-details',
          element: (
            <RequireAuth>
              <BookingDetail />
            </RequireAuth>
          ),
        },
        {
          path: 'customers',
          element: (
            <RequireAuth>
              <Customers />
            </RequireAuth>
          ),
        },
        {
          path: 'passes',
          element: (
            <RequireAuth>
              <Passes />
            </RequireAuth>
          ),
        },
        {
          path: 'customers-details',
          element: (
            <RequireAuth>
              <CustomersDetail />
            </RequireAuth>
          ),
        },
        {
          path: 'create-pass',
          element: (
            <RequireAuth>
              <Createpass />
            </RequireAuth>
          ),
        },
        {
          path: 'resubmit-pass/:id',
          element: (
            <RequireAuth>
              <Createpass />
            </RequireAuth>
          ),
        },
        {
          path: 'update-pass/:id',
          element: (
            <RequireAuth>
              <UpdatePass />
            </RequireAuth>
          ),
        },
        {
          path: 'hotel-details',
          element: (
            <RequireAuth>
              <Hotels/>
              {/* <Hoteldetails /> */}
            </RequireAuth>
          ),
        },
        {
          path: "new-property",
          element: (
            <RequireAuth>
              <Newproperty />
            </RequireAuth>
          ),
        },
        {
          path: 'settings',
          element: (
            <RequireAuth>
              <Settings />
            </RequireAuth>
          ),
        },
        {
          path: 'support',
          element: (
            <RequireAuth>
              <Support />
            </RequireAuth>
          ),
        },
      ],
    },
  ])

  return (
    <>
      <RouterProvider router={router} fallbackElement={<Loader />} />
    </>
  )
}

export default Application
