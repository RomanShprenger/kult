import Link from 'next/link';
import moment from 'moment';
import PostHeader from 'components/PostHeader';
import PostTags from 'components/PostTags';
import PostActions from 'components/PostActions';
import { priceFormat } from "utils/format";

const UserFeedArtwork= ({ owner, name, nickname, avatar, title, imageUrl, slug, bid, liked, date, categories, unlockable }) => {
  return <div className="user-feed-item user-feed-item--artwork">
    <div className="user-feed-item__header">
      <PostHeader name={name} nickname={nickname} avatar={avatar} date={moment(date).format("DD MMM")} />
    </div>
    <div className="user-feed-item__body">
      <div className="user-feed-item__body-img">
        <img src={imageUrl} alt="" className="user-feed-item__img"/>
      </div>
      <Link href={`/artwork/${slug}`}>
        <a className="user-feed-item__body-title">
          {title}
        </a>
      </Link>
      <div className="user-feed-item__body-tags">
        <PostTags categories={categories} unlockable={unlockable} />
      </div>
    </div>
    {
      !owner ? <div className="user-feed-item__footer">
        <div className="user-feed-item__footer-title">Last bid</div>
        <div className="user-feed-item__footer-eth">{priceFormat(bid.eth)} ETH</div>
        <div className="user-feed-item__footer-usd">${priceFormat(bid.usd)}</div>
        <div className="user-feed-item__footer-actions">
          <button className="user-feed-item__footer-btn" onClick={() => {console.log("BID")}}>Bid now</button>
          <PostActions cbLike={() => console.log("like")} liked={liked} />
        </div>

      </div> : <div className="user-feed-item__footer">
        <PostActions cbLike={() => console.log("like")} liked={liked} />
      </div>
    }
  </div>
}

export default UserFeedArtwork;
