import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";
import DashboardLayoutBasic from "../pages/Dashboard/Dashboard";

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
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayoutBasic />,
    children: [
      { path: "home", element: <h1>Welcome to the Dashboard</h1> },
      { path: "orders", element: <h1>Welcome to Orders</h1> },
      {
        path: "reports",
        element: <h1>Welcome to Reports</h1>,
        children: [
          { path: "sales", element: <h1>Sales Reports</h1> },
          { path: "traffic", element: <h1>Traffic Reports</h1> },
        ],
      },
      { path: "integrations", element: <h1>Welcome to Integrations</h1> },
    ],
  },
]);

export default router;
