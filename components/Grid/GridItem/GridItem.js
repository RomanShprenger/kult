import Link from 'next/link';
import PostActions from 'components/PostActions';
import { priceFormat } from "utils/format";

const renderArt = (data) => (
  <div className="grid__item-inner">
    <div className="grid__item-mobile">
      <Link href={`/user/${data.nickname}`}>
        <a className="grid__item-header">
          <div className="grid__item-photo">
            <img src={data.photo} alt="author photo"/>
          </div>
          <div className="grid__item-info">
            <div className="grid__item-name">{data.name}</div>
            <div className="grid__item-profile">
              <div className="grid__item-nickname">@{data.nickname}</div>
              <div className="grid__item-followers">{data.followers} Followers</div>
            </div>
          </div>
          <div className="grid__item-follow">
            <button type="button" className="grid__item-btn grid__item-btn--follow">UnFollow</button>
          </div>
        </a>
      </Link>
      <div className="grid__item-content">
        <img className="grid__item-img" src={data.imgUrl} alt="Post image"/>
      </div>
      <footer className="grid__item-footer">
        <div className="grid__item-action">
          <PostActions type="small" cbLike={() => console.log("Like")} cbComment={() => console.log("Comment")} cbShare={() => console.log("Share")} />
          <div className="grid__item-bidin">
            <div className="grid__item-price">{priceFormat(data.price)} ETH</div>
            <Link href={`/bid/new?id=${data.slug}`}>
              <a className="grid__item-btn grid__item-btn--bid">Bid in</a>
            </Link>
          </div>
        </div>
        <div className="grid__item-post">
          <span className="grid__item-post-name">{data.name}</span> : {data.message}
        </div>
      </footer>
    </div>
    <div className="grid__item-hover-header">
      <Link href={`/user/${data.nickname}`}>
        <a className="grid__item-header">
          <div className="grid__item-photo">
            <img src={data.photo} alt="author photo"/>
          </div>
          <div className="grid__item-info">
            <div className="grid__item-owner">Owner</div>
            <div className="grid__item-hash"><span>@</span>{data.hash}</div>
          </div>
        </a>
      </Link>
    </div>
    <Link href={`/artwork/${data.slug}`}>
      <a className="grid__item-link grid__item-desktop">
        <img className="grid__item-img" src={data.imgUrl} alt="Post image"/>
        <div className="grid__item-hover-footer">
          <div className="grid__item-title">{data.title}</div>
          <i className="icon icon-arrow-bottom-right grid__item-hover-arrow" />
        </div>
      </a>
    </Link>
  </div>
);

const renderArtist = (data, size) => (
  <div className="grid__item-inner">
    <header className="grid__item-header">
      <Link href={`/user/${data.nickname}`}>
        <a className="grid__item-link">
          <div className="grid__item-photo">
            <img src={data.photo} alt="author photo"/>
          </div>
          <div className="grid__item-info">
            <div className="grid__item-name">{data.name}</div>
            <div className="grid__item-profile">
              <div className="grid__item-nickname">@{data.nickname}</div>
              <div className="grid__item-followers">{data.followers} Followers</div>
            </div>
          </div>
        </a>
      </Link>
      <div className="grid__item-follow">
        <button type="button" className="grid__item-btn grid__item-btn--follow">Unfollow</button>
      </div>
      <div className="grid__item-gallery">
        <Link href={`/user/${data.nickname}?tab=creations`}>
          <a className="grid__item-btn">
            Gallery
          </a>
        </Link>
      </div>
    </header>
    <div className="grid__item-description">{data.description}</div>
    <div className="grid__item-longread">{data.longread}</div>
    <div className="grid__item-action grid__item-action--desktop">
      <button type="button" className="grid__item-btn">Unfollow</button>
    </div>
    <div className="grid__item-action grid__item-action--mobile">
      <PostActions type="small" cbLike={() => console.log("Like")} cbComment={() => console.log("Comment")} cbShare={() => console.log("Share")} />
    </div>
  </div>
);

const renderTags = (data) => (
  <div className="grid__item-inner">
    <div className="grid__item-title">Popular tags</div>
    <div className="grid__item-tags">
      { data.tags.map(tag => (
        <Link href="/" key={tag}>
          <a className="grid__item-tag-link">
            {"#" + tag.charAt(0).toUpperCase() + tag.slice(1)}
          </a>
        </Link>
      ))}
    </div>
    <Link href="/">
      <a className="grid__item-explore"><i className="icon icon-explore"></i> Explore</a>
    </Link>
  </div>
);

const renderBids = (data) => (
  <div className="grid__item-inner">
    <div className="grid__item-title">Current bids</div>
    <div className="grid__item-bids">
      { data.bids.map((bid, i) => (
        <Link href="/" key={`${i}${bid.hash}`}>
          <a className="grid__item-bid">
            <span className="grid__item-bid-photo">
              <img src={bid.photo} alt="Bid photo" />
            </span>
            <span className="grid__item-bid-hash"><b>@</b> <span>{bid.hash}</span></span>
            <span className="grid__item-bid-value">{bid.value} ETH</span>
          </a>
        </Link>
      ))}
    </div>
  </div>
);

const renderBlock = (type, data, size) => {
  switch (type) {
    case "artist":
      return renderArtist(data, size);
    case "art":
      return renderArt(data);
    case "tags":
      return renderTags(data);
    case "bids":
      return renderBids(data);
    default:
      return null;
  }
}

function GridItem({ type, size, data, index }) {
  return <div
      className={`grid__item grid__item--${index} grid__item--${type}`}
      data-size={size}>
      {renderBlock(type, data, size)}
    </div>
}

export default GridItem;
