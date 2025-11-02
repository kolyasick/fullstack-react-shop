
import ReactDOM from "react-dom/client";
import "./assets/main.css";
import { RouterProvider } from "react-router";
import router from "./routes";


const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
