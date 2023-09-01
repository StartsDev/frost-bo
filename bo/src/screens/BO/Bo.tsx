import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { THEME } from "../../theme"
import Avatar from "../../components/avatar/Avatar"
import styles from "./bo.module.css"
import { 
    MdDescription, 
    MdOutlineSupervisorAccount,
    MdCardTravel,
    MdOutlineSupportAgent,
    MdOutlinePower
 } from "react-icons/md"
import Option from "./components/Option"
import Title from "../../components/title/Title"

function Bo() {

    useEffect(() => {
        const listElements = document.querySelectorAll(".list__button--click")

        listElements.forEach(element => {

            element.addEventListener("click", () => {
                let height = 0
                let menu = element.nextElementSibling

                if (menu?.clientHeight == 0) {
                    height = menu.scrollHeight
                }

                //@ts-expect-error
                menu.style.height = `${height}px`
            })

        })

    }, [])

    const optionsReports = [
        { route: "clients", title: "Clientes" },
        {route: "squares", title: "Sedes" },
        {route: "locations", title: "Ubicaciones" },
        {route: "cotizations", title: "Cotizaciones" },
        {route: "technical", title: "Técnicos" },
        {route: "mantenence", title: "Mantenimientos" },
    ]

    const optionsClients = [
        {route: "clients", title: "Clientes" },
        {route:"add-client", title: "Crear Cliente" },
        {route: "add-location", title: "Crear Ubicación" },
        {route: "add-square", title: "Crear Sede" },
        {route: "edit-client", title: "Modificar Cliente" },
        {route: "edit-location", title: "Modificar Ubicación" },
        {route: "edit-square", title: "Modificar Sede" },
    ]

    const optionsCotizations = [
        {route: "add-cotization", title: "Crear Cotización" },
        {route: "edit-cotization", title: "Modificar Cotización" },
    ]

    const optionsTechnical = [
        {route: "add-technical", title: "Crear Técnico" },
        {route: "edit-technical", title: "Modificar Técnico" },
    ]

    const optionsMantenence = [
        {route: "add-mantenence", title: "Crear Mantenimiento" },
        {route: "edit-mantenence", title: "Modificar Mantenimiento" },
    ]

    return (
        <section
            style={{ backgroundColor: THEME.white_primary }}
            className={styles?.wrapper}
        >
            <div
                style={{
                    width: "100%",
                    padding: "10px 6rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <h2>Frost Office</h2>
                <Avatar />
            </div>
            <section
                className={styles?.wrapper_bo}
            >
                <aside
                    style={{
                        width: "12%",
                        height: "100%",
                    }}
                >
                   <Option
                        titleOption="Clientes"
                        Icon={<MdOutlineSupervisorAccount />}
                        options={optionsClients}
                   />
                   <Option
                        titleOption="Cotizaciones"
                        Icon={<MdCardTravel />}
                        options={optionsCotizations}
                   />
                   <Option
                        titleOption="Tecnicos"
                        Icon={<MdOutlineSupportAgent />}
                        options={optionsTechnical}
                   />
                   <Option
                        titleOption="Mantenimientos"
                        Icon={<MdOutlinePower />}
                        options={optionsMantenence}
                   />
                   <Option
                        titleOption="Reportes"
                        Icon={<MdDescription />}
                        options={optionsReports}
                   />
                </aside>
                <section
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "4rem",
                        gap: 5,
                    }}
                >
                    <Title title="Rodrigo Rodriguez"  />
                    <Outlet />
                </section>
            </section>
        </section>
    )
}

export default Bo