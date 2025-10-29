import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import Footer from "../components/shared/footer";
import Header from "../components/shared/header";
import Hero from "../components/shared/hero";
import { useUserStore } from "../stores/user";
import React from "react";
import api from "../axios/config";

const RootLayout = () => {
  const { href } = useLocation();

   const user = useUserStore();
   React.useEffect(() => {
     const token = localStorage.getItem("e-shopToken");
     // console.log(token);
     if (!token) return;

     api
       .get("/profile", {
         headers: {
           Authorization: "Bearer " + token,
         },
       })
       .then((res) => user.setUser(res.data.user));
   }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {href === "/" && <Hero />}
      <main className="container mx-auto px-4 py-8 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-6xl">404 Not found</h1>
      <Link
        to="/"
        className="border border-gray-800 rounded-md p-2 font-medium mt-4"
      >
        Go home
      </Link>
    </div>
  ),
});
