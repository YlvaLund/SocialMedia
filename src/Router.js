import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./pages";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Profiles from "./pages/Profiles";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>ERROR</div>,
    element: <Page />,
    children: [
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
      {
        path: "/profile/:name",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
