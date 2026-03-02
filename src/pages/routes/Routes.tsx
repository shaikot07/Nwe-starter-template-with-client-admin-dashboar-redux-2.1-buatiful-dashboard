import { createBrowserRouter } from "react-router";
import DashboardLayout from "../../layout/DashboardLayout";
import MainLayout from "../../layout/mainLayout/MainLayout";
import DashboardHome from "../Dashboard/DashboardHome";
import Home from "../Home";
import NotFound from "../OtherPage/NotFound";

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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboardHome",
        element: <DashboardHome />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
