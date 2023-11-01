export const ENDPOINT = {
    
    clients: {
        list: `${import.meta.env.VITE_BASE_URL_CORE}/client/get-clients`,
        update: `${import.meta.env.VITE_BASE_URL_CORE}/client/update-client`,
        byId: `${import.meta.env.VITE_BASE_URL_CORE}/client/get-client/`,
        delete: `${import.meta.env.VITE_BASE_URL_CORE}/client/delete-client/`,
        add: `${import.meta.env.VITE_BASE_URL_CORE}/client/create-client/`,
    },
    squares: {
        add: `${import.meta.env.VITE_BASE_URL_CORE}/headquarter/create-headquarter/`,
        list: `${import.meta.env.VITE_BASE_URL_CORE}/headquarter/get-headquarters`,
        byId: `${import.meta.env.VITE_BASE_URL_CORE}/headquarter/get-headquarter-client/`,
        delete: `${import.meta.env.VITE_BASE_URL_CORE}/headquarter/delete-headquarter/`,
        update: `${import.meta.env.VITE_BASE_URL_CORE}/headquarter/update-headquarter/`,
    },
    location: {
        add: `${import.meta.env.VITE_BASE_URL_CORE}/location/create-location/`,
        list: `${import.meta.env.VITE_BASE_URL_CORE}/location/get-all-locations`,
        byId: `${import.meta.env.VITE_BASE_URL_CORE}/location/get-one-location/`,
        withCampus: `${import.meta.env.VITE_BASE_URL_CORE}/v1/location/get-locations-headquarter/`,
        update: `${import.meta.env.VITE_BASE_URL_CORE}/location/update-location/`,
        delete: `${import.meta.env.VITE_BASE_URL_CORE}/location/delete-location/`,
    },
    equipment: {
        add:`${import.meta.env.VITE_BASE_URL_CORE}/equipment/create-equipment/`,
        list: `${import.meta.env.VITE_BASE_URL_CORE}/equipment/get-all-equipments/`,
        byId: `${import.meta.env.VITE_BASE_URL_CORE}/equipment/get-equipment/`,
        withLocations: `${import.meta.env.VITE_BASE_URL_CORE}/equipment/get-all-equipments-location/`,
        update: `${import.meta.env.VITE_BASE_URL_CORE}/equipment/update-equipment/`,
        delete: `${import.meta.env.VITE_BASE_URL_CORE}/equipment/delete-equipment/`,
    },
    maintanance: {
        add:`${import.meta.env.VITE_BASE_URL_CORE}/maintenance/create-maintenance/`,
        list: `${import.meta.env.VITE_BASE_URL_CORE}/maintenance/get-maintenances`,
        byTech: `${import.meta.env.VITE_BASE_URL_CORE}/maintenance/get-maint-tech/`,
        byClient: `${import.meta.env.VITE_BASE_URL_CORE}/maintenance/get-main-client/`,
        byEquipment: `${import.meta.env.VITE_BASE_URL_CORE}/maintenance/get-main-equipment/`,
        byId: `${import.meta.env.VITE_BASE_URL_CORE}/maintenance/detail-main/`,
        update: `${import.meta.env.VITE_BASE_URL_CORE}/maintenance/update-main/`,
        delete: `${import.meta.env.VITE_BASE_URL_CORE}/maintenance/delete-main/`,
    },
    image: {
        upload: `${import.meta.env.VITE_BASE_URL_CORE}/image/upload-image/`,
        uploadWithEquipment: `${import.meta.env.VITE_BASE_URL_CORE}/image/upload-image-equip/`,
        uploadAvatar: `${import.meta.env.VITE_BASE_URL_AUTH}/user/upload-avatar-user`,
    },
    auth: {
        login: `${import.meta.env.VITE_BASE_URL_AUTH}/auth/login`,
        users: `${import.meta.env.VITE_BASE_URL_AUTH}/user/get-users`,
        getUserById: `${import.meta.env.VITE_BASE_URL_AUTH}/user/get-user`,
        roles: `${import.meta.env.VITE_BASE_URL_AUTH}/role/get-roles`,
        identifications: `${import.meta.env.VITE_BASE_URL_AUTH}/identification/get-identifications`,
        register: `${import.meta.env.VITE_BASE_URL_AUTH}/auth/register`,
        update: `${import.meta.env.VITE_BASE_URL_AUTH}/user/update-user`,
        updatePassword: `${import.meta.env.VITE_BASE_URL_AUTH}/password/update-password`,
        asignPassword: `${import.meta.env.VITE_BASE_URL_AUTH}/password/create`,
    }
}