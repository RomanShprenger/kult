import React, { useRef, useState } from "react";
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

import artworkData from 'data/artwork.json';

const Artwork = ({ data, slug }) => {
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
    indexes,
    prev_slug,
    next_slug,
    owner,
    owner: {
      photo: ownerPhoto,
      hash: ownerHash,
      nickname: ownerNick,
      bid: ownerBid
    }
  } = data;

  return <div className="artwork">
    <div className="artwork__slider">
      {/* Background title */}
      <div className="artwork__slider-title">{title}</div>
      {/* Slider */}
      <div className="artwork__slider-item" style={{ backgroundImage: `url(${assets[0]})`}}>
        <img src={assets[0]} alt={"Artwork image " + [assets[0]]}/>
      </div>
      {/* Elements at the top right */}
      <div className="artwork__slider-creations">@{creatorNick} / Creations</div>
      <div className="artwork__slider-pagination">{indexes.current} / {indexes.all}</div>
      <div className="artwork__slider-nav">
        <Link href={`/artwork/${prev_slug}`}>
          <a className="artwork__slider-nav-btn artwork__slider-nav-btn--left">
            <i className="icon icon-arrow-left"></i>
          </a>
        </Link>
        <Link href={`/artwork/${next_slug}`}>
          <a className="artwork__slider-nav-btn artwork__slider-nav-btn--right">
            <i className="icon icon-arrow-right"></i>
          </a>
        </Link>
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
            <BidList data={bids} type="hash-bid"/>
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
          auction.active && (<Link href={`/bid/new?id=${slug}`}>
            <a className="btn btn--bid artwork__slider-price-btn">Bid in</a>
          </Link>)
        }
      </div>
    </div>
    <div className="artwork__grid">
      <div className="artwork__grid-column">
        <div className="artwork__grid-cell">
          <Info creator={creator} title={title} description={description} unlockable={unlockable} tags={tags} categories={categories} />
        </div>
        <div className="artwork__grid-cell">
          <Owner price={price} auction={auction} owner={owner} slug={slug} />
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
  const data = artworkData;

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
      slug
    },
  }
}

export default Artwork
