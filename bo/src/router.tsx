import { createBrowserRouter } from "react-router-dom";

import Login from "./screens/login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    }
])