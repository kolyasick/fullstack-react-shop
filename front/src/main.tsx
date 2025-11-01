import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./assets/main.css";
import { RouterProvider } from "react-router";
import router from "./routes";
import { useUserStore } from "./stores/user";
import api from "./axios/config";


function AppWithAuth() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem("e-shopToken");
    if (!token) return;

    api
      .get("/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setUser(res.data.user))
      .catch((error) => {
        console.error("Auth error:", error);
      });
  }, []);

  return <RouterProvider router={router} />;
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<AppWithAuth />);
}
