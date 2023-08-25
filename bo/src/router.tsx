import { createBrowserRouter, RouteObject  } from "react-router-dom";

import Login from "./screens/login/Login";
import Bo from "./screens/BO/Bo";

const boChildrens: RouteObject[] = [
    {
        path: "children",
        element: <h1>Hola mundo</h1>
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