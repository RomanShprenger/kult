import moment from "moment";
import Link from 'next/link';
import { priceFormat } from "utils/format";

const ActivityItem = ({ event, hash, date, bid, photo }) => {
  return <div className="activity-item">
    <div className="activity-item__photo">
      <img src={photo} alt="Auction event author photo" />
    </div>
    <div className="activity-item__details">
      <div className="activity-item__details-event">{event} <span className="activity-item__details-hash">{hash}</span></div>
      <div className="activity-item__details-date">{moment(date).format("MMM DD, YYYY [at] LT")}</div>
    </div>
    <div className="activity-item__bid">
      <div className="activity-item__bid-eth">{priceFormat(bid.eth)} ETH</div>
      <div className="activity-item__bid-usd">${priceFormat(bid.usd)}</div>
    </div>
    <div className="activity-item__action">
      <Link href={`/`}>
        <a className="activity-item__action-link">
          <i className="icon icon-share"></i>
        </a>
      </Link>
    </div>
  </div>
}

export default ActivityItem;
