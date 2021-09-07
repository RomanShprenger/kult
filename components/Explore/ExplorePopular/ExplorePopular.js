import { useState } from "react";
import ExplorePopularArtwork from './ExplorePopularArtwork';
import Profile from 'components/Profile';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { Pagination } from "swiper/core";

SwiperCore.use([Pagination]);

const ExplorePopular = ({ data, index, showHelper }) => {
  const { author, posts } = data;

  const [swiperRef, setSwiperRef] = useState(null);
  const [followed, setFollowed] = useState(false);

  const pagination = {
    "clickable": true,
    "el": `.explore__popular-item--${index} .explore__slider-pagination--popular`,
    "renderBullet": (index, className) => {
      return '<span class=\"' + className + '\"></span>';
    }
  }

  const slide = dir => dir === "left" ? swiperRef.slidePrev(900) : swiperRef.slideNext(900);

  const followHandler = (e) => {
    console.log(e);
    setFollowed(!followed);
  }

  return (
    <div className="explore__popular-item-wrapper">
      <div className="container">
        <div className={`explore__popular-item explore__popular-item--${index}`}>
          <div className="explore__popular-author">
            <Profile
              type="demo"
              followHandler={followHandler}
              avatar={{ preview: author.avatar }}
              verified={author.verified}
              follower={followed}
              nickname={author.nick}
              name={author.name}
              hash={author.hash}
              stats={author.stats}
            />
          </div>
          <div className="explore__popular-works">
            <Swiper
              grabCursor={true}
              pagination={pagination}
              slidesPerView={1}
              freeMode={true}
              freeModeSticky={true}
              loop={true}
              onSwiper={setSwiperRef}
              className="explore__artworks-slider"
              breakpoints={{
                "768": {
                  "slidesPerView": 2,
                },
                "1024": {
                  "slidesPerView": 3,
                }
              }}
            >
            {
              posts.map((post, i) => (
                <SwiperSlide key={i}>
                  <ExplorePopularArtwork post={post} showHelper={i === 0 && showHelper} />
                </SwiperSlide>
              ))
            }
            </Swiper>
            <div className="explore__slider-nav">
              <button onClick={() => slide("left")} className="explore__slider-nav-btn explore__slider-nav-btn--left">
                <i className="icon icon-arrow-left"></i>
              </button>
              <div className="explore__slider-pagination explore__slider-pagination--popular"></div>
              <button onClick={() => slide("right")} className="explore__slider-nav-btn explore__slider-nav-btn--left">
                <i className="icon icon-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplorePopular;
