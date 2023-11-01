import React, {useState} from 'react'
import View from '../../components/view/View'
import styles from '../headsquare/headQuarters.module.css'
import formStyles from "../../components/form/form.module.css";
import { useFetcher } from '../../hooks/useFetcher'
import { User, userResponse } from '../../types'
import { ENDPOINT } from '../../config'
import { THEME } from '../../theme'
import { CSSProperties } from 'react';
import { Input } from '../../components/form/Input'
import { ToastContainer, toast } from 'react-toastify';
import { RadioBox } from '../../components/RadioBox/RadioBox';
import Loader from '../../components/Loader/Loader';

interface ResetPassword {
  identId: string;
  numIdent: string;
  password: string;
  rePassword: string;
}

export const PasswordManagement = () => {
  const { data: userToModify, loading} = useFetcher<userResponse>({method: "GET", url: ENDPOINT.auth.users})
  const [newPassword, setNewPassword] = useState<ResetPassword>({
    identId: '',
    numIdent: '',
    password: '',
    rePassword: ''
  })
  const [selectedOption, setSelectedOption] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const user: User = JSON.parse(e.target.value)
    setNewPassword({
      identId: user.identId,
      numIdent: user.numIdent,
      password: '',
      rePassword: ''
    })
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value
    })
  }

  const resetPassword =(): void => {
    if(!passwordCheck) {
      toast.error('Las contraseñas no coinciden o algun campo esta vacio, por favor rectificar')
      return
    }
    setIsLoading(true)
    fetch(selectedOption === 0 ? ENDPOINT.auth.asignPassword : ENDPOINT.auth.updatePassword, {
      method: selectedOption === 0 ? 'POST' : 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!
      },
      body: JSON.stringify(selectedOption === 0 ? {identId: newPassword.identId, numIdent: newPassword.numIdent, password: newPassword.password } : {identId: newPassword.identId, numIdent: newPassword.numIdent, password: newPassword.password })
    })
    .then(res => {
      if(!res.ok) {
        toast.error(`La contraseña no pudo ser asignada, por favor comuniquese con el administrador`)
      }
      return res.json()
    })
    .then((data) => {
      if(data.success) {
        toast.success(data.msg)
      }
      if(!data.success){
        toast.error(data.message)
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false)
      setNewPassword({
        identId: '',
        numIdent: '',
        password: '',
        rePassword: ''
      })
    })
  }

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const passwordCheck = newPassword.password !== '' && newPassword.rePassword !== '' && newPassword.password === newPassword.rePassword 
 
  return (
    <View>
      <ToastContainer />
      {
         isLoading || loading ? <Loader/> :
         <>
          <p style={componentStyles.description}>En este formulario podras asignar y resetear las contraseñas de los usuarios</p>
          <p style={{...componentStyles.description, marginTop: -10}}>Importante: Solo podra asignar contraseña a los usuario nuevos y que no se les haya asignado una contraseña</p>
          {/* <input 
            type="radio" 
            value={0}
            checked={selectedOption == 0}
            onChange={handleRadioChange}
          />
          <input 
            type="radio" 
            value={1}
            checked={selectedOption == 1}
            onChange={handleRadioChange}
          /> */}
          <RadioBox
            onChange={handleRadioChange}
            selectedOption={selectedOption}
            title1='Asignar'
            title2='Reasignar'
            value={0}
          />
          <div className={styles.selectContainer} style={{marginLeft: 17}}>
            <label htmlFor="" className={styles.labelStyle}>Selecciona un usuario</label>
            <select name="id" id="" className={styles.formInput} onChange={(e)=> handleSelectChange(e as never)}>
              <option value='' style={{color: 'grey'}}>Seleccione un usuario</option>
              {userToModify?.users?.map((e: User, index: number) =>(
                <option key={index} value={JSON.stringify(e)}>{e.firstName} {e.lastName}</option>
              ))}
              
            </select>
          </div>
          {
            newPassword.identId !== '' &&
            <div style={{width: '100%', padding: 10, marginTop: 50}}>
              <Input
                label={'Ingrese la nueva Contraseña'}
                name={'password'}
                type={'password'}
                placeholder={'Nueva contraseña'}
                onChange={handleInputChange}
                required={true}
                // styleInput={field.style}
                rowStyle={{}}
                // disabled={isEditable ? field.disabled : false}
                value={newPassword.password}
              />
              {
                !passwordCheck &&
                <span style={{color: 'red', fontSize: 12}}>las contraseñas no coinciden, por favor rectifiquelas</span>
              }
              <Input
                label={'Confirme la nueva Contraseña'}
                name={'rePassword'}
                type={'password'}
                placeholder={'Reingrese la contraseña'}
                onChange={handleInputChange}
                required={true}
                // styleInput={field.style}
                rowStyle={{marginTop: 30}}
                // disabled={isEditable ? field.disabled : false}
                value={newPassword.rePassword}
              />
              {
                !passwordCheck &&
                <span style={{color: 'red', fontSize: 12}}>las contraseñas no coinciden, por favor rectifiquelas</span>
              }
              <div className={formStyles.buttonContainer} style={{marginTop: 30}}>
                <button onClick={resetPassword} >Cambiar contraseña</button>
                {/* <button onClick={()=>console.log('first')} disabled>Cambiar contraseña</button> */}
              </div>
            </div>
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
