import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Badge from 'components/Badge';
import BidList from 'components/BidList';
import {
  Activity,
  Info,
  ChainInfo,
  Meta,
  Owner
} from 'components/ArtworkBlocks';

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"

import SwiperCore, { Pagination } from "swiper/core";

SwiperCore.use([Pagination]);

const Artwork = ({ data }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const {
    assets,
    title,
    description,
    auction,
    price,
    bids,
    creator: {
      photo: creatorPhoto,
      hash: creatorHash,
      nickname: creatorNick
    },
    owner: {
      photo: ownerPhoto,
      hash: ownerHash,
      nickname: ownerNick,
      bid: ownerBid
    }
  } = data;

  const slide = (dir) => {
    dir === "left" ? swiperRef.slidePrev(900) : swiperRef.slideNext(900);
  }

  return <div className="artwork">
    <div className="artwork__slider">
      {/* Background title */}
      <div className="artwork__slider-title">{title}</div>
      {/* Slider */}
      <Swiper
        loop={true}
        pagination={{
          "type": "fraction",
          "modifierClass": "slider__pagination-"
        }}
        className="artwork__swiper"
        onSwiper={setSwiperRef}
      >
        {
          assets.map((item, i) => <SwiperSlide key={item}>
            <div className="swiper-slide__wrapper" style={{
              backgroundImage: `url(${item})`
            }}>
              <img src={item} alt={"Artwork image " + i}/>
            </div>
          </SwiperSlide>)
        }
      </Swiper>
      {/* Elements at the top left */}
      <div className="artwork__slider-creations">@{creatorNick} / Creations</div>
      <div className="artwork__slider-nav">
        <button onClick={() => slide("left")} className="artwork__slider-nav-btn artwork__slider-nav-btn--left">
          <i className="icon icon--left"></i>
        </button>
        <button onClick={() => slide("right")} className="artwork__slider-nav-btn artwork__slider-nav-btn--left">
          <i className="icon icon--right"></i>
        </button>
      </div>
      {/* Text block at the top left */}
      <div className="artwork__slider-info">
        <h1 className="artwork__slider-name">{title}</h1>
        <div className="artwork__slider-description">{description}</div>
        <div className="artwork__slider-badge">
          <Badge type="heading-nick" imgUrl={creatorPhoto} nick={creatorNick} text="Created by" />
        </div>
      </div>
      {/* Auction block at the bottom left */}
      <div className="artwork__slider-auction">
        { auction ? (
          <>
            <div className="artwork__slider-auction-title">Current bids</div>
            <BidList data={bids} />
          </>
        ) : (
          <>
            <div className="artwork__slider-auction-title">Auction Ended</div>
            <Badge type="hash-bid" nick={ownerNick} imgUrl={ownerPhoto} hash={ownerHash} bid={`${ownerBid} ETH`} />
          </>
        ) }

      </div>
      {/* Price block at the bottom right */}
      <div className={`artwork__slider-price ${auction ? "artwork__slider-price--active" : ''}`}>
        {
          auction === false && (<div className="artwork__slider-price-title">Last price</div>)
        }
        <div className="artwork__slider-price-value">{price} ETH</div>
        {
          auction && (<div className="artwork__slider-price-btn">
            <button className="btn btn--bid">Bid in</button>
          </div>)
        }
      </div>
    </div>
    <div className="artwork__grid">
      <div className="artwork__grid-column">
        <div className="artwork__grid-cell">
          <Info />
        </div>
        <div className="artwork__grid-cell">
          <Owner />
        </div>
      </div>
      <div className="artwork__grid-column">
        <div className="artwork__grid-cell">
          <Activity />
        </div>
        <div className="artwork__grid-cell">
          <ChainInfo />
        </div>
        <div className="artwork__grid-cell">
          <Meta />
        </div>
      </div>
    </div>
  </div>
}

export async function getServerSideProps({ query }) {
  const { slug } = query;

  // TODO: тут будем запрашивать данные с сервера и передавать в компонент
  // const res = await fetch(`https://...`)
  // const data = await res.json()

  // Схема запроса
  const data = {
    "title": "abstract horizons - sunset on the mountains",
    "description": 'The "New World" is a map of the world, and, apparently, it is a version of an entirely new world with incomprehensible borders, where all the territories are covered with flowers.',
    "assets": [
      "/assets/artwork-1.png",
      "/assets/artwork-2.png",
      "/assets/artwork-3.png"
    ],
    "auction": true,
    "creator": {
      "photo": "/assets/author-1x1.png",
      "hash": "0x3d816...a34c",
      "nickname": "Solitude"
    },
    "owner": {
      "photo": "/assets/author-1x1.png",
      "hash": "0x3d816...a35c",
      "nickname": "Kult_Collection",
      "bid": 3, // Цена, за которую работа была куплена
    },
    "price": "3.00",
    "bids": [
      {
        "nickname": "/",
        "photo": "/assets/author-1x1.png",
        "hash": "M329X...0X531",
        "bid": 0.5,
      },
      {
        "nickname": "/",
        "photo": "/assets/author-1x1.png",
        "hash": "M329X...0X532",
        "bid": 2,
      },
      {
        "nickname": "/",
        "photo": "/assets/author-1x1.png",
        "hash": "M329X...0X533",
        "bid": 1,
      }
    ],

  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data
    },
  }
}

export default Artwork
