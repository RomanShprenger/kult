import { Swiper, SwiperSlide } from "swiper/react";
import ExploreArtworksItem from './ExploreArtworksItem';

import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { Pagination } from "swiper/core";

SwiperCore.use([Pagination]);

const ExploreArtworks = ({ posts }) => {
  return (
    <div className="explore__artworks">
      <div className="container">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          freeMode={true}
          freeModeSticky={true}
          loop={true}
          className="explore__artworks-slider"
        >
        {
          posts.map(({ author, post }, i) => (
            <SwiperSlide key={i}>
              <ExploreArtworksItem author={author} post={post} />
            </SwiperSlide>
          ))
        }
        </Swiper>
      </div>
    </div>
  )
};

export default ExploreArtworks;
