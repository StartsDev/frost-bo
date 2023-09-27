/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect} from 'react'
import { Input } from '../../components/form/Input';
import styles from '../headsquare/headQuarters.module.css'
import formStyles from "../../components/form/form.module.css";
import View from '../../components/view/View';
import { CSSProperties } from 'react';
import { THEME } from '../../theme';
import { ENDPOINT } from '../../config';
import { IdentificationResponse, IndentificationType, Role, Roles, User, userResponse } from '../../types';
import { useFetcher } from '../../hooks/useFetcher';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { Fields } from '../../components/form/Form';

interface Props {
  isEditable: boolean
}

const fields: Fields[] = [
  {
    name: "numIdent",
    type: "number",
    label: "Numero de identificacion",
    placeholder: "Escriba el numero de identificacion",
    disabled: true
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
    placeholder: "ingrese un numero de telefono o celular"
  },
];


const CreateTech = ({isEditable = false}: Props) => {

  const { data, loading } = useFetcher<Roles>({method: "GET", url: ENDPOINT.auth.roles})
  const { data: idRespomse} = useFetcher<IdentificationResponse>({method: "GET", url: ENDPOINT.auth.identifications})
  const { data: userToModify} = useFetcher<userResponse>({method: "GET", url: ENDPOINT.auth.users})
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    id: '',
    numIdent: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    identId: '',
    roleId: ''
  })

  useEffect(()=> {
    setUser({
      id:'',
      numIdent: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      identId: '',
      roleId: ''
    })
  },[isEditable])
  

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    if(isEditable && e.target.name === 'idUser'){
      const userFound = userToModify?.users.find(user => user.id === e.target.value) as never
      setUser(userFound)
    }
    if(e.target.name === 'id')
    setUser({
      ...user,
      roleId: e.target.value
    })
    if(e.target.name === 'idType')
    setUser({
      ...user,
      identId: e.target.value
    })
  }

  const sendData = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    fetch(!isEditable ? ENDPOINT.auth.register : `${ENDPOINT.auth.update}/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!
      },
      body: JSON.stringify(user)
    }).then((res) => {
      if(!res.ok) {
        toast.error(`El usuario no pudo ser ${isEditable ? 'modificado' : 'creado'}, por favor consulte con el administrador`)
      }
      return res.json()
    }).then((data) => {
      if(!data.success) {
        toast.error(data.msg)
      } else {
        toast.success(`El usuario ${user.firstName} ${user.lastName} ha sido ${isEditable ? 'modificado' : 'creado'} con exito`)
      }
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
      setUser({
        id:'',
        numIdent: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        identId: '',
        roleId: ''
      })
  })
}

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prevUser => ({
      ...prevUser,
      [event.target.name]: event.target.value
    }));
  }

  return (
    <View>
      <ToastContainer />
      {
        isLoading || loading ? <Loader/> :
        <>
          <p style={componentStyles.description}>En este formulario podras {isEditable ? 'modificar' : 'crear'} todos los usuarios que accederan al Backoffice o la aplicación</p>
          {
            isEditable && 
              <div className={styles.selectContainer} style={{marginLeft: 33}}>
                <label htmlFor="" className={styles.labelStyle}>Selecciona un usuario</label>
                <select name="idUser" id="" className={styles.formInput} onChange={(e)=> handleInputChange(e as never)}>
                  <option value="" style={{color: 'grey'}}>Seleccione el usuario</option>
                  {userToModify?.users?.map((e: User, index: number) =>(
                    <option key={index} value={e.id}>{e.firstName + ' ' + e.lastName}</option>
                  ))}
                  
                </select>
              </div>
          }
          {
             true  &&
            <>
              <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                  <div className={styles.selectContainer} style={{marginLeft: 17}}>
                    <label htmlFor="" className={styles.labelStyle}>Selecciona el rol del usuario</label>
                    <select name="id" id="" className={styles.formInput} onChange={(e)=> handleInputChange(e as never)}>
                      <option value='' style={{color: 'grey'}}>Seleccione un rol</option>
                      {data?.roles?.map((e: Role, index: number) =>(
                        <option key={index} value={e.id} selected={e.id === user.roleId ? true : false}>{e.role}</option>
                      ))}
                      
                    </select>
                  </div>
                  <div className={styles.selectContainer} style={{marginLeft: 33}}>
                    <label htmlFor="" className={styles.labelStyle}>Selecciona el tipo de ientificación</label>
                    <select name="idType" id="" className={styles.formInput} onChange={(e)=> handleInputChange(e as never)}>
                      <option value="" style={{color: 'grey'}}>Seleccione identificación</option>
                      {idRespomse?.identifications?.map((e: IndentificationType, index: number) =>(
                        <option key={index} value={e.id} selected={e.id === user.identId ? true : false}>{e.name}</option>
                      ))}
                      
                    </select>
                  </div>
              </div>

              <form onSubmit={(e)=>sendData(e as never)} style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', padding: '1rem 1rem', justifyContent: 'space-between', overflowY: "scroll",}}>
                {fields.map((field)=> (
                  <Input
                    key={field.name} 
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder ?? ''}
                    onChange={handleChange}
                    required={field.required}
                    styleInput={field.style}
                    rowStyle={field.rowStyle}
                    disabled={isEditable ? field.disabled : false}
                    value={user[field.name]}
                  />
                ))}
                <div className={formStyles.buttonContainer} style={{marginTop: 10}}>
                  <button type='submit'>{isEditable ? 'Modificar Usuario' : 'Crear Usuario'}</button>
                </div>
              </form>
            </>
          }
        </>
      }
    </View>
  )
}

interface ComponentStyles {
  description: CSSProperties;
}

const componentStyles: ComponentStyles = {
  description: {
    width:"100%",
    marginLeft:30,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    color: THEME.secondary
  }
}

export default CreateTech
