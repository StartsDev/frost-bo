/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './imageLoader.module.css'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { ENDPOINT } from "../../config"
import axios from 'axios'

interface Props {
  imageList: string[]
  id: string
}

export const ImageLoader = ({imageList = [], id}: Props) => {
  const [images, setImages] = useState(imageList);

  const onChange = async (e: any) => {
    setImages([...images, URL.createObjectURL(e.target.files[0])]);
   const data = new FormData()
    const file = e.target.files[0];
    const blob = new Blob([file]);
    data.append('picture', blob, file.name)
    const res = await axios.post(`${ENDPOINT.image.upload}${id}`, data, {
      headers: {
        'Content-Type':'multipart/form-data',
        "x-token": localStorage.getItem('key')!,
        "x-apikey": import.meta.env.VITE_X_API_KEY
      }
    })
    console.log(res)
  };

  return (
    <div className={style.imagesContainer}>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 30, marginTop: 20}}>
        <input type="file" onChange={onChange}/>
      </div>
      <div style={{width: '25%'}}>
        <Swiper
          modules={[Pagination]}
          pagination={true}
          slidesPerView={1}
          onSwiper={(swiper) => console.log(swiper)}
          onClick={(swiper)=>{
            setImages(images.filter((_, index) => index !== swiper.activeIndex))
          }}
        >
          {
            images.map((image, index) => (
              <SwiperSlide key={index}>
              {/* <SwiperSlide key={index}> */}
                <img src={image} alt="image" width={200} height={200} style={{borderRadius: 5}}/>
              </SwiperSlide>
            ))
          }
      </Swiper>
      </div>
    </div>
  );
}