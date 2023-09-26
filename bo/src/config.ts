export const ENDPOINT = {
    clients: {
        list: "https://business-core-api.onrender.com/api/v1/client/get-clients",
        update: "https://business-core-api.onrender.com/api/v1/client/update-client",
        byId: "https://business-core-api.onrender.com/api/v1/client/get-client/",
        delete: "https://business-core-api.onrender.com/api/v1/client/delete-client/",
        add: "https://business-core-api.onrender.com/api/v1/client/create-client/",
    },
    squares: {
        add: "https://business-core-api.onrender.com/api/v1/headquarter/create-headquarter/",
        list: "https://business-core-api.onrender.com/api/v1/headquarter/get-headquarters",
        byId: "https://business-core-api.onrender.com/api/v1/headquarter/get-headquarter-client/",
        delete: "https://business-core-api.onrender.com/api/v1/headquarter/delete-headquarter/",
        update: "https://business-core-api.onrender.com/api/v1/headquarter/update-headquarter/",
    },
    location: {
        add: "https://business-core-api.onrender.com/api/v1/location/create-location/",
        list: "https://business-core-api.onrender.com/api/v1/location/get-all-locations",
        byId: "https://business-core-api.onrender.com/api/v1/location/get-one-location/",
        withCampus: "https://business-core-api.onrender.com/api/v1/location/get-locations-headquarter/",
        update: "https://business-core-api.onrender.com/api/v1/location/update-location/",
        delete: "https://business-core-api.onrender.com/api/v1/location/delete-location/",
    },
    equipment: {
        add:"https://business-core-api.onrender.com/api/v1/equipment/create-equipment/",
        list: "https://business-core-api.onrender.com/api/v1/equipment/get-all-equipments/",
        byId: "https://business-core-api.onrender.com/api/v1/equipment/get-equipment/",
        withLocations: "https://business-core-api.onrender.com/api/v1/equipment/get-all-equipments-location/",
        update: "https://business-core-api.onrender.com/api/v1/equipment/update-equipment/",
        delete: "https://business-core-api.onrender.com/api/v1/equipment/delete-equipment/",
    },
    maintanance: {
        add:"https://business-core-api.onrender.com/api/v1/maintenance/create-maintenance/",
        list: "https://business-core-api.onrender.com/api/v1/maintenance/get-maintenances",
        byTech: "https://business-core-api.onrender.com/api/v1/maintanance/get-maint-tech/",
        byClient: "https://business-core-api.onrender.com/api/v1/maintanance/get-main-client/",
        byEquipment: "https://business-core-api.onrender.com/api/v1/maintanance/get-main-equipment/",
        byId: "https://business-core-api.onrender.com/api/v1/maintenance/detail-main/",
        update: "https://business-core-api.onrender.com/api/v1/maintanance/update-main/",
        delete: "https://business-core-api.onrender.com/api/v1/maintanance/delete-main/",
    },
    image: {
        upload: "https://business-core-api.onrender.com/api/v1/image/upload-image/",
        uploadWithEquipment: "https://business-core-api.onrender.com/api/v1/image/upload-image-equip/",
    },
    auth: {
        login: "https://frost-api.onrender.com/api/v1/auth/login",
        users: "https://frost-api.onrender.com/api/v1/user/get-users",
        roles: "https://frost-api.onrender.com/api/v1/role/get-roles",
        identifications: "https://frost-api.onrender.com/api/v1/identification/get-identifications",
        register: "https://frost-api.onrender.com/api/v1/auth/register",
        update: "https://frost-api.onrender.com/api/v1/user/update-user",
    }
}