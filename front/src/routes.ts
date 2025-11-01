import { createBrowserRouter, redirect } from "react-router";
import DefaultLayout from "./components/layouts/default";
import IndexPage from "./routes/index";
import LoginPage from "./routes/(auth)/login";
import RegisterPage from "./routes/(auth)/register";
import { ACCESS_TOKEN_NAME } from "./constants/app";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [{ index: true, Component: IndexPage }],
  },
  {
    Component: DefaultLayout,
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
    Component: DefaultLayout,
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
