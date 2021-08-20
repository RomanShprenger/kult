import { useRef, useState } from "react";
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";

SwiperCore.use([EffectCoverflow, Pagination]);

export default function Slider({ data }) {
  const [swiperRef, setSwiperRef] = useState(null);

  const slide = (dir) => {
    const indexBefore = swiperRef.activeIndex;
    const blocksBefore = swiperRef.slides[indexBefore].querySelectorAll('.slider__item-animation');
    [].forEach.call(blocksBefore, function(block) {
      block.classList.add('hide');
    });
    [].forEach.call(swiperRef.slides, function(item) {
      item.querySelector('.slider__item').classList.add('scale');
    });
    setTimeout(() => {
      dir === "left" ? swiperRef.slidePrev(900) : swiperRef.slideNext(900);
      setTimeout(() => {
        [].forEach.call(swiperRef.slides, function(item) {
          item.querySelector('.slider__item').classList.remove('scale');
        });
        const blocksAfter = swiperRef.slides[swiperRef.activeIndex].querySelectorAll('.slider__item-animation');
        [].forEach.call(blocksAfter, function(block) {
          block.classList.add('show');
        });
        [].forEach.call(blocksBefore, function(block) {
          block.classList.remove('show', 'hide');
        });
      }, 700);
    }, 700);
  }

  return (
    <div className="slider__wrapper">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        freeMode={true}
        freeModeSticky={true}
        freeModeMomentumBounceRatio={1}
        freeModeMomentumRatio={2}
        freeModeMomentumVelocityRatio={0.5}
        coverflowEffect={{
          rotate: 10,
          stretch: -100,
          depth: -120,
          modifier: 1,
          slideShadows: true
        }}
        loop={true}
        className="slider"
        pagination={{
          "type": "fraction",
          "modifierClass": "slider__pagination-"
        }}
        onSwiper={(swiper) => {
          setSwiperRef(swiper);
          setTimeout(() => {
            const blocks = swiper.slides[swiper.activeIndex].querySelectorAll('.slider__item-animation');
            [].forEach.call(blocks, function(block) {
              block.classList.add('show');
            });
          }, 700);
        }}
        onSlideChange={(swiper) => {
          const indexBefore = swiper.previousIndex;
          setTimeout(() => {
            const blocksBefore = swiper.slides[indexBefore].querySelectorAll('.slider__item-animation');
            [].forEach.call(blocksBefore, function(block) {
              block.classList.remove('show', 'hide');
            });
            const blocks = swiper.slides[swiper.activeIndex].querySelectorAll('.slider__item-animation');
            [].forEach.call(blocks, function(block) {
              block.classList.add('show');
            });
          }, 300);
        }}
      >
      {
        data.map(({ imgUrl, title, owner, price, slug }) => (
          <SwiperSlide key={title}>
            {({ isActive }) => (
              <>
                <Link href={`/artwork/${slug}`}>
                  <a className="slider__item">
                    <img src={imgUrl} alt={title} />
                  </a>
                </Link>
                <div className={`slider__item-content  ${isActive ? "visible" : ""}`}>
                  <Link href={`/artwork/${slug}`}>
                    <a className="slider__item-title">
                      <div className="slider__item-animation">
                        {title}
                      </div>
                    </a>
                  </Link>
                  <div className="slider__item-info-wrapper">
                    <div className="slider__item-info slider__item-animation">
                      <Link href={`/user/${owner.nickname}`}>
                        <a className="slider__item-owner item__owner">
                          <div className="item__owner-photo">
                            <img src={owner.avatar} alt={owner.name} />
                          </div>
                          <div className="item__owner-info">
                            <span className="item__owner-title">Owner</span>
                            <span className="item__owner-link">
                              <span className="item__owner-at">@</span>
                              <span className="item__owner-name">{owner.name}</span>
                            </span>
                          </div>
                        </a>
                      </Link>
                      <div className="slider__item-buy item__buy">
                        <div className="item__buy-price">{price}</div>
                        <button type="button" className="item__buy-btn">bid in</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </SwiperSlide>
        ))
      }
      </Swiper>
      <div className="slider__nav">
        <button onClick={() => slide("left")} className="slider__nav-btn slider__nav-btn--left">
          <i className="icon icon-arrow-left"></i>
        </button>
        <button onClick={() => slide("right")} className="slider__nav-btn slider__nav-btn--left">
          <i className="icon icon-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
