import { createBrowserRouter, redirect, useParams } from "react-router";
import App from "./App";
import IndexPage from "./routes/index";
import NotFoundPage from "./routes/not-found";
import LoginPage from "./routes/(auth)/login";
import RegisterPage from "./routes/(auth)/register";
import { ACCESS_TOKEN_NAME } from "./constants/variables";
import { ProductPage } from "./routes/product/[id]";
import { OrderPage } from "./routes/order/[id]";
import { CreateOrderPage } from "./routes/order";

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
    path: "/product/:id",
    children: [
      {
        index: true,
        Component: ProductPage,
      },
    ],
  },
  {
    path: "/order",
    Component: App,
    loader: needAuth,
    children: [
      {
        index: true,
        Component: CreateOrderPage,
      },
      {
        path: ":id",
        Component: OrderPage,
      },
    ],
  },
  {
    Component: App,
    path: "/login",
    children: [
      {
        index: true,
        Component: LoginPage,
        loader: hasAuth,
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
        loader: hasAuth,
      },
    ],
  },
]);

async function hasAuth() {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);

  if (token) {
    throw redirect("/");
  }
}

async function needAuth() {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);

  if (!token) {
    throw redirect("/");
  }
}

export default router;
