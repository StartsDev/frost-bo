/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, CSSProperties } from 'react';
import { Fields } from "../../components/form/Form"
import View from "../../components/view/View"
import styles from '../headsquare/headQuarters.module.css'
import formStyles from "../../components/form/form.module.css";
import { ENDPOINT } from "../../config"
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { Client, ClientResponse, User } from '../../types';
import { useFetcher } from '../../hooks/useFetcher';
import { Input } from '../../components/form/Input';
import { THEME } from '../../theme';
import axios from 'axios';

const fields: Fields[] = [
  {
    name: "businessName",
    type: "text",
    label: "Nombre de la empresa o persona",
    placeholder: "Ingrese el nombre de la empresa o de la persona a crear como cliente",
    style:{width: '100%'},
    rowStyle:{width: '100%'}
  },
  {
    name: "nit",
    type: "number",
    label: "Cedula o Nit",
    placeholder: "Ingrese el numero del Nit o numero de cedula",
    // style:{width: '50%'},
  },
  {
    name: "contact",
    type: "text",
    label: "Contacto",
    placeholder: "Ingrese nombre de contacto",
    // style:{width: '50%'},
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
    // style:{width: '50%'},
  },
  {
    name: "address",
    type: "text",
    label: "Dirección",
    placeholder: "Ingrese dirección",
    // style:{width: '50%'},
  },
  {
    name: "city",
    type: "text",
    label: "Ciudad",
    placeholder: "Ingrese ciudad de residencia",
    // style:{width: '50%'},
  },
  {
    name: "phone",
    type: "number",
    label: "Número de teléfono",
    placeholder: "Teléfono",
    // style:{width: '50%'},
  },
];

function EditClient() {


  const { data, loading, fetchMemo } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
  const [userByCustomer, setUsersByCustomer] = useState<any>([])
  const [userByRole, setUsersByRole] = useState<any>([])
  const [userList, setUserList] = useState<any>([])
  const [client, setCleint] = useState({
    id: '',
    businessName:"",
    nit: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    contact: "",
    user_app:{
        user_id:"",
        role_id:"", 
        role_name:""
    }
  })

  // console.log(client);

  const getUser = (clientId: string) => {
    setIsLoading(true)
    fetch(ENDPOINT.auth.users)
    .then(res => {
      if(!res.ok){
        toast.error('Por favor recargue la pagina nuevamente')
      }
      return res.json()
    }).then(data => {
      const usersCustomers = data.users.filter((user: User) => user.clientId === clientId)
      const usersByRole = data.users.filter((user: User) => user?.Role?.role === "Cliente")
      // console.log(usersFound);
      // setUsersByCustomer(usersFound)
      setUserList(data?.users)
      setUsersByRole(usersByRole)
      setUsersByCustomer(usersCustomers)
    }).finally(()=> {
      setIsLoading(false)
    })
  }
   
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const customerToEdit:Client = data?.clients.find(client => client.id === event.target.value) as never
    getUser(customerToEdit.id)
    setCleint({
      id: customerToEdit.id,
      businessName: customerToEdit.businessName,
      nit: customerToEdit.nit,
      contact: customerToEdit.contact,
      email: customerToEdit.email,
      address: customerToEdit.address,
      city: customerToEdit.city,
      phone: customerToEdit.phone,
      user_app:{
        user_id:'',
        role_id:'', 
        role_name:''
      }
    })  
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userSelected = userList?.find((user: User) => user.id === e.target.value)
    setCleint({
      ...client,
      user_app: {
        user_id: userSelected.id,
        role_id: userSelected.roleId,
        role_name: userSelected.Role.role

      }
    })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCleint({
      ...client,
      [e.target.name] : e.target.value
    })
  }

  const sendData = async (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const {data} = await axios({
        method: "PATCH",
        url: `${ENDPOINT.clients.update}/${client.id}`,
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem('key')!
        },
        data: JSON.stringify(client)
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
      setCleint({
        id: '',
        businessName:"",
        nit: "",
        address: "",
        email: "",
        phone: "",
        city: "",
        contact: "",
        user_app:{
            user_id:"",
            role_id:"", 
            role_name:""
        }
      })
    }
  }


  return (
    <View>
        <ToastContainer />
        <div className={styles.headerContainer}>
          <div className={styles.headerContainer__selectOption}>
            <div className={styles.selectContainer} style={{padding: 15}}>
              <label htmlFor="" className={styles.labelStyle}>Seleccione el cliente</label>
              <select name="clientId" id="" className={styles.formInput} onChange={(e)=> handleChangeInput(e as never)}>
                <option value="" style={{color: 'grey'}}>Seleccione un cliente</option>
                {data?.clients?.map((client: any, index: any) =>(
                  <option key={index} value={client.id}>{client.businessName}</option>
                ))}
                
              </select>
            </div>
            <div className={styles.selectContainer} style={{padding: 15}}>
              <label htmlFor="" className={styles.labelStyle}>Seleccione usuario asociado al cliente </label>
              <select name="" id="" className={styles.formInput} onChange={(e) => handleUserChange(e as never)}>
                  <option value='' style={{color: 'grey'}}>Seleccione un usuario</option>
                  {userByRole?.map((user: any, index: any) =>(
                    <option key={index} value={user.id}>{user.firstName + ' ' + user.lastName}</option>
                  ))}
                  
              </select>
            </div>
          </div>
          <div className={styles.headerContainer__listUser} style={{padding: 15, marginRight: 100}}>
            {
              client.id.length > 0 &&
              <p style={{fontWeight: 600}}>Usuarios asociados al cliente</p>
            }
            {
              client.id.length > 0 && userByCustomer.length > 0 && 
              <div className={styles.headerContainer__listUser__container} style={{height: '150px', overflow: 'auto'}}>
                {
                  userByCustomer.map((user: User, index: any) => (
                    <div key={index}>
                      <span className={styles.headerContainer__listUser__user}>{user.firstName} {user.lastName}</span>
                      <div className={styles.headerContainer__listUser__separator}/>
                    </div>
                  ))
                }
              </div>
            }
            {
              client.id.length > 0 && userByCustomer.length === 0 && 
              <p style={componentStyles.description}>El cliente no tiene usuarios asociados</p>
            } 
          </div>
        </div>
        {isLoading || loading ? <Loader/> : 
        <>
        
          <form onSubmit={(e)=>sendData(e as never)} style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', padding: '1rem 1rem', justifyContent: 'space-between', overflowY: "scroll",}}>
            {fields.map((field)=> (
              <Input
                key={field.name} 
                label={field.label}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder ?? ''}
                onChange={onChange}
                required={true}
                styleInput={field.style}
                rowStyle={field.rowStyle}
                value={client[field.name]}
              />
            ))}
            <div className={formStyles.buttonContainer} style={{marginTop: 10}}>
              <button type='submit'>Modificar cliente</button>
            </div>
          </form>
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
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    color: THEME.secondary
  }
}
export default EditClient