import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";
import DashboardLayout from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Dashboard/Student/Profile";
import RequestedMeals from "../pages/Dashboard/Student/RequestedMeals";
import Reviews from "../pages/Dashboard/Student/Reviews";
import Checkout from "../pages/Checkout/Checkout";
import PrivateRoute from "./PrivateRoute";
import PaymentHistory from "../pages/Dashboard/Student/PaymentHistory";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AddMeal from "../pages/Dashboard/Admin/AddMeal";
import AllMeals from "../pages/Dashboard/Admin/AllMeals";
import AllReviews from "../pages/Dashboard/Admin/AllReviews";
import ServeMeals from "../pages/Dashboard/Admin/ServeMeals";
import UpcomingMealsDash from "../pages/Dashboard/Admin/UpcomingMealsDash";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Requests from "../pages/Requests/Requests";
import Memberships from "../pages/Memberships/Memberships";
import Overview from "../pages/Dashboard/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/upcoming-meals",
        element: <UpcomingMeals />,
      },
      {
        path: "/meals/:id",
        element: <MealDetails></MealDetails>,
        loader: ({ params }) =>
          fetch(`https://hostelmateserver.vercel.app/meals/${params.id}`),
      },
      {
        path: "/checkout/:badge",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/requests",
        element: (
          <PrivateRoute>
            <Requests />
          </PrivateRoute>
        ),
      },
      {
        path: "/memberships",
        element: (
          <PrivateRoute>
            <Memberships />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // student routes
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Overview/>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "requested-meals",
        element: (
          <PrivateRoute>
            <RequestedMeals />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <Reviews />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      // admin routes
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <AdminRoute>
            <AddMeal />
          </AdminRoute>
        ),
      },
      {
        path: "all-meals",
        element: (
          <AdminRoute>
            <AllMeals />
          </AdminRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <AdminRoute>
            <AllReviews />
          </AdminRoute>
        ),
      },
      {
        path: "serve-meals",
        element: (
          <AdminRoute>
            <ServeMeals />
          </AdminRoute>
        ),
      },
      {
        path: "upcoming-meals",
        element: (
          <AdminRoute>
            <UpcomingMealsDash />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
