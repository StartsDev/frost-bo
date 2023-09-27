import { createBrowserRouter, RouteObject, redirect  } from "react-router-dom";

import Login from "./screens/login/Login";
import Bo from "./screens/BO/Bo";
import Clients from "./screens/clients/Clients";
import AddClient from "./screens/clients/AddClient";
import EditClient from "./screens/clients/EditClient";
import AddLocation from "./screens/location/AddLocation";
import EditLocation from "./screens/location/EditLocation";
import AddHeadSquare from "./screens/headsquare/AddSquare";
import EditHeadSquare from "./screens/headsquare/EditSquare";
import Squares from "./screens/headsquare/Squares";
import Locations from "./screens/location/Locations";
import Maintenances from "./screens/maintenance/Maintenances";
import AddMaintenance from "./screens/maintenance/AddMaintenence";
import EditMaintenance from "./screens/maintenance/EditMaintence";
import CreateTech from "./screens/Technicians/CreateTech";
import CreateEditEquipment from "./screens/equipment/CreateEditEquipment"

const routesClients: RouteObject[] = [
    {path: "clients",  element: <Clients />  },
    {path:"add-client",  element: <AddClient />  },
    {path: "add-location",  element: <AddLocation />  },
    {path: "add-square",  element: <AddHeadSquare />  },
    {path: "edit-client",  element: <EditClient />  },
    {path: "edit-location",  element: <EditLocation />  },
    {path: "edit-square",  element: <EditHeadSquare />  },
]

const routesReports: RouteObject[] = [
    {path: "clients", element: <Clients /> },
    {path: "squares", element: <Squares /> },
    {path: "locations", element: <Locations /> },
    {path: "cotizations", element:  <h1>Cotizaciones</h1> },
    {path: "technical", element: <h1>Técnicos</h1> },
    {path: "mantenence", element: <Maintenances /> },
]

const routesCotizations: RouteObject[] = [
    {path: "add-cotization", element: <h1>Crear Cotización</h1> },
    {path: "edit-cotization", element: <h1>Modificar Cotización</h1> },
]

const routesTechnical: RouteObject[] = [
    {path: "add-technical", element: <CreateTech  isEditable={false}/> },
    {path: "edit-technical", element: <CreateTech  isEditable={true}/> },
]

const routesMantenence: RouteObject[] = [
    {path: "add-mantenence", element: <AddMaintenance isEditable={false}/> },
    {path: "edit-mantenence", element: <AddMaintenance isEditable={true}/>  },
    {path: "add-equipement", element: <CreateEditEquipment isEditable={false}/>  },
    {path: "edit-equipement", element: <CreateEditEquipment isEditable={true}/>  },
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
        children: boChildrens,
        loader: async () => {
            
            const tkn: null | string = localStorage.getItem('key')

            if (tkn !== null && tkn !== "") {
                return null
            }

            return redirect('/')

        },
    }
]

export const router = createBrowserRouter(mainChildren)