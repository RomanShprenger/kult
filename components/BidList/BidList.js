import Link from 'next/link';
import Badge from "components/Badge";

const BidList = ({ data }) => {

  if (data.length === 0) {
    return (<ul className="bid-list">
      <li className="bid-list__item bid-list__item--empty">
        No bids yet
      </li>
    </ul>)
  }

  const list = data.sort((a, b) => a.bid - b.bid).reverse();

  return (<ul className="bid-list">
    {
      list.map(item => (
        <li className="bid-list__item" key={item.hash}>
          <Badge type="hash-bid" nick={item.nickname} imgUrl={item.photo} hash={item.hash} bid={`${item.bid} ETH`} />
        </li>
      ))
    }
  </ul>)
};

export default BidList;
