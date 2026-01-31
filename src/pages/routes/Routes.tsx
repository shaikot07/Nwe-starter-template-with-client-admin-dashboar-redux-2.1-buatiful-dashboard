import { createBrowserRouter } from "react-router";
import DashboardLayout from "../../layout/DashboardLayout";
import MainLayout from "../../layout/mainLayout/MainLayout";
import DashboardHome from "../Dashboard/DashboardHome";
import Home from "../Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboardHome",
        element: <DashboardHome />,
      },
    ],
  },
]);

export default routes;
