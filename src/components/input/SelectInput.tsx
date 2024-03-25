/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties } from 'react'
import styles from './select.module.css'

interface Props {
  label: string
  handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  data: Array<any>
  value: string
  selected?: boolean
  selectedValue?: string
  name: string
  property: string
  styleInput?: CSSProperties
}

export const SelectInput = ({data, handleChange, label, name, placeholder, value, property, styleInput, selectedValue}: Props) => {
  return (
    <div className={styles.selectContainer}>
      <label htmlFor="" className={styles.labelStyle}>{label}</label>
      <select name={name} id="" className={styles.formInput} style={styleInput} onChange={(e)=> handleChange(e as never)}>
        <option value={value} style={{color: 'grey'}}>{placeholder}</option>
        {data?.map((e: any , index: number) =>(
          <option key={index} value={e[value]} selected={selectedValue == e[property]}>{e[property]}</option>
        ))}
        
      </select>
    </div>
  )
}
