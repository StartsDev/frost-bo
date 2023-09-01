import { createBrowserRouter, RouteObject  } from "react-router-dom";

import Login from "./screens/login/Login";
import Bo from "./screens/BO/Bo";
import Clients from "./screens/clients/Clients";
import AddClient from "./screens/clients/AddClient";
import EditClient from "./screens/clients/EditClient";

const routesClients: RouteObject[] = [
    {path: "clients",  element: <Clients />  },
    {path:"add-client",  element: <AddClient />  },
    {path: "add-location",  element: <h1>Crear Ubicación</h1>  },
    {path: "add-square",  element: <h1>Crear Sede</h1>  },
    {path: "edit-client",  element: <EditClient />  },
    {path: "edit-location",  element: <h1>Modificar Ubicación</h1>  },
    {path: "edit-square",  element: <h1>Modificar Sede</h1>  },
]

const routesReports: RouteObject[] = [
    {path: "clients", element: <h1>Clientes</h1> },
    {path: "squares", element: <h1>Sedes</h1> },
    {path: "locations", element: <h1>Ubicaciones</h1> },
    {path: "cotizations", element:  <h1>Cotizaciones</h1> },
    {path: "technical", element: <h1>Técnicos</h1> },
    {path: "mantenence", element: <h1>Mantenimientos</h1> },
]

const routesCotizations: RouteObject[] = [
    {path: "add-cotization", element: <h1>Crear Cotización</h1> },
    {path: "edit-cotization", element: <h1>Modificar Cotización</h1> },
]

const routesTechnical: RouteObject[] = [
    {path: "add-technical", element: <h1>Crear Técnico</h1> },
    {path: "edit-technical", element: <h1>Modificar Técnico</h1> },
]

const routesMantenence: RouteObject[] = [
    {path: "add-mantenence", element: <h1>Crear Mantenimiento</h1> },
    {path: "edit-mantenence", element: <h1>Modificar Mantenimiento</h1> },
]

const boChildrens: RouteObject[] = [
    ...routesClients,
    ...routesReports,
    ...routesCotizations,
    ...routesTechnical,
    ...routesMantenence
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