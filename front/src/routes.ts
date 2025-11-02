import { createBrowserRouter, redirect } from "react-router";

import IndexPage from "./routes/index";
import LoginPage from "./routes/(auth)/login";
import RegisterPage from "./routes/(auth)/register";
import { ACCESS_TOKEN_NAME } from "./constants/app";
import App from "./App";
import NotFoundPage from "./routes/not-found";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { index: true, Component: IndexPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    Component: App,
    children: [{ index: true, Component: IndexPage }],
  },
  {
    Component: App,
    path: "/login",
    children: [
      {
        index: true,
        Component: LoginPage,
        loader: authLoader,
      },
    ],
  },
  {
    Component: App,
    path: "/register",
    children: [
      {
        index: true,
        Component: RegisterPage,
        loader: authLoader,
      },
    ],
  },
]);

async function authLoader() {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);

  if (token) {
    throw redirect("/");
  }
}

export default router;
