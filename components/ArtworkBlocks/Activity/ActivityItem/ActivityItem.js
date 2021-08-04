import moment from "moment";
import Link from 'next/link';
import { priceFormat } from "utils/format";

const ActivityItem = ({ event, hash, date, bid, photo }) => {
  return <div className="activity-item">
    <Link href={`/`}>
      <a className="activity-item__content">
        <span className="activity-item__photo">
          <img src={photo} alt="Auction event author photo" />
        </span>
        <span className="activity-item__details">
          <span className="activity-item__details-event">{event} <span className="activity-item__details-hash">{hash}</span></span>
          <span className="activity-item__details-date">{moment(date).format("MMM DD, YYYY [at] LT")}</span>
        </span>
        <span className="activity-item__bid">
          <span className="activity-item__bid-eth">{priceFormat(bid.eth)} ETH</span>
          <span className="activity-item__bid-usd">${priceFormat(bid.usd)}</span>
        </span>
      </a>
    </Link>
    <span className="activity-item__action">
      <Link href={`/`}>
        <a className="activity-item__action-link">
          <i className="icon icon-share"></i>
        </a>
      </Link>
    </span>
  </div>



}

export default ActivityItem;
