import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import style from './swiper.module.css'

interface Props {
  images : string[]
}

export const SwiperComponent = ({images}: Props) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={2}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      style={{width: '50%'}}
    >
      {
        images.map(image => (
          <SwiperSlide className={style.swiperSlide}>
            {/* slide 1 */}
            <img src={image} alt={''} className=''/>
          </SwiperSlide>

        ))
      }
    </Swiper>
  )
}
