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
      { path: "/dashboard", element: <Profile /> },
      { path: "requested-meals", element: <RequestedMeals /> },
      { path: "my-reviews", element: <Reviews /> },
      { path: "payment-history", element: <PaymentHistory /> },
    ],
  },
]);

export default router;
