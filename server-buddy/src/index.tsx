import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Kitchen from "./Routes/Kitchen";
import Inventory from "./Routes/Inventory";
import Manager from "./Routes/Manager";
import Menu from "./Routes/Menu";
import Server from "./Routes/Server";
import Transactions from "./Routes/Transactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="kitchen">Kitchen</Link>
      </div>
    ),
  },
  {
    path: "kitchen",
    element: <Kitchen />,
  },
  {
    path: "inventory",
    element: <Inventory />,
  },
  {
    path: "manager",
    element: <Manager />,
  },
  {
    path: "menu",
    element: <Menu />,
  },
  {
    path: "server",
    element: <Server />,
  },
  {
    path: "transaction",
    element: <Transactions />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);