import Link from 'next/link';

const renderArt = (data) => (
  <div className="grid__item-inner">
    <div className="grid__item-mobile">
      <header className="grid__item-header">
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
      </header>
      <div className="grid__item-content">
        <img className="grid__item-img" src={data.imgUrl} alt="Post image"/>
      </div>
      <footer className="grid__item-footer">
        <div className="grid__item-action">
          <div className="grid__item-like"></div>
          <div className="grid__item-bidin">
            <div className="grid__item-price">{data.price} ETH</div>
            <button className="grid__item-btn grid__item-btn--bid">Bid in</button>
          </div>
        </div>
        <div className="grid__item-post">
          <span className="grid__item-post-name">{data.name}</span> : {data.message}
        </div>
      </footer>
    </div>
    <Link href={data.slug}>
      <a className="grid__item-link grid__item-desktop">
        <img className="grid__item-img" src={data.imgUrl} alt="Post image"/>
      </a>
    </Link>
  </div>
);

const renderArtist = (data, size) => (
  <div className="grid__item-inner">
    <header className="grid__item-header">
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
        <button type="button" className="grid__item-btn grid__item-btn--follow">Unfollow</button>
      </div>
      <div className="grid__item-gallery">
        <button type="button" className="grid__item-btn">Gallery</button>
      </div>
    </header>
    <div className="grid__item-description">{data.description}</div>
    <div className="grid__item-longread">{data.longread}</div>
    <div className="grid__item-action grid__item-action--desktop">
      <button type="button" className="grid__item-btn">Unfollow</button>
    </div>
    <div className="grid__item-action grid__item-action--mobile">

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
      <a className="grid__item-explore">Explore</a>
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
  return <div className={`grid__item grid__item--${index} grid__item--${type}`} data-size={size}>
      {renderBlock(type, data, size)}
    </div>
}

export default GridItem;
