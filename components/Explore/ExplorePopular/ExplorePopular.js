import { useState } from "react";
import ExplorePopularArtwork from './ExplorePopularArtwork';
import Profile from 'components/Profile';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { Pagination } from "swiper/core";

SwiperCore.use([Pagination]);

const ExplorePopular = ({ data }) => {
  const { author, posts } = data;

  const [followed, setFollowed] = useState(false);

  const followHandler = (e) => {
    console.log(e);
    setFollowed(true);
  }

  return (
    <div className="explore__popular-item-wrapper">
      <div className="container">
        <div className="explore__popular-item">
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
              centeredSlides={true}
              slidesPerView={3}
              freeMode={true}
              freeModeSticky={true}
              loop={true}
              className="explore__artworks-slider"
            >
            {
              posts.map((post, i) => (
                <SwiperSlide key={i}>
                  <ExplorePopularArtwork post={post} />
                </SwiperSlide>
              ))
            }
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplorePopular;
