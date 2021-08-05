import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link';
import Badge from 'components/Badge';
import BidList from 'components/BidList';
import { priceFormat } from "utils/format";
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
    tags,
    categories,
    chainInfo,
    unlockable,
    activity,
    meta,
    creator,
    creator: {
      photo: creatorPhoto,
      hash: creatorHash,
      nickname: creatorNick
    },
    owner,
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
      {/* Elements at the top right */}
      <div className="artwork__slider-creations">@{creatorNick} / Creations</div>
      <div className="artwork__slider-nav">
        <button onClick={() => slide("left")} className="artwork__slider-nav-btn artwork__slider-nav-btn--left">
          <i className="icon icon-arrow-left"></i>
        </button>
        <button onClick={() => slide("right")} className="artwork__slider-nav-btn artwork__slider-nav-btn--left">
          <i className="icon icon-arrow-right"></i>
        </button>
      </div>
      {/* Text block at the top left */}
      <div className="artwork__slider-info">
        <div className="artwork__slider-badge artwork__slider-badge--mobile">

          <div className="artwork__slider-badge-creator">
            <div className="artwork__slider-badge-creator-photo">
              <img src={creatorPhoto} alt={creatorNick} />
            </div>
            <div className="artwork__slider-badge-creator-info">
              <span className="artwork__slider-badge-creator-title">Creator</span>
              <Link href="/">
                <a className="artwork__slider-badge-creator-link">
                  <span className="at">@</span>{creatorNick}
                </a>
              </Link>
            </div>
          </div>

        </div>
        <h1 className="artwork__slider-name">{title}</h1>
        <div className="artwork__slider-description">{description}</div>
        <div className="artwork__slider-badge artwork__slider-badge--desktop">
          <Badge type="heading-nick" imgUrl={creatorPhoto} nick={creatorNick} text="Created by" />
        </div>
      </div>
      {/* Auction block at the bottom left */}
      <div className="artwork__slider-auction">
        { auction.active ? (
          <>
            <div className="artwork__slider-auction-title">Current bids</div>
            <BidList data={bids} />
          </>
        ) : (
          <>
            <div className="artwork__slider-auction-title">Auction Ended</div>
            <Badge type="hash-bid" nick={ownerNick} imgUrl={ownerPhoto} hash={ownerHash} bid={`${priceFormat(ownerBid.eth)} ETH`} />
          </>
        ) }

      </div>
      {/* Price block at the bottom right */}
      <div className={`artwork__slider-price ${auction.active ? "artwork__slider-price--active" : ''}`}>
        <div className="artwork__slider-price-title">
          { auction.active === false ? "Last price" : "Last bid" }
        </div>
        <div className="artwork__slider-price-value">
          { auction.active === false ? priceFormat(price.eth) : priceFormat(auction.last_bid.eth) } ETH
        </div>
        {
          auction.active && (<button className="btn btn--bid artwork__slider-price-btn">Bid in</button>)
        }
      </div>
    </div>
    <div className="artwork__grid">
      <div className="artwork__grid-column">
        <div className="artwork__grid-cell">
          <Info creator={creator} title={title} description={description} unlockable={unlockable} tags={tags} categories={categories} />
        </div>
        <div className="artwork__grid-cell">
          <Owner price={price} auction={auction} owner={owner} />
        </div>
      </div>
      <div className="artwork__grid-column">
        <div className="artwork__grid-cell">
          <Activity data={activity} auctionActive={auction.active} owner={owner} />
        </div>
        <div className="artwork__grid-cell">
          <ChainInfo data={chainInfo} />
        </div>
        <div className="artwork__grid-cell">
          <Meta data={meta} />
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
    "title": "abstract horizons sunset on the mountains",
    "description": 'The "New World" is a map of the world, and, apparently, it is a version of an entirely new world with incomprehensible borders, where all the territories are covered with flowers.',
    "assets": [
      "/assets/artwork-1.png",
      "/assets/artwork-2.png",
      "/assets/artwork-3.png"
    ],
    "unlockable": {
      "status": true,
      "content": "The piece of art was created by PPSS group - collaboration between Pavel Pepperstein and Sonya Stereostyrski. <a href='https://en.wikipedia.org/wiki/Pavel_Pepperstein' target='_blank'>https://en.wikipedia.org/wiki/Pavel_Pepperstein</a>"
    },
    "tags": ["Visual", "3D", "Contemporary", "GraphicDesign", "Objects", "Collectible", "Network", "Neon", "Installations", "GIF", "Motion", "Interactive"],
    "categories": ["visual design"],
    "auction": {
      "active": true,
      "last_bid": {
        "eth": 2,
        "usd": 1464.26
      },
      "min_bid": 2.1
    },
    "activity": [
      {
        "event": "Bid placed",
        "hash": "0x3d816...a35c",
        "photo": "/assets/author-1x1.png",
        "date": 1621430820, // timestamp
        "bid": {
          "eth": 2,
          "usd": 1464.26
        }
      },
      {
        "event": "Listed by",
        "hash": "0x3d816...a35c",
        "photo": "/assets/author-1x1.png",
        "date": 1621430820,
        "bid": {
          "eth": 2,
          "usd": 1464.26
        }
      },
      {
        "event": "Reserve Changed",
        "hash": "0x3d816...a35c",
        "photo": "/assets/author-1x1.png",
        "date": 1621430820,
        "bid": {
          "eth": 2,
          "usd": 1464.26
        }
      },
      {
        "event": "Bid placed",
        "hash": "0x3d816...a35c",
        "photo": "/assets/author-1x1.png",
        "date": 1621430820,
        "bid": {
          "eth": 0.5,
          "usd": 366.07
        }
      }
    ],
    "creator": {
      "photo": "/assets/author-1x1.png",
      "hash": "0x3d816...a34c",
      "nickname": "Solitude"
    },
    "owner": {
      "photo": "/assets/author-1x1.png",
      "hash": "0x3d816...a35c",
      "nickname": "Kult_Collection",
      "date": 1621430820, // timestamp, когда работа была куплена
      "bid": { // цена, за которую работа была куплена
        "eth": 3,
        "usd": 1464.26
      },
    },
    "price": {
      "eth": 3,
      "usd": 1464.26
    },
    "chainInfo": [
      {
        "key": "etherscan",
        "text": "View on Etherscan",
      },
      {
        "key": "ipfs",
        "text": "View on IPFS",
      },
      {
        "key": "opensea",
        "text": "View on Opensea",
      }
    ],
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
    "meta": `{"name":"Bitwise Archetypes: CHILD ","description":"ESFP\n\n#1 in a series of 16 Archetypes\n\n“77. Even a highly differentiated consciousness has not by any means finished with CHILDISH things”\n\nA collaboration between IX SHELLS and KAI. Drawing on a lifetime of influences, from Carl Jung to the I CHING.  From Afro-Caribbean masks to Goethe's Theory of Colors. The Archetypes represent the conscious architectures that unite us as a single being of many people.\n\nSound design remixed from ByteBeat #169\n\nCollection also found at: foundation.app/kaigani\n","image":"ipfs://QmbENPncVeBBfxW2UEQdU5DUQdhtm6aR58ps1kEEJrqJZn/nft.mp4"}`
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
