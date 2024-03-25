/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, CSSProperties } from 'react';
import { Fields } from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { Client, ClientResponse, Headquarter } from '../../types';
import { useFetcher } from "../../hooks/useFetcher";
import { ToastContainer, toast } from 'react-toastify';
import styles from './headQuarters.module.css'
import formStyles from "../../components/form/form.module.css";
import { Input } from "../../components/form/Input";
import Loader from "../../components/Loader/Loader";
import { THEME } from '../../theme';
import axios from 'axios';

const fields: Fields[] = [
  {
    name: "headName",
    type: "text",
    label: "Nombre",
    placeholder: "Nombre Sede"
  },
  {
    name: "address",
    type: "text",
    label: "Dirección",
    placeholder: "Dirección"
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    placeholder: "Email"
  },
  {
    name: "phone",
    type: "text",
    label: "Teléfono",
    placeholder: "Teléfono"
  }
];

function EditHeadSquare() {

  const { data, loading, fetchMemo } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
  const [square, setSquare] = useState({
    id: '',
    headName: "",
    address: "",
    email: "",
    phone: "",
    clientId: ""
  })

  const [headQuarterList, setHeadQuarterList] = useState<Headquarter[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSquare(prevHeadQuarter => ({
      ...prevHeadQuarter,
      [event.target.name]: event.target.value
    }));
  }

  const handleChangeInputCustomer = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const customerToEdit:Client = data?.clients.find(client => client.id === event.target.value) as never
    setHeadQuarterList(customerToEdit.headquarters)
    setSquare({
      ...square,
      clientId: customerToEdit.id
    })
  }

  const handleChangeSelectHeadquarters = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedHeadquarters: Headquarter = headQuarterList.find(headQuarter => headQuarter.headName === event.target.value) as never
    setSquare({
      id: selectedHeadquarters.id,
      address: selectedHeadquarters.address,
      email: selectedHeadquarters.email,
      headName: selectedHeadquarters.headName,
      phone: selectedHeadquarters.phone,
      clientId: selectedHeadquarters.clientId
    })
  }

  
  const sendData = async (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const {data} = await axios({
        method: "PATCH",
        url: `${ENDPOINT.squares.update}${square.id}`,
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem('key')!
        },
        data: JSON.stringify(square)
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
      setSquare({
        id: '',
        address: "",
        email: "",
        headName: "",
        phone: "",
        clientId: ""
      })
    }
  }

  return (
    <View>
        <ToastContainer />
        {
          isLoading || loading ? <Loader/> :
          <>
            <p style={componentStyles.description}>En este formulario podra modificar los datos de una sede, para tal fin debe seleccionar un cliente y una de sus sedes</p>
            <div className={styles.selectContainer} style={{marginLeft: 33}}>
              <label htmlFor="" className={styles.labelStyle}>Seleccione el cliente</label>
              <select name="clientId" id="" className={styles.formInput} onChange={(e)=> handleChangeInputCustomer(e as never)}>
                <option value="" style={{color: 'grey'}}>Seleccione un cliente</option>
                {data?.clients?.map((client: any, index: any) =>(
                  <option key={index} value={client.id}>{client.businessName}</option>
                ))}
                
              </select>
            </div>
            {
              square.clientId.length > 0  && headQuarterList.length > 0 &&
              <>
                <div className={styles.selectContainer} style={{marginLeft: 33, marginTop: 10}}>
                  <label htmlFor="" className={styles.labelStyle}>Seleccione la sede a modificar </label>
                  <select name="" id="" className={styles.formInput} onChange={(e) => handleChangeSelectHeadquarters(e as never)}>
                      <option value='' style={{color: 'grey'}}>Seleccione una sede</option>
                      {headQuarterList?.map((e: Headquarter, index: any) =>(
                        <option key={index} value={e.headName}>{e.headName}</option>
                      ))}
                      
                  </select>
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
                      required={true}
                      styleInput={field.style}
                      rowStyle={field.rowStyle}
                      value={square[field.name]}
                    />
                  ))}
                  <div className={formStyles.buttonContainer} style={{marginTop: 10}}>
                    <button type='submit'>Modificar cliente</button>
                  </div>
                </form>
              </>
              
            }
          </>
        }
        {square.clientId.length > 0  && headQuarterList.length === 0 && 
          // isLoading || loading ? <Loader/> : 
          <p style={componentStyles.description}>Estimado Administrador, el cliente no tiene sedes creadas</p>
          
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

export default EditHeadSquare