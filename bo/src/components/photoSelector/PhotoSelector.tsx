import React, {useRef} from 'react'
import style from  './photoselector.module.css'
import axios from 'axios';
import { ENDPOINT } from '../../config';

interface Props {
  setImage: (image: string) => void;
  setMenu?: (menu: boolean) => void;
  id: string
}

export const PhotoSelector = ({setImage, setMenu, id}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTextClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    setImage(URL.createObjectURL(selectedFile))
    setMenu!(false)
    const data = new FormData()
    const blob = new Blob([selectedFile]);
    data.append('data', blob, selectedFile.name)
    const res = await axios.post(`${ENDPOINT.image.uploadAvatar}/${id}`, data, {
      headers: {
        'Content-Type':'multipart/form-data',
        "x-token": localStorage.getItem('key')!,
        // "x-apikey": import.meta.env.VITE_X_API_KEY
      }
    })
    console.log('RESPONSE AVATAR', res)
  };
  return (
    <>
       <span onClick={handleTextClick} className={style.optionMenu}>
        Cambiar foto de perfil
      </span>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  )
}
