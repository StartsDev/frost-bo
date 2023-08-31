import { createBrowserRouter, RouteObject  } from "react-router-dom";

import Login from "./screens/login/Login";
import Bo from "./screens/BO/Bo";
import Clients from "./screens/clients/Clients";
import AddClient from "./screens/clients/AddClient";

const boChildrens: RouteObject[] = [
    {
        path: "clients",
        element: <Clients />,
    },
    {
        path: "add-client",
        element: <AddClient />
    }
]

const mainChildren: RouteObject[] = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/bo",
        element: <Bo />,
        children: boChildrens
    }
]

export const router = createBrowserRouter(mainChildren)