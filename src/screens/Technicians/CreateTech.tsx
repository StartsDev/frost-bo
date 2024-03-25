/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Input } from "../../components/form/Input";
import styles from "../headsquare/headQuarters.module.css";
import formStyles from "../../components/form/form.module.css";
import View from "../../components/view/View";
import { CSSProperties } from "react";
import { THEME } from "../../theme";
import { ENDPOINT } from "../../config";
import {
  IdentificationResponse,
  IndentificationType,
  Role,
  Roles,
  User,
  userResponse,
} from "../../types";
import { useFetcher } from "../../hooks/useFetcher";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { Fields } from "../../components/form/Form";
import axios from "axios";

interface Props {
  isEditable: boolean;
}

const fields: Fields[] = [
  {
    name: "numIdent",
    type: "number",
    label: "Numero de identificacion",
    placeholder: "Escriba el numero de identificacion",
    disabled: true,
  },
  {
    name: "firstName",
    type: "text",
    label: "Nombre",
    placeholder: "ingrese el nombre del tecnico",
  },
  {
    name: "lastName",
    type: "text",
    label: "Apellido",
    placeholder: "ingrese el apellido del tecnico",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "ingrese el email del tecnico",
  },
  {
    name: "phone",
    type: "number",
    label: "Numero de telefono",
    placeholder: "ingrese un numero de telefono o celular",
  },
];

