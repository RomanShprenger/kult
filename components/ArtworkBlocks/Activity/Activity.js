import moment from "moment";
import Link from 'next/link';
import { priceFormat } from "utils/format";
import ActivityItem from './ActivityItem';

const Activity = ({ data, auctionActive, owner }) => {
  return <div className="activity">
    <div className="activity__title">Activity</div>
    {
      auctionActive && (
        <div className="activity__winner">
          <div className="activity__winner-user">
            Auction won by: <Link href={`/user/${owner.nickname}`}>
              <a className="activity__winner-link">@{owner.nickname}</a>
            </Link>
            {moment(owner.date).format("MMM DD, YYYY [at] LT")}
          </div>
          <div className="activity__winner-sold">
            Sold for : <span className="activity__winner-expense">{priceFormat(owner.bid.eth)} ETH</span>${priceFormat(owner.bid.usd)}
          </div>
        </div>
      )
    }
    <ul className="activity__list">
      {
        data.map((item, index) => (
          <li className="activity__list-item" key={item.date + index}>
            <ActivityItem {...item} />
          </li>
        ))
      }
    </ul>
  </div>
}

export default Activity;
