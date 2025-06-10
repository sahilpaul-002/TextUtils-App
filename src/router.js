import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./components/About";
import TextForm from "./components/TextForm";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App, // App will be the layout
    children: [
      {
        index: true,
        Component: TextForm, // shows at "/"
      },
      {
        path: "about",
        Component: About, // shows at "/about"
      },
    ],
  },
]);

export default router;
