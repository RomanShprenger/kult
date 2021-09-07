import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ExploreArtworksItem from './ExploreArtworksItem';

import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { Pagination } from "swiper/core";

SwiperCore.use([Pagination]);

const ExploreArtworks = ({ posts, showHelper }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const pagination = {
    "clickable": true,
    "el": ".explore__slider-pagination--artworks",
    "renderBullet": (index, className) => {
      return '<span class=\"' + className + '\"></span>';
    }
  }

  const slide = dir => dir === "left" ? swiperRef.slidePrev(900) : swiperRef.slideNext(900);

  return (
    <div className="explore__artworks">
      <div className="container">
        <Swiper
          grabCursor={true}
          pagination={pagination}
          breakpoints={{
            "768": {
              "slidesPerView": 2,
            },
            "1024": {
              "slidesPerView": 3,
            }
          }}
          slidesPerView={1}
          freeMode={true}
          freeModeSticky={true}
          loop={true}
          onSwiper={setSwiperRef}
          className="explore__artworks-slider"
        >
        {
          posts.map(({ author, post }, i) => (
            <SwiperSlide key={i}>
              <ExploreArtworksItem author={author} post={post} showHelper={i === 2 && showHelper} />
            </SwiperSlide>
          ))
        }
        </Swiper>
        <div className="explore__slider-nav">
          <button onClick={() => slide("left")} className="explore__slider-nav-btn explore__slider-nav-btn--left">
            <i className="icon icon-arrow-left"></i>
          </button>
          <div className="explore__slider-pagination explore__slider-pagination--artworks"></div>
          <button onClick={() => slide("right")} className="explore__slider-nav-btn explore__slider-nav-btn--left">
            <i className="icon icon-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
};

export default ExploreArtworks;
