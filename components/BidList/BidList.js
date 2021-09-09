import { priceFormat } from "utils/format";
import moment from "moment";
import Badge from "components/Badge";

const BidList = ({ data, format='default', type, rate }) => {

  if (data.length === 0) {
    return (<ul className={`bid-list bid-list--${format}`}>
      <li className="bid-list__item bid-list__item--empty">
        No bids yet
      </li>
    </ul>)
  }

  const list = data.sort((a, b) => a.bid - b.bid).reverse();

  const badge = (type, item) => {
    let res = null;
    console.log(item);
    switch (type) {
      case "hash-date":
        res = <Badge type="hash-date" nick={item.nickname} imgUrl={item.photo} hash={item.hash} text={moment(item.date).format("MMM DD, YYYY [at] LT")} />
        break;
      default:
        res = <Badge type={type} nick={item.nickname} imgUrl={item.photo} hash={item.hash} bid={`${priceFormat(item.bid)} ETH`} />
        break;
    }
    return res;
  }

  return (<ul className={`bid-list bid-list--${format}`}>
    {
      list.map(item => (
        <li className="bid-list__item" key={item.hash}>
          <div className="bid-list__item-info">{badge(type, item)}</div>
          {
            format !== 'default' && <div className="bid-list__item-price">
              <div className="bid-list__item-price-eth">{`${priceFormat(item.bid)} ETH`}</div>
              <div className="bid-list__item-price-usd">{rate && `$${priceFormat(item.bid * rate)}`}</div>
            </div>
          }
        </li>
      ))
    }
  </ul>)
};

export default BidList;