const CreateTech = ({ isEditable = false }: Props) => {
  const { data, loading } = useFetcher<Roles>({
    method: "GET",
    url: ENDPOINT.auth.roles,
  });
  const { data: idRespomse } = useFetcher<IdentificationResponse>({
    method: "GET",
    url: ENDPOINT.auth.identifications,
  });
  const { data: userToModify, fetchMemo } = useFetcher<userResponse>({
    method: "GET",
    url: ENDPOINT.auth.users,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    numIdent: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    identId: "",
    roleId: "",
    clientId: null,
    deleteClient: false,
    clientName: "",
  });

  useEffect(() => {
    setUser({
      id: null,
      numIdent: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      identId: "",
      roleId: "",
      clientId: null,
      deleteClient: false,
      clientName: "",
    });
  }, [isEditable]);

  const { id, ...userNew } = user;

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable && e.target.name === "idUser") {
      const userFound = userToModify?.users.find((user) => user.id === e.target.value) as never;
        try {
          const {data} = await getCustomerbyid(userFound.clientId)
          setUser({
            ...userFound,
            clientName: data.client.client.businessName
          });
        } catch (error) {
          setUser(userFound);
        }
    }
    if(isEditable && e.target.name === "clientId") {
      setUser({
        ...user,
        deleteClient: true,
        clientName: ""
      })
    }
    if (e.target.name === "id")
      setUser({
        ...user,
        roleId: e.target.value,
      });
    if (e.target.name === "idType")
      setUser({
        ...user,
        identId: e.target.value,
      });
  };

  const getCustomerbyid = async (id: string) => {
    const customerFound = await axios.get(`${ENDPOINT.clients.byId}${id}`)
    return customerFound
  }

  const sendData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
      try {
        setIsLoading(true)
        const {data} = await axios({
          method: isEditable ? "PATCH" : "POST",
          url: !isEditable ? ENDPOINT.auth.register : `${ENDPOINT.auth.update}/${user.id}`,
          headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('key')!
          },
          data: JSON.stringify(isEditable ? user : userNew),
          })
          if(data.success) {
            toast.success(data.msg)
          } else {
            toast.error(data.msg)
          }
      } catch (error) {
        console.log('error: ', error)
        toast.error(error.response.data.error)
      } finally {
        fetchMemo()
        setIsLoading(false)
        setUser({
          id: "",
          numIdent: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          identId: "",
          roleId: "",
          clientId: null,
          deleteClient: false,
          clientName: "",
        });
      }
  };
  const delUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (confirm(`Estas seguro de eliminar a ${user.firstName} de la lista de usuarios?`)) {
      setIsLoading(true);
      fetch(`${ENDPOINT.auth.delete}/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("key")!,
        },
      })
        .then((res) => {
          if (!res.ok) {
            toast.error(
              `El usuario no pudo ser eliminado o no existe, por favor consulte con el administrador`
            );
          }
          return res.json();
        })
        .then((data) => {
          if (!data.success) {
            toast.error(data.msg);
          } else {
            toast.success(
              `El usuario ${user.firstName} ${user.lastName} ha sido eliminado con exito`
            );
          }
        })
        .catch(() => {
          console.log("error");
        })
        .finally(() => {
          fetchMemo()
          setIsLoading(false);
          setUser({
            id: "",
            numIdent: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            identId: "",
            roleId: "",
            clientId: null,
            deleteClient: false,
            clientName: "",
          });
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <View>
      <ToastContainer />
      {isLoading || loading ? (
        <Loader />
      ) : (
        <>
          <p style={componentStyles.description}>
            En este formulario podras {isEditable ? "modificar" : "crear"} todos
            los usuarios que accederan al Backoffice o la aplicación
          </p>
          {isEditable && (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15, marginLeft: 33}}>
            <div className={styles.selectContainer} style={{ marginLeft: 0 }}>
              <label htmlFor="" className={styles.labelStyle}>
                Selecciona un usuario
              </label>
              <select
                name="idUser"
                id=""
                className={styles.formInput}
                onChange={(e) => handleInputChange(e as never)}
              >
                <option value="" style={{ color: "grey" }}>
                  Seleccione el usuario
                </option>
                {userToModify?.users?.map((e: User, index: number) => (
                  <option key={index} value={e.id}>
                    {e.firstName + " " + e.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div
                  className={styles.selectContainer}
                  style={{ marginLeft: 17 }}
                >
                  <label htmlFor="" className={styles.labelStyle}>
                    Cliente Asociado
                  </label>
                  {
                    user.clientId &&
                    <div className={styles.userRelated}>
                      <span className={styles.userRelatedText}>
                        {user.clientName}
                      </span>
                      <button className={styles.deleteButton} name='clientId' onClick={(e)=>handleInputChange(e as never)}>X</button>
                    </div>
                  }
                </div>
            </div>
          )}
          {true && (
            <>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div
                  className={styles.selectContainer}
                  style={{ marginLeft: 17 }}
                >
                  <label htmlFor="" className={styles.labelStyle}>
                    Selecciona el rol del usuario
                  </label>
                  <select
                    name="id"
                    id=""
                    className={styles.formInput}
                    onChange={(e) => handleInputChange(e as never)}
                  >
                    <option value="" style={{ color: "grey" }}>
                      Seleccione un rol
                    </option>
                    {data?.roles?.map((e: Role, index: number) => (
                      <option
                        key={index}
                        value={e.id}
                        selected={e.id === user.roleId ? true : false}
                      >
                        {e.role}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className={styles.selectContainer}
                  style={{ marginLeft: 33 }}
                >
                  <label htmlFor="" className={styles.labelStyle}>
                    Selecciona el tipo de ientificación
                  </label>
                  <select
                    name="idType"
                    id=""
                    className={styles.formInput}
                    onChange={(e) => handleInputChange(e as never)}
                  >
                    <option value="" style={{ color: "grey" }}>
                      Seleccione identificación
                    </option>
                    {idRespomse?.identifications?.map(
                      (e: IndentificationType, index: number) => (
                        <option
                          key={index}
                          value={e.id}
                          selected={e.id === user.identId ? true : false}
                        >
                          {e.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <form
                onSubmit={(e) => sendData(e as never)}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "1rem 1rem",
                  justifyContent: "space-between",
                  overflowY: "scroll",
                }}
              >
                {fields.map((field) => (
                  <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder ?? ""}
                    onChange={handleChange}
                    required={field.required}
                    styleInput={field.style}
                    rowStyle={field.rowStyle}
                    disabled={isEditable ? field.disabled : false}
                    value={user[field.name]}
                  />
                ))}
                <div
                  style={{
                    marginTop: 10,
                    width: "100%",
                    display: "flex",
                    alignContent: "start",
                  }}
                >
                  <div
                    className={formStyles.buttonContainer}
                    style={{ marginTop: 10, width: 120 }}
                  >
                    <button type="submit">
                      {isEditable ? "Modificar Usuario" : "Crear Usuario"}
                    </button>
                  </div>
                  <div
                    className={formStyles.buttonContainer}
                    style={
                      isEditable
                        ? { marginTop: 10, visibility: "visible", width: 120 }
                        : { marginTop: 10, visibility: "hidden" }
                    }
                  >
                    <button type="button" onClick={(e) => delUser(e as never)}>
                      {isEditable ? "Eliminar Usuario" : "Crear Usuario"}
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </>
      )}
    </View>
  );
};

interface ComponentStyles {
  description: CSSProperties;
}

const componentStyles: ComponentStyles = {
  description: {
    width: "100%",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    color: THEME.secondary,
  },
};

export default CreateTech;
