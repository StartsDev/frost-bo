import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { THEME } from "../../theme";
import Avatar from "../../components/avatar/Avatar";
import Logo from "../../components/logo/Logo";
import styles from "./bo.module.css";
import {
  MdDescription,
  MdOutlineSupervisorAccount,
  MdOutlineSupportAgent,
  MdOutlinePower,
} from "react-icons/md";
import Option from "./components/Option";
import Title from "../../components/title/Title";
import { User } from "../../types";
import { ENDPOINT } from "../../config";

function Bo() {
const userLogged: User = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null;

  const [user, setUser] = useState<User>(userLogged)

  useEffect(()=> {
    getUserById(userLogged.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const getUserById = (id: string) => {
    fetch(`${ENDPOINT.auth.getUserById}/${id}`)
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
    .then((data) => {
      setUser(data.findUser)
      localStorage.setItem('user', JSON.stringify(data.findUser))
    })
    .catch((error) => {
      console.log(error)
    })
  }

useEffect(() => {
    const listElements = document.querySelectorAll(".list__button--click");

    listElements.forEach((element) => {
    element.addEventListener("click", () => {
        let height = 0;
        const menu = element.nextElementSibling;

        if (menu?.clientHeight == 0) {
          height = menu.scrollHeight;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        menu.style.height = `${height}px`;
      });
    });
  }, []);

  const optionsReports = [
    { route: "clients", title: "Clientes" },
    { route: "squares", title: "Sedes" },
    { route: "locations", title: "Ubicaciones" },
    { route: "users", title: "Usuarios" },
    { route: "equipments", title: "Equipos" },
    { route: "mantenence", title: "Mantenimientos" },
  ];

  const optionsClients = [
    { route: "add-client", title: "Crear Cliente" },
    { route: "add-location", title: "Crear Ubicación" },
    { route: "add-square", title: "Crear Sede" },
    { route: "edit-client", title: "Modificar Cliente" },
    { route: "edit-location", title: "Modificar Ubicación" },
    { route: "edit-square", title: "Modificar Sede" },
  ];

  const optionsTechnical = [
    { route: "add-technical", title: "Crear Usuario" },
    { route: "edit-technical", title: "Modificar Usuario" },
  ];

  const optionsMantenence = [
    { route: "add-mantenence", title: "Crear Mantenimiento" },
    { route: "edit-mantenence", title: "Modificar Mantenimiento" },
    { route: "add-equipement", title: "Crear Equipos" },
    { route: "edit-equipement", title: "Modificar Equipos" },
  ];

  return (
    <section
      style={{ backgroundColor: THEME.white_primary }}
      className={styles?.wrapper}
    >
      <div
        style={{
          width: "100%",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      > 
      <div style={{
          display: "flex",
          alignItems: "center",
        }}>
      <Logo image={"../src/assets/logo.jpeg" ?? ""} />
        <h2>Aire Aplicado S.A.S</h2>
      </div>
    

      <Avatar id={user?.id} userProfileImage={user?.image} />
      </div>
      <section className={styles?.wrapper_bo}>
        <aside
          style={{
            width: "14%",
            height: "100%",
          }}
        >
          <Option
            titleOption="Gestión de Clientes"
            Icon={<MdOutlineSupervisorAccount />}
            options={optionsClients}
          />
          <Option
            titleOption="Gestión de Usuarios"
            Icon={<MdOutlineSupportAgent />}
            options={optionsTechnical}
          />
          <Option
            titleOption="Gestión Operativa"
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
          <Title title={`Bienvenido, ${user?.firstName} ${user?.lastName}` ?? ""} />
         
          <Outlet />
        </section>
      </section>
    </section>
  );
}

export default Bo;
