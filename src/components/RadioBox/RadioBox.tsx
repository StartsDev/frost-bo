import React from 'react'
import style from './radio.module.css'

interface Props {
  value: number;
  onChange: (value) => void;
  selectedOption: number
  title1: string;
  title2: string;
}

export const RadioBox = ({value, onChange, selectedOption, title1, title2}: Props) => {
  return (
    <div className={style.radioContainer}>
      <div className={style.radioBox}>
        <span>{title1}</span>
        <input 
          type="radio" 
          value={0}
          checked={selectedOption == 0}
          onChange={onChange}
        />
      </div>
      <div className={style.radioBox}>
        <span>{title2}</span>
        <input 
          type="radio" 
          value={1}
          checked={selectedOption == 1}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
