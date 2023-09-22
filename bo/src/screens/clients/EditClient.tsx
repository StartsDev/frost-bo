/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
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


  const { data, loading } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
  const [userByCustomer, setUsersByCustomer] = useState<any>([])
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
    console.log(clientId);
    setIsLoading(true)
    fetch(ENDPOINT.auth.users)
    .then(res => {
      if(!res.ok){
        toast.error('Por favor recargue la pagina nuevamente')
      }
      return res.json()
    }).then(data => {
      // const usersFound = data.users.filter((user: User) => user.clientId === clientId)
      // console.log(usersFound);
      // setUsersByCustomer(usersFound)
      setUsersByCustomer(data)
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
        // user_id:customerToEdit.user_app.user_id ?? '',
        // role_id:customerToEdit.user_app.role_id ?? '', 
        // role_name:customerToEdit.user_app.role_name ?? ''
        user_id:'',
        role_id:'', 
        role_name:''
      }
    })  
  }

  console.log(userByCustomer);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userSelected = userByCustomer.users.find((user: User) => user.id === e.target.value)
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

  const sendData = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    fetch(`${ENDPOINT.clients.update}/${client.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!
      },
      body: JSON.stringify(client)
    }).then((res) => {
      if(!res.ok) {
        toast.error('El cliente no pudo ser modificado, por favor consulte con el administrador')
      }
      return res.json()
    }).then((data) => {
      if(!data.success) {
        toast.error(data.msg)
      } else {
        toast.success(`El cliente ${client.businessName} ha sido modificado con exito`)
      }
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
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
    })
  }


  return (
    <View>
        <ToastContainer />
        <div className={styles.selectContainer} style={{marginLeft: 33}}>
          <label htmlFor="" className={styles.labelStyle}>Seleccione el cliente</label>
          <select name="clientId" id="" className={styles.formInput} onChange={(e)=> handleChangeInput(e as never)}>
            <option value="" style={{color: 'grey'}}>Seleccione un cliente</option>
            {data?.clients?.map((client: any, index: any) =>(
              <option key={index} value={client.id}>{client.businessName}</option>
            ))}
            
          </select>
        </div>
        <div className={styles.selectContainer} style={{marginLeft: 33, marginTop: 10}}>
          <label htmlFor="" className={styles.labelStyle}>Seleccione usuario asociado al cliente </label>
          <select name="" id="" className={styles.formInput} onChange={(e) => handleUserChange(e as never)}>
              <option value='' style={{color: 'grey'}}>Seleccione un usuario</option>
              {userByCustomer.users?.map((user: any, index: any) =>(
                <option key={index} value={user.id}>{user.firstName + ' ' + user.lastName}</option>
              ))}
              
          </select>
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
export default EditClient