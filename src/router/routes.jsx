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
import UpcomingMeals from "../pages/Dashboard/Admin/UpcomingMeals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "/meals/:id",
        element: <MealDetails></MealDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/meals/${params.id}`),
      },
      {
        path: "/checkout/:badge",
        element: (
          <PrivateRoute>
            <Checkout />
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
      { path: "/dashboard", element: <Profile /> },
      { path: "requested-meals", element: <RequestedMeals /> },
      { path: "my-reviews", element: <Reviews /> },
      { path: "payment-history", element: <PaymentHistory /> },
      // admin routes
      { path: "manage-users", element: <ManageUsers /> },
      { path: "add-meal", element: <AddMeal /> },
      { path: "all-meals", element: <AllMeals /> },
      { path: "all-reviews", element: <AllReviews /> },
      { path: "serve-meals", element: <ServeMeals /> },
      { path: "upcoming-meals", element: <UpcomingMeals /> },
    ],
  },
]);

export default router;
