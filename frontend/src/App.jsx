import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Send from "./pages/Send";

export default function App() {
  const token = localStorage.getItem("token");

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: token ? <Navigate to="/dashboard" /> : <Signup />,
    },
    {
      path: "/signin",
      element: token ? <Navigate to="/dashboard" /> : <Signin />,
    },
    {
      path: "/dashboard",
      element: token ? <Dashboard /> : <Navigate to="/signin" />,
    },
    {
      path: "/send",
      element: token ? <Send /> : <Navigate to="/signin" />,
    },
  ]);
  return <RouterProvider router={router} />;
}
